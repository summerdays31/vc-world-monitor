import type { Delta, MetricValue } from "@/data/types";
import { DeltaPill } from "./DeltaPill";

function cleanLabel(label: string): string {
  return label.replace(/\s*\(EXAMPLE\)\s*/gi, "").trim();
}

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
          ? "rounded-lg bg-slate-50/80 px-4 py-3.5"
          : "rounded-lg border border-slate-100 bg-white p-3"
      }
    >
      <div className="text-[11px] leading-tight text-slate-500">
        {cleanLabel(label)}
        {example ? (
          <span className="ml-1.5 text-[10px] text-slate-400">example</span>
        ) : null}
      </div>
      <div
        className={`mt-1.5 tabular-nums tracking-tight text-slate-900 ${
          size === "lg" ? "text-xl font-light" : "text-base font-medium"
        }`}
      >
        {value.display}
      </div>
      <div className="mt-1.5">
        <DeltaPill delta={delta} compact />
      </div>
      {!example && value.sourceLabel ? (
        <div className="mt-1.5 text-[10px] text-slate-400">
          {value.sourceLabel}
          {value.stale ? " · stale" : ""}
        </div>
      ) : null}
    </div>
  );
}
