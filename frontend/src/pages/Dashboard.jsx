import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { YearChart, UnitChart, DonutChart } from "../components/StatCharts.jsx";

const GREETING = {
  admin_ortala: "Pantau SOP yang masuk dan keputusan approval hari ini.",
  perwakilan_unit: "Lihat status SOP unit Anda dan unggah dokumen baru.",
  user_biasa: "Cari dan unduh SOP yang berlaku.",
};

function Count({ label, value, tone = "text-primary" }) {
  return (
    <div className="panel p-4">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${tone}`}>{value ?? "–"}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [q, setQ] = useState("");
  const isAdmin = user.role === "admin_ortala";
  const isUnit = user.role === "perwakilan_unit";

  useEffect(() => {
    api.get("/stats/summary").then((r) => setStats(r.data));
    api.get("/sop", { params: { limit: 6 } }).then((r) => setRecent(r.data.data));
  }, []);

  const n = (status) => stats?.byStatus.find((s) => s.status === status)?.total ?? 0;
  const approved = n("approved");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero: foto kantor (dummy) + sapaan sesuai role */}
      <section className="relative overflow-hidden rounded-2xl">
        <img src="/img/kantor.jpg" alt="" className="h-44 w-full object-cover sm:h-52" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/20" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 text-white sm:p-8">
          <h1 className="text-2xl font-bold sm:text-3xl">Halo, {user.name.split(" ")[0]}</h1>
          <p className="mt-1 max-w-md text-blue-100">{GREETING[user.role]}</p>
        </div>
      </section>

      {/* Pencarian cepat (semua role) */}
      <form action="/sop" className="flex gap-2">
        <input name="q" value={q} onChange={(e) => setQ(e.target.value)} className="input" placeholder="Cari nomor atau nama SOP" aria-label="Cari SOP" />
        <button className="btn-primary">Cari</button>
      </form>

      {/* Ringkasan angka sesuai role */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Count label="SOP disetujui" value={approved} />
        {(isAdmin || isUnit) && <Count label="Menunggu approval" value={n("pending")} tone="text-amber-600" />}
        {(isAdmin || isUnit) && <Count label="Ditolak" value={n("rejected")} tone="text-red-600" />}
        {user.role === "user_biasa" && <Count label="SOP berlaku" value={stats?.byBerlaku.find((b) => b.status === "Berlaku")?.total} />}
        {isAdmin && <Count label="Total unit kerja" value={stats?.byUnit.length} />}
        {isUnit && <Count label="Total diunggah" value={stats?.byStatus.reduce((a, b) => a + b.total, 0)} />}
      </section>

      {isAdmin && n("pending") > 0 && (
        <Link to="/approval" className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 hover:bg-amber-100">
          <span><strong>{n("pending")} SOP</strong> menunggu keputusan Anda.</span>
          <span className="font-semibold">Buka antrian</span>
        </Link>
      )}

      {/* Chart interaktif (Recharts) */}
      {stats && (
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="panel p-4 lg:col-span-2">
            <h2 className="mb-2 font-semibold text-primary">SOP disetujui per tahun terbit</h2>
            {stats.byYear.length ? <YearChart data={stats.byYear} /> : <p className="py-10 text-center text-sm text-ink-soft">Belum ada data.</p>}
          </div>
          <div className="panel p-4">
            <h2 className="mb-2 font-semibold text-primary">Status approval</h2>
            {stats.byStatus.length ? <DonutChart data={stats.byStatus} /> : <p className="py-10 text-center text-sm text-ink-soft">Belum ada data.</p>}
          </div>
          {isAdmin && (
            <div className="panel p-4 lg:col-span-3">
              <h2 className="mb-2 font-semibold text-primary">SOP per unit kerja</h2>
              <UnitChart data={stats.byUnit} />
            </div>
          )}
        </section>
      )}

      {/* SOP terbaru */}
      <section className="panel">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-semibold text-primary">SOP terbaru</h2>
          <Link to="/sop" className="text-sm font-medium text-accent hover:underline">Lihat semua</Link>
        </div>
        <ul className="divide-y divide-line">
          {recent.length === 0 && <li className="px-4 py-8 text-center text-sm text-ink-soft">Belum ada SOP.</li>}
          {recent.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{s.nama_sop}</p>
                <p className="text-sm text-ink-soft">{s.nomor_sop} · {s.nama_unit || s.nama_lembaga}</p>
              </div>
              <StatusBadge status={s.approval_status} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
