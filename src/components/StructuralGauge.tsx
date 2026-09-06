export function StructuralGauge({
  label,
  score,
  caption,
}: {
  label: string;
  score: number;
  caption: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const tone =
    clamped >= 70
      ? "bg-rose-500"
      : clamped >= 45
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/80">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Structural gauge
          </h3>
          <p className="mt-0.5 text-sm font-medium text-slate-900">{label}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light tabular-nums text-slate-900">
            {clamped}
          </div>
          <span className="text-[10px] text-slate-400">example</span>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${tone} transition-all`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-3 text-[13px] leading-snug text-slate-500">{caption}</p>
    </div>
  );
}
