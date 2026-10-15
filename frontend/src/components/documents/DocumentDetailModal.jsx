import {
  X,
  FileText,
  CalendarDays,
  Building2,
  Hash,
  Download,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function DocumentDetailModal({ document, onClose }) {
  if (!document) return null;

  const documentTitle =
    document.title || document.name || "Dokumen tanpa judul";

  const documentNumber = document.number || document.nomor || "-";
  const documentUnit = document.unit || document.unitKerja || "-";
  const documentDate = document.updatedAt || document.updated_at;

  const fileUrl =
    document.fileUrl ||
    document.file_url ||
    document.url ||
    document.file?.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#071A35]/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-modal-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#DCE6F0] bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E1EAF3] bg-[#F5F8FC] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-blue-100 p-3 text-[#123D68]">
              <FileText size={24} />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#24598A]">
                Detail dokumen
              </p>

              <h2
                id="document-modal-title"
                className="mt-2 text-lg font-bold leading-7 text-[#0B2C50] sm:text-xl"
              >
                {documentTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail dokumen"
            className="rounded-lg border border-[#DCE6F0] bg-white p-2 text-slate-500 transition hover:bg-blue-50 hover:text-[#123D68]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-5 sm:p-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#0B2C50]">
              Status dokumen
            </p>
            <StatusBadge status={document.status} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#0B2C50]">
              Deskripsi
            </p>
            <p className="text-sm leading-7 text-slate-600">
              {document.description ||
                "Deskripsi dokumen belum tersedia."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#DCE6F0] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Hash size={15} className="text-[#477AA8]" />
                Nomor dokumen
              </div>
              <p className="mt-2 break-words text-sm font-semibold text-[#0B2C50]">
                {documentNumber}
              </p>
            </div>

            <div className="rounded-xl border border-[#DCE6F0] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Building2 size={15} className="text-[#477AA8]" />
                Unit kerja
              </div>
              <p className="mt-2 break-words text-sm font-semibold text-[#0B2C50]">
                {documentUnit}
              </p>
            </div>

            <div className="rounded-xl border border-[#DCE6F0] p-4 sm:col-span-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CalendarDays size={15} className="text-[#477AA8]" />
                Terakhir diperbarui
              </div>
              <p className="mt-2 text-sm font-semibold text-[#0B2C50]">
                {formatDate(documentDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#E1EAF3] bg-[#F8FAFD] p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DCE6F0] bg-white px-5 py-3 text-sm font-semibold text-[#123D68] transition hover:bg-blue-50"
          >
            Tutup
          </button>

          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123D68] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2C50]"
            >
              <Download size={17} />
              Buka dokumen
            </a>
          )}
        </div>
      </div>
    </div>
  );
}