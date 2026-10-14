
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  FileText,
  FileCheck2,
  GitBranch,
  Network,
  ArrowUpRight,
  SlidersHorizontal,
  CalendarDays,
  Building2,
  X,
} from "lucide-react";

import { documents, categories } from "../../data/mockData";

function getDocumentIcon(type) {
  if (type === "Peta Proses") return GitBranch;
  if (type === "CFM") return Network;
  if (type === "SOP") return FileCheck2;
  return FileText;
}

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export default function DocumentSection({ search, setSearch }) {
  const [category, setCategory] = useState("Semua");
  const [year, setYear] = useState("Semua");
  const [unit, setUnit] = useState("Semua");
  const [showFilters, setShowFilters] = useState(false);

  // Membuat opsi tahun berdasarkan data dokumen.
  const years = useMemo(
    () =>
      [...new Set(documents.map((doc) => String(doc.year)))]
        .sort((a, b) => b.localeCompare(a)),
    []
  );

  // Membuat opsi unit kerja berdasarkan data dokumen.
  const units = useMemo(
    () => [...new Set(documents.map((doc) => doc.unit))].sort(),
    []
  );

  // Pencarian dan filter dokumen.
  const filteredDocuments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return documents.filter((doc) => {
      const searchableValues = [
        doc.title,
        doc.number,
        doc.type,
        doc.unit,
        doc.year,
        doc.status,
      ];

      const matchesKeyword =
        !keyword ||
        searchableValues.some((value) =>
          String(value ?? "").toLowerCase().includes(keyword)
        );

      const matchesCategory =
        category === "Semua" || doc.type === category;

      const matchesYear =
        year === "Semua" || String(doc.year) === year;

      const matchesUnit =
        unit === "Semua" || doc.unit === unit;

      return (
        matchesKeyword &&
        matchesCategory &&
        matchesYear &&
        matchesUnit
      );
    });
  }, [search, category, year, unit]);

  // Menghapus pencarian dan seluruh filter.
  function resetFilters() {
    setSearch("");
    setCategory("Semua");
    setYear("Semua");
    setUnit("Semua");
  }

  const hasActiveFilters =
    category !== "Semua" ||
    year !== "Semua" ||
    unit !== "Semua" ||
    Boolean(search.trim());

  const activeFilterCount = [
    category !== "Semua",
    year !== "Semua",
    unit !== "Semua",
    Boolean(search.trim()),
  ].filter(Boolean).length;

  return (
    <section
      id="katalog"
      className="scroll-mt-24 bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header katalog */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold tracking-wider text-blue-700">
              PUSAT DOKUMEN
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Temukan dokumen yang Anda butuhkan
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Telusuri katalog proses bisnis menggunakan kata kunci
              dan filter untuk menemukan dokumen secara lebih cepat.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Data simulasi
          </span>
        </div>

        {/* Kontainer katalog */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Pencarian */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:p-6">
            <div className="relative min-w-0 flex-1">
              <Search
                size={19}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari judul, nomor dokumen, atau unit kerja..."
                aria-label="Cari dalam katalog dokumen"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              aria-expanded={showFilters}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                showFilters
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} aria-hidden="true" />
              Filter

              {hasActiveFilters && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1.5 text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter lanjutan */}
          {showFilters && (
            <div className="grid grid-cols-1 gap-4 border-b border-slate-100 bg-slate-50/80 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              <label className="text-sm font-semibold text-slate-700">
                Jenis dokumen
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className={inputClass}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Tahun
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className={inputClass}
                >
                  <option value="Semua">Semua tahun</option>

                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Unit kerja
                <select
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  className={inputClass}
                >
                  <option value="Semua">Semua unit</option>

                  {units.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  Reset filter
                </button>
              </div>
            </div>
          )}

          {/* Tab kategori */}
          <div className="border-b border-slate-100 px-4 pt-4 sm:px-6">
            <div
              className="flex gap-2 overflow-x-auto pb-4"
              aria-label="Kategori dokumen"
            >
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    category === item
                      ? "bg-blue-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Ringkasan hasil */}
          <div className="flex flex-col gap-1 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-600" aria-live="polite">
              Menampilkan{" "}
              <span className="font-bold text-slate-900">
                {filteredDocuments.length}
              </span>{" "}
              dari {documents.length} dokumen
            </p>

            <p className="text-xs text-slate-400">
              Contoh data untuk demonstrasi
            </p>
          </div>

          {/* Daftar dokumen */}
          <div className="divide-y divide-slate-100">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => {
                const Icon = getDocumentIcon(doc.type);

                return (
                  <article
                    key={doc.id}
                    className="group flex flex-col gap-4 px-4 py-5 transition hover:bg-slate-50/80 sm:px-6 md:flex-row md:items-center"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                        <Icon size={22} aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                            {doc.type}
                          </span>

                          <span className="text-xs font-medium text-slate-400">
                            {doc.number}
                          </span>
                        </div>

                        <h3 className="text-base font-bold leading-6 text-slate-900 transition group-hover:text-blue-700">
                          {doc.title}
                        </h3>

                        <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-5">
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 size={14} aria-hidden="true" />
                            {doc.unit}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={14} aria-hidden="true" />
                            Tahun {doc.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {doc.status}
                      </span>

                      {/* Menuju halaman detail dokumen */}
                      <Link
                        to={`/dokumen/${encodeURIComponent(doc.id)}`}
                        aria-label={`Lihat detail ${doc.title}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        Detail
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="px-5 py-16 text-center sm:px-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Search size={25} aria-hidden="true" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Dokumen tidak ditemukan
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Coba kata kunci lain atau sesuaikan filter pencarian Anda.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Hapus semua filter
                </button>
              </div>
            )}
          </div>

          {/* Footer katalog */}
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span className="inline-flex items-center gap-2 font-medium">
              <FileText size={16} aria-hidden="true" />
              Katalog contoh SIMPB
            </span>

            <span>
              Integrasi dokumen asli akan dilakukan kemudian
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
