
import { useMemo } from "react";
import {
  Building2,
  FileText,
  BarChart3,
} from "lucide-react";

export default function DashboardSection({ documents = [] }) {
  const unitStatistics = useMemo(() => {
    const publishedDocuments = documents.filter((doc) => {
      const status = String(doc.status || "").trim().toLowerCase();

      return status === "published" || status === "dipublikasikan";
    });

    const grouped = publishedDocuments.reduce((result, doc) => {
      // Sesuaikan dengan nama field dari API backend nantinya.
      const unitValue =
        doc.unitName ??
        doc.unitKerja ??
        doc.unit_name ??
        doc.unit ??
        doc.workUnit;

      const unit =
        typeof unitValue === "string"
          ? unitValue.trim()
          : unitValue?.name ?? unitValue?.nama ?? "";

      if (!unit) return result;

      result[unit] = (result[unit] || 0) + 1;

      return result;
    }, {});

    return Object.entries(grouped)
      .map(([name, total]) => ({
        name,
        total,
      }))
      .sort((a, b) => b.total - a.total);
  }, [documents]);

  const totalDocuments = unitStatistics.reduce(
    (sum, unit) => sum + unit.total,
    0
  );

  const maxDocuments = Math.max(
    ...unitStatistics.map((unit) => unit.total),
    1
  );

  return (
    <section
      id="dashboard"
      className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="mb-10 max-w-3xl">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
            Ringkasan Informasi
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Statistik Dokumen per Unit Kerja
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Lihat distribusi jumlah dokumen yang telah dipublikasikan
            berdasarkan masing-masing unit kerja di lingkungan BAPETEN.
          </p>
        </div>

        {/* Ringkasan */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
              <Building2 size={27} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Unit Kerja Terdata
              </p>

              <h3 className="mt-1 text-3xl font-bold text-slate-900">
                {unitStatistics.length}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
              <FileText size={27} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Dokumen Terpublikasi
              </p>

              <h3 className="mt-1 text-3xl font-bold text-slate-900">
                {totalDocuments}
              </h3>
            </div>
          </div>

        </div>

        {/* Statistik per unit */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

          <div className="mb-7 flex items-center gap-3">
            <BarChart3 className="text-blue-900" size={23} />

            <h3 className="text-lg font-bold text-slate-900">
              Distribusi Dokumen Unit Kerja
            </h3>
          </div>

          {unitStatistics.length === 0 ? (
            <div className="py-12 text-center">
              <Building2
                size={36}
                className="mx-auto mb-4 text-slate-300"
              />

              <p className="font-semibold text-slate-700">
                Belum ada statistik unit kerja
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Data akan muncul setelah dokumen terpublikasi
                memiliki informasi unit kerja.
              </p>
            </div>
          ) : (
            <div className="space-y-7">
              {unitStatistics.map((unit) => {
                const percentage =
                  (unit.total / maxDocuments) * 100;

                return (
                  <div key={unit.name}>

                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h4 className="text-sm font-semibold text-slate-800">
                        {unit.name}
                      </h4>

                      <span className="shrink-0 text-sm font-bold text-blue-900">
                        {unit.total} Dokumen
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-900 to-sky-500 transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          Statistik dihitung berdasarkan data dokumen terpublikasi
          yang memiliki informasi unit kerja.
        </p>

      </div>
    </section>
  );
}
