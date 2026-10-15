import {
  ArrowUpRight,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function DocumentCard({ document, onSelect }) {
  const isSpreadsheet = ["XLS", "XLSX", "CSV"].includes(
    String(document.type || "").toUpperCase(),
  );

  const Icon = isSpreadsheet
    ? FileSpreadsheet
    : FileText;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10">

      {/* Icon + Status */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#123D68] transition group-hover:bg-[#123D68] group-hover:text-white">
          <Icon size={22} />
        </span>

        <StatusBadge status={document.status} />
      </div>

      {/* Category */}
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.08em] text-[#123D68]">
        {document.category || "Dokumen"}
      </p>

      {/* Title */}
      <h3 className="mt-2 min-h-[3.5rem] text-base font-bold leading-6 text-slate-900">
        {document.title || "Dokumen tanpa judul"}
      </h3>

      {/* Description */}
      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
        {document.description ||
          "Tidak ada deskripsi dokumen."}
      </p>

      {/* Metadata */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">

        <div className="flex justify-between gap-3">
          <span>Nomor dokumen</span>

          <span className="text-right font-semibold text-slate-700">
            {document.number ||
              document.nomor ||
              "-"}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span>Unit kerja</span>

          <span className="text-right font-semibold text-slate-700">
            {document.unit ||
              document.unitKerja ||
              "-"}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span>Pembaruan</span>

          <span className="text-right">
            {formatDate(
              document.updatedAt ||
                document.updated_at,
            )}
          </span>
        </div>
      </div>

      {/* Detail */}
      <button
        type="button"
        onClick={() => onSelect(document)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#123D68] px-4 py-3 text-sm font-semibold text-[#123D68] transition hover:bg-[#123D68] hover:text-white"
      >
        Lihat detail
        <ArrowUpRight size={16} />
      </button>
    </article>
  );
}