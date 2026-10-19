import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { errMsg } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

const INITIAL = { jenis_sop: "unit_kerja", unit_kerja_id: "", lembaga_id: "", nomor_sop: "", nama_sop: "",
  tahun_terbit: new Date().getFullYear(), peta_proses_id: "", catatan: "" };

export default function UploadSop() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin_ortala";
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [file, setFile] = useState(null);
  const [units, setUnits] = useState([]);
  const [lembaga, setLembaga] = useState([]);
  const [peta, setPeta] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get("/unit-kerja").then((r) => setUnits(r.data));
    api.get("/lembaga").then((r) => setLembaga(r.data));
    api.get("/peta-proses").then((r) => setPeta(r.data));
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const myUnit = units.find((u) => u.id === user.unit_kerja_id);

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== "application/pdf") { setError("File harus berformat PDF."); e.target.value = ""; return; }
    if (f.size > 20 * 1024 * 1024) { setError("Ukuran file maksimal 20 MB."); e.target.value = ""; return; }
    setError(""); setFile(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Pilih file PDF SOP terlebih dahulu.");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v !== "" && fd.append(k, v));
    fd.append("file", file);
    setBusy(true); setError("");
    try {
      const { data } = await api.post("/sop", fd);
      navigate("/sop", { state: { flash: data.approval_status } });
    } catch (err) { setError(errMsg(err)); }
    finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-primary">Upload SOP</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {isAdmin ? "SOP yang Anda unggah langsung berstatus disetujui."
                 : "SOP akan dikirim ke Admin Ortala untuk disetujui sebelum tampil bagi pengguna lain."}
      </p>

      <form onSubmit={submit} className="panel mt-5 space-y-4 p-5">
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

        {isAdmin ? (
          <fieldset>
            <legend className="label">Jenis SOP</legend>
            <div className="flex gap-4 text-sm">
              {[["unit_kerja", "SOP Unit Kerja"], ["lembaga", "SOP Lembaga"]].map(([v, l]) => (
                <label key={v} className="flex items-center gap-2"><input type="radio" name="jenis" checked={form.jenis_sop === v} onChange={() => setForm({ ...form, jenis_sop: v })} />{l}</label>
              ))}
            </div>
            {form.jenis_sop === "unit_kerja" ? (
              <select required className="input mt-3" value={form.unit_kerja_id} onChange={set("unit_kerja_id")} aria-label="Unit kerja">
                <option value="">Pilih unit kerja</option>{units.map((u) => <option key={u.id} value={u.id}>{u.nama_unit}</option>)}
              </select>
            ) : (
              <select required className="input mt-3" value={form.lembaga_id} onChange={set("lembaga_id")} aria-label="Lembaga">
                <option value="">Pilih lembaga</option>{lembaga.map((l) => <option key={l.id} value={l.id}>{l.nama_lembaga}</option>)}
              </select>
            )}
          </fieldset>
        ) : (
          <div><span className="label">Unit kerja</span><p className="rounded-lg bg-surface-muted px-3 py-2 text-sm">{myUnit?.nama_unit || "Memuat…"}</p></div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2"><label className="label" htmlFor="nomor">Nomor SOP</label>
            <input id="nomor" required className="input" placeholder="contoh: 01 TAHUN 2026" value={form.nomor_sop} onChange={set("nomor_sop")} /></div>
          <div><label className="label" htmlFor="tahun">Tahun terbit</label>
            <input id="tahun" required type="number" min="1990" max="2100" className="input" value={form.tahun_terbit} onChange={set("tahun_terbit")} /></div>
        </div>
        <div><label className="label" htmlFor="nama">Nama SOP</label>
          <input id="nama" required className="input" value={form.nama_sop} onChange={set("nama_sop")} /></div>
        <div><label className="label" htmlFor="peta">Peta proses (opsional)</label>
          <select id="peta" className="input" value={form.peta_proses_id} onChange={set("peta_proses_id")}>
            <option value="">Tidak dikaitkan</option>{peta.map((p) => <option key={p.id} value={p.id}>{p.nomor_peta_proses} – {p.judul}</option>)}
          </select></div>
        <div><label className="label" htmlFor="file">File SOP (PDF, maks. 20 MB)</label>
          <input id="file" type="file" accept="application/pdf" onChange={pickFile}
            className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:font-semibold file:text-primary hover:file:bg-blue-200" />
          {file && <p className="mt-1 text-xs text-ink-soft">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</p>}</div>
        <div><label className="label" htmlFor="catatan">Catatan untuk Admin (opsional)</label>
          <textarea id="catatan" rows="3" className="input" value={form.catatan} onChange={set("catatan")} /></div>

        <div className="flex justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>Batal</button>
          <button className="btn-primary" disabled={busy}>{busy ? "Mengunggah…" : isAdmin ? "Simpan SOP" : "Kirim untuk approval"}</button>
        </div>
      </form>
    </div>
  );
}
