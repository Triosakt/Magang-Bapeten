
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const STEPS = [
  { number: 1, label: "Email" },
  { number: 2, label: "Verifikasi" },
  { number: 3, label: "Kata Sandi" },
];

function Icon({ name, className = "h-5 w-5" }) {
  const icons = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M12 15v2" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3 3.8" />
        <path d="M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.2 0 2.3-.3 3.3-.7" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    back: (
      <>
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef([]);

  const clearError = () => setError("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    clearError();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Silakan masukkan alamat email Anda.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Format alamat email tidak valid.");
      return;
    }

    /*
      TODO BACKEND:
      Panggil endpoint permintaan OTP di sini.
      Pindah ke tahap berikutnya hanya setelah permintaan
      berhasil diproses oleh backend.
    */

    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];

    nextOtp[index] = digit;
    setOtp(nextOtp);
    clearError();

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    e.preventDefault();

    const nextOtp = [...otp];

    pasted.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    clearError();

    const nextIndex = Math.min(pasted.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    clearError();

    if (otp.some((digit) => !digit)) {
      setError("Masukkan seluruh 6 digit kode OTP.");
      return;
    }

    /*
      TODO BACKEND:
      Kirim email dan OTP ke endpoint verifikasi.
      Jangan menerima OTP hanya karena terdiri dari 6 digit.
      Backend harus memverifikasi kode, masa berlaku,
      batas percobaan, dan menerbitkan token reset.
    */

    setError(
      "Verifikasi OTP belum terhubung ke server. Hubungkan endpoint backend sebelum melanjutkan."
    );
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    clearError();

    if (password.length < 8) {
      setError("Kata sandi harus terdiri dari minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    /*
      TODO BACKEND:
      Kirim kata sandi baru menggunakan token reset
      yang hanya diberikan setelah OTP berhasil diverifikasi.
    */

    setError(
      "Penyimpanan kata sandi belum terhubung ke server."
    );
  };

  const pageInfo = {
    1: {
      title: "Lupa Kata Sandi?",
      description:
        "Masukkan email akun SIMPB Anda untuk memulai proses pemulihan.",
      icon: "mail",
    },
    2: {
      title: "Verifikasi Email",
      description:
        "Masukkan kode OTP 6 digit untuk memverifikasi identitas Anda.",
      icon: "shield",
    },
    3: {
      title: "Buat Kata Sandi Baru",
      description:
        "Buat kata sandi baru untuk mendapatkan kembali akses ke akun Anda.",
      icon: "lock",
    },
  };

  const currentInfo = pageInfo[step];

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-cover bg-center bg-no-repeat p-4 sm:p-6"
      style={{ backgroundImage: "url('/assets/bg.png')" }}
    >
      {/* Overlay background */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/10" />

      {/* Kartu utama */}
     <section className="relative z-10 grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/15 md:grid-cols-2">

        {/* Panel informasi biru */}
        <aside className="relative hidden min-w-0 flex-col justify-between overflow-hidden bg-[#608fa2] px-8 py-9 text-white md:flex lg:px-10">
          {/* Siluet gedung */}
          <img
            src="/assets/gedung.jpeg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-3/3 w-full object-cover object-center opacity-60"
          />

          {/* Gradasi biru */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#608fa2] via-[#608fa2]/75 to-[#315a70]/60" />

          {/* Dekorasi lingkaran */}
          <div className="pointer-events-none absolute -right-16 -top-20 z-[2] h-48 w-48 rounded-full border-[26px] border-white/[0.09]" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 z-[2] h-52 w-52 rounded-full border-[30px] border-white/[0.08]" />

          <div className="relative z-10">
            <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
              Sistem Informasi
            </p>

            <h1 className="text-2xl leading-tight font-bold sm:text-[28px]">
              Pemulihan Akses
              <span className="mt-1 block">SIMPB BAPETEN</span>
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/90">
              Ikuti langkah pemulihan akun untuk mendapatkan
              kembali akses ke Sistem Informasi Manajemen
              Proses Bisnis.
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
              {["Terstruktur", "Terintegrasi", "Akuntabel"].map(
                (text) => (
                  <span
                    key={text}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] font-medium sm:text-xs"
                  >
                    {text}
                  </span>
                )
              )}
            </div>

            {/* Alamat */}
            <address className="mt-4 max-w-md text-[9px] leading-[1.6] text-white/80 not-italic sm:text-[10px]">
              Jl. Gajah Mada No. 8, RT. 1/RW. 2, Petojo Utara,
              Gambir, Jakarta Pusat
              <br />
              Daerah Khusus Ibukota Jakarta 11120
            </address>
          </div>

          <p className="relative z-10 mt-6 text-[10px] text-white/70">
            Badan Pengawas Tenaga Nuklir · Republik Indonesia
          </p>
        </aside>

        {/* Panel form: lebar dan struktur tetap di semua tahap */}
        <div className="flex min-w-0 flex-col justify-center px-4 py-3 sm:px-5 sm:py-4 lg:px-6">
          <div className="w-full max-w-md self-center">

            {/* Identitas ringkas untuk layar HP */}
            <div className="mb-6 flex items-center gap-3 md:hidden">
              <img
                src="/assets/Logo%20bapeten.png"
                alt="Logo BAPETEN"
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-sm font-bold text-slate-800">
                  SIMPB BAPETEN
                </p>
                <p className="text-xs text-slate-500">
                  Pemulihan akun
                </p>
              </div>
            </div>

            {/* Indikator progres */}
            <div className="mb-8">
              <div className="flex items-start">
                {STEPS.map((item, index) => (
                  <div
                    key={item.number}
                    className={`flex min-w-0 items-start ${
                      index < STEPS.length - 1 ? "flex-1" : ""
                    }`}
                  >
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          step >= item.number
                            ? "bg-[#608fa2] text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {step > item.number ? (
                          <Icon name="check" className="h-4 w-4" />
                        ) : (
                          item.number
                        )}
                      </div>

                      <span
                        className={`whitespace-nowrap text-[10px] sm:text-xs ${
                          step === item.number
                            ? "font-semibold text-[#608fa2]"
                            : "text-slate-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {index < STEPS.length - 1 && (
                      <div
                        className={`mx-2 mt-[17px] h-0.5 flex-1 rounded transition-colors ${
                          step > item.number
                            ? "bg-[#608fa2]"
                            : "bg-slate-100"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Area tahap dengan tinggi minimum konsisten */}
            <div className="min-h-[280px]">

              {/* Judul tahap */}
              <div className="mb-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#608fa2]/10 text-[#608fa2]">
                  <Icon name={currentInfo.icon} className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  {currentInfo.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {currentInfo.description}
                </p>
              </div>

              {/* Pesan validasi */}
              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Tahap 1: Email */}
              {step === 1 && (
                <form onSubmit={handleEmailSubmit}>
                  <label
                    htmlFor="reset-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Alamat Email
                  </label>

                  <div className="relative">
                    <Icon
                      name="mail"
                      className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="reset-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearError();
                      }}
                      placeholder="nama@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#608fa2] focus:ring-4 focus:ring-[#608fa2]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#608fa2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4e7b8e] focus:outline-none focus:ring-4 focus:ring-[#608fa2]/20"
                  >
                    Kirim Kode OTP
                    <Icon name="arrow" className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* Tahap 2: OTP */}
              {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                  <p className="mb-4 text-xs leading-5 text-slate-500">
                    Kode verifikasi ditujukan ke:
                    <span className="mt-1 block break-all font-semibold text-slate-700">
                      {email.trim()}
                    </span>
                  </p>

                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Kode OTP
                  </label>

                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={
                          index === 0 ? "one-time-code" : "off"
                        }
                        aria-label={`Digit OTP ${index + 1}`}
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) =>
                          handleOtpKeyDown(index, e)
                        }
                        onPaste={handleOtpPaste}
                        className="h-11 min-w-0 w-full rounded-lg border border-slate-200 text-center text-base font-semibold text-slate-800 outline-none transition focus:border-[#608fa2] focus:ring-2 focus:ring-[#608fa2]/10"
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Masukkan enam digit kode OTP yang dikirim
                    ke email Anda.
                  </p>

                  <button
                    type="submit"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#608fa2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4e7b8e] focus:outline-none focus:ring-4 focus:ring-[#608fa2]/20"
                  >
                    Verifikasi OTP
                    <Icon name="arrow" className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setOtp(["", "", "", "", "", ""]);
                      clearError();
                    }}
                    className="mt-3 w-full py-2 text-sm font-medium text-slate-500 transition hover:text-[#608fa2]"
                  >
                    Ganti alamat email
                  </button>
                </form>
              )}

              {/* Tahap 3: Kata sandi baru */}
              {step === 3 && (
                <form onSubmit={handlePasswordSubmit}>
                  <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Kata Sandi Baru
                  </label>

                  <div className="relative">
                    <Icon
                      name="lock"
                      className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearError();
                      }}
                      placeholder="Minimal 8 karakter"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 text-sm outline-none focus:border-[#608fa2] focus:ring-4 focus:ring-[#608fa2]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <Icon
                        name={showPassword ? "eyeOff" : "eye"}
                        className="h-5 w-5"
                      />
                    </button>
                  </div>

                  <label
                    htmlFor="confirm-password"
                    className="mb-2 mt-5 block text-sm font-semibold text-slate-700"
                  >
                    Konfirmasi Kata Sandi
                  </label>

                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearError();
                    }}
                    placeholder="Masukkan ulang kata sandi"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#608fa2] focus:ring-4 focus:ring-[#608fa2]/10"
                  />

                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Gunakan minimal 8 karakter dan hindari
                    kata sandi yang mudah ditebak.
                  </p>

                  <button
                    type="submit"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#608fa2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4e7b8e]"
                  >
                    Simpan Kata Sandi Baru
                    <Icon name="check" className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Kembali ke login */}
            <div className="mt-5 border-t border-slate-100 pt-5">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#608fa2]"
              >
                <Icon name="back" className="h-4 w-4" />
                Kembali ke halaman login
              </Link>
            </div>

            <p className="mt-6 text-center text-[10px] leading-5 text-slate-400">
              Sistem Informasi Manajemen Proses Bisnis
              <br />
              BAPETEN · Hak cipta dilindungi
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
