import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api, { downloadSop, errMsg } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function SopList() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [units, setUnits] = useState([]);
  const [res, setRes] = useState({ data: [], meta: { page: 1, pages: 1, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const f = Object.fromEntries(params);
  const set = (k, v) => { const p = new URLSearchParams(params); v ? p.set(k, v) : p.delete(k); p.delete("page"); setParams(p); };

  useEffect(() => { api.get("/unit-kerja").then((r) => setUnits(r.data)); }, []);
  useEffect(() => {
    setLoading(true); setError("");
    api.get("/sop", { params: f }).then((r) => setRes(r.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, [params]); // eslint-disable-line

  // Role 1 (Perwakilan Unit) hanya bisa VIEW + upload; download hanya SOP unitnya
  const canDownload = (s) => user.role !== "perwakilan_unit" || s.unit_kerja_id === user.unit_kerja_id;
  const dl = async (s) => { try { await downloadSop(s); } catch (e) { alert(errMsg(e)); } };

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-primary">Daftar SOP</h1>
        {user.role !== "user_biasa" && <Link to="/sop/upload" className="btn-primary">Upload SOP</Link>}
      </div>

      <div className="panel grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <input className="input lg:col-span-2" placeholder="Cari nomor atau nama SOP" aria-label="Cari" defaultValue={f.q || ""}
          onKeyDown={(e) => e.key === "Enter" && set("q", e.target.value)} onBlur={(e) => e.target.value !== (f.q || "") && set("q", e.target.value)} />
        <select className="input" aria-label="Jenis SOP" value={f.jenis || ""} onChange={(e) => set("jenis", e.target.value)}>
          <option value="">Semua jenis</option><option value="unit_kerja">SOP Unit Kerja</option><option value="lembaga">SOP Lembaga</option>
        </select>
        <select className="input" aria-label="Unit kerja" value={f.unit_kerja_id || ""} onChange={(e) => set("unit_kerja_id", e.target.value)}>
          <option value="">Semua unit kerja</option>{units.map((u) => <option key={u.id} value={u.id}>{u.nama_unit}</option>)}
        </select>
        <select className="input" aria-label="Status berlaku" value={f.status_berlaku || ""} onChange={(e) => set("status_berlaku", e.target.value)}>
          <option value="">Semua status</option><option value="Berlaku">Berlaku</option><option value="Tidak_Berlaku">Tidak berlaku</option>
        </select>
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

      <div className="panel overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted text-ink-soft">
            <tr><th className="px-4 py-3 font-medium">Nomor</th><th className="px-4 py-3 font-medium">Nama SOP</th><th className="px-4 py-3 font-medium">Pemilik</th>
              <th className="px-4 py-3 font-medium">Tahun</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading && <tr><td colSpan="6" className="px-4 py-10 text-center text-ink-soft">Memuat data…</td></tr>}
            {!loading && res.data.length === 0 && <tr><td colSpan="6" className="px-4 py-10 text-center text-ink-soft">Tidak ada SOP yang cocok. Ubah kata kunci atau filter.</td></tr>}
            {res.data.map((s) => (
              <tr key={s.id} className="hover:bg-surface">
                <td className="whitespace-nowrap px-4 py-3 font-medium">{s.nomor_sop}</td>
                <td className="min-w-64 px-4 py-3">{s.nama_sop}</td>
                <td className="px-4 py-3">{s.nama_unit || s.nama_lembaga}<span className="block text-xs text-ink-soft">{s.jenis_sop === "lembaga" ? "Lembaga" : "Unit kerja"}</span></td>
                <td className="px-4 py-3">{s.tahun_terbit}</td>
                <td className="space-y-1 px-4 py-3"><StatusBadge status={s.approval_status} /><br /><StatusBadge status={s.status_berlaku} /></td>
                <td className="px-4 py-3 text-right">
                  {canDownload(s) && <button className="btn-ghost" onClick={() => dl(s)}>Unduh PDF</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-ink-soft">
        <span>{res.meta.total} SOP</span>
        <div className="flex items-center gap-2">
          <button className="btn-ghost" disabled={res.meta.page <= 1} onClick={() => setParams({ ...f, page: res.meta.page - 1 })}>Sebelumnya</button>
          <span>Halaman {res.meta.page} dari {res.meta.pages || 1}</span>
          <button className="btn-ghost" disabled={res.meta.page >= res.meta.pages} onClick={() => setParams({ ...f, page: res.meta.page + 1 })}>Berikutnya</button>
        </div>
      </div>
    </div>
  );
}
