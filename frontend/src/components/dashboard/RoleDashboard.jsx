
import {
  ArrowRight,
  Bell,
  FileCheck2,
  FileClock,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const icons = {
  dashboard: LayoutDashboard,
  documents: FileText,
  pending: FileClock,
  approved: FileCheck2,
  users: Users,
  shield: ShieldCheck,
  plus: Plus,
};

export default function RoleDashboard({
  role,
  subtitle,
  stats = [],
  menu = [],
  activities = [],
  children,
}) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-5 transition-transform lg:translate-x-0 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/lg_bptn.png"
              alt="Logo BAPETEN"
              className="h-11 w-11 object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div>
              <p className="font-bold text-slate-900">SIMPB</p>
              <p className="text-xs text-slate-500">BAPETEN</p>
            </div>
          </a>
          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(false)}
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu utama
        </p>

        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = icons[item.icon] || FileText;

            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <ArrowRight size={15} className="ml-auto opacity-50" />
              </a>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl bg-slate-100 p-4">
          <ShieldCheck className="mb-2 text-slate-600" size={22} />
          <p className="text-sm font-semibold">Informasi akses</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Menu yang tersedia disesuaikan dengan peran pengguna.
          </p>
        </div>

        <a
          href="/"
          className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 hover:bg-slate-100"
        >
          <LogOut size={18} />
          Kembali ke beranda
        </a>
      </aside>

      {mobileMenu && (
        <button
          aria-label="Tutup navigasi"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(true)}
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500">Sistem Informasi Proses Bisnis</p>
            <p className="truncate font-semibold text-slate-900">{role}</p>
          </div>

          <label className="hidden max-w-xs flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 md:flex">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari di halaman ini..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <button
            className="rounded-xl border border-slate-200 p-2 text-slate-600"
            aria-label="Notifikasi"
            title="Notifikasi"
          >
            <Bell size={19} />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
            {role.slice(0, 1)}
          </div>
        </header>

        <div className="p-5 md:p-8">
          <div className="mb-7">
            <p className="mb-2 text-sm font-medium text-slate-500">
              Dashboard / {role}
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Selamat datang
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {subtitle}
            </p>
          </div>

          {stats.length > 0 && (
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = icons[stat.icon] || FileText;

                return (
                  <article
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <span className="rounded-xl bg-slate-100 p-2">
                        <Icon size={19} className="text-slate-600" />
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    {stat.note && (
                      <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {children}

          {activities.length > 0 && (
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Aktivitas terbaru
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Ringkasan aktivitas pada data contoh.
              </p>

              <div className="mt-5 divide-y divide-slate-100">
                {activities.map((activity, index) => (
                  <div
                    key={`${activity.title}-${index}`}
                    className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <span className="rounded-xl bg-slate-100 p-2">
                        <FileText size={18} className="text-slate-600" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
