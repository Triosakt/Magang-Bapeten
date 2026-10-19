import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { errMsg, openPdf } from "../api/client.js";
import StatusBadge from "../components/StatusBadge.jsx";

function Units({ list }) {
  if (!list?.length) return null;
  return <p className="mt-1 flex flex-wrap gap-1">{list.map((u) => <span key={u} className="rounded bg-surface-muted px-1.5 py-0.5 text-xs text-ink-soft">{u}</span>)}</p>;
}

function SopRow({ s }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 py-1.5 text-sm">
      <span className="min-w-0"><span className="font-medium">{s.nomor_sop}</span> · {s.nama_sop}</span>
      <StatusBadge status={s.status_berlaku} />
    </li>
  );
}

export default function ProsesDetail() {
  const { id } = useParams();
  const [d, setD] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState({}); // sub proses yang dibuka

  useEffect(() => {
    setD(null);
    api.get(`/proses/peta/${id}`).then((r) => setD(r.data)).catch((e) => setError(errMsg(e)));
  }, [id]);

  const pdf = async (type, itemId) => {
    setError("");
    try { await openPdf(`/proses/${type}/${itemId}/file`); } catch (e) { setError(errMsg(e)); }
  };
  const PdfBtn = ({ type, id: itemId, has }) =>
    has ? <button className="btn-ghost" onClick={() => pdf(type, itemId)}>Buka PDF</button> : <span className="text-xs text-ink-soft">PDF belum ada</span>;

  if (error && !d) return <div className="mx-auto max-w-3xl space-y-3"><p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p><Link to="/proses" className="btn-ghost">Kembali</Link></div>;
  if (!d) return <p className="py-10 text-center text-ink-soft">Memuat…</p>;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Link to="/proses" className="text-sm font-medium text-accent hover:underline">Semua peta proses</Link>

      <header className="panel p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-accent">{d.nomor_peta_proses} · {d.nama_keterangan} · {d.tahun_terbit}</p>
            <h1 className="mt-0.5 text-2xl font-bold text-primary">{d.judul}</h1>
            <Units list={d.units} />
          </div>
          <PdfBtn type="peta" id={d.id} has={d.has_file} />
        </div>
      </header>
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

      <section className="space-y-3">
        <h2 className="font-semibold text-primary">Sub proses ({d.sub_proses.length})</h2>
        {d.sub_proses.length === 0 && <p className="panel py-8 text-center text-sm text-ink-soft">Peta proses ini belum punya sub proses.</p>}
        {d.sub_proses.map((sp) => {
          const isOpen = !!open[sp.id];
          return (
            <article key={sp.id} className="panel">
              <div className="flex flex-wrap items-start justify-between gap-3 p-4">
                <button className="min-w-0 flex-1 text-left" aria-expanded={isOpen} onClick={() => setOpen({ ...open, [sp.id]: !isOpen })}>
                  <p className="text-sm font-semibold text-accent">{sp.nomor_sub_proses}</p>
                  <p className="font-medium">{sp.nama_sub_proses}</p>
                  <p className="mt-1 text-sm text-ink-soft">{sp.cfm.length} CFM · {sp.cfm.reduce((a, c) => a + c.sop.length, sp.sop.length)} SOP · {isOpen ? "Sembunyikan" : "Lihat rincian"}</p>
                </button>
                <PdfBtn type="sub" id={sp.id} has={sp.has_file} />
              </div>

              {isOpen && (
                <div className="space-y-4 border-t border-line p-4">
                  <Units list={sp.units} />
                  {sp.sop.length > 0 && (
                    <div><h3 className="text-sm font-semibold">SOP sub proses</h3><ul className="divide-y divide-line">{sp.sop.map((s) => <SopRow key={s.id} s={s} />)}</ul></div>
                  )}
                  {sp.cfm.length === 0 && sp.sop.length === 0 && <p className="text-sm text-ink-soft">Belum ada CFM atau SOP untuk sub proses ini.</p>}
                  {sp.cfm.map((c) => (
                    <div key={c.id} className="rounded-lg bg-surface p-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0"><p className="text-sm font-semibold text-primary">{c.nomor_cfm}</p><p className="text-sm">{c.nama_cfm}</p><Units list={c.units} /></div>
                        <PdfBtn type="cfm" id={c.id} has={c.has_file} />
                      </div>
                      {c.sop.length > 0 && <ul className="mt-2 divide-y divide-line border-t border-line">{c.sop.map((s) => <SopRow key={s.id} s={s} />)}</ul>}
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>

      {d.sop_tanpa_sub.length > 0 && (
        <section className="panel p-4">
          <h2 className="font-semibold text-primary">SOP langsung di peta proses</h2>
          <ul className="mt-1 divide-y divide-line">{d.sop_tanpa_sub.map((s) => <SopRow key={s.id} s={s} />)}</ul>
        </section>
      )}
    </div>
  );
}
