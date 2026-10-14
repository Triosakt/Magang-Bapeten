
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

export default function HeroSection({ search, setSearch, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(search);
  }

  function handleSuggestion(value) {
    setSearch(value);
    onSearch(value);
  }

  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-[#082B5C] text-white sm:min-h-[700px] lg:min-h-[calc(100vh-80px)]"
    >
      {/* Background image: fokus pada bagian atas foto */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/bg_web_bapeten.jpeg')",
          backgroundPosition: "center top",
        }}
        aria-hidden="true"
      />

      {/* Overlay biru transparan agar foto tetap terlihat */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-[#07366B]/65 via-[#07559A]/40 to-[#0875C9]/15"
        aria-hidden="true"
      />

      {/* Lapisan bawah untuk menjaga keterbacaan teks */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#062653]/30 via-transparent to-[#0875C9]/10"
        aria-hidden="true"
      />

      {/* Dekorasi lingkaran */}
      <div
        className="pointer-events-none absolute -left-32 -top-40 -z-10 h-96 w-96 rounded-full border border-cyan-300/20"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-64 -right-24 -z-10 h-[500px] w-[500px] rounded-full border border-cyan-300/25"
        aria-hidden="true"
      />

      {/* Konten utama */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-4xl">
          {/* Identitas instansi */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/40 bg-blue-950/35 px-4 py-2.5 shadow-lg backdrop-blur-sm">
            <ShieldCheck
              size={18}
              className="shrink-0 text-cyan-300"
            />

            <span className="text-[11px] font-bold tracking-[0.12em] text-white sm:text-sm">
              BADAN PENGAWAS TENAGA NUKLIR
            </span>
          </div>

          {/* Judul utama */}
          <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.13] tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
            Temukan Informasi
            <br className="hidden sm:block" /> Proses Bisnis
            <span className="mt-1 block bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
              dalam Satu Platform.
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white drop-shadow-sm sm:text-base sm:leading-8 lg:text-lg">
            Akses dokumen proses bisnis, telusuri prosedur operasional,
            dan temukan informasi yang Anda butuhkan dengan lebih mudah.
          </p>

          {/* Form pencarian dokumen */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl border border-white/80 bg-white p-2 shadow-2xl shadow-blue-950/30 sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="relative min-w-0 flex-1">
              <Search
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari judul dokumen, nomor SOP, atau unit kerja..."
                aria-label="Cari dokumen proses bisnis"
                className="w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:rounded-full sm:py-4"
              />
            </div>

            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-900/20 transition duration-200 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300/50 sm:rounded-full sm:py-4"
            >
              Cari Dokumen
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Saran pencarian cepat */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="mr-1 text-xs font-medium text-white drop-shadow-sm sm:text-sm">
              Contoh pencarian:
            </span>

            {["SOP", "Peta Proses", "Sekretariat Utama"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSuggestion(item)}
                className="rounded-full border border-cyan-200/50 bg-blue-950/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition duration-200 hover:border-cyan-200 hover:bg-cyan-300/20 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 sm:text-sm"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Informasi pendukung */}
          <div className="mt-10 flex items-center gap-3 text-xs text-white/90 sm:text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/20">
              <ShieldCheck
                size={15}
                className="text-emerald-300"
              />
            </span>

            <p className="drop-shadow-sm">
              Satu pintu untuk penelusuran informasi proses bisnis.
            </p>
          </div>
        </div>
      </div>

      {/* Aksen di bagian bawah */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-700 via-cyan-400 to-sky-500" />
    </section>
  );
}
