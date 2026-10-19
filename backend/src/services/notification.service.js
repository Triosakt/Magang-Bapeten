import { pool } from "../config/db.js";
import { emitToAdmins, emitToUser } from "./socket.js";

// Simpan ke DB untuk setiap Admin Ortala, lalu push real-time
export async function notifyAdmins({ type, title, message, sopId }) {
  const [admins] = await pool.query(
    "SELECT id FROM users WHERE role = 'admin_ortala' AND is_active = 1"
  );
  if (!admins.length) return;
  await pool.query(
    "INSERT INTO notifications (user_id, type, title, message, sop_id) VALUES ?",
    [admins.map((a) => [a.id, type, title, message, sopId])]
  );
  emitToAdmins("notification:new", { type, title, message, sopId, created_at: new Date() });
}

export async function notifyUser(userId, { type, title, message, sopId }) {
  await pool.query(
    "INSERT INTO notifications (user_id, type, title, message, sop_id) VALUES (?,?,?,?,?)",
    [userId, type, title, message, sopId]
  );
  emitToUser(userId, "notification:new", { type, title, message, sopId, created_at: new Date() });
}
