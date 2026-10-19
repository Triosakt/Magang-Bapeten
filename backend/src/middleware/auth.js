import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const ROLES = {
  UNIT: "perwakilan_unit", // Role 1
  ADMIN: "admin_ortala",   // Role 2
  USER: "user_biasa",      // Role 3
};

export const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });

// Validasi JWT lalu muat user terbaru dari DB (akun nonaktif langsung ditolak)
export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query(
      "SELECT id, name, email, role, unit_kerja_id, is_active FROM users WHERE id = ?",
      [payload.sub]
    );
    const user = rows[0];
    if (!user || !user.is_active)
      return res.status(401).json({ message: "Akun tidak valid atau nonaktif" });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Token tidak valid atau kedaluwarsa" });
  }
}

// Middleware RBAC: authorize(ROLES.ADMIN, ROLES.UNIT)
export const authorize = (...allowed) => (req, res, next) => {
  if (!req.user || !allowed.includes(req.user.role))
    return res.status(403).json({ message: "Anda tidak memiliki hak akses" });
  next();
};
