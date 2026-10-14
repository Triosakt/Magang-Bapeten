
import { useState } from 'react'
import { Link } from "react-router-dom";

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'pengguna', label: 'Pengguna' },
  { value: 'kepala-unit-kerja', label: 'Kepala Unit' },
]

function Icon({ name, className = 'h-5 w-5' }) {
  const icons = {
    logIn: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
      </>
    ),
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
  }

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
  )
}

export default function Login() {
  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  const activeRole = roles.find((item) => item.value === role) || roles[0]

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Email dan password wajib diisi.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Masukkan alamat email yang valid.')
      return
    }

    // TODO: Integrasikan dengan API autentikasi backend SIMPB.
    // Backend wajib memverifikasi identitas, role, dan hak akses.
    setError('Login belum terhubung ke server.')
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-cover bg-center bg-no-repeat px-3 py-5 sm:px-6 sm:py-7"
      style={{ backgroundImage: "url('/assets/bg.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/20" />

      <div className="relative z-10 mx-auto w-full max-w-[900px]">

        {/* Logo login dan identitas SIMPB di luar kartu */}
        <header className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
          
        </header>

        {/* Kartu utama */}
        <section className="grid min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/15 md:grid-cols-2">
          {/* Panel informasi biru */}
           <aside className="relative flex min-w-0 flex-col justify-center overflow-hidden bg-[#608fa2] px-5 py-6 text-white sm:px-7 sm:py-8 lg:px-8 lg:py-9">

    {/* Dekorasi lingkaran */}
    <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full border-[26px] border-white/[0.09]" />
    <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full border-[30px] border-white/[0.08]" />

    {/* Gambar gedung BAPETEN sebagai latar */}
    <img
      src="/assets/gedung.jpeg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[95%] w-full object-cover object-center opacity-69"
    />

    {/* Gradasi untuk menyatukan gambar dengan panel biru */}
    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#608fa2] via-[#608fa2]/75 to-[#315a70]/55" />

    {/* Konten utama */}
    <div className="relative z-10">
      <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
        Sistem Informasi
      </p>

      <h2 className="text-2xl leading-tight font-bold sm:text-[28px]">
        Selamat Datang di
        <span className="mt-1 block">SIMPB BAPETEN</span>
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-white/90">
        Sistem informasi manajemen proses bisnis Badan Pengawas
        Tenaga Nuklir untuk mendukung pengelolaan proses bisnis
        yang terstruktur dan terintegrasi.
      </p>

      {/* Logo BAPETEN */}
      <div className="my-5 flex justify-center md:justify-start">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white p-2.5 shadow-lg sm:h-40 sm:w-40 lg:h-44 lg:w-44">
          <img
            src="/assets/Logo%20bapeten.png"
            alt="Logo BAPETEN"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Nilai sistem */}
      <div className="flex flex-wrap gap-2">
        {['Terstruktur', 'Terintegrasi', 'Akuntabel'].map((text) => (
          <span
            key={text}
            className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] font-medium sm:text-xs"
          >
            {text}
          </span>
        ))}
      </div>

      {/* Alamat BAPETEN */}
      <address className="mt-4 max-w-md text-[9px] leading-[1.6] text-white/80 not-italic sm:text-[10px]">
        Jl. Gajah Mada No. 8, RT. 1/RW. 2, Petojo Utara, Gambir,
        Jakarta Pusat
        <br />
        Daerah Khusus Ibukota Jakarta 11120
      </address>
    </div>
  </aside>

          {/* Panel form putih tanpa logo tambahan */}
          <section className="flex min-w-0 items-center justify-center px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
            <div className="w-full max-w-[350px]">
              <div className="mb-5">
                <p className="mb-1.5 text-[10px] font-bold tracking-[0.18em] text-[#397f9f] uppercase">
                  Akses Sistem
                </p>

                {/* Judul mengikuti role yang dipilih */}
                <h2 className="text-2xl font-bold tracking-tight text-[#326f8c] sm:text-[28px]">
                  Masuk sebagai {activeRole.label}
                </h2>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  Masukkan akun Anda untuk melanjutkan.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pemilihan role */}
                <fieldset>
                  <legend className="mb-2 text-xs font-semibold text-slate-700 sm:text-sm">
                    Jenis pengguna
                  </legend>

                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((item) => {
                      const active = role === item.value

                      return (
                        <button
                          key={item.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setRole(item.value)
                            setError('')
                          }}
                          className={`relative flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-1 py-2 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#608fa2] ${
                            active
                              ? 'border-[#608fa2] bg-[#608fa2]/10 text-[#326f8c] ring-1 ring-[#608fa2]/20'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-[#608fa2]/60 hover:bg-slate-50'
                          }`}
                        >
                          <Icon
                            name={
                              item.value === 'admin'
                                ? 'shield'
                                : item.value === 'pengguna'
                                  ? 'user'
                                  : 'building'
                            }
                            className="h-5 w-5"
                          />

                          <span className="text-[10px] leading-tight font-semibold sm:text-[11px]">
                            {item.label}
                          </span>

                          {active && (
                            <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#397f9f] text-white">
                              <Icon name="check" className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </button>
                      )
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
                      autoComplete="username"
                      placeholder="Masukkan alamat email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full min-w-0 bg-transparent px-2.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? 'Sembunyikan password'
                          : 'Tampilkan password'
                      }
                      onClick={() => setShowPassword((value) => !value)}
                      className="mr-1 rounded-md p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#608fa2]"
                    >
                      <Icon
                        name={showPassword ? 'eyeOff' : 'eye'}
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
                      onChange={(event) => setRemember(event.target.checked)}
                      className="h-4 w-4 rounded accent-[#397f9f]"
                    />
                    Ingat saya
                  </label>

                  
<Link
  to="/forgot-password"
  className="text-sm font-semibold text-[#608fa2] transition hover:text-[#426b7d] hover:underline"
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

                {/* Tombol masuk */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#608fa2] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4d7f93] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#608fa2]/30"
                >
                  Masuk
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
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
  )
}
