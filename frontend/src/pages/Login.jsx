
import { useState } from "react";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { errMsg } from "../api/client.js";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "pengguna", label: "Pengguna" },
  { value: "kepala_unit_kerja", label: "Kepala Unit" },
];

function Icon({ name, className = "h-5 w-5" }) {
  const icons = {
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 21v-4h6v4M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a14 14 0 0 1-3 3.7M6.2 6.3C3.5 8.2 2 12 2 12s3.5 6 10 6a10 10 0 0 0 3.2-.6" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [role, setRole] = useState("admin");
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const activeRole =
    roles.find((item) => item.value === role) || roles[0];

  if (user) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    setBusy(true);

    try {
      // Tetap gunakan autentikasi dari AuthContext.
      await login(form.email.trim(), form.password);

      // Login berhasil; AuthContext tetap menjadi pengelola sesi.
      navigate(from, { replace: true });
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-cover bg-center bg-no-repeat px-3 py-5 sm:px-6 sm:py-7"
      style={{ backgroundImage: "url('/assets/bg.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/20" />

      <div className="relative z-10 mx-auto w-full max-w-[1000px]">
        <section className="grid min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/15 md:grid-cols-2">

          {/* Panel informasi BAPETEN */}
          <aside className="relative flex min-w-0 flex-col justify-center overflow-hidden bg-gradient-to-r from-[#102a56] via-[#17417d] to-[#2563a6] px-6 py-8 text-white sm:px-8 sm:py-9 lg:px-9">

            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full border-[26px] border-white/[0.09]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full border-[30px] border-white/[0.08]" />

            <img
              src="/assets/gedung.jpeg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full w-full object-cover object-center opacity-50"
            />

            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#102a56]/95 via-[#17417d]/75 to-[#102a56]/95" />

            {/* Ornamen gelombang */}
            <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#60a5fa]/10 blur-3xl" />

              <svg
                className="absolute inset-x-0 top-0 h-36 w-full"
                viewBox="0 0 600 150"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 0 H600 V45 C490 95 420 15 300 48 S100 100 0 55 Z"
                  fill="#60a5fa"
                  fillOpacity="0.09"
                />
                <path
                  d="M0 55 C130 100 200 28 320 48 S490 90 600 35"
                  stroke="white"
                  strokeOpacity="0.16"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Sistem Informasi
              </p>

              <h1 className="text-2xl font-bold leading-tight sm:text-[28px]">
                Selamat Datang di
                <span className="mt-1 block">SIMPB BAPETEN</span>
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/90">
                Sistem Informasi Manajemen Proses Bisnis Badan
                Pengawas Tenaga Nuklir untuk mendukung pengelolaan
                proses bisnis yang terstruktur dan terintegrasi.
              </p>

              <div className="my-5 flex justify-center md:justify-start">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-2.5 shadow-lg sm:h-36 sm:w-36">
                  <img
                    src="/assets/Logo%20bapeten.png"
                    alt="Logo BAPETEN"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Terstruktur", "Terintegrasi", "Akuntabel"].map(
                  (text) => (
                    <span
                      key={text}
                      className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] font-medium"
                    >
                      {text}
                    </span>
                  )
                )}
              </div>

              <address className="mt-4 max-w-md text-[10px] leading-relaxed text-white/80 not-italic">
                Jl. Gajah Mada No. 8, Petojo Utara, Gambir,
                Jakarta Pusat
                <br />
                Daerah Khusus Ibukota Jakarta 11120
              </address>
            </div>
          </aside>

          {/* Panel form login */}
          <section className="flex min-w-0 items-center justify-center px-5 py-7 sm:px-8 sm:py-9 lg:px-9">
            <div className="w-full max-w-[350px]">
              <div className="mb-5">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563a6]">
                  Akses Sistem
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-[#17417d] sm:text-[28px]">
                  Masuk sebagai {activeRole.label}
                </h2>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  Masukkan akun Anda untuk melanjutkan.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                {/* Pilihan role hanya untuk validasi setelah login */}
                <fieldset>
                  <legend className="mb-2 text-xs font-semibold text-slate-700 sm:text-sm">
                    Jenis pengguna
                  </legend>

                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((item) => {
                      const active = role === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setRole(item.value);
                            setError("");
                          }}
                          className={`relative flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-1 py-2 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563a6] ${
                            active
                              ? "border-[#17417d] bg-[#17417d]/10 text-[#17417d] ring-1 ring-[#17417d]/20"
                              : "border-slate-200 bg-white text-slate-500 hover:border-[#2563a6]/60 hover:bg-slate-50"
                          }`}
                        >
                          <Icon
                            name={
                              item.value === "admin"
                                ? "shield"
                                : item.value === "pengguna"
                                  ? "user"
                                  : "building"
                            }
                            className="h-5 w-5"
                          />

                          <span className="text-[10px] font-semibold leading-tight sm:text-[11px]">
                            {item.label}
                          </span>

                          {active && (
                            <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#397f9f] text-white">
                              <Icon name="check" className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                  >
                    Email
                  </label>

                  <div className="flex min-w-0 items-center rounded-lg border border-slate-200 bg-slate-50 transition focus-within:border-[#608fa2] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#608fa2]/15">
                    <span className="pl-3 text-slate-400">
                      <Icon name="mail" className="h-[17px] w-[17px]" />
                    </span>

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="username"
                      placeholder="Masukkan alamat email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      className="w-full min-w-0 bg-transparent px-2.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                  >
                    Password
                  </label>

                  <div className="flex min-w-0 items-center rounded-lg border border-slate-200 bg-slate-50 transition focus-within:border-[#608fa2] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#608fa2]/15">
                    <span className="pl-3 text-slate-400">
                      <Icon name="lock" className="h-[17px] w-[17px]" />
                    </span>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Masukkan password"
                      value={form.password}
                      onChange={(event) =>
                        setForm({ ...form, password: event.target.value })
                      }
                      className="w-full min-w-0 bg-transparent px-2.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="mr-1 rounded-md p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#608fa2]"
                    >
                      <Icon
                        name={showPassword ? "eyeOff" : "eye"}
                        className="h-[17px] w-[17px]"
                      />
                    </button>
                  </div>
                </div>

                {/* Ingat saya dan lupa password */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) =>
                        setRemember(event.target.checked)
                      }
                      className="h-4 w-4 rounded accent-[#397f9f]"
                    />
                    Ingat saya
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#2563a6] transition hover:text-[#102a56] hover:underline"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#17417d] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102a56] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563a6]/30"
                >
                  {busy ? "Memproses login..." : "Masuk"}

                  {!busy && (
                    <Icon
                      name="arrow"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

              <div className="mt-4 border-t border-slate-100 pt-3">
                <div className="flex items-start gap-2">
                  <Icon
                    name="shield"
                    className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                  />
                  <p className="text-[10px] leading-4 text-slate-500">
                    Gunakan akun resmi sesuai kewenangan Anda di dalam sistem.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>

        <footer className="mt-3 text-center text-[10px] text-slate-600">
          © {new Date().getFullYear()} BAPETEN · SIMPB
        </footer>
      </div>
    </main>
  );
}
