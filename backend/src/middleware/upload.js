import multer from "multer";
import path from "path";
import fs from "fs";

export const UPLOAD_ROOT = path.resolve(process.env.UPLOAD_DIR || "uploads");
const sopDir = path.join(UPLOAD_ROOT, "sop");
fs.mkdirSync(sopDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, sopDir),
  filename: (_req, file, cb) => {
    const base = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 80);
    cb(null, `${base}_${Date.now()}.pdf`);
  },
});

export const uploadSopFile = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (_req, file, cb) =>
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Hanya file PDF yang diperbolehkan")),
}).single("file");
