import fs from "fs";
import path from "path";
import { pool } from "../config/db.js";
import { ROLES } from "../middleware/auth.js";
import { UPLOAD_ROOT } from "../middleware/upload.js";
import { notifyAdmins, notifyUser } from "../services/notification.service.js";

const httpError = (status, message) => Object.assign(new Error(message), { status });

// Batasi data yang boleh dilihat tiap role
function visibility(user) {
  if (user.role === ROLES.ADMIN) return { sql: "1=1", params: [] };
  if (user.role === ROLES.UNIT)
    return { sql: "(s.approval_status = 'approved' OR s.unit_kerja_id = ?)", params: [user.unit_kerja_id] };
  return { sql: "s.approval_status = 'approved'", params: [] };
}

const BASE_SELECT = `
  SELECT s.*, uk.nama_unit, lb.nama_lembaga, u.name AS uploaded_by_name
  FROM sop s
  LEFT JOIN unit_kerja uk ON uk.id = s.unit_kerja_id
  LEFT JOIN lembaga lb ON lb.id = s.lembaga_id
  LEFT JOIN users u ON u.id = s.uploaded_by`;

export async function listSop(req, res) {
  const { q, jenis, unit_kerja_id, lembaga_id, tahun, status_berlaku, approval_status } = req.query;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

  const vis = visibility(req.user);
  const where = [vis.sql];
  const params = [...vis.params];

  if (q) { where.push("(s.nama_sop LIKE ? OR s.nomor_sop LIKE ?)"); params.push(`%${q}%`, `%${q}%`); }
  if (jenis) { where.push("s.jenis_sop = ?"); params.push(jenis); }
  if (unit_kerja_id) { where.push("s.unit_kerja_id = ?"); params.push(unit_kerja_id); }
  if (lembaga_id) { where.push("s.lembaga_id = ?"); params.push(lembaga_id); }
  if (tahun) { where.push("s.tahun_terbit = ?"); params.push(tahun); }
  if (status_berlaku) { where.push("s.status_berlaku = ?"); params.push(status_berlaku); }
  if (approval_status && req.user.role !== ROLES.USER) {
    where.push("s.approval_status = ?"); params.push(approval_status);
  }

  const clause = `WHERE ${where.join(" AND ")}`;
  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM sop s ${clause}`, params);
  const [rows] = await pool.query(
    `${BASE_SELECT} ${clause} ORDER BY s.created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  );
  res.json({ data: rows, meta: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function getSop(req, res) {
  const vis = visibility(req.user);
  const [rows] = await pool.query(`${BASE_SELECT} WHERE s.id = ? AND ${vis.sql}`, [req.params.id, ...vis.params]);
  if (!rows[0]) throw httpError(404, "SOP tidak ditemukan");
  const [logs] = await pool.query(
    `SELECT l.*, u.name AS actor_name FROM sop_approval_log l
     JOIN users u ON u.id = l.actor_id WHERE l.sop_id = ? ORDER BY l.created_at DESC`,
    [req.params.id]
  );
  res.json({ ...rows[0], history: logs });
}

// Role 1 (Perwakilan Unit) upload -> status pending + notifikasi ke Admin Ortala
// Role 2 (Admin) upload -> langsung approved
export async function createSop(req, res) {
  const b = req.body;
  const removeFile = () => req.file && fs.unlink(req.file.path, () => {});

  if (!req.file) throw httpError(400, "File PDF SOP wajib diunggah");
  if (!b.nomor_sop || !b.nama_sop || !b.tahun_terbit) {
    removeFile();
    throw httpError(400, "Nomor SOP, nama SOP, dan tahun terbit wajib diisi");
  }

  const isAdmin = req.user.role === ROLES.ADMIN;
  let jenis = "unit_kerja", unitId = req.user.unit_kerja_id, lembagaId = null;

  if (isAdmin) {
    jenis = b.jenis_sop === "lembaga" ? "lembaga" : "unit_kerja";
    unitId = jenis === "unit_kerja" ? Number(b.unit_kerja_id) || null : null;
    lembagaId = jenis === "lembaga" ? Number(b.lembaga_id) || null : null;
  }
  if ((jenis === "unit_kerja" && !unitId) || (jenis === "lembaga" && !lembagaId)) {
    removeFile();
    throw httpError(400, jenis === "lembaga" ? "Lembaga wajib dipilih" : "Unit kerja tidak ditemukan pada akun ini");
  }

  const approval = isAdmin ? "approved" : "pending";
  const [r] = await pool.query(
    `INSERT INTO sop (jenis_sop, lembaga_id, unit_kerja_id, peta_proses_id, sub_proses_id, cfm_id,
       nomor_sop, nama_sop, tahun_terbit, status_berlaku, approval_status, file, uploaded_by,
       approved_by, approved_at)
     VALUES (?,?,?,?,?,?,?,?,?, 'Berlaku', ?, ?, ?, ?, ?)`,
    [jenis, lembagaId, unitId, b.peta_proses_id || null, b.sub_proses_id || null, b.cfm_id || null,
     b.nomor_sop, b.nama_sop, b.tahun_terbit, approval, `sop/${req.file.filename}`, req.user.id,
     isAdmin ? req.user.id : null, isAdmin ? new Date() : null]
  );
  await pool.query(
    "INSERT INTO sop_approval_log (sop_id, action, actor_id, catatan) VALUES (?,?,?,?)",
    [r.insertId, isAdmin ? "approved" : "submitted", req.user.id, b.catatan || null]
  );

  if (!isAdmin) {
    const [[uk]] = await pool.query("SELECT nama_unit FROM unit_kerja WHERE id = ?", [unitId]);
    await notifyAdmins({
      type: "sop_uploaded",
      title: "SOP baru menunggu approval",
      message: `${uk?.nama_unit || "Unit kerja"} mengunggah "${b.nama_sop}" (${b.nomor_sop})`,
      sopId: r.insertId,
    });
  }
  res.status(201).json({ id: r.insertId, approval_status: approval });
}

// Admin: setujui / tolak
export async function reviewSop(req, res) {
  const decision = req.params.decision; // 'approve' | 'reject'
  const { catatan } = req.body || {};
  if (decision === "reject" && !catatan)
    throw httpError(400, "Alasan penolakan wajib diisi");

  const [[sop]] = await pool.query("SELECT * FROM sop WHERE id = ?", [req.params.id]);
  if (!sop) throw httpError(404, "SOP tidak ditemukan");
  if (sop.approval_status !== "pending") throw httpError(409, "SOP ini tidak berstatus pending");

  const approved = decision === "approve";
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      `UPDATE sop SET approval_status = ?, approved_by = ?, approved_at = NOW(), reject_reason = ? WHERE id = ?`,
      [approved ? "approved" : "rejected", req.user.id, approved ? null : catatan, sop.id]
    );
    await conn.query(
      "INSERT INTO sop_approval_log (sop_id, action, actor_id, catatan) VALUES (?,?,?,?)",
      [sop.id, approved ? "approved" : "rejected", req.user.id, catatan || null]
    );
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }

  await notifyUser(sop.uploaded_by, {
    type: approved ? "sop_approved" : "sop_rejected",
    title: approved ? "SOP disetujui" : "SOP ditolak",
    message: approved ? `"${sop.nama_sop}" telah disetujui` : `"${sop.nama_sop}" ditolak: ${catatan}`,
    sopId: sop.id,
  });
  res.json({ id: sop.id, approval_status: approved ? "approved" : "rejected" });
}

// Admin: ubah status berlaku / metadata
export async function updateSop(req, res) {
  const { nama_sop, nomor_sop, tahun_terbit, status_berlaku } = req.body || {};
  const [r] = await pool.query(
    `UPDATE sop SET nama_sop = COALESCE(?, nama_sop), nomor_sop = COALESCE(?, nomor_sop),
       tahun_terbit = COALESCE(?, tahun_terbit), status_berlaku = COALESCE(?, status_berlaku) WHERE id = ?`,
    [nama_sop || null, nomor_sop || null, tahun_terbit || null, status_berlaku || null, req.params.id]
  );
  if (!r.affectedRows) throw httpError(404, "SOP tidak ditemukan");
  res.json({ message: "SOP diperbarui" });
}

export async function deleteSop(req, res) {
  const [[sop]] = await pool.query("SELECT file FROM sop WHERE id = ?", [req.params.id]);
  if (!sop) throw httpError(404, "SOP tidak ditemukan");
  await pool.query("DELETE FROM sop WHERE id = ?", [req.params.id]);
  if (sop.file) fs.unlink(path.join(UPLOAD_ROOT, sop.file), () => {});
  res.json({ message: "SOP dihapus" });
}

// Download: Admin & User Biasa. Perwakilan Unit hanya untuk SOP unitnya sendiri.
export async function downloadSop(req, res) {
  const vis = visibility(req.user);
  const [rows] = await pool.query(`SELECT s.* FROM sop s WHERE s.id = ? AND ${vis.sql}`, [req.params.id, ...vis.params]);
  const sop = rows[0];
  if (!sop || !sop.file) throw httpError(404, "File tidak ditemukan");
  if (req.user.role === ROLES.UNIT && sop.unit_kerja_id !== req.user.unit_kerja_id)
    throw httpError(403, "Perwakilan unit hanya dapat mengunduh SOP unitnya sendiri");

  const full = path.resolve(UPLOAD_ROOT, sop.file);
  if (!full.startsWith(UPLOAD_ROOT + path.sep) || !fs.existsSync(full))
    throw httpError(404, "File tidak ditemukan di server");

  await pool.query("UPDATE sop SET download_count = download_count + 1 WHERE id = ?", [sop.id]);
  res.download(full, `${sop.nomor_sop.replace(/[^\w-]/g, "_")}.pdf`);
}
