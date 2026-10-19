import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotifBell from "../components/NotifBell.jsx";

const UNIT = "perwakilan_unit", ADMIN = "admin_ortala", USER = "user_biasa";
const ROLE_LABEL = { [UNIT]: "Perwakilan Unit Kerja", [ADMIN]: "Admin Ortala", [USER]: "Pengguna" };

// Menu sidebar difilter per role
const NAV = [
  { to: "/", label: "Dashboard", roles: [UNIT, ADMIN, USER], end: true },
  { to: "/sop", label: "Daftar SOP", roles: [UNIT, ADMIN, USER] },
  { to: "/proses", label: "Peta proses", roles: [UNIT, ADMIN, USER] },
  { to: "/sop/upload", label: "Upload SOP", roles: [UNIT, ADMIN] },
  { to: "/approval", label: "Approval SOP", roles: [ADMIN] },
  { to: "/statistik", label: "Statistik & cetak", roles: [UNIT, ADMIN] },
  { to: "/organisasi", label: "Unit kerja & lembaga", roles: [ADMIN] },
  { to: "/users", label: "Manajemen user", roles: [ADMIN] },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { toast, setToast } = useNotifications();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = NAV.filter((n) => n.roles.includes(user.role)).map((n) => (
    <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white/15 text-white" : "text-blue-100 hover:bg-white/10"}`}>
      {n.label}
    </NavLink>
  ));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Sidebar (drawer di mobile) */}
      <aside className={`no-print fixed inset-y-0 left-0 z-40 w-64 transform bg-primary p-4 transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center gap-3 px-1">
          <img src="/img/logo.png" alt="" className="h-10 w-10 rounded-full bg-white p-0.5" />
          <div className="leading-tight text-white">
            <p className="text-sm font-bold">SOP Ortala</p>
            <p className="text-xs text-blue-200">BAPETEN</p>
          </div>
        </div>
        <nav className="space-y-1">{links}</nav>
      </aside>
      {open && <div className="no-print fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="min-w-0">
        <header className="no-print sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white/90 px-4 py-2.5 backdrop-blur">
          <button className="rounded-lg p-2 hover:bg-surface-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Buka menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <NotifBell />
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-ink-soft">{ROLE_LABEL[user.role]}</p>
            </div>
            <button className="btn-ghost" onClick={() => { logout(); navigate("/login"); }}>Keluar</button>
          </div>
        </header>

        <main className="p-4 sm:p-6"><Outlet /></main>
      </div>

      {/* Toast real-time */}
      {toast && (
        <div role="status" className="no-print fixed bottom-4 right-4 z-50 w-80 max-w-[90vw] rounded-xl border border-line border-l-4 border-l-accent bg-white p-4 shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div><p className="text-sm font-semibold">{toast.title}</p><p className="mt-0.5 text-sm text-ink-soft">{toast.message}</p></div>
            <button onClick={() => setToast(null)} className="text-ink-soft hover:text-ink" aria-label="Tutup">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
