
import {
  GitBranch,
  Workflow,
  Network,
  FileCheck2,
  ArrowUpRight,
  ArrowRight,
  Layers3,
} from "lucide-react";

const items = [
  {
    title: "Peta Proses",
    description:
      "Lihat gambaran menyeluruh proses bisnis BAPETEN, mulai dari tingkat lembaga hingga proses operasional.",
    icon: GitBranch,
    code: "01",
    href: "#katalog",
    category: "Pemetaan Proses",
  },
  {
    title: "Sub Proses",
    description:
      "Telusuri rincian aktivitas, tahapan pekerjaan, dan hubungan antarproses dalam organisasi.",
    icon: Workflow,
    code: "02",
    href: "#katalog",
    category: "Rincian Aktivitas",
  },
  {
    title: "Cross Functional Map",
    description:
      "Pahami alur koordinasi, pembagian tanggung jawab, dan keterlibatan antarunit kerja.",
    icon: Network,
    code: "03",
    href: "#katalog",
    category: "Kolaborasi Unit",
  },
  {
    title: "Dokumen SOP",
    description:
      "Temukan standar operasional prosedur dan pedoman kerja sebagai acuan pelaksanaan tugas.",
    icon: FileCheck2,
    code: "04",
    href: "#katalog",
    category: "Dokumen Operasional",
  },
];

export default function QuickAccess() {
  return (
    <section
      id="akses-cepat"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      {/* Dekorasi latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 shadow-sm">
              <Layers3 size={15} className="text-sky-600" />

              <span className="text-[11px] font-bold tracking-[0.14em] text-[#07559A] sm:text-xs">
                JELAJAHI SIMPB
              </span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#082B5C] sm:text-4xl lg:text-[42px]">
              Akses informasi
              <span className="block text-[#0875C9]">
                lebih praktis.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Temukan peta proses, rincian aktivitas, dan dokumen
              operasional melalui satu pintu akses informasi proses bisnis
              BAPETEN.
            </p>
          </div>

          <a
            href="#katalog"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-[#07559A] shadow-sm transition duration-200 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            Lihat semua dokumen

            <ArrowUpRight
              size={17}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <a
                href={item.href}
                key={item.code}
                className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl hover:shadow-blue-900/[0.07] focus:outline-none focus:ring-4 focus:ring-sky-100 sm:p-7"
              >
                {/* Hover accent */}
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#07559A] to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

                {/* Card top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-100/70 text-[#07559A] transition duration-300 group-hover:border-sky-200 group-hover:from-[#07559A] group-hover:to-[#0875C9] group-hover:text-white">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <span className="font-mono text-sm font-semibold tracking-wider text-slate-300 transition-colors duration-300 group-hover:text-sky-600">
                    {item.code}
                  </span>
                </div>

                {/* Card content */}
                <div className="mt-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-sky-700">
                    {item.category}
                  </span>

                  <h3 className="mt-2 text-lg font-bold tracking-tight text-[#082B5C] transition-colors duration-200 group-hover:text-[#0875C9] sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>

                {/* Card footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
                  <span className="text-xs font-bold text-slate-600 transition-colors group-hover:text-[#07559A] sm:text-sm">
                    Jelajahi kategori
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-200 group-hover:bg-[#07559A] group-hover:text-white">
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Supporting information */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#07559A]">
              <FileCheck2 size={20} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#082B5C]">
                Informasi proses bisnis dalam satu platform
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Gunakan katalog dokumen untuk menelusuri informasi lebih
                lanjut berdasarkan kategori dan kebutuhan.
              </p>
            </div>
          </div>

          <a
            href="#katalog"
            className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-bold text-[#07559A] transition hover:text-sky-600 sm:self-center"
          >
            Buka katalog
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
