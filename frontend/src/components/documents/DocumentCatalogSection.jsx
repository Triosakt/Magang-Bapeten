import { useMemo, useState } from "react";
import {
  Search,
  Files,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import SectionHeading from "../common/SectionHeading";
import DocumentCard from "../documents/DocumentCard";
import DocumentFilters from "../documents/DocumentFilters";
import DocumentDetailModal from "../documents/DocumentDetailModal";

const initialFilters = {
  query: "",
  category: "",
  unit: "",
  status: "",
  dateFrom: "",
  dateTo: "",
  sort: "relevance",
};

const PAGE_SIZE = 6;

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("id-ID")
    .trim();
}

function getTitle(doc) {
  return doc.title || doc.name || "Dokumen tanpa judul";
}

function getNumber(doc) {
  return doc.number || doc.nomor || "";
}

function getUnit(doc) {
  return doc.unit || doc.unitKerja || "";
}

function getUpdatedDate(doc) {
  const value = doc.updatedAt || doc.updated_at;
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getSearchFields(doc) {
  return {
    title: normalizeText(getTitle(doc)),
    number: normalizeText(getNumber(doc)),
    category: normalizeText(doc.category),
    unit: normalizeText(getUnit(doc)),
    description: normalizeText(doc.description),
    other: normalizeText(
      [
        doc.type,
        doc.fileName,
        doc.file_name,
        doc.keywords,
        doc.tags,
      ]
        .flat()
        .filter(Boolean)
        .join(" "),
    ),
  };
}

function getRelevanceScore(doc, tokens) {
  const fields = getSearchFields(doc);
  let score = 0;

  for (const token of tokens) {
    let matched = false;

    if (fields.title.includes(token)) {
      score += fields.title === token ? 12 : 8;
      matched = true;
    }

    if (fields.number.includes(token)) {
      score += 7;
      matched = true;
    }

    if (fields.category.includes(token)) {
      score += 5;
      matched = true;
    }

    if (fields.unit.includes(token)) {
      score += 4;
      matched = true;
    }

    if (fields.other.includes(token)) {
      score += 3;
      matched = true;
    }

    if (fields.description.includes(token)) {
      score += 2;
      matched = true;
    }

    if (!matched) return 0;
  }

  return score;
}

function matchesDateRange(doc, filters) {
  if (!filters.dateFrom && !filters.dateTo) return true;

  const date = getUpdatedDate(doc);
  if (!date) return false;

  const dateOnly = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  if (filters.dateFrom && dateOnly < filters.dateFrom) return false;
  if (filters.dateTo && dateOnly > filters.dateTo) return false;

  return true;
}

export default function DocumentCatalogSection({ documents = [] }) {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const safeDocuments = Array.isArray(documents) ? documents : [];

  const filteredDocuments = useMemo(() => {
    const tokens = normalizeText(filters.query)
      .split(/\s+/)
      .filter(Boolean);

    const result = safeDocuments
      .map((doc) => ({
        doc,
        score: tokens.length ? getRelevanceScore(doc, tokens) : 0,
      }))
      .filter(({ doc, score }) => {
        return (
          (!tokens.length || score > 0) &&
          (!filters.category || doc.category === filters.category) &&
          (!filters.unit || getUnit(doc) === filters.unit) &&
          (!filters.status || doc.status === filters.status) &&
          matchesDateRange(doc, filters)
        );
      });

    result.sort((a, b) => {
      if (filters.sort === "title") {
        return getTitle(a.doc).localeCompare(getTitle(b.doc), "id");
      }

      if (filters.sort === "relevance" && tokens.length) {
        if (b.score !== a.score) return b.score - a.score;
      }

      const dateA = getUpdatedDate(a.doc)?.getTime() ?? 0;
      const dateB = getUpdatedDate(b.doc)?.getTime() ?? 0;

      if (filters.sort === "oldest") return dateA - dateB;
      return dateB - dateA;
    });

    return result.map(({ doc }) => doc);
  }, [safeDocuments, filters]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredDocuments.length / PAGE_SIZE),
  );

  const safePage = Math.min(page, pageCount);

  const visibleDocuments = filteredDocuments.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const activeFilters = [
    filters.category && {
      key: "category",
      label: "Kategori",
      value: filters.category,
    },
    filters.unit && {
      key: "unit",
      label: "Unit",
      value: filters.unit,
    },
    filters.status && {
      key: "status",
      label: "Status",
      value: filters.status,
    },
    filters.dateFrom && {
      key: "dateFrom",
      label: "Mulai",
      value: filters.dateFrom,
    },
    filters.dateTo && {
      key: "dateTo",
      label: "Sampai",
      value: filters.dateTo,
    },
  ].filter(Boolean);

  function updateFilters(next) {
    setFilters(next);
    setPage(1);
  }

  function updateFilter(key, value) {
    updateFilters({
      ...filters,
      [key]: value,
    });
  }

  function resetFilters() {
    updateFilters({ ...initialFilters });
  }

  const hasActiveFilters =
    Boolean(filters.query.trim()) ||
    activeFilters.length > 0 ||
    filters.sort !== "relevance";

  return (
    <section
      id="katalog"
      className="scroll-mt-24 bg-[#F5F8FC] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pusat dokumen"
          title="Katalog dokumen"
          description="Temukan dokumen proses bisnis BAPETEN dengan cepat."
          action={
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#DCE6F0] bg-white px-3 py-2 text-sm text-[#123D68]">
              <Files size={16} />
              <span>
                <strong>{filteredDocuments.length}</strong> dokumen
              </span>
            </div>
          }
        />

        <div className="rounded-xl border border-[#DCE6F0] bg-white p-4 sm:p-5">
          <label
            htmlFor="catalog-search"
            className="mb-2 block text-sm font-semibold text-[#0B2C50]"
          >
            Cari dokumen
          </label>

          <div className="flex items-center gap-2 rounded-lg border border-[#DCE6F0] px-3 focus-within:border-[#3D8BC9] focus-within:ring-2 focus-within:ring-blue-50">
            <Search size={18} className="shrink-0 text-slate-400" />

            <input
              id="catalog-search"
              type="search"
              value={filters.query}
              onChange={(event) =>
                updateFilter("query", event.target.value)
              }
              placeholder="Judul, nomor dokumen, SOP, atau unit kerja..."
              aria-label="Cari dokumen"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#0B2C50] outline-none placeholder:text-slate-400"
            />

            {filters.query && (
              <button
                type="button"
                onClick={() => updateFilter("query", "")}
                aria-label="Hapus pencarian"
                className="rounded p-1 text-slate-400 hover:text-[#123D68]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Cari berdasarkan judul, nomor, kategori, atau metadata.
            </p>

            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              aria-expanded={showFilters}
              aria-controls="catalog-filters"
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                showFilters || activeFilters.length
                  ? "border-[#A9C8E5] bg-[#EDF4FB] text-[#123D68]"
                  : "border-[#DCE6F0] bg-white text-[#123D68] hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filter
              {activeFilters.length > 0 && (
                <span className="rounded-full bg-[#123D68] px-1.5 py-0.5 text-xs text-white">
                  {activeFilters.length}
                </span>
              )}
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showFilters && (
            <div
              id="catalog-filters"
              className="mt-4 border-t border-[#E8EEF5] pt-4"
            >
              <DocumentFilters
                documents={safeDocuments}
                filters={filters}
                setFilters={(next) => {
                  const resolved =
                    typeof next === "function" ? next(filters) : next;
                  updateFilters(resolved);
                }}
              />
            </div>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => updateFilter(filter.key, "")}
                className="inline-flex items-center gap-1 rounded-full border border-[#DCE6F0] bg-white px-2.5 py-1.5 text-xs text-[#24598A] hover:bg-blue-50"
              >
                {filter.label}: {filter.value}
                <X size={12} />
              </button>
            ))}

            <button
              type="button"
              onClick={resetFilters}
              className="px-2 py-1 text-xs font-semibold text-[#24598A] hover:underline"
            >
              Hapus semua
            </button>
          </div>
        )}

        <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-[#0B2C50]">
            Hasil dokumen
          </h3>

          <p className="text-sm text-slate-500">
            {filteredDocuments.length === 0
              ? "Tidak ada dokumen yang cocok."
              : `Menampilkan ${
                  (safePage - 1) * PAGE_SIZE + 1
                }–${Math.min(
                  safePage * PAGE_SIZE,
                  filteredDocuments.length,
                )} dari ${filteredDocuments.length}`}
          </p>
        </div>

        {visibleDocuments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleDocuments.map((document, index) => (
              <DocumentCard
                key={
                  document.id ??
                  document._id ??
                  `${getTitle(document)}-${index}`
                }
                document={document}
                onSelect={setSelectedDocument}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#C9D8E8] bg-white px-5 py-12 text-center">
            <Files size={28} className="mx-auto text-[#477AA8]" />

            <h3 className="mt-3 font-semibold text-[#0B2C50]">
              Dokumen tidak ditemukan
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Ubah kata pencarian atau sesuaikan filter yang digunakan.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-[#24598A] hover:underline"
            >
              Reset pencarian
            </button>
          </div>
        )}

        {filteredDocuments.length > PAGE_SIZE && (
          <div className="mt-6 flex items-center justify-between border-t border-[#DCE6F0] pt-4">
            <p className="text-sm text-slate-500">
              Halaman {safePage} dari {pageCount}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                className="inline-flex items-center gap-1 rounded-lg border border-[#DCE6F0] bg-white px-3 py-2 text-sm text-[#123D68] hover:bg-blue-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Sebelumnya
              </button>

              <button
                type="button"
                disabled={safePage === pageCount}
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                className="inline-flex items-center gap-1 rounded-lg border border-[#DCE6F0] bg-white px-3 py-2 text-sm text-[#123D68] hover:bg-blue-50 disabled:opacity-40"
              >
                Berikutnya
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <DocumentDetailModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </section>
  );
}