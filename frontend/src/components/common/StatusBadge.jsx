export default function StatusBadge({ status }) {
  const normalized = String(status || "").trim().toLowerCase();

  let styles = "border border-slate-200 bg-slate-100 text-slate-600";
  let label = status || "Belum ditentukan";

  if (
    ["aktif", "active", "published", "diterbitkan"].includes(normalized)
  ) {
    styles = "border border-blue-200 bg-blue-50 text-[#123D68]";
  } else if (
    [
      "dalam review",
      "review",
      "menunggu review",
      "menunggu peninjauan",
    ].includes(normalized)
  ) {
    styles = "border border-amber-200 bg-amber-50 text-amber-800";
  } else if (["draft", "konsep"].includes(normalized)) {
    styles = "border border-sky-200 bg-sky-50 text-sky-800";
  } else if (
    ["ditolak", "rejected", "perlu revisi", "revisi"].includes(normalized)
  ) {
    styles = "border border-red-200 bg-red-50 text-red-700";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}