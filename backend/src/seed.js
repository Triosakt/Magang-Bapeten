import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "./config/db.js";

// Membuat akun contoh untuk 3 role. GANTI password sebelum produksi.
const pw = process.env.SEED_ADMIN_PASSWORD || "Admin#12345";
const hash = await bcrypt.hash(pw, 12);
const [[bou]] = await pool.query("SELECT id FROM unit_kerja WHERE nama_unit = 'BOU'");

const accounts = [
  ["Admin Ortala", "admin@bapeten.go.id", "admin_ortala", null],
  ["Perwakilan BOU", "unit.bou@bapeten.go.id", "perwakilan_unit", bou?.id ?? null],
  ["User Biasa", "user@bapeten.go.id", "user_biasa", null],
];
for (const [name, email, role, unit] of accounts) {
  await pool.query(
    `INSERT INTO users (name, email, password, role, unit_kerja_id) VALUES (?,?,?,?,?)
     ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [name, email, hash, role, unit]
  );
}
console.log("Seed selesai. Login dengan password dari SEED_ADMIN_PASSWORD.");
await pool.end();
