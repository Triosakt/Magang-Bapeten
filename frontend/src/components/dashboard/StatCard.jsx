export default function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass = "bg-emerald-50 text-emerald-800",
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <span className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={22} />
        </span>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">{description}</p>
    </article>
  );
}