
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardList,
  Files,
  GitBranch,
  House,
  Images,
  Menu,
  Megaphone,
  Network,
  Newspaper,
  Search,
  Workflow,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Beranda",
    href: "/",
    icon: House,
    type: "link",
  },
  {
    label: "Tentang Kami",
    href: null,
    icon: Building2,
    type: "dropdown",
    children: [
      {
        label: "Tentang Proses Bisnis",
        description: "Pengenalan sistem & tujuan",
        href: "/tentang/proses-bisnis",
        icon: BookOpen,
      },
      {
        label: "Tugas Ortala",
        description: "Tugas & fungsi organisasi",
        href: "/tentang/tugas-ortala",
        icon: Building2,
      },
    ],
  },
  {
    label: "Dokumen Proses Bisnis",
    href: null,
    icon: Files,
    type: "dropdown",
    children: [
      {
        label: "Peta Proses",
        description: "Struktur utama proses bisnis",
        href: "/dokumen/peta-proses",
        icon: GitBranch,
      },
      {
        label: "Sub Proses",
        description: "Rincian setiap sub proses",
        href: "/dokumen/sub-proses",
        icon: Workflow,
      },
      {
        label: "Cross Functional Map (CFM)",
        description: "Alur antar unit / fungsi",
        href: "/dokumen/cfm",
        icon: Network,
      },
      {
        label: "SOP",
        description: "Standar Operasional Prosedur",
        href: "/dokumen/sop",
        icon: ClipboardList,
      },
    ],
  },
  {
    label: "Informasi",
    href: null,
    icon: Newspaper,
    type: "dropdown",
    children: [
      {
        label: "Pengumuman",
        description: "Informasi resmi terbaru",
        href: "/informasi/pengumuman",
        icon: Megaphone,
      },
      {
        label: "Berita",
        description: "Berita & kegiatan terkini",
        href: "/informasi/berita",
        icon: Newspaper,
      },
      {
        label: "Galeri",
        description: "Dokumentasi foto & video",
        href: "/informasi/galeri",
        icon: Images,
      },
      {
        label: "Statistik",
        description: "Data & statistik dokumen",
        href: "/informasi/statistik",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];

function isActivePath(pathname, href) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isGroupActive(item, pathname) {
  return item.children?.some((child) =>
    isActivePath(pathname, child.href)
  ) ?? false;
}

function getPathname() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function MenuItem({
  item,
  pathname,
  mobile = false,
  onNavigate,
  openGroup,
  setOpenGroup,
}) {
  const Icon = item.icon;
  const active =
    isActivePath(pathname, item.href) ||
    isGroupActive(item, pathname);

  const expanded = openGroup === item.label;

  if (item.type === "link") {
    return (
      <a
        href={item.href}
        onClick={onNavigate}
        aria-current={pathname === item.href ? "page" : undefined}
        className={[
          "group relative flex items-center gap-2.5 rounded-lg",
          "px-3 py-3 text-sm font-semibold transition-colors",
          mobile ? "w-full" : "",
          active
            ? "bg-blue-50 text-blue-900"
            : "text-slate-600 hover:bg-slate-50 hover:text-blue-900",
        ].join(" ")}
      >
        <Icon size={18} aria-hidden="true" />
        <span>{item.label}</span>

        {!mobile && active && (
          <span
            className="absolute inset-x-3 -bottom-3 h-0.5 rounded-full bg-blue-900"
            aria-hidden="true"
          />
        )}
      </a>
    );
  }

  return (
    <div className={mobile ? "w-full" : "relative"}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-haspopup="true"
        onClick={() =>
          setOpenGroup(expanded ? null : item.label)
        }
        className={[
          "flex items-center justify-between gap-2 rounded-lg",
          "px-3 py-3 text-sm font-semibold transition-colors",
          mobile ? "w-full" : "",
          active || expanded
            ? "bg-blue-50 text-blue-900"
            : "text-slate-600 hover:bg-slate-50 hover:text-blue-900",
        ].join(" ")}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon size={18} aria-hidden="true" />
          <span>{item.label}</span>
        </span>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div
          className={[
            "z-50 mt-2 rounded-xl border border-slate-200",
            "bg-white p-2 shadow-xl shadow-slate-900/5",
            mobile
              ? "ml-3"
              : "absolute right-0 top-full mt-3 w-[340px]",
          ].join(" ")}
        >
          {item.children.map((child) => {
            const ChildIcon = child.icon;
            const childActive = isActivePath(
              pathname,
              child.href
            );

            return (
              <a
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                aria-current={childActive ? "page" : undefined}
                className={[
                  "group flex items-start gap-3 rounded-lg p-3",
                  "transition-colors",
                  childActive
                    ? "bg-blue-50"
                    : "hover:bg-slate-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center",
                    "rounded-lg transition-colors",
                    childActive
                      ? "bg-blue-900 text-white"
                      : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-900",
                  ].join(" ")}
                >
                  <ChildIcon size={19} aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={[
                      "block text-sm font-semibold",
                      childActive
                        ? "text-blue-900"
                        : "text-slate-800",
                    ].join(" ")}
                  >
                    {child.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                    {child.description}
                  </span>
                </span>

                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-blue-900"
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pathname, setPathname] = useState(getPathname);

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function updatePath() {
      setPathname(getPathname());
      setMobileOpen(false);
      setOpenGroup(null);
      setSearchOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenGroup(null);
        setSearchOpen(false);
      }
    }

    function handleOutsideClick(event) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    }

    window.addEventListener("popstate", updatePath);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      window.removeEventListener("popstate", updatePath);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  function closeMenus() {
    setMobileOpen(false);
    setOpenGroup(null);
  }

  function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      searchInputRef.current?.focus();
      return;
    }

    closeMenus();
    setSearchOpen(false);

    // Sesuaikan jika katalog menggunakan route pencarian tersendiri.
    const target = document.getElementById("katalog");

    if (pathname === "/" && target) {
      const url = new URL(window.location.href);
      url.searchParams.set("q", query);
      window.history.replaceState({}, "", url);
      window.dispatchEvent(
        new CustomEvent("simpb-search", {
          detail: { query },
        })
      );
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    window.location.href = `/?q=${encodeURIComponent(query)}#katalog`;
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm"
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <a
          href="/"
          onClick={closeMenus}
          className="flex min-w-0 shrink-0 items-center gap-3 rounded-lg"
          aria-label="SIMPB BAPETEN - Beranda"
        >
          <img
            src="/lg_bptn.png"
            alt="Logo BAPETEN"
            width="48"
            height="48"
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
          />

          <span className="border-l-2 border-slate-200 pl-3">
            <span className="block text-lg font-extrabold leading-tight tracking-tight text-slate-900">
              SIMPB
            </span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-[10px] sm:tracking-[0.16em]">
              BAPETEN
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <MenuItem
              key={item.label}
              item={item}
              pathname={pathname}
              openGroup={openGroup}
              setOpenGroup={setOpenGroup}
              onNavigate={closeMenus}
            />
          ))}
        </div>

        {/* Search button */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            type="button"
            aria-label={searchOpen ? "Tutup pencarian" : "Cari dokumen"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setOpenGroup(null);
            }}
            className={[
              "flex h-10 w-10 items-center justify-center rounded-lg",
              "border border-slate-200 transition-colors",
              searchOpen
                ? "bg-blue-50 text-blue-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-900",
            ].join(" ")}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label={searchOpen ? "Tutup pencarian" : "Cari dokumen"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileOpen(false);
              setOpenGroup(null);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen((open) => !open);
              setSearchOpen(false);
              setOpenGroup(null);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Search panel */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearch}
            role="search"
            className="mx-auto flex max-w-3xl gap-2"
          >
            <label htmlFor="simpb-navbar-search" className="sr-only">
              Cari dokumen proses bisnis
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-blue-800 focus-within:ring-2 focus-within:ring-blue-100">
              <Search
                size={18}
                aria-hidden="true"
                className="shrink-0 text-slate-400"
              />
              <input
                ref={searchInputRef}
                id="simpb-navbar-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari judul, nomor, atau jenis dokumen..."
                className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-950"
            >
              Cari
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-3 shadow-lg lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-1">
            {navigation.map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                pathname={pathname}
                mobile
                openGroup={openGroup}
                setOpenGroup={setOpenGroup}
                onNavigate={closeMenus}
              />
            ))}
          </div>

          <p className="mx-auto mt-3 max-w-7xl border-t border-slate-100 px-3 pt-3 text-xs leading-relaxed text-slate-500">
            Sistem Informasi Manajemen Proses Bisnis BAPETEN
          </p>
        </div>
      )}
    </header>
  );
}
