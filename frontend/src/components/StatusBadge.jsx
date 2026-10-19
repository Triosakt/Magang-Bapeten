const MAP = {
  pending:  ["Menunggu approval", "bg-amber-50 text-amber-800 ring-amber-200"],
  approved: ["Disetujui", "bg-emerald-50 text-emerald-800 ring-emerald-200"],
  rejected: ["Ditolak", "bg-red-50 text-red-800 ring-red-200"],
  draft:    ["Draft", "bg-slate-100 text-slate-700 ring-slate-200"],
  Berlaku:  ["Berlaku", "bg-accent-soft text-primary ring-blue-200"],
  Tidak_Berlaku: ["Tidak berlaku", "bg-slate-100 text-slate-600 ring-slate-200"],
};
export default function StatusBadge({ status }) {
  const [label, cls] = MAP[status] || [status, "bg-slate-100 text-slate-700 ring-slate-200"];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}>{label}</span>;
}
