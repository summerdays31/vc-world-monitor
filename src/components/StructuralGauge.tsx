import { ExampleBadge } from "./ExampleBadge";

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
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Structural gauge
          </h3>
          <p className="text-sm font-medium text-slate-900">{label}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light tabular-nums text-slate-900">
            {clamped}
          </div>
          <ExampleBadge />
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${tone} transition-all`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-2 text-[13px] text-slate-500">{caption}</p>
    </div>
  );
}
