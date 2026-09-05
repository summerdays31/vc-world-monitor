import type { Delta, MetricValue } from "@/data/types";
import { DeltaPill } from "./DeltaPill";
import { ProvenanceBadge } from "./ProvenanceBadge";

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
  return (
    <div
      className={
        size === "lg"
          ? "rounded-lg border border-zinc-800/80 bg-black/30 p-3"
          : "rounded-md border border-zinc-800/60 bg-zinc-950/50 p-2"
      }
    >
      <div
        className={`font-mono uppercase tracking-wide text-zinc-500 ${
          size === "lg"
            ? "text-[10px]"
            : "line-clamp-2 text-[9px] leading-tight"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-1 font-mono font-medium text-zinc-100 ${
          size === "lg" ? "text-lg" : "text-sm"
        }`}
      >
        {value.display}
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-1">
        <DeltaPill delta={delta} compact />
        {!value.isExample && <ProvenanceBadge value={value} />}
      </div>
      {!value.isExample && (
        <div className="mt-1 font-mono text-[9px] text-zinc-600">
          as of {value.asOf}
          {value.stale ? " · stale fallback" : ""}
        </div>
      )}
    </div>
  );
}
