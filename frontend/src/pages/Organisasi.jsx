import { useCallback, useEffect, useState } from "react";
import api, { errMsg } from "../api/client.js";
import Modal from "../components/Modal.jsx";

// Unit Kerja dan Lembaga adalah dua entitas terpisah: tab, endpoint, dan form masing-masing.
export default function Organisasi() {
  const [tab, setTab] = useState("unit");
  const [units, setUnits] = useState([]);
  const [lembaga, setLembaga] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null); // { type: 'unit'|'lembaga', ...data }
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api.get("/unit-kerja", { params: { all: 1 } }).then((r) => setUnits(r.data)).catch((e) => setError(errMsg(e)));
    api.get("/lembaga").then((r) => setLembaga(r.data)).catch((e) => setError(errMsg(e)));
  }, []);
  useEffect(load, [load]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isUnit = form?.type === "unit";

  const save = async (e) => {
    e.preventDefault();
    setBusy(true); setFormError("");
    try {
      const path = isUnit ? "/unit-kerja" : "/lembaga";
      const body = isUnit
        ? { nama_unit: form.nama_unit, singkatan: form.singkatan || null, lembaga_id: form.lembaga_id ? Number(form.lembaga_id) : null }
        : { kode: form.kode, nama_lembaga: form.nama_lembaga, deskripsi: form.deskripsi || null };
      form.id ? await api.patch(`${path}/${form.id}`, body) : await api.post(path, body);
      setForm(null); load();
    } catch (err) { setFormError(errMsg(err)); }
    finally { setBusy(false); }
  };

  const toggleUnit = async (u) => {
    try { await api.patch(`/unit-kerja/${u.id}`, { is_active: u.is_active ? 0 : 1 }); load(); }
    catch (e) { setError(errMsg(e)); }
  };

  const tabCls = (t) => `border-b-2 px-4 py-2 text-sm font-semibold ${tab === t ? "border-accent text-primary" : "border-transparent text-ink-soft hover:text-ink"}`;

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-primary">Unit kerja & lembaga</h1>
        <button className="btn-primary" onClick={() => { setFormError(""); setForm(tab === "unit" ? { type: "unit", nama_unit: "", singkatan: "", lembaga_id: lembaga[0]?.id || "" } : { type: "lembaga", kode: "", nama_lembaga: "", deskripsi: "" }); }}>
          {tab === "unit" ? "Tambah unit kerja" : "Tambah lembaga"}
        </button>
      </div>

      <div className="flex border-b border-line" role="tablist">
        <button role="tab" aria-selected={tab === "unit"} className={tabCls("unit")} onClick={() => setTab("unit")}>Unit kerja ({units.length})</button>
        <button role="tab" aria-selected={tab === "lembaga"} className={tabCls("lembaga")} onClick={() => setTab("lembaga")}>Lembaga ({lembaga.length})</button>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

      <div className="panel overflow-x-auto">
        {tab === "unit" ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-muted text-ink-soft"><tr><th className="px-4 py-3 font-medium">Unit kerja</th><th className="px-4 py-3 font-medium">Di bawah lembaga</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3" /></tr></thead>
            <tbody className="divide-y divide-line">
              {units.length === 0 && <tr><td colSpan="4" className="px-4 py-10 text-center text-ink-soft">Belum ada unit kerja.</td></tr>}
              {units.map((u) => (
                <tr key={u.id} className={u.is_active ? "" : "bg-surface text-ink-soft"}>
                  <td className="px-4 py-3 font-medium">{u.nama_unit}{u.singkatan && <span className="ml-2 text-xs font-normal text-ink-soft">{u.singkatan}</span>}</td>
                  <td className="px-4 py-3">{u.nama_lembaga || "–"}</td>
                  <td className="px-4 py-3">{u.is_active ? "Aktif" : "Nonaktif"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button className="btn-ghost mr-2" onClick={() => { setFormError(""); setForm({ type: "unit", ...u, lembaga_id: u.lembaga_id || "" }); }}>Ubah</button>
                    <button className="btn-ghost" onClick={() => toggleUnit(u)}>{u.is_active ? "Nonaktifkan" : "Aktifkan"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-muted text-ink-soft"><tr><th className="px-4 py-3 font-medium">Kode</th><th className="px-4 py-3 font-medium">Nama lembaga</th><th className="px-4 py-3 font-medium">Deskripsi</th><th className="px-4 py-3" /></tr></thead>
            <tbody className="divide-y divide-line">
              {lembaga.length === 0 && <tr><td colSpan="4" className="px-4 py-10 text-center text-ink-soft">Belum ada lembaga.</td></tr>}
              {lembaga.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-3 font-medium">{l.kode}</td><td className="px-4 py-3">{l.nama_lembaga}</td><td className="px-4 py-3 text-ink-soft">{l.deskripsi || "–"}</td>
                  <td className="px-4 py-3 text-right"><button className="btn-ghost" onClick={() => { setFormError(""); setForm({ type: "lembaga", ...l, deskripsi: l.deskripsi || "" }); }}>Ubah</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {form && (
        <Modal title={`${form.id ? "Ubah" : "Tambah"} ${isUnit ? "unit kerja" : "lembaga"}`} onClose={() => setForm(null)}>
          <form onSubmit={save} className="space-y-3">
            {formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{formError}</p>}
            {isUnit ? (<>
              <div><label className="label" htmlFor="o-nama">Nama unit kerja</label><input id="o-nama" required className="input" value={form.nama_unit} onChange={set("nama_unit")} /></div>
              <div><label className="label" htmlFor="o-sing">Singkatan (opsional)</label><input id="o-sing" className="input" value={form.singkatan || ""} onChange={set("singkatan")} /></div>
              <div><label className="label" htmlFor="o-lem">Di bawah lembaga</label>
                <select id="o-lem" className="input" value={form.lembaga_id} onChange={set("lembaga_id")}>
                  <option value="">Tidak ada</option>{lembaga.map((l) => <option key={l.id} value={l.id}>{l.nama_lembaga}</option>)}</select></div>
            </>) : (<>
              <div><label className="label" htmlFor="o-kode">Kode</label><input id="o-kode" required className="input" value={form.kode} onChange={set("kode")} /></div>
              <div><label className="label" htmlFor="o-nl">Nama lembaga</label><input id="o-nl" required className="input" value={form.nama_lembaga} onChange={set("nama_lembaga")} /></div>
              <div><label className="label" htmlFor="o-desc">Deskripsi (opsional)</label><textarea id="o-desc" rows="3" className="input" value={form.deskripsi} onChange={set("deskripsi")} /></div>
            </>)}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-ghost" onClick={() => setForm(null)}>Batal</button>
              <button className="btn-primary" disabled={busy}>{busy ? "Menyimpan…" : "Simpan"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
