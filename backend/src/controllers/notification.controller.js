import { pool } from "../config/db.js";

export async function myNotifications(req, res) {
  const [rows] = await pool.query(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50", [req.user.id]);
  const [[{ unread }]] = await pool.query(
    "SELECT COUNT(*) AS unread FROM notifications WHERE user_id = ? AND is_read = 0", [req.user.id]);
  res.json({ unread, data: rows });
}
export async function markRead(req, res) {
  await pool.query("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
  res.json({ message: "ok" });
}
export async function markAllRead(req, res) {
  await pool.query("UPDATE notifications SET is_read = 1 WHERE user_id = ?", [req.user.id]);
  res.json({ message: "ok" });
}
