import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { errMsg } from "../api/client.js";

export default function ProsesList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    api.get("/proses").then((r) => setRows(r.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, []);

  const shown = rows.filter((r) => `${r.nomor_peta_proses} ${r.judul}`.toLowerCase().includes(q.toLowerCase()));
  const groups = [...new Set(shown.map((r) => r.nama_keterangan))];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Peta proses bisnis</h1>
        <p className="mt-1 text-sm text-ink-soft">Pilih peta proses untuk melihat sub proses, CFM, dan SOP yang terkait.</p>
      </div>
      <input className="input max-w-sm" placeholder="Cari nomor atau judul" aria-label="Cari peta proses" value={q} onChange={(e) => setQ(e.target.value)} />
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
      {loading && <p className="py-10 text-center text-ink-soft">Memuat peta proses…</p>}
      {!loading && shown.length === 0 && <p className="py-10 text-center text-ink-soft">Tidak ada peta proses yang cocok.</p>}

      {groups.map((g) => (
        <section key={g}>
          <h2 className="mb-2 font-semibold text-primary">{g}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {shown.filter((r) => r.nama_keterangan === g).map((r) => (
              <li key={r.id}>
                <Link to={`/proses/${r.id}`} className="panel block h-full p-4 transition-colors hover:border-accent hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                  <p className="text-sm font-semibold text-accent">{r.nomor_peta_proses}</p>
                  <p className="mt-0.5 font-medium">{r.judul}</p>
                  <p className="mt-2 text-sm text-ink-soft">{r.jml_sub} sub proses · {r.jml_cfm} CFM · {r.jml_sop} SOP</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
