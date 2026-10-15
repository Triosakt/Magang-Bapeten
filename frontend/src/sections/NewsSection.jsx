import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";

const newsItems = [
  {
    number: "01",
    category: "Kegiatan",
    date: "11 Okt 2026",
    title: "Penguatan tata kelola proses bisnis",
    description:
      "Pengelolaan proses bisnis yang terstruktur mendukung konsistensi pelaksanaan tugas dan fungsi organisasi.",
    accent: "bg-blue-50 text-[#24598A]",
  },
  {
    number: "02",
    category: "Digitalisasi",
    date: "07 Okt 2026",
    title: "Digitalisasi akses dokumen operasional",
    description:
      "Akses dokumen digital membantu pengguna menemukan referensi operasional dengan lebih praktis.",
    accent: "bg-sky-50 text-[#176B9A]",
  },
];

export default function NewsSection() {
  return (
    <section
      id="berita"
      className="relative overflow-hidden bg-[#F5F8FC] py-16 sm:py-20 lg:py-24"
    >
      {/* Dekorasi latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5">
              <Newspaper size={15} className="text-[#24598A]" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#24598A]">
                Wawasan dan Kegiatan
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0B2C50] sm:text-4xl">
              Berita dan{" "}
              <span className="text-[#3D8BC9]">Informasi</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Ikuti informasi seputar pengelolaan proses bisnis dan dokumentasi
              untuk mendukung tata kelola organisasi yang lebih efektif.
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-[#DCE6F0] pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123D68] text-white">
              <Newspaper size={21} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B2C50]">
                Informasi terbaru
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Pembaruan seputar proses bisnis
              </p>
            </div>
          </div>
        </div>

        {/* Daftar berita */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {newsItems.map((item) => (
            <article
              key={item.number}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCE6F0] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#A9C8E5] hover:shadow-lg hover:shadow-[#123D68]/[0.06] sm:p-8"
            >
              {/* Garis aksen */}
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#3D8BC9] transition-transform duration-300 group-hover:scale-x-100" />

              {/* Kategori dan nomor */}
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold ${item.accent}`}
                >
                  {item.category}
                </span>

                <span className="text-2xl font-semibold tracking-tight text-[#DCE6F0] transition-colors group-hover:text-[#A9C8E5]">
                  {item.number}
                </span>
              </div>

              {/* Tanggal */}
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} className="text-[#477AA8]" />
                <time>{item.date}</time>
              </div>

              {/* Isi berita */}
              <h3 className="mt-3 text-xl font-bold leading-snug text-[#0B2C50] transition-colors group-hover:text-[#24598A] sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {item.description}
              </p>

              {/* Tautan informasi */}
              <div className="mt-7 border-t border-[#E8EEF5] pt-5">
                <button
                  type="button"
                  onClick={() =>
                    window.alert(
                      "Ringkasan informasi ini belum terhubung ke halaman detail berita."
                    )
                  }
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#24598A] transition-colors hover:text-[#0B2C50]"
                >
                  Ringkasan informasi
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Catatan bawah */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#DCE6F0] bg-white/70 p-4 sm:items-center sm:p-5">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#24598A] sm:mt-0">
            <CalendarDays size={18} />
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Informasi ditampilkan untuk membantu pengguna mengikuti
            perkembangan pengelolaan proses bisnis dan dokumentasi operasional.
          </p>
        </div>
      </div>
    </section>
  );
}