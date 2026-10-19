export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const notFound = (_req, res) =>
  res.status(404).json({ message: "Endpoint tidak ditemukan" });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  if (err.code === "LIMIT_FILE_SIZE")
    return res.status(413).json({ message: "Ukuran file maksimal 20 MB" });
  if (err.code === "ER_DUP_ENTRY")
    return res.status(409).json({ message: "Data sudah ada (duplikat)" });
  const status = err.status || (err.message?.includes("PDF") ? 400 : 500);
  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? "Terjadi kesalahan server" : err.message });
};
