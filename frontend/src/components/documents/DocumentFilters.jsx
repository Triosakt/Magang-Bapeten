import { RotateCcw } from "lucide-react";

const selectClass =
  "mt-1.5 w-full rounded-lg border border-[#DCE6F0] bg-white px-3 py-2.5 text-sm text-[#0B2C50] outline-none transition focus:border-[#3D8BC9]";

const knownCategories = [
  "Matriks Aktivitas",
  "Pedoman",
  "Peta Proses",
  "SOP",
  "SOP Lembaga",
  "SOP Unit Kerja",
];

function getUniqueValues(documents, getter) {
  return [
    ...new Set(
      documents
        .map(getter)
        .map((value) => String(value || "").trim())
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b, "id"));
}

export default function DocumentFilters({
  documents = [],
  filters,
  setFilters,
}) {
  const safeDocuments = Array.isArray(documents) ? documents : [];

  const categories = [
    ...new Set([
      ...knownCategories,
      ...getUniqueValues(safeDocuments, (doc) => doc.category),
    ]),
  ].sort((a, b) => a.localeCompare(b, "id"));

  const units = getUniqueValues(
    safeDocuments,
    (doc) => doc.unit || doc.unitKerja,
  );

  const statuses = getUniqueValues(
    safeDocuments,
    (doc) => doc.status,
  );

  const activeCount = [
    filters.category,
    filters.unit,
    filters.status,
    filters.dateFrom,
    filters.dateTo,
  ].filter(Boolean).length;

  function updateFilter(key, value) {
    setFilters({
      ...filters,
      [key]: value,
    });
  }

  function resetAdvancedFilters() {
    setFilters({
      ...filters,
      category: "",
      unit: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-slate-500">
          {activeCount
            ? `${activeCount} filter digunakan`
            : "Sesuaikan hasil pencarian"}
        </p>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={resetAdvancedFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#24598A] hover:underline"
          >
            <RotateCcw size={12} />
            Reset filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-xs font-medium text-slate-600">
          Kategori dokumen
          <select
            value={filters.category}
            onChange={(event) =>
              updateFilter("category", event.target.value)
            }
            className={selectClass}
          >
            <option value="">Semua kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-slate-600">
          Unit kerja
          <select
            value={filters.unit}
            onChange={(event) =>
              updateFilter("unit", event.target.value)
            }
            className={selectClass}
          >
            <option value="">Semua unit kerja</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-slate-600">
          Status dokumen
          <select
            value={filters.status}
            onChange={(event) =>
              updateFilter("status", event.target.value)
            }
            className={selectClass}
          >
            <option value="">Semua status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-slate-600">
          Diperbarui mulai
          <input
            type="date"
            value={filters.dateFrom}
            max={filters.dateTo || undefined}
            onChange={(event) =>
              updateFilter("dateFrom", event.target.value)
            }
            className={selectClass}
          />
        </label>

        <label className="block text-xs font-medium text-slate-600">
          Diperbarui sampai
          <input
            type="date"
            value={filters.dateTo}
            min={filters.dateFrom || undefined}
            onChange={(event) =>
              updateFilter("dateTo", event.target.value)
            }
            className={selectClass}
          />
        </label>

        <label className="block text-xs font-medium text-slate-600">
          Urutkan hasil
          <select
            value={filters.sort}
            onChange={(event) =>
              updateFilter("sort", event.target.value)
            }
            className={selectClass}
          >
            <option value="relevance">Paling relevan</option>
            <option value="newest">Tanggal terbaru</option>
            <option value="oldest">Tanggal terlama</option>
            <option value="title">Judul A–Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}