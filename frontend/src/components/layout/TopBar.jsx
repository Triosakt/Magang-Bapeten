
import { Clock3, Mail, ShieldCheck } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden bg-[#071a35] text-blue-50 sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs lg:px-8">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-sky-300" />
            Sistem Informasi Manajemen Proses Bisnis
          </span>

          <span className="flex items-center gap-2 text-blue-100/70">
            <Clock3 size={14} />
            Portal informasi dan dokumentasi
          </span>
        </div>

        <a
          href="mailto:info@bapeten.go.id"
          className="flex items-center gap-2 transition hover:text-sky-300"
        >
          <Mail size={14} />
          Kontak BAPETEN
        </a>
      </div>
    </div>
  );
}
