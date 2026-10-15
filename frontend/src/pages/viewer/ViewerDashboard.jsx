
import { Download, Eye, FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import RoleDashboard from "../../components/dashboard/RoleDashboard";
import { mockDocuments } from "../../data/mockData";

export default function ViewerDashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const documents = useMemo(() => {
    const published = mockDocuments.filter(
      (document) =>
        String(document.status || "").toLowerCase() === "published" ||
        String(document.status || "").toLowerCase() === "published"
    );

    return published.filter((document) => {
      const title = document.title || document.name || "";
      const number = document.number || document.documentNumber || "";
      const matchesSearch = `${title} ${number}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Semua" || document.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categories = [
    "Semua",
    ...new Set(mockDocuments.map((document) => document.category).filter(Boolean)),
  ];

  return (
    <RoleDashboard
      role="Viewer"
      subtitle="Temukan dan akses dokumen proses bisnis yang telah dipublikasikan."
      menu={[
        { label: "Dashboard", href: "/dashboard/viewer", icon: "dashboard" },
        { label: "Katalog dokumen", href: "/#katalog", icon: "documents" },
      ]}
      stats={[
        {
          label: "Dokumen tersedia",
          value: documents.length,
          icon: "documents",
          note: "Dokumen yang lolos filter",
        },
        {
          label: "Kategori",
          value: categories.length - 1,
          icon: "approved",
          note: "Kategori dokumen",
        },
      ]}
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">Katalog dokumen</h2>
          <p className="mt-1 text-sm text-slate-500">
            Gunakan pencarian untuk menemukan dokumen yang dibutuhkan.
          </p>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama atau nomor dokumen..."
              className="w-full text-sm outline-none"
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {documents.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-8 text-center">
            <FileText className="mx-auto mb-3 text-slate-400" size={30} />
            <p className="font-semibold text-slate-700">
              Belum ada dokumen yang cocok
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Periksa kembali kata kunci atau filter kategori.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((document, index) => {
              const title = document.title || document.name || "Dokumen tanpa judul";
              const number =
                document.number || document.documentNumber || "Nomor belum tersedia";

              return (
                <article
                  key={document.id || number || index}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-xl bg-slate-100 p-3">
                      <FileText size={21} className="text-slate-600" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-800">{title}</h3>
                      <p className="mt-1 text-xs text-slate-500">{number}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        {document.category || "Kategori belum ditentukan"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/documents/${document.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                    >
                      <Eye size={16} />
                      Detail
                    </a>
                    {document.fileUrl && (
                      <a
                        href={document.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
                      >
                        <Download size={16} />
                        Unduh
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </RoleDashboard>
  );
}
