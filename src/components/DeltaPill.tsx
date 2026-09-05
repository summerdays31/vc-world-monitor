import type { Delta } from "@/data/types";
import { deltaArrow, deltaClass } from "@/lib/format";

export function DeltaPill({ delta, compact = false }: { delta: Delta; compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono ${deltaClass(delta.direction)} ${
        compact ? "text-xs" : "text-sm"
      }`}
    >
      <span aria-hidden>{deltaArrow(delta.direction)}</span>
      <span className="font-semibold">{delta.display}</span>
      {!compact && (
        <span className="text-[10px] uppercase tracking-wide text-zinc-500">
          {delta.period}
        </span>
      )}
    </span>
  );
}
