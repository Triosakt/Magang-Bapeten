import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticate, authorize, ROLES } from "../middleware/auth.js";
import { uploadSopFile } from "../middleware/upload.js";
import { asyncHandler as ah } from "../middleware/error.js";
import * as auth from "../controllers/auth.controller.js";
import * as sop from "../controllers/sop.controller.js";
import * as master from "../controllers/master.controller.js";
import * as proses from "../controllers/proses.controller.js";
import * as users from "../controllers/user.controller.js";
import * as stats from "../controllers/stats.controller.js";
import * as notif from "../controllers/notification.controller.js";

const { ADMIN, UNIT } = ROLES;
const router = Router();

// ---------- Auth (publik) ----------
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true });
router.post("/auth/login", loginLimiter, ah(auth.login));
router.post("/auth/register", loginLimiter, ah(auth.register));

// Semua route di bawah wajib login
router.use(authenticate);
router.get("/auth/me", auth.me);

// ---------- SOP ----------
router.get("/sop", ah(sop.listSop));                                  // semua role (data difilter per role)
router.get("/sop/:id", ah(sop.getSop));
router.get("/sop/:id/download", ah(sop.downloadSop));                 // admin, user biasa, unit (SOP sendiri)
router.post("/sop", authorize(UNIT, ADMIN), uploadSopFile, ah(sop.createSop)); // upload
router.patch("/sop/:id", authorize(ADMIN), ah(sop.updateSop));
router.delete("/sop/:id", authorize(ADMIN), ah(sop.deleteSop));
router.post("/sop/:id/:decision(approve|reject)", authorize(ADMIN), ah(sop.reviewSop)); // approval

// ---------- Master data ----------
router.get("/unit-kerja", ah(master.listUnitKerja));
router.post("/unit-kerja", authorize(ADMIN), ah(master.createUnitKerja));
router.patch("/unit-kerja/:id", authorize(ADMIN), ah(master.updateUnitKerja));
router.get("/lembaga", ah(master.listLembaga));
router.post("/lembaga", authorize(ADMIN), ah(master.createLembaga));
router.patch("/lembaga/:id", authorize(ADMIN), ah(master.updateLembaga));
router.get("/peta-proses", ah(master.listPetaProses));

// ---------- Peta proses > sub proses > CFM (referensi, semua role) ----------
router.get("/proses", ah(proses.list));
router.get("/proses/peta/:id", ah(proses.detail));
router.get("/proses/:type(peta|sub|cfm)/:id/file", ah(proses.file));

// ---------- Manajemen user (Admin) ----------
router.get("/users", authorize(ADMIN), ah(users.listUsers));
router.post("/users", authorize(ADMIN), ah(users.createUser));
router.patch("/users/:id", authorize(ADMIN), ah(users.updateUser));

// ---------- Statistik & notifikasi ----------
router.get("/stats/summary", ah(stats.summary));
router.get("/notifications", ah(notif.myNotifications));
router.patch("/notifications/read-all", ah(notif.markAllRead));
router.patch("/notifications/:id/read", ah(notif.markRead));

export default router;
