
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Peta Proses", href: "#akses-cepat" },
  { label: "Katalog Dokumen", href: "#katalog" },
  { label: "Pengumuman", href: "#pengumuman" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#beranda");

  useEffect(() => {
    function handleScroll() {
      const sections = navItems
        .map((item) => ({
          href: item.href,
          element: document.querySelector(item.href),
        }))
        .filter((item) => item.element);

      let currentSection = "#beranda";

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= 140) {
          currentSection = section.href;
        }
      }

      setActiveSection(currentSection);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        {/* Brand dan logo BAPETEN */}
        <a
          href="#beranda"
          onClick={closeMenu}
          className="group flex min-w-0 shrink-0 items-center gap-3"
          aria-label="SIMPB BAPETEN - Beranda"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center">
            <img
              src="/lg_bptn.png"
              alt="Logo BAPETEN"
              className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <strong className="text-sm font-extrabold tracking-tight text-[#082B5C] sm:text-base">
              SIMPB <span className="text-sky-600">BAPETEN</span>
            </strong>

            <span className="mt-0.5 hidden max-w-[240px] text-[10px] leading-4 text-slate-500 sm:block sm:text-[11px]">
              Sistem Informasi Manajemen Proses Bisnis
            </span>
          </div>
        </a>

        {/* Navigasi desktop */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigasi utama"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative whitespace-nowrap rounded-lg px-3 py-2.5 text-[13px] font-semibold transition duration-200 xl:px-4 ${
                  isActive
                    ? "bg-blue-50 text-[#07559A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#07559A]"
                }`}
              >
                {item.label}

                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-sky-500" />
                )}
              </a>
            );
          })}

          <a
            href="#informasi"
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#07559A] xl:px-4"
          >
            Informasi
            <ChevronDown size={15} />
          </a>
        </nav>

        {/* Tombol pencarian desktop */}
        <a
          href="#katalog"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-[#07559A] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#06457F] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-200 sm:inline-flex"
        >
          <Search size={17} />
          <span>Cari Dokumen</span>
          <ArrowUpRight size={15} className="ml-0.5 text-blue-200" />
        </a>

        {/* Tombol menu mobile */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#082B5C] transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus:ring-4 focus:ring-sky-100 sm:ml-auto lg:hidden"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navigasi mobile */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "visible max-h-[500px] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8"
          aria-label="Navigasi mobile"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-[#07559A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#07559A]"
                }`}
              >
                {item.label}

                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                )}
              </a>
            );
          })}

          <a
            href="#informasi"
            onClick={closeMenu}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#07559A]"
          >
            Informasi
            <ChevronDown size={16} />
          </a>

          <a
            href="#katalog"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#07559A] px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#06457F]"
          >
            <Search size={17} />
            Cari Dokumen
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
