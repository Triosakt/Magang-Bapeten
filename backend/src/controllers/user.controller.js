import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

const ROLE_LIST = ["perwakilan_unit", "admin_ortala", "user_biasa"];

export async function listUsers(_req, res) {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.role, u.unit_kerja_id, uk.nama_unit, u.is_active, u.last_login_at
     FROM users u LEFT JOIN unit_kerja uk ON uk.id = u.unit_kerja_id ORDER BY u.created_at DESC`
  );
  res.json(rows);
}

export async function createUser(req, res) {
  const { name, email, password, role, unit_kerja_id } = req.body || {};
  if (!name || !email || !password || password.length < 8 || !ROLE_LIST.includes(role))
    return res.status(400).json({ message: "Data user tidak lengkap atau role tidak valid" });
  if (role === "perwakilan_unit" && !unit_kerja_id)
    return res.status(400).json({ message: "Perwakilan unit wajib memiliki unit kerja" });

  const [r] = await pool.query(
    "INSERT INTO users (name, email, password, role, unit_kerja_id) VALUES (?,?,?,?,?)",
    [name, email, await bcrypt.hash(password, 12), role, role === "perwakilan_unit" ? unit_kerja_id : null]
  );
  res.status(201).json({ id: r.insertId });
}

export async function updateUser(req, res) {
  const { name, role, unit_kerja_id, is_active, password } = req.body || {};
  if (role && !ROLE_LIST.includes(role)) return res.status(400).json({ message: "Role tidak valid" });
  // admin tidak boleh menonaktifkan / menurunkan role dirinya sendiri
  if (Number(req.params.id) === req.user.id && (is_active === 0 || (role && role !== "admin_ortala")))
    return res.status(400).json({ message: "Tidak dapat mengubah status/role akun sendiri" });

  await pool.query(
    `UPDATE users SET name = COALESCE(?, name), role = COALESCE(?, role),
       unit_kerja_id = COALESCE(?, unit_kerja_id), is_active = COALESCE(?, is_active),
       password = COALESCE(?, password) WHERE id = ?`,
    [name ?? null, role ?? null, unit_kerja_id ?? null, is_active ?? null,
     password ? await bcrypt.hash(password, 12) : null, req.params.id]
  );
  res.json({ message: "User diperbarui" });
}
