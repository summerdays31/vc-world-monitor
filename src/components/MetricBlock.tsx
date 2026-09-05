import type { Delta, MetricValue } from "@/data/types";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

export function MetricBlock({
  label,
  value,
  delta,
  size = "sm",
}: {
  label: string;
  value: MetricValue;
  delta: Delta;
  size?: "sm" | "lg";
}) {
  const example = value.isExample;
  return (
    <div
      className={
        size === "lg"
          ? `rounded-lg border p-4 ${
              example
                ? "border-amber-200/80 bg-amber-50/50"
                : "border-slate-200 bg-slate-50/70"
            }`
          : `rounded-lg border p-3 ${
              example
                ? "border-amber-200/70 bg-amber-50/40"
                : "border-slate-200 bg-white"
            }`
      }
    >
      <div
        className={`text-slate-500 ${
          size === "lg"
            ? "text-[11px] font-medium"
            : "line-clamp-2 text-[11px] leading-tight"
        }`}
      >
        {label}
        {example && !label.includes("(EXAMPLE)") ? " · EXAMPLE" : ""}
      </div>
      <div
        className={`mt-1.5 font-medium tabular-nums tracking-tight text-slate-900 ${
          size === "lg" ? "text-xl font-light" : "text-base"
        }`}
      >
        {value.display}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <DeltaPill delta={delta} compact />
        {example ? <ExampleBadge /> : <ProvenanceBadge value={value} />}
      </div>
      {!example && (
        <div className="mt-1.5 text-[10px] text-slate-400">
          as of {value.asOf}
          {value.stale ? " · stale fallback" : ""}
        </div>
      )}
    </div>
  );
}
