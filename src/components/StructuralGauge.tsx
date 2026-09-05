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
    clamped >= 70 ? "bg-rose-400" : clamped >= 45 ? "bg-amber-400" : "bg-emerald-400";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Structural gauge
          </h3>
          <p className="text-sm font-medium text-zinc-200">{label}</p>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-semibold text-zinc-50">{clamped}</div>
          <ExampleBadge />
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ${tone} transition-all`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500">{caption}</p>
    </div>
  );
}
