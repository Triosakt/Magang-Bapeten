export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#24598A]">
            <span className="h-px w-7 bg-[#3D8BC9]" />
            {eyebrow}
          </p>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-[#0B2C50] sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}