
import { ArrowRight, Search, FileText } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B2C50] py-16 sm:py-20">
      {/* Dekorasi latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#3D8BC9]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Konten utama */}
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
              <Search size={15} className="text-blue-200" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Akses Informasi
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Dokumen yang tepat,
              <span className="block text-[#8CC8F5]">
                lebih mudah ditemukan.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100/80 sm:text-base">
              Gunakan katalog untuk mencari referensi berdasarkan nama,
              kategori, unit kerja, dan status dokumen.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#123D68] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Jelajahi katalog
                <ArrowRight size={18} />
              </a>

              <a
                href="#beranda"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                <FileText size={17} />
                Tentang SIMPB
              </a>
            </div>
          </div>

          {/* Panel pendukung */}
          <div className="hidden w-full max-w-xs lg:block">
            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#8CC8F5]">
                <FileText size={25} />
              </div>

              <p className="mt-5 text-lg font-bold text-white">
                SIMPB BAPETEN
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-100/75">
                Satu portal untuk mengakses informasi proses bisnis dan
                dokumentasi operasional secara terstruktur.
              </p>

              <div className="mt-5 h-px bg-white/15" />

              <p className="mt-4 text-xs font-medium tracking-wide text-blue-200">
                INFORMASI · DOKUMENTASI · PROSES BISNIS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
