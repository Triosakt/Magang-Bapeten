
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Building2,
  FileText,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    title: "Peta Proses",
    description: "Alur proses bisnis",
    query: "Peta Proses",
    icon: GitBranch,
  },
  {
    title: "SOP Lembaga",
    description: "Standar tingkat lembaga",
    query: "SOP Lembaga",
    icon: FileText,
  },
  {
    title: "SOP Unit Kerja",
    description: "Standar setiap unit",
    query: "SOP Unit Kerja",
    icon: Building2,
  },
  {
    title: "Pedoman",
    description: "Acuan pelaksanaan",
    query: "Pedoman",
    icon: BookOpen,
  },
];

export default function HeroSection({ onSearch }) {
  function scrollToCatalog(query = "") {
    if (typeof onSearch === "function") {
      onSearch(query);
    }

    document.getElementById("katalog")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section
      id="beranda"
      className="relative scroll-mt-20 overflow-hidden bg-[#F5F7FA]"
    >
      {/* Aksen dekoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#DCEAF7]/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/80 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        {/* Hero utama */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Kolom kiri */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E4F0] bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#24598A] shadow-sm sm:text-sm">
              <ShieldCheck size={16} />
              Portal Informasi Resmi
            </div>

            <h1 className="mt-8 max-w-2xl text-3xl font-semibold leading-[1.4] tracking-[-0.035em] text-[#173754] sm:mt-9 sm:text-4xl sm:leading-[1.35] lg:mt-10 lg:text-[3.25rem] lg:leading-[1.35]">
              Proses bisnis dalam satu{" "}
              <span className="text-[#28679A]">
                ekosistem informasi.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 sm:mt-7 sm:text-base sm:leading-8">
              Akses peta proses, pedoman, serta standar operasional
              prosedur lembaga dan unit kerja BAPETEN melalui satu
              katalog dokumen yang terstruktur.
            </p>

            {/* Tombol aksi */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-9">
              <button
                type="button"
                onClick={() => scrollToCatalog()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#174C78] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#103A5E] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Jelajahi katalog
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => scrollToCatalog("SOP")}
                className="inline-flex items-center gap-2 rounded-lg px-2 py-3 text-sm font-semibold text-[#24598A] transition hover:text-[#103A5E] focus:outline-none focus:ring-2 focus:ring-[#8BB8DF]"
              >
                Lihat dokumen SOP
                <ArrowDown size={16} />
              </button>
            </div>

            {/* Identitas institusi */}
            <div className="mt-10 flex items-start gap-4 border-t border-[#DCE4EC] pt-6 sm:mt-12 sm:pt-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DCE4EC] bg-white text-[#28679A]">
                <ShieldCheck size={20} strokeWidth={1.8} />
              </div>

              <div className="pt-0.5">
                <p className="text-sm font-semibold tracking-wide text-[#173754]">
                  SIMPB BAPETEN
                </p>

                <p className="mt-1.5 max-w-sm text-xs leading-6 text-slate-500 sm:text-sm">
                  Sistem Informasi Manajemen Proses Bisnis
                </p>
              </div>
            </div>
          </div>

          {/* Kolom kanan: foto */}
          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
            {/* Aksen geometris */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-[#C9DCEC] sm:-bottom-5 sm:-left-5 sm:h-32 sm:w-32"
            />

            <div className="absolute -right-2 -top-2 z-0 h-16 w-16 rounded-2xl bg-[#D9E8F5] sm:-right-4 sm:-top-4 sm:h-20 sm:w-20" />

            <div className="relative z-10 overflow-hidden rounded-2xl border border-white bg-[#E4ECF4] shadow-xl shadow-[#173754]/10">
              <img
                src="/bg_web_bapeten.jpeg"
                alt="Lingkungan dan fasilitas BAPETEN"
                className="h-[260px] w-full object-cover object-top sm:h-[340px] lg:h-[420px]"
              />

              {/* Overlay gambar */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B2C50]/50 via-transparent to-[#0B2C50]/5"
              />

              {/* Label gambar */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-[#0B2C50]/75 px-4 py-2.5 text-xs font-medium tracking-wide text-white backdrop-blur-md">
                  <ShieldCheck size={16} />
                  BAPETEN
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pintasan kategori */}
        <div className="mt-14 border-t border-[#DCE4EC] pt-8 sm:mt-20 sm:pt-10 lg:mt-24">
          <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#28679A]">
                <span className="h-px w-6 bg-[#3D8BC9]" />
                Akses cepat
              </p>

              <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[#173754] sm:text-2xl">
                Jelajahi berdasarkan jenis dokumen
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
                Pilih kategori untuk menemukan dokumen yang kamu butuhkan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollToCatalog()}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg px-1 py-2 text-sm font-semibold text-[#24598A] transition hover:text-[#103A5E] focus:outline-none focus:ring-2 focus:ring-[#8BB8DF]"
            >
              Semua dokumen
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => scrollToCatalog(category.query)}
                  className="group flex min-h-[92px] items-center gap-3 rounded-xl border border-[#DCE4EC] bg-white p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#A8C7E2] hover:shadow-lg hover:shadow-[#173754]/5 focus:outline-none focus:ring-2 focus:ring-[#8BB8DF] focus:ring-offset-2 sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF4FA] text-[#28679A] transition-colors duration-200 group-hover:bg-[#174C78] group-hover:text-white">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-5 text-[#173754]">
                      {category.title}
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-slate-500">
                      {category.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="shrink-0 text-slate-400 transition duration-200 group-hover:translate-x-0.5 group-hover:text-[#24598A]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
