
import {
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Landmark,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const navigationLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Peta Proses", href: "#akses-cepat" },
  { label: "Katalog Dokumen", href: "#katalog" },
  { label: "Pengumuman", href: "#pengumuman" },
];

const informationLinks = [
  { label: "Panduan Penggunaan", href: "#informasi" },
  { label: "Bantuan Pengguna", href: "#informasi" },
  {
    label: "Situs Resmi BAPETEN",
    href: "https://bapeten.go.id/",
    external: true,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="informasi"
      className="relative overflow-hidden bg-[#061A35] text-white"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full border border-sky-300/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Footer main */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a
              href="#beranda"
              className="group inline-flex items-center gap-3"
              aria-label="SIMPB BAPETEN - Kembali ke beranda"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-1.5 shadow-lg shadow-black/10 transition duration-300 group-hover:-translate-y-0.5">
                <img
                  src="/lg_bptn.png"
                  alt="Logo BAPETEN"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <strong className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                  SIMPB <span className="text-cyan-300">BAPETEN</span>
                </strong>

                <span className="mt-1 max-w-[260px] text-[10px] leading-4 text-slate-400 sm:text-xs">
                  Sistem Informasi Manajemen Proses Bisnis
                </span>
              </div>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
              Platform informasi proses bisnis untuk mendukung akses dokumen
              yang terstruktur, transparan, dan mudah ditelusuri dalam
              lingkungan kerja BAPETEN.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] px-3.5 py-2.5">
              <ShieldCheck
                size={17}
                className="shrink-0 text-emerald-300"
              />

              <span className="text-xs font-medium text-slate-200">
                Informasi proses bisnis dalam satu platform
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="sm:grid sm:grid-cols-2 sm:gap-8 lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="text-sm font-bold tracking-wide text-white">
                Navigasi
              </h3>

              <div className="mt-5 flex flex-col gap-3.5">
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition duration-200 hover:text-cyan-300"
                  >
                    <ChevronRight
                      size={14}
                      className="text-slate-600 transition duration-200 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                    />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-bold tracking-wide text-white">
                Informasi
              </h3>

              <div className="mt-5 flex flex-col gap-3.5">
                {informationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition duration-200 hover:text-cyan-300"
                  >
                    {link.label}

                    {link.external ? (
                      <ExternalLink
                        size={14}
                        className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    ) : (
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 opacity-0 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer call to action */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-sm font-bold text-white sm:text-base">
              Butuh dokumen proses bisnis?
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm">
              Telusuri katalog untuk menemukan informasi yang dibutuhkan.
            </p>
          </div>

          <a
            href="#katalog"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-300/30"
          >
            Buka Katalog
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <p className="text-xs leading-5 text-slate-400">
            © {currentYear} SIMPB BAPETEN. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Landmark size={14} className="shrink-0" />
            <span>Konsep redesign untuk evaluasi internal</span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#07559A] via-cyan-400 to-sky-500" />
    </footer>
  );
}
