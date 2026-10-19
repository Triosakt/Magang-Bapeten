import { useEffect, useState } from "react";
import api, { errMsg } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { YearChart, UnitChart, DonutChart, STATUS_LABEL } from "../components/StatCharts.jsx";

function Table({ title, rows, keyName, labelHeader }) {
  return (
    <div className="panel overflow-hidden">
      <h3 className="border-b border-line px-4 py-2.5 font-semibold text-primary">{title}</h3>
      <table className="w-full text-sm">
        <thead className="bg-surface-muted text-left text-ink-soft"><tr><th className="px-4 py-2 font-medium">{labelHeader}</th><th className="px-4 py-2 text-right font-medium">Jumlah</th></tr></thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => <tr key={r[keyName]}><td className="px-4 py-2">{STATUS_LABEL[r[keyName]] || r[keyName]}</td><td className="px-4 py-2 text-right font-medium">{r.total}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default function StatistikPrint() {
  const { user } = useAuth();
  const [s, setS] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/stats/summary").then((r) => setS(r.data)).catch((e) => setError(errMsg(e))); }, []);

  if (error) return <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>;
  if (!s) return <p className="py-10 text-center text-ink-soft">Memuat statistik…</p>;

  const total = s.byStatus.reduce((a, b) => a + b.total, 0);
  const tgl = new Date(s.generated_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });

  return (
    <div className="print-wrap mx-auto max-w-5xl space-y-5">
      <div className="no-print flex flex-wrap items-center justify-between gap-2">
        <div><h1 className="text-2xl font-bold text-primary">Statistik & cetak</h1>
          <p className="mt-1 text-sm text-ink-soft">Tombol cetak menghasilkan laporan A4. Pilih “Simpan sebagai PDF” di dialog cetak untuk membuat file PDF.</p></div>
        <button className="btn-primary" onClick={() => window.print()}>Cetak / simpan PDF</button>
      </div>

      {/* Kop laporan (hanya tampil saat dicetak) */}
      <header className="print-only border-b-2 border-primary pb-3">
        <div className="flex items-center gap-4">
          <img src="/img/logo.png" alt="" className="h-16 w-16" />
          <div>
            <p className="text-xl font-bold text-primary">Laporan Statistik SOP</p>
            <p className="text-sm">Badan Pengawas Tenaga Nuklir (BAPETEN) · Biro Organisasi dan Umum</p>
            <p className="text-xs text-ink-soft">Dicetak {tgl} oleh {user.name}{user.role === "perwakilan_unit" ? " (cakupan unit sendiri)" : ""}</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total SOP", total], ["Disetujui", s.byStatus.find((x) => x.status === "approved")?.total ?? 0],
          ["Menunggu", s.byStatus.find((x) => x.status === "pending")?.total ?? 0], ["Ditolak", s.byStatus.find((x) => x.status === "rejected")?.total ?? 0]]
          .map(([l, v]) => <div key={l} className="panel p-4"><p className="text-sm text-ink-soft">{l}</p><p className="mt-1 text-2xl font-bold text-primary">{v}</p></div>)}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="panel p-4"><h3 className="mb-2 font-semibold text-primary">SOP disetujui per tahun</h3><YearChart data={s.byYear} height={230} /></div>
        <div className="panel p-4"><h3 className="mb-2 font-semibold text-primary">Status berlaku</h3><DonutChart data={s.byBerlaku} height={230} /></div>
      </section>

      <div className="panel p-4"><h3 className="mb-2 font-semibold text-primary">SOP per unit kerja</h3><UnitChart data={s.byUnit} height={Math.max(220, s.byUnit.length * 28)} /></div>

      <section className="grid gap-4 md:grid-cols-2">
        <Table title="Per jenis SOP" rows={s.byJenis} keyName="jenis" labelHeader="Jenis" />
        <Table title="Per tahun terbit" rows={s.byYear} keyName="tahun" labelHeader="Tahun" />
        <Table title="Per unit kerja" rows={s.byUnit} keyName="unit" labelHeader="Unit" />
        <div className="panel overflow-hidden">
          <h3 className="border-b border-line px-4 py-2.5 font-semibold text-primary">SOP paling sering diunduh</h3>
          <ol className="divide-y divide-line text-sm">
            {s.topDownload.map((d) => <li key={d.id} className="flex justify-between gap-3 px-4 py-2"><span className="min-w-0 truncate">{d.nama_sop}</span><span className="font-medium">{d.download_count}x</span></li>)}
          </ol>
        </div>
      </section>
    </div>
  );
}
