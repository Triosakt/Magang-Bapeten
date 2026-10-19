import { pool } from "../config/db.js";

// ---- Unit Kerja ----
export async function listUnitKerja(req, res) {
  // ?all=1 (khusus admin) ikut menampilkan unit nonaktif untuk halaman pengelolaan
  const all = req.query.all === "1" && req.user.role === "admin_ortala";
  const [rows] = await pool.query(
    `SELECT uk.*, lb.nama_lembaga FROM unit_kerja uk
     LEFT JOIN lembaga lb ON lb.id = uk.lembaga_id ${all ? "" : "WHERE uk.is_active = 1"} ORDER BY uk.nama_unit`
  );
  res.json(rows);
}
export async function createUnitKerja(req, res) {
  const { nama_unit, singkatan, lembaga_id } = req.body || {};
  if (!nama_unit) return res.status(400).json({ message: "Nama unit wajib diisi" });
  const [r] = await pool.query(
    "INSERT INTO unit_kerja (nama_unit, singkatan, lembaga_id) VALUES (?,?,?)",
    [nama_unit, singkatan || null, lembaga_id || null]
  );
  res.status(201).json({ id: r.insertId });
}
export async function updateUnitKerja(req, res) {
  const { nama_unit, singkatan, lembaga_id, is_active } = req.body || {};
  await pool.query(
    `UPDATE unit_kerja SET nama_unit = COALESCE(?, nama_unit), singkatan = COALESCE(?, singkatan),
       lembaga_id = COALESCE(?, lembaga_id), is_active = COALESCE(?, is_active) WHERE id = ?`,
    [nama_unit ?? null, singkatan ?? null, lembaga_id ?? null, is_active ?? null, req.params.id]
  );
  res.json({ message: "Unit kerja diperbarui" });
}

// ---- Lembaga (entitas terpisah dari Unit Kerja) ----
export async function listLembaga(_req, res) {
  const [rows] = await pool.query("SELECT * FROM lembaga ORDER BY nama_lembaga");
  res.json(rows);
}
export async function createLembaga(req, res) {
  const { kode, nama_lembaga, deskripsi } = req.body || {};
  if (!kode || !nama_lembaga)
    return res.status(400).json({ message: "Kode dan nama lembaga wajib diisi" });
  const [r] = await pool.query(
    "INSERT INTO lembaga (kode, nama_lembaga, deskripsi) VALUES (?,?,?)",
    [kode, nama_lembaga, deskripsi || null]
  );
  res.status(201).json({ id: r.insertId });
}
export async function updateLembaga(req, res) {
  const { kode, nama_lembaga, deskripsi } = req.body || {};
  await pool.query(
    `UPDATE lembaga SET kode = COALESCE(?, kode), nama_lembaga = COALESCE(?, nama_lembaga),
       deskripsi = COALESCE(?, deskripsi) WHERE id = ?`,
    [kode ?? null, nama_lembaga ?? null, deskripsi ?? null, req.params.id]
  );
  res.json({ message: "Lembaga diperbarui" });
}

// ---- Peta proses (read-only untuk semua role) ----
export async function listPetaProses(_req, res) {
  const [rows] = await pool.query(
    `SELECT p.*, k.nama_keterangan FROM peta_proses p
     JOIN keterangan k ON k.id = p.keterangan_id ORDER BY p.nomor_peta_proses`
  );
  res.json(rows);
}
