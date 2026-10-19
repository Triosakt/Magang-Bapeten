import { pool } from "../config/db.js";
import { ROLES } from "../middleware/auth.js";

// Data untuk chart dashboard & laporan print. Perwakilan unit hanya melihat unitnya.
export async function summary(req, res) {
  const scoped = req.user.role === ROLES.UNIT;
  const scope = scoped ? "AND s.unit_kerja_id = ?" : "";
  const p = scoped ? [req.user.unit_kerja_id] : [];

  const [byStatus] = await pool.query(
    `SELECT s.approval_status AS status, COUNT(*) AS total FROM sop s WHERE 1=1 ${scope} GROUP BY s.approval_status`, p);
  const [byYear] = await pool.query(
    `SELECT s.tahun_terbit AS tahun, COUNT(*) AS total FROM sop s
     WHERE s.approval_status = 'approved' ${scope} GROUP BY s.tahun_terbit ORDER BY s.tahun_terbit`, p);
  const [byUnit] = await pool.query(
    `SELECT COALESCE(uk.nama_unit, 'Lembaga') AS unit, COUNT(*) AS total FROM sop s
     LEFT JOIN unit_kerja uk ON uk.id = s.unit_kerja_id
     WHERE s.approval_status = 'approved' ${scope} GROUP BY unit ORDER BY total DESC LIMIT 15`, p);
  const [byJenis] = await pool.query(
    `SELECT s.jenis_sop AS jenis, COUNT(*) AS total FROM sop s
     WHERE s.approval_status = 'approved' ${scope} GROUP BY s.jenis_sop`, p);
  const [byBerlaku] = await pool.query(
    `SELECT s.status_berlaku AS status, COUNT(*) AS total FROM sop s
     WHERE s.approval_status = 'approved' ${scope} GROUP BY s.status_berlaku`, p);
  const [topDownload] = await pool.query(
    `SELECT s.id, s.nomor_sop, s.nama_sop, s.download_count FROM sop s
     WHERE s.approval_status = 'approved' ${scope} ORDER BY s.download_count DESC LIMIT 5`, p);

  res.json({ generated_at: new Date(), byStatus, byYear, byUnit, byJenis, byBerlaku, topDownload });
}
