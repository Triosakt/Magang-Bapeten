
import { ArrowUpRight, Building2, FileText } from "lucide-react";

const navigationLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Katalog dokumen", href: "#katalog" },
  { label: "Pengumuman", href: "#pengumuman" },
  { label: "Berita dan informasi", href: "#berita" },
];

export default function Footer() {
  return (
    <footer className="bg-[#071D35] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bagian utama footer */}
        <div className="grid gap-10 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
          {/* Identitas portal */}
          <div className="max-w-lg">
            <a
              href="#beranda"
              className="group inline-flex items-center gap-3"
              aria-label="Kembali ke beranda SIMPB BAPETEN"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-blue-200 transition group-hover:bg-white/15">
                <Building2 size={25} />
              </span>

              <span>
                <span className="block text-lg font-bold tracking-tight text-white">
                  SIMPB BAPETEN
                </span>
                <span className="mt-0.5 block text-xs text-blue-200/75">
                  Sistem Informasi Manajemen Proses Bisnis
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300/80">
              Portal informasi proses bisnis dan dokumentasi operasional
              untuk mendukung akses informasi yang terstruktur, praktis,
              dan mudah ditelusuri.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
              <FileText size={15} className="text-blue-300" />
              Portal informasi proses bisnis
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-sm font-bold text-white">
              Navigasi cepat
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Temukan informasi yang Anda butuhkan.
            </p>

            <nav
              aria-label="Navigasi footer"
              className="mt-5 grid gap-1 sm:grid-cols-2"
            >
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300"
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Garis pemisah dan copyright */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SIMPB BAPETEN. Hak cipta dilindungi.</p>

          <a
            href="#beranda"
            className="w-fit transition hover:text-blue-200"
          >
            Kembali ke atas ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
