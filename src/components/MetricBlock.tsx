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
          ? `rounded-lg border p-3 ${
              example
                ? "border-dashed border-amber-500/40 bg-amber-950/15"
                : "border-zinc-800/80 bg-black/30"
            }`
          : `rounded-md border p-2 ${
              example
                ? "border-dashed border-amber-500/35 bg-amber-950/10"
                : "border-zinc-800/60 bg-zinc-950/50"
            }`
      }
    >
      <div
        className={`font-mono uppercase tracking-wide ${
          example ? "text-amber-600/80" : "text-zinc-500"
        } ${
          size === "lg"
            ? "text-[10px]"
            : "line-clamp-2 text-[9px] leading-tight"
        }`}
      >
        {label}
        {example && !label.includes("(EXAMPLE)") ? " · EXAMPLE" : ""}
      </div>
      <div
        className={`mt-1 font-mono font-medium ${
          example ? "text-amber-100/80" : "text-zinc-100"
        } ${size === "lg" ? "text-lg" : "text-sm"}`}
      >
        {value.display}
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-1">
        <DeltaPill delta={delta} compact />
        {example ? (
          <ExampleBadge className="scale-90 origin-left" />
        ) : (
          <ProvenanceBadge value={value} />
        )}
      </div>
      {!example && (
        <div className="mt-1 font-mono text-[9px] text-zinc-600">
          as of {value.asOf}
          {value.stale ? " · stale fallback" : ""}
        </div>
      )}
    </div>
  );
}
