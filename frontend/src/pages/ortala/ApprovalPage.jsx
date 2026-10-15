
import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import RoleDashboard from "../../components/dashboard/RoleDashboard";

const initialSubmissions = [
  {
    id: "SUB-101",
    title: "Peta Proses Bisnis Unit A",
    unit: "Unit A",
    description: "Pembaruan peta proses bisnis unit.",
    status: "Menunggu pemeriksaan",
  },
  {
    id: "SUB-102",
    title: "Revisi SOP Administrasi",
    unit: "Unit B",
    description: "Revisi prosedur administrasi internal.",
    status: "Menunggu pemeriksaan",
  },
];

export default function ApprovalPage() {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selected, setSelected] = useState(initialSubmissions[0]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function updateStatus(status) {
    if (!selected) return;

    if (
      (status === "Perlu revisi" || status === "Ditolak") &&
      !note.trim()
    ) {
      setMessage("Tambahkan catatan pemeriksaan untuk tindakan ini.");
      return;
    }

    setSubmissions((current) =>
      current.map((item) =>
        item.id === selected.id ? { ...item, status, note } : item
      )
    );

    setSelected((current) => ({ ...current, status, note }));
    setMessage(
      `Simulasi berhasil: status lokal menjadi "${status}". Belum disimpan ke server.`
    );
  }

  return (
    <RoleDashboard
      role="Ortala"
      subtitle="Periksa setiap pengajuan dan catat keputusan beserta alasannya."
      menu={[
        { label: "Dashboard", href: "/dashboard/ortala", icon: "dashboard" },
        { label: "Pemeriksaan", href: "/dashboard/ortala/approval", icon: "shield" },
      ]}
    >
      <a
        href="/dashboard/ortala"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Kembali ke dashboard
      </a>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">
            Daftar pengajuan
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pilih pengajuan untuk melihat ringkasannya.
          </p>

          <div className="mt-5 space-y-3">
            {submissions.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  setNote(item.note || "");
                  setMessage("");
                }}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selected?.id === item.id
                    ? "border-slate-500 bg-slate-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.id} · {item.unit}
                </p>
                <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {item.status}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          {selected ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Detail pengajuan · {selected.id}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {selected.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Diajukan oleh: {selected.unit}
              </p>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  Keterangan
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selected.description}
                </p>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold">
                  Catatan pemeriksaan
                </label>
                <textarea
                  value={note}
                  onChange={(event) => {
                    setNote(event.target.value);
                    setMessage("");
                  }}
                  rows={4}
                  placeholder="Tuliskan alasan revisi atau penolakan jika diperlukan..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              {message && (
                <p role="status" className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
                  {message}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus("Disetujui")}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  <CheckCircle2 size={17} />
                  Setujui
                </button>

                <button
                  onClick={() => updateStatus("Perlu revisi")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <RotateCcw size={17} />
                  Kembalikan untuk revisi
                </button>

                <button
                  onClick={() => updateStatus("Ditolak")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <XCircle size={17} />
                  Tolak
                </button>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Prototipe ini hanya mengubah status pada state browser. Keputusan
                resmi harus dikirim ke backend dan dicatat pada audit trail.
                Publikasi dokumen merupakan tahap terpisah setelah persetujuan.
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Pilih pengajuan yang ingin diperiksa.
            </p>
          )}
        </section>
      </div>
    </RoleDashboard>
  );
}
