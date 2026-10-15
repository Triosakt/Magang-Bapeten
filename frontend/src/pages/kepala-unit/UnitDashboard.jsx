
import { ArrowRight, Clock, FileCheck2, FileClock, Plus } from "lucide-react";
import RoleDashboard from "../../components/dashboard/RoleDashboard";

const submissions = [
  {
    id: "SUB-001",
    title: "Pembaruan Peta Proses Bisnis",
    date: "14 Okt 2026",
    status: "Menunggu pemeriksaan",
  },
  {
    id: "SUB-002",
    title: "Revisi SOP Administrasi",
    date: "12 Okt 2026",
    status: "Perlu revisi",
  },
  {
    id: "SUB-003",
    title: "Dokumen Prosedur Unit",
    date: "10 Okt 2026",
    status: "Disetujui",
  },
];

export default function UnitDashboard() {
  return (
    <RoleDashboard
      role="Kepala Unit"
      subtitle="Kelola pengajuan dokumen unit, pantau hasil pemeriksaan, dan tindak lanjuti revisi."
      menu={[
        { label: "Dashboard", href: "/dashboard/kepala-unit", icon: "dashboard" },
        {
          label: "Ajukan dokumen",
          href: "/dashboard/kepala-unit/pengajuan",
          icon: "plus",
        },
      ]}
      stats={[
        { label: "Total pengajuan", value: "12", icon: "documents" },
        { label: "Menunggu pemeriksaan", value: "3", icon: "pending" },
        { label: "Perlu revisi", value: "2", icon: "shield" },
        { label: "Disetujui", value: "7", icon: "approved" },
      ]}
    >
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-slate-800 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Ajukan dokumen baru</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
            Unggah dokumen unit untuk diperiksa oleh pengelola Ortala.
          </p>
        </div>
        <a
          href="/dashboard/kepala-unit/pengajuan"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          <Plus size={18} />
          Buat pengajuan
        </a>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Pengajuan dokumen saya
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Contoh daftar pengajuan dan status tindak lanjutnya.
            </p>
          </div>
          <FileClock className="text-slate-500" size={22} />
        </div>

        <div className="space-y-3">
          {submissions.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.id} · {item.date}
                </p>
                <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {item.status}
                </span>
              </div>

              {item.status === "Perlu revisi" ? (
                <a
                  href="/dashboard/kepala-unit/pengajuan"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:underline"
                >
                  Perbaiki dokumen <ArrowRight size={16} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                  {item.status === "Disetujui" ? (
                    <FileCheck2 size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                  {item.status}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    </RoleDashboard>
  );
}
