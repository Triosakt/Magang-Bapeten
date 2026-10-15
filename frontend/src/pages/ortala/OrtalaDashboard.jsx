
import { ArrowRight, ClipboardCheck, FileClock, ShieldCheck } from "lucide-react";
import RoleDashboard from "../../components/dashboard/RoleDashboard";

const queue = [
  {
    id: "SUB-101",
    title: "Peta Proses Bisnis Unit A",
    unit: "Unit A",
    date: "14 Okt 2026",
    status: "Menunggu pemeriksaan",
  },
  {
    id: "SUB-102",
    title: "Revisi SOP Administrasi",
    unit: "Unit B",
    date: "13 Okt 2026",
    status: "Menunggu pemeriksaan",
  },
  {
    id: "SUB-103",
    title: "Prosedur Pengelolaan Dokumen",
    unit: "Unit C",
    date: "12 Okt 2026",
    status: "Perlu tindak lanjut",
  },
];

export default function OrtalaDashboard() {
  return (
    <RoleDashboard
      role="Ortala"
      subtitle="Pantau antrean pemeriksaan, tindak lanjuti revisi, dan kelola dokumen yang siap dipublikasikan."
      menu={[
        { label: "Dashboard", href: "/dashboard/ortala", icon: "dashboard" },
        { label: "Pemeriksaan", href: "/dashboard/ortala/approval", icon: "shield" },
      ]}
      stats={[
        { label: "Total antrean", value: "8", icon: "documents" },
        { label: "Menunggu pemeriksaan", value: "5", icon: "pending" },
        { label: "Perlu tindak lanjut", value: "2", icon: "shield" },
        { label: "Siap dipublikasikan", value: "1", icon: "approved" },
      ]}
    >
      <section className="mb-6 grid gap-4 md:grid-cols-2">
        <a
          href="/dashboard/ortala/approval"
          className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-sm"
        >
          <ClipboardCheck size={24} className="mb-4 text-slate-600" />
          <h2 className="font-bold text-slate-900">Periksa pengajuan</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Buka antrean untuk memeriksa metadata dan dokumen yang diajukan.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            Buka pemeriksaan <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </span>
        </a>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <ShieldCheck size={24} className="mb-4 text-slate-600" />
          <h2 className="font-bold text-slate-900">Kontrol publikasi</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Dokumen yang disetujui harus melalui tahap publikasi sebelum muncul
            pada katalog Viewer.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Antrean pemeriksaan
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Contoh pengajuan yang memerlukan tindak lanjut.
            </p>
          </div>
          <FileClock size={22} className="text-slate-500" />
        </div>

        <div className="space-y-3">
          {queue.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.id} · {item.unit} · {item.date}
                </p>
                <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {item.status}
                </span>
              </div>
              <a
                href="/dashboard/ortala/approval"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:underline"
              >
                Tinjau <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </RoleDashboard>
  );
}
