
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  FileCheck2,
  Info,
  Megaphone,
  ShieldCheck,
  Layers3,
  Search,
  X,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import QuickAccess from "../components/home/QuickAccess";
import DocumentSection from "../components/home/DocumentSection";

const announcements = [
  {
    category: "Penggunaan",
    title: "Panduan penelusuran dokumen proses bisnis",
    description:
      "Gunakan kata kunci atau telusuri kategori untuk menemukan dokumen proses bisnis yang sesuai dengan kebutuhan.",
    icon: Search,
    label: "Panduan pengguna",
  },
  {
    category: "Administrasi",
    title: "Perhatikan versi dokumen sebelum digunakan",
    description:
      "Pastikan dokumen yang dijadikan acuan sesuai dengan versi dan ketentuan yang berlaku.",
    icon: FileCheck2,
    label: "Informasi dokumen",
  },
];

const overviewItems = [
  {
    label: "Kategori dokumen",
    value: "4 kategori",
    description: "Peta Proses, Sub Proses, CFM, dan SOP.",
    icon: Layers3,
  },
  {
    label: "Akses informasi",
    value: "Satu platform",
    description: "Pencarian dan penelusuran dokumen terpusat.",
    icon: ShieldCheck,
  },
  {
    label: "Pusat informasi",
    value: "Terstruktur",
    description: "Kategori dokumen dan panduan pengguna.",
    icon: Bell,
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [announcementNotice, setAnnouncementNotice] = useState(true);

  function handleSearch(value) {
    const query = typeof value === "string" ? value : search;

    setSearch(query);

    document.getElementById("katalog")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleAnnouncementSearch() {
    handleSearch("");
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />

        {/* Quick access */}
        <QuickAccess />

        {/* Overview */}
        <section
          id="ringkasan"
          className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2">
                  <Info size={15} className="text-sky-700" />
                  <span className="text-[11px] font-bold tracking-[0.14em] text-[#07559A] sm:text-xs">
                    INFORMASI SIMPB
                  </span>
                </div>

                <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#082B5C] sm:text-4xl lg:text-[42px]">
                  Informasi yang tertata,
                  <span className="block text-[#0875C9]">
                    akses yang lebih mudah.
                  </span>
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:justify-self-end">
                SIMPB dirancang untuk membantu pengguna menemukan dan
                memahami informasi proses bisnis melalui navigasi yang
                terstruktur dan pengalaman penelusuran yang lebih praktis.
              </p>
            </div>

            {/* Overview cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
              {overviewItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-blue-900/[0.06] sm:p-7"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-sky-50/80 transition-colors group-hover:bg-sky-100/80" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#07559A] transition duration-300 group-hover:bg-[#07559A] group-hover:text-white">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      <span className="font-mono text-xs font-semibold tracking-widest text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-6 text-sm font-medium text-slate-500">
                      {item.label}
                    </p>

                    <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#082B5C] sm:text-2xl">
                      {item.value}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/70 px-4 py-4 sm:items-center sm:px-5">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-amber-700 sm:mt-0"
              />

              <p className="text-xs leading-6 text-amber-900/80 sm:text-sm">
                <span className="font-bold">Catatan:</span> Ringkasan di atas
                merupakan informasi ilustratif untuk konsep antarmuka,
                bukan statistik operasional atau data resmi terkini.
              </p>
            </div>
          </div>
        </section>

        {/* Document catalog */}
        <div id="katalog" className="scroll-mt-24">
          <DocumentSection search={search} setSearch={setSearch} />
        </div>

        {/* Announcements */}
        <section
          id="pengumuman"
          className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            {/* Heading */}
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 shadow-sm">
                  <Megaphone size={15} className="text-sky-700" />

                  <span className="text-[11px] font-bold tracking-[0.14em] text-[#07559A] sm:text-xs">
                    PUSAT INFORMASI
                  </span>
                </div>

                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#082B5C] sm:text-4xl lg:text-[42px]">
                  Informasi dan
                  <span className="block text-[#0875C9]">
                    panduan pengguna.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Temukan panduan dan informasi pendukung untuk membantu
                  proses penelusuran dokumen berjalan lebih mudah.
                </p>
              </div>

              <a
                href="#katalog"
                onClick={handleAnnouncementSearch}
                className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-[#07559A] shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:shadow-md"
              >
                Jelajahi dokumen
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* Demo notice */}
            {announcementNotice && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50/80 p-4 sm:items-center sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#07559A] shadow-sm">
                  <Info size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-[#082B5C]">
                    Informasi untuk pengguna
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-slate-600 sm:text-sm">
                    Konten berikut merupakan contoh untuk keperluan
                    pengembangan. Hubungkan ke sumber data SIMPB untuk
                    menampilkan pengumuman resmi.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Tutup pemberitahuan"
                  onClick={() => setAnnouncementNotice(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Announcement cards */}
            <div className="grid gap-5 lg:grid-cols-2">
              {announcements.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-blue-900/[0.06] sm:p-7 lg:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#07559A] transition duration-300 group-hover:bg-[#07559A] group-hover:text-white">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                        <CalendarDays size={13} />
                        {item.label}
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700">
                        {item.category}
                      </span>

                      <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-[#082B5C] transition-colors group-hover:text-[#0875C9] sm:text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <a
                        href="#katalog"
                        onClick={handleAnnouncementSearch}
                        className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#07559A] transition hover:text-sky-600"
                      >
                        {index === 0 ? "Mulai pencarian" : "Lihat katalog"}

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/link:translate-x-1"
                        />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
