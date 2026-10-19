import { useCallback, useEffect, useState } from "react";
import api, { errMsg } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import Modal from "../components/Modal.jsx";

const ROLES = [["perwakilan_unit", "Perwakilan Unit Kerja"], ["admin_ortala", "Admin Ortala"], ["user_biasa", "Pengguna biasa"]];
const roleLabel = (r) => ROLES.find(([v]) => v === r)?.[1] || r;
const EMPTY = { name: "", email: "", password: "", role: "user_biasa", unit_kerja_id: "", is_active: 1 };

export default function Users() {
  const { user: me } = useAuth();
  const [rows, setRows] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null); // null = modal tertutup
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    api.get("/users").then((r) => setRows(r.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); api.get("/unit-kerja").then((r) => setUnits(r.data)); }, [load]);

  const editing = form?.id != null;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setBusy(true); setFormError("");
    try {
      if (form.role === "perwakilan_unit" && !form.unit_kerja_id) throw { response: { data: { message: "Pilih unit kerja untuk perwakilan unit." } } };
      if (editing) {
        await api.patch(`/users/${form.id}`, {
          name: form.name, role: form.role, is_active: Number(form.is_active),
          unit_kerja_id: form.role === "perwakilan_unit" ? Number(form.unit_kerja_id) : null,
          ...(form.password ? { password: form.password } : {}),
        });
      } else {
        await api.post("/users", { ...form, unit_kerja_id: form.role === "perwakilan_unit" ? Number(form.unit_kerja_id) : null });
      }
      setForm(null); load();
    } catch (err) { setFormError(errMsg(err)); }
    finally { setBusy(false); }
  };

  const toggle = async (u) => {
    setError("");
    try { await api.patch(`/users/${u.id}`, { is_active: u.is_active ? 0 : 1 }); load(); }
    catch (e) { setError(errMsg(e)); }
  };

  const shown = rows.filter((u) => `${u.name} ${u.email} ${u.nama_unit || ""}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div><h1 className="text-2xl font-bold text-primary">Manajemen user</h1>
          <p className="mt-1 text-sm text-ink-soft">Akun perwakilan unit hanya bisa mengunggah SOP untuk unit kerjanya.</p></div>
        <button className="btn-primary" onClick={() => { setForm(EMPTY); setFormError(""); }}>Tambah user</button>
      </div>

      <input className="input max-w-sm" placeholder="Cari nama, email, atau unit" aria-label="Cari user" value={q} onChange={(e) => setQ(e.target.value)} />
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

      <div className="panel overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted text-ink-soft">
            <tr><th className="px-4 py-3 font-medium">Nama</th><th className="px-4 py-3 font-medium">Role</th><th className="px-4 py-3 font-medium">Unit kerja</th>
              <th className="px-4 py-3 font-medium">Login terakhir</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading && <tr><td colSpan="6" className="px-4 py-10 text-center text-ink-soft">Memuat data…</td></tr>}
            {!loading && shown.length === 0 && <tr><td colSpan="6" className="px-4 py-10 text-center text-ink-soft">Tidak ada user yang cocok.</td></tr>}
            {shown.map((u) => (
              <tr key={u.id} className={u.is_active ? "" : "bg-surface text-ink-soft"}>
                <td className="px-4 py-3"><p className="font-medium">{u.name}</p><p className="text-xs text-ink-soft">{u.email}</p></td>
                <td className="px-4 py-3">{roleLabel(u.role)}</td>
                <td className="px-4 py-3">{u.nama_unit || "–"}</td>
                <td className="px-4 py-3">{u.last_login_at ? new Date(u.last_login_at).toLocaleDateString("id-ID", { dateStyle: "medium" }) : "Belum pernah"}</td>
                <td className="px-4 py-3">{u.is_active ? "Aktif" : "Nonaktif"}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button className="btn-ghost mr-2" onClick={() => { setForm({ ...u, password: "", unit_kerja_id: u.unit_kerja_id || "" }); setFormError(""); }}>Ubah</button>
                  {u.id !== me.id && <button className="btn-ghost" onClick={() => toggle(u)}>{u.is_active ? "Nonaktifkan" : "Aktifkan"}</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <Modal title={editing ? "Ubah user" : "Tambah user"} onClose={() => setForm(null)}>
          <form onSubmit={save} className="space-y-3">
            {formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{formError}</p>}
            <div><label className="label" htmlFor="u-name">Nama</label><input id="u-name" required className="input" value={form.name} onChange={set("name")} /></div>
            <div><label className="label" htmlFor="u-email">Email</label>
              <input id="u-email" type="email" required disabled={editing} className="input disabled:bg-surface-muted" value={form.email} onChange={set("email")} /></div>
            <div><label className="label" htmlFor="u-pw">{editing ? "Password baru (kosongkan jika tidak diubah)" : "Password (min. 8 karakter)"}</label>
              <input id="u-pw" type="password" minLength={8} required={!editing} autoComplete="new-password" className="input" value={form.password} onChange={set("password")} /></div>
            <div><label className="label" htmlFor="u-role">Role</label>
              <select id="u-role" className="input" value={form.role} disabled={editing && form.id === me.id} onChange={set("role")}>
                {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
            {form.role === "perwakilan_unit" && (
              <div><label className="label" htmlFor="u-unit">Unit kerja</label>
                <select id="u-unit" required className="input" value={form.unit_kerja_id} onChange={set("unit_kerja_id")}>
                  <option value="">Pilih unit kerja</option>{units.map((u) => <option key={u.id} value={u.id}>{u.nama_unit}</option>)}</select></div>
            )}
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
