import fs from "fs";
import path from "path";
import { pool } from "../config/db.js";
import { UPLOAD_ROOT } from "../middleware/upload.js";

const httpError = (status, message) => Object.assign(new Error(message), { status });
const units = (s) => (s ? s.split("||") : []);

// Daftar peta proses + jumlah turunan, dikelompokkan di sisi klien per keterangan (Inti/Pendukung/Lainnya)
export async function list(_req, res) {
  const [rows] = await pool.query(
    `SELECT p.id, p.keterangan_id, k.nama_keterangan, p.nomor_peta_proses, p.judul, p.tahun_terbit,
            (p.file_pdf IS NOT NULL) AS has_file,
            (SELECT COUNT(*) FROM sub_proses sp WHERE sp.peta_proses_id = p.id) AS jml_sub,
            (SELECT COUNT(*) FROM cfm c WHERE c.peta_proses_id = p.id) AS jml_cfm,
            (SELECT COUNT(*) FROM sop s WHERE s.peta_proses_id = p.id AND s.approval_status = 'approved') AS jml_sop
     FROM peta_proses p JOIN keterangan k ON k.id = p.keterangan_id
     ORDER BY p.keterangan_id, p.nomor_peta_proses`
  );
  res.json(rows);
}

// Detail: peta proses -> sub proses -> CFM, plus SOP yang sudah disetujui
export async function detail(req, res) {
  const id = req.params.id;
  const [[peta]] = await pool.query(
    `SELECT p.id, p.nomor_peta_proses, p.judul, p.tahun_terbit, k.nama_keterangan, (p.file_pdf IS NOT NULL) AS has_file,
            (SELECT GROUP_CONCAT(uk.nama_unit ORDER BY uk.nama_unit SEPARATOR '||')
               FROM peta_proses_unit_kerja pu JOIN unit_kerja uk ON uk.id = pu.unit_kerja_id WHERE pu.peta_proses_id = p.id) AS units
     FROM peta_proses p JOIN keterangan k ON k.id = p.keterangan_id WHERE p.id = ?`, [id]);
  if (!peta) throw httpError(404, "Peta proses tidak ditemukan");

  const [subs] = await pool.query(
    `SELECT sp.id, sp.nomor_sub_proses, sp.nama_sub_proses, sp.tahun_terbit, (sp.file_pdf IS NOT NULL) AS has_file,
            (SELECT GROUP_CONCAT(uk.nama_unit ORDER BY uk.nama_unit SEPARATOR '||')
               FROM sub_proses_unit_kerja su JOIN unit_kerja uk ON uk.id = su.unit_kerja_id WHERE su.sub_proses_id = sp.id) AS units
     FROM sub_proses sp WHERE sp.peta_proses_id = ? ORDER BY sp.nomor_sub_proses`, [id]);
  const [cfms] = await pool.query(
    `SELECT c.id, c.sub_proses_id, c.nomor_cfm, c.nama_cfm, c.tahun_terbit, (c.file_pdf IS NOT NULL) AS has_file,
            (SELECT GROUP_CONCAT(uk.nama_unit ORDER BY uk.nama_unit SEPARATOR '||')
               FROM cfm_unit_kerja cu JOIN unit_kerja uk ON uk.id = cu.unit_kerja_id WHERE cu.cfm_id = c.id) AS units
     FROM cfm c WHERE c.peta_proses_id = ? ORDER BY c.nomor_cfm`, [id]);
  const [sops] = await pool.query(
    `SELECT s.id, s.sub_proses_id, s.cfm_id, s.nomor_sop, s.nama_sop, s.tahun_terbit, s.status_berlaku
     FROM sop s WHERE s.peta_proses_id = ? AND s.approval_status = 'approved' ORDER BY s.nomor_sop`, [id]);

  res.json({
    ...peta, units: units(peta.units),
    sub_proses: subs.map((s) => ({
      ...s, units: units(s.units),
      cfm: cfms.filter((c) => c.sub_proses_id === s.id).map((c) => ({
        ...c, units: units(c.units), sop: sops.filter((o) => o.cfm_id === c.id),
      })),
      sop: sops.filter((o) => o.sub_proses_id === s.id && !o.cfm_id), // SOP yang terkait sub proses saja
    })),
    sop_tanpa_sub: sops.filter((o) => !o.sub_proses_id),
  });
}

// Tampilkan PDF peta proses / sub proses / CFM (semua role yang login)
const TABLES = { peta: "peta_proses", sub: "sub_proses", cfm: "cfm" };
export async function file(req, res) {
  const table = TABLES[req.params.type];
  const [[row]] = await pool.query(`SELECT file_pdf FROM ${table} WHERE id = ?`, [req.params.id]);
  if (!row?.file_pdf) throw httpError(404, "File PDF belum tersedia");

  const full = path.resolve(UPLOAD_ROOT, row.file_pdf);
  if (!full.startsWith(UPLOAD_ROOT + path.sep)) throw httpError(400, "Path file tidak valid");
  if (!fs.existsSync(full)) throw httpError(404, "File tidak ditemukan di server. Salin folder PDF lama ke backend/uploads.");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline");
  res.sendFile(full);
}
