
import { ArrowLeft, FileUp, Send } from "lucide-react";
import { useState } from "react";
import RoleDashboard from "../../components/dashboard/RoleDashboard";

export default function DocumentSubmissionPage() {
  const [form, setForm] = useState({
    title: "",
    number: "",
    category: "Peta Proses",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setMessage("Pilih file dokumen terlebih dahulu.");
      return;
    }

    // Form belum terhubung ke API. Tidak ada file yang diunggah ke server.
    setMessage(
      "Validasi form berhasil. Pengiriman belum aktif karena API pengajuan belum dihubungkan."
    );
  }

  return (
    <RoleDashboard
      role="Kepala Unit"
      subtitle="Siapkan dokumen dan informasi pengajuan untuk proses pemeriksaan."
      menu={[
        { label: "Dashboard", href: "/dashboard/kepala-unit", icon: "dashboard" },
        {
          label: "Ajukan dokumen",
          href: "/dashboard/kepala-unit/pengajuan",
          icon: "plus",
        },
      ]}
    >
      <a
        href="/dashboard/kepala-unit"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Kembali ke dashboard
      </a>

      <section className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 md:p-8">
        <div className="mb-7">
          <h2 className="text-xl font-bold text-slate-900">
            Form pengajuan dokumen
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Lengkapi metadata dan pilih berkas untuk menyiapkan pengajuan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama dokumen *
            </label>
            <input
              name="title"
              required
              value={form.title}
              onChange={updateField}
              placeholder="Contoh: Peta Proses Bisnis Unit"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Nomor dokumen
            </label>
            <input
              name="number"
              value={form.number}
              onChange={updateField}
              placeholder="Masukkan nomor jika sudah tersedia"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Jenis dokumen *
            </label>
            <select
              name="category"
              required
              value={form.category}
              onChange={updateField}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <option>Peta Proses</option>
              <option>SOP</option>
              <option>Prosedur</option>
              <option>Instruksi Kerja</option>
              <option>Dokumen Pendukung</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Keterangan pengajuan
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={updateField}
              placeholder="Jelaskan tujuan pengajuan atau perubahan dokumen..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Berkas dokumen *
            </label>
            <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 px-5 py-8 text-center hover:bg-slate-50">
              <FileUp size={28} className="mb-3 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">
                {file ? file.name : "Klik untuk memilih berkas"}
              </span>
              <span className="mt-2 text-xs text-slate-500">
                Format dan batas ukuran mengikuti ketentuan server.
              </span>
              <input
                type="file"
                required
                className="sr-only"
                onChange={(event) => {
                  setFile(event.target.files?.[0] || null);
                  setMessage("");
                }}
              />
            </label>
          </div>

          {message && (
            <p
              role="status"
              className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <Send size={17} />
            Periksa kelengkapan
          </button>
        </form>
      </section>
    </RoleDashboard>
  );
}
