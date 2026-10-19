import { useCallback, useEffect, useState } from "react";
import api, { downloadSop, errMsg } from "../api/client.js";
import { useNotifications } from "../context/NotificationContext.jsx";

export default function Approval() {
  const { unread } = useNotifications();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejecting, setRejecting] = useState(null); // sop yang sedang ditolak
  const [reason, setReason] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get("/sop", { params: { approval_status: "pending", limit: 100 } })
      .then((r) => setRows(r.data.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, []);
  useEffect(load, [load]);
  useEffect(() => { if (unread) load(); }, [unread, load]); // antrian ikut ter-update saat ada notifikasi baru

  const decide = async (sop, decision, catatan) => {
    setBusyId(sop.id); setError("");
    try {
      await api.post(`/sop/${sop.id}/${decision}`, { catatan });
      setRows((r) => r.filter((x) => x.id !== sop.id));
      setRejecting(null); setReason("");
    } catch (e) { setError(errMsg(e)); }
    finally { setBusyId(null); }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">Approval SOP</h1>
        <p className="mt-1 text-sm text-ink-soft">{rows.length} SOP menunggu keputusan. Buka PDF untuk memeriksa sebelum menyetujui.</p>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

      {loading && <p className="py-10 text-center text-ink-soft">Memuat antrian…</p>}
      {!loading && rows.length === 0 && (
        <div className="panel py-14 text-center"><p className="font-semibold">Antrian kosong</p><p className="mt-1 text-sm text-ink-soft">Semua SOP sudah diputuskan. SOP baru akan muncul di sini secara otomatis.</p></div>
      )}

      <ul className="space-y-3">
        {rows.map((s) => (
          <li key={s.id} className="panel p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold">{s.nama_sop}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{s.nomor_sop} · Tahun {s.tahun_terbit}</p>
                <p className="mt-1 text-sm">{s.nama_unit || s.nama_lembaga} · diunggah oleh {s.uploaded_by_name}, {new Date(s.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="btn-ghost" onClick={() => downloadSop(s).catch((e) => setError(errMsg(e)))}>Buka PDF</button>
                <button className="btn-ghost text-red-700" onClick={() => setRejecting(s)} disabled={busyId === s.id}>Tolak</button>
                <button className="btn-primary" onClick={() => decide(s, "approve")} disabled={busyId === s.id}>Setujui</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {rejecting && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" role="dialog" aria-modal="true" aria-labelledby="rj-title">
          <div className="panel w-full max-w-md p-5 shadow-xl">
            <h2 id="rj-title" className="text-lg font-bold">Tolak “{rejecting.nama_sop}”</h2>
            <p className="mt-1 text-sm text-ink-soft">Alasan ini akan dikirim ke pengunggah.</p>
            <textarea autoFocus rows="4" className="input mt-3" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Contoh: nomor SOP tidak sesuai dokumen" />
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn-ghost" onClick={() => { setRejecting(null); setReason(""); }}>Batal</button>
              <button className="btn-danger" disabled={!reason.trim() || busyId === rejecting.id} onClick={() => decide(rejecting, "reject", reason.trim())}>Tolak SOP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
