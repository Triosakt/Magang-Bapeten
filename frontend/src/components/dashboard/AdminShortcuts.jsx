import {
  FilePlus2,
  ClipboardCheck,
  FolderSearch,
  ArrowUpRight,
} from "lucide-react";

const shortcuts = [
  {
    title: "Ajukan dokumen",
    description: "Mulai proses pengajuan atau pembaruan dokumen.",
    icon: FilePlus2,
    href: "#katalog",
  },
  {
    title: "Tinjau dokumen",
    description: "Temukan dokumen yang memerlukan peninjauan.",
    icon: ClipboardCheck,
    href: "#katalog",
  },
  {
    title: "Kelola katalog",
    description: "Cari dokumen dan periksa status publikasinya.",
    icon: FolderSearch,
    href: "#katalog",
  },
];

export default function AdminShortcuts() {
  return (
    <section
      id="administrasi"
      className="scroll-mt-24 border-y border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Produktivitas
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Pintasan administrasi
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Akses cepat untuk membantu alur kerja pengelolaan dokumen.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {shortcuts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-800/30 hover:bg-emerald-50/40"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
                    <Icon size={22} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-400 transition group-hover:text-emerald-800"
                  />
                </div>
                <h3 className="mt-5 font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </a>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Catatan: pintasan di atas masih berupa navigasi UI, bukan sistem
          persetujuan atau pengelolaan data yang aktif.
        </p>
      </div>
    </section>
  );
}