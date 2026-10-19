// Impor data dari dump lama (db_ortala.sql, Laravel) ke skema baru.
// Pemakaian:  node src/migrateLegacy.js path/ke/db_ortala.sql
// Prasyarat:  schema.sql sudah diimpor dan `npm run seed` sudah dijalankan (butuh akun admin).
// Cara kerja: dump lama dimuat ke database sementara, datanya disalin ke skema baru, lalu database sementara dihapus.
import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";
import { pool } from "./config/db.js";

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error("Pemakaian: node src/migrateLegacy.js path/ke/db_ortala.sql");
  process.exit(1);
}

const TMP = "ortala_legacy_tmp";
const legacy = await mysql.createConnection({
  host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  multipleStatements: true, charset: "utf8mb4",
});
const L = async (sql) => (await legacy.query(sql))[0]; // baca dari database sementara

const conn = await pool.getConnection();
const report = {};

// Salin baris ke tabel baru per 500 baris
async function copy(table, cols, rows) {
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500).map((r) => cols.map((c) => r[c] ?? null));
    await conn.query(`INSERT INTO \`${table}\` (${cols.map((c) => `\`${c}\``).join(",")}) VALUES ?`, [chunk]);
  }
  report[table] = rows.length;
}

try {
  // ---- Pemeriksaan awal ----
  const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM peta_proses");
  if (n > 0) throw new Error("Tabel peta_proses sudah berisi data. Migrasi dibatalkan agar tidak ganda.");
  const [admins] = await conn.query("SELECT id FROM users WHERE role = 'admin_ortala' ORDER BY id LIMIT 1");
  if (!admins[0]) throw new Error("Belum ada akun admin_ortala. Jalankan `npm run seed` dahulu.");
  const adminId = admins[0].id;
  const [[lem]] = await conn.query("SELECT id FROM lembaga WHERE kode = 'BAPETEN'");
  if (!lem) throw new Error("Lembaga BAPETEN belum ada. Impor database/schema.sql dahulu.");

  // ---- Muat dump lama ke database sementara ----
  console.log("Memuat dump lama ke database sementara…");
  await legacy.query(`DROP DATABASE IF EXISTS \`${TMP}\`; CREATE DATABASE \`${TMP}\` CHARACTER SET utf8mb4; USE \`${TMP}\`;`);
  await legacy.query(fs.readFileSync(file, "utf8"));

  await conn.beginTransaction();

  // ---- Unit kerja: cocokkan berdasarkan nama, tambahkan yang belum ada ----
  const [existing] = await conn.query("SELECT id, nama_unit FROM unit_kerja");
  const unitByName = new Map(existing.map((u) => [u.nama_unit.trim().toLowerCase(), u.id]));
  const unitMap = new Map(); // id lama -> id baru
  let unitAdded = 0;
  for (const u of await L("SELECT id, nama_unit FROM unit_kerja ORDER BY id")) {
    const key = u.nama_unit.trim().toLowerCase();
    if (!unitByName.has(key)) {
      const [r] = await conn.query("INSERT INTO unit_kerja (lembaga_id, nama_unit) VALUES (?,?)", [lem.id, u.nama_unit.trim()]);
      unitByName.set(key, r.insertId); unitAdded++;
    }
    unitMap.set(u.id, unitByName.get(key));
  }
  report["unit_kerja (ditambahkan)"] = unitAdded;

  // ---- Hierarki proses (ID dipertahankan agar relasi tetap sama) ----
  for (const k of await L("SELECT id, nama_keterangan FROM keterangan"))
    await conn.query("INSERT INTO keterangan (id, nama_keterangan) VALUES (?,?) ON DUPLICATE KEY UPDATE nama_keterangan = VALUES(nama_keterangan)", [k.id, k.nama_keterangan]);

  await copy("peta_proses", ["id", "keterangan_id", "nomor_peta_proses", "judul", "tahun_terbit", "file_pdf", "created_at", "updated_at"],
    await L("SELECT * FROM peta_proses ORDER BY id"));
  await copy("sub_proses", ["id", "peta_proses_id", "nomor_sub_proses", "nama_sub_proses", "tahun_terbit", "file_pdf"],
    await L("SELECT * FROM sub_proses ORDER BY id"));
  await copy("cfm", ["id", "peta_proses_id", "sub_proses_id", "nomor_cfm", "nama_cfm", "tahun_terbit", "file_pdf"],
    await L("SELECT * FROM cfm ORDER BY id"));

  // ---- Tabel pivot unit kerja (id unit lama dipetakan ke id baru, duplikat dibuang) ----
  async function pivot(table, parentCol) {
    const seen = new Set(), out = [];
    for (const r of await L(`SELECT * FROM ${table} ORDER BY id`)) {
      const unit = unitMap.get(r.unit_kerja_id);
      const key = `${r[parentCol]}-${unit}`;
      if (unit && !seen.has(key)) { seen.add(key); out.push({ [parentCol]: r[parentCol], unit_kerja_id: unit }); }
    }
    await copy(table, [parentCol, "unit_kerja_id"], out);
  }
  await pivot("peta_proses_unit_kerja", "peta_proses_id");
  await pivot("sub_proses_unit_kerja", "sub_proses_id");
  await pivot("cfm_unit_kerja", "cfm_id");

  // ---- SOP: pemilik = unit kerja pertama di pivot; tanpa unit -> SOP Lembaga (BAPETEN) ----
  const unitOfSop = new Map(), multi = [];
  for (const r of await L("SELECT * FROM sop_unit_kerja ORDER BY id")) {
    if (unitOfSop.has(r.sop_id)) { multi.push(r.sop_id); continue; }
    unitOfSop.set(r.sop_id, unitMap.get(r.unit_kerja_id));
  }
  const sops = (await L("SELECT * FROM sop ORDER BY id")).map((s) => {
    const unit = unitOfSop.get(s.id) || null;
    return {
      id: s.id, jenis_sop: unit ? "unit_kerja" : "lembaga", lembaga_id: unit ? null : lem.id, unit_kerja_id: unit,
      peta_proses_id: s.peta_proses_id, sub_proses_id: s.sub_proses_id, cfm_id: s.cfm_id,
      nomor_sop: s.nomor_sop, nama_sop: s.nama_sop, tahun_terbit: s.tahun_terbit,
      status_berlaku: s.status === "Tidak_Berlaku" ? "Tidak_Berlaku" : "Berlaku",
      approval_status: "approved", versi: "1.0", file: s.file,
      uploaded_by: adminId, approved_by: adminId, approved_at: s.updated_at || s.created_at,
      created_at: s.created_at, updated_at: s.updated_at,
    };
  });
  await copy("sop", Object.keys(sops[0] || { id: 0 }), sops);
  report["SOP lebih dari satu unit (hanya unit pertama dipakai)"] = [...new Set(multi)].join(", ") || "-";

  // ---- Konten publik (bila ada); penulis lama dipetakan ke admin baru ----
  await copy("berita", ["id", "judul", "slug", "isi", "thumbnail", "tempat", "status", "tanggal_publikasi", "user_id", "created_at", "updated_at"],
    (await L("SELECT * FROM berita")).map((b) => ({ ...b, user_id: adminId })));
  await copy("berita_media", ["id", "berita_id", "file", "type"], await L("SELECT * FROM berita_media"));
  await copy("pengumuman", ["id", "judul", "file", "deskripsi", "tanggal_pengumuman", "tanggal_kadaluarsa", "status", "created_by", "created_at"],
    (await L("SELECT * FROM pengumuman")).map((p) => ({ ...p, created_by: adminId })));

  await conn.commit();
  console.log("\nMigrasi selesai. Jumlah data yang disalin:");
  console.table(report);
  console.log("Langkah berikutnya: salin folder sop/, peta-proses/, sub-proses/, cfm/ dari storage Laravel ke backend/uploads/ agar file PDF bisa diunduh.");
} catch (e) {
  await conn.rollback().catch(() => {});
  console.error("\nMigrasi gagal dan dibatalkan:", e.message);
  process.exitCode = 1;
} finally {
  await legacy.query(`DROP DATABASE IF EXISTS \`${TMP}\``).catch(() => {});
  await legacy.end(); conn.release(); await pool.end();
}
