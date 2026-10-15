import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Megaphone,
} from "lucide-react";

const defaultAnnouncements = [
  {
    id: 1,
    type: "Informasi",
    date: "12 Okt 2026",
    title: "Pemutakhiran dokumen proses bisnis",
    description:
      "Unit kerja diharapkan memeriksa kembali dokumen proses bisnis dan memastikan informasi yang ditampilkan tetap relevan.",
  },
  {
    id: 2,
    type: "Pengingat",
    date: "09 Okt 2026",
    title: "Peninjauan standar operasional prosedur",
    description:
      "Lakukan peninjauan SOP sesuai kewenangan unit kerja sebelum pengajuan perubahan dokumen.",
  },
];

const typeStyles = {
  Informasi: {
    badge: "bg-blue-50 text-[#123D68] ring-blue-200",
    icon: "bg-blue-50 text-[#123D68]",
  },
  Pengingat: {
    badge: "bg-sky-50 text-sky-800 ring-sky-200",
    icon: "bg-sky-50 text-sky-800",
  },
};

export default function AnnouncementSection({
  announcements = defaultAnnouncements,
}) {
  const items = Array.isArray(announcements)
    ? announcements
    : defaultAnnouncements;

  return (
    <section
      id="pengumuman"
      className="scroll-mt-24 border-y border-[#E1EAF3] bg-[#F3F7FC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section heading */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#24598A]">
              <span className="h-px w-7 bg-[#3D8BC9]" />
              Informasi terbaru
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#0B2C50] sm:text-3xl">
              Pengumuman
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Informasi dan pengingat terkait pengelolaan dokumen proses
              bisnis.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-[#D7E5F3] bg-white px-4 py-3 text-sm font-semibold text-[#123D68]">
            <BellRing size={17} />
            Pusat informasi
          </div>
        </div>

        {/* Announcement cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {items.map((item, index) => {
            const style =
              typeStyles[item.type] || typeStyles.Informasi;

            return (
              <article
                key={item.id ?? `${item.title}-${index}`}
                className="group relative overflow-hidden rounded-2xl border border-[#DCE6F0] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#A9C8E5] hover:shadow-lg hover:shadow-[#123D68]/5 sm:p-7"
              >
                {/* Aksen biru di sisi kartu */}
                <div className="absolute inset-y-0 left-0 w-1 bg-[#24598A] transition-colors group-hover:bg-[#3D8BC9]" />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
                  >
                    {item.type === "Pengingat" ? (
                      <CalendarDays size={21} />
                    ) : (
                      <Megaphone size={21} />
                    )}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${style.badge}`}
                  >
                    {item.type || "Informasi"}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <CalendarDays size={14} className="text-[#477AA8]" />
                  <time>{item.date || "Tanggal tidak tersedia"}</time>
                </div>

                <h3 className="mt-3 text-lg font-bold leading-7 text-[#0B2C50] transition-colors group-hover:text-[#24598A] sm:text-xl">
                  {item.title || "Pengumuman"}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description ||
                    "Informasi lebih lanjut belum tersedia."}
                </p>

                <div className="mt-6 border-t border-[#E8EEF5] pt-4">
                  {item.url ? (
                    <a
                      href={item.url}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#123D68] transition hover:text-[#3D8BC9]"
                    >
                      Baca pengumuman
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          "Detail pengumuman belum tersedia.",
                        )
                      }
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#123D68] transition hover:text-[#3D8BC9]"
                    >
                      Baca pengumuman
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#C9D8E8] bg-white px-6 py-12 text-center">
            <Megaphone
              size={32}
              className="mx-auto text-[#477AA8]"
            />
            <h3 className="mt-4 font-semibold text-[#0B2C50]">
              Belum ada pengumuman
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Pengumuman terbaru akan ditampilkan di bagian ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}