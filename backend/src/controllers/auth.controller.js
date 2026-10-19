import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import { signToken } from "../middleware/auth.js";

const publicUser = (u) => ({
  id: u.id, name: u.name, email: u.email, role: u.role, unit_kerja_id: u.unit_kerja_id,
});

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "Email dan password wajib diisi" });

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  const user = rows[0];
  // pesan sama untuk email salah / password salah agar tidak membocorkan akun
  if (!user || !user.is_active || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Email atau password salah" });

  await pool.query("UPDATE users SET last_login_at = NOW() WHERE id = ?", [user.id]);
  res.json({ token: signToken(user), user: publicUser(user) });
}

// Registrasi publik hanya menghasilkan role user_biasa
export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password || password.length < 8)
    return res.status(400).json({ message: "Nama, email, dan password (min. 8 karakter) wajib diisi" });
  const hash = await bcrypt.hash(password, 12);
  const [r] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?,?,?, 'user_biasa')",
    [name, email, hash]
  );
  res.status(201).json({ id: r.insertId });
}

export const me = (req, res) => res.json({ user: publicUser(req.user) });
