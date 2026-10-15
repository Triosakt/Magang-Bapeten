
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  GitBranch,
  Network,
  ShieldCheck,
  Tag,
  History,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { mockDocuments } from "../data/mockData";

function getDocumentIcon(type) {
  if (type === "Peta Proses") return GitBranch;
  if (type === "CFM") return Network;
  if (type === "SOP") return FileCheck2;
  return FileText;
}

function getStatusStyle(status) {
  if (status === "Publik") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (status === "Dalam Review") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  if (status === "Arsip") {
    return "bg-slate-100 text-slate-600 ring-slate-200";
  }

  return "bg-blue-50 text-blue-700 ring-blue-200";
}

export default function DocumentDetailPage() {
  const { id } = useParams();

  const document = mockDocuments.find((item) => item.id === id);

  if (!doc) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />

        <main className="flex flex-1 items-center justify-center px-5 py-16">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <FileText size={30} />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-[#082B5C]">
              Dokumen tidak ditemukan
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Dokumen yang kamu cari tidak tersedia dalam data simulasi.
              Silakan kembali ke katalog dan pilih dokumen lainnya.
            </p>

            <Link
              to="/#katalog"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#07559A] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              <ArrowLeft size={17} />
              Kembali ke katalog
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const Icon = getDocumentIcon(doc.type);

  const metadata = [
    {
      label: "Nomor dokumen",
      value: doc.number,
      icon: FileCheck2,
    },
    {
      label: "Jenis dokumen",
      value: doc.type,
      icon: Tag,
    },
    {
      label: "Unit kerja",
      value: doc.unit,
      icon: Building2,
    },
    {
      label: "Tahun dokumen",
      value: doc.year,
      icon: CalendarDays,
    },
    {
      label: "Versi dokumen",
      value: doc.version || "Belum ditentukan",
      icon: History,
    },
    {
      label: "Format file",
      value: doc.format || "Belum tersedia",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main>
        {/* Header halaman */}
        <section className="relative overflow-hidden bg-[#082B5C]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <Link
              to="/#katalog"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <ArrowLeft size={17} />
              Kembali ke katalog
            </Link>

            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                <Icon size={30} strokeWidth={1.7} />
              </div>

              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-sky-400/15 px-3 py-1.5 text-xs font-bold text-sky-200">
                    {doc.type}
                  </span>

                  <span className="text-sm font-medium text-blue-100/70">
                    {doc.number}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {doc.title}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/80 sm:text-base">
                  {doc.description ||
                    "Informasi dokumen proses bisnis dalam katalog SIMPB."}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-blue-100/80">
                  <span className="inline-flex items-center gap-2">
                    <Building2 size={16} />
                    {doc.unit}
                  </span>

                  <span className="hidden text-white/30 sm:inline">•</span>

                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    Tahun {doc.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Isi halaman */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* Informasi utama */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#07559A]">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-[#082B5C]">
                      Informasi dokumen
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Identitas dan keterangan dokumen
                    </p>
                  </div>
                </div>

                <div className="mt-7 divide-y divide-slate-100">
                  {metadata.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                      >
                        <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                          <ItemIcon
                            size={16}
                            className="text-slate-400"
                          />
                          {item.label}
                        </span>

                        <span className="text-sm font-semibold text-slate-800 sm:max-w-[60%] sm:text-right">
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#07559A]">
                    <ShieldCheck size={21} />
                  </div>

                  <h2 className="text-lg font-extrabold text-[#082B5C]">
                    Deskripsi dokumen
                  </h2>
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600">
                  {doc.description ||
                    "Deskripsi dokumen belum tersedia."}
                </p>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <Clock3
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-700"
                    />

                    <div>
                      <h3 className="text-sm font-bold text-amber-900">
                        Informasi data simulasi
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-amber-800">
                        Detail ini menggunakan data contoh untuk
                        pengembangan antarmuka. Verifikasi data dan
                        dokumen resmi sebelum digunakan sebagai acuan.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Panel samping */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-extrabold text-[#082B5C]">
                  Status dokumen
                </h2>

                <div className="mt-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ring-1 ring-inset ${getStatusStyle(
                      doc.status
                    )}`}
                  >
                    <CheckCircle2 size={16} />
                    {doc.status}
                  </span>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Pembaruan terakhir
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {doc.updated || "Belum tersedia"}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Ukuran file
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {doc.size || "Belum tersedia"}
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-extrabold text-[#082B5C]">
                  Aksi dokumen
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  File asli belum terhubung pada data simulasi ini.
                </p>

                <button
                  type="button"
                  disabled
                  title="Tersedia setelah file dokumen dihubungkan"
                  className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400"
                >
                  <Download size={17} />
                  Unduh dokumen
                </button>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Tombol unduh akan diaktifkan setelah tersedia URL
                  atau berkas dokumen yang valid.
                </p>
              </section>

              <Link
                to="/#katalog"
                className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-5 text-[#07559A] transition hover:border-blue-200 hover:bg-blue-100"
              >
                <span>
                  <span className="block text-sm font-bold">
                    Kembali ke katalog
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Telusuri dokumen lainnya
                  </span>
                </span>

                <ArrowUpRight size={20} />
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
