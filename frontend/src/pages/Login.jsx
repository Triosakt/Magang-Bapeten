import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { errMsg } from "../api/client.js";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try { await login(form.email, form.password); navigate(from, { replace: true }); }
    catch (err) { setError(errMsg(err)); }
    finally { setBusy(false); }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden lg:block">
        <img src="/img/kantor.jpg" alt="Gedung kantor BAPETEN" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <h2 className="max-w-md text-3xl font-bold leading-tight">Satu tempat untuk seluruh SOP BAPETEN.</h2>
          <p className="mt-3 max-w-md text-blue-100">Unggah, setujui, dan telusuri dokumen SOP unit kerja dan lembaga dengan alur yang jelas.</p>
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm">
          <img src="/img/logo.png" alt="Logo BAPETEN" className="mb-6 h-16 w-16" />
          <h1 className="text-2xl font-bold text-primary">Masuk ke Portal SOP</h1>
          <p className="mt-1 text-sm text-ink-soft">Gunakan akun yang diberikan oleh Admin Ortala.</p>

          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

          <label className="label mt-6" htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="username" className="input"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <label className="label mt-4" htmlFor="password">Password</label>
          <input id="password" type="password" required autoComplete="current-password" className="input"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="btn-primary mt-6 w-full" disabled={busy}>{busy ? "Memproses…" : "Masuk"}</button>
        </form>
      </section>
    </div>
  );
}
