import type { Delta } from "@/data/types";
import { deltaArrow, deltaClass } from "@/lib/format";

function periodCaption(period: string): string {
  const p = period.trim();
  if (/^\d+\s*[dDwWmMyY]$/i.test(p) || /^\d+d$/i.test(p)) {
    return `from ${p} ago`;
  }
  if (/ago|ytd|floor|level|vs/i.test(p)) return p;
  return p;
}

export function DeltaPill({
  delta,
  compact = false,
  showPeriod = true,
}: {
  delta: Delta;
  compact?: boolean;
  showPeriod?: boolean;
}) {
  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-x-1 ${deltaClass(
        delta.direction
      )} ${compact ? "text-[11px]" : "text-[12px]"}`}
    >
      <span aria-hidden className="text-[9px] opacity-80">
        {deltaArrow(delta.direction)}
      </span>
      <span className="font-medium tabular-nums">{delta.display}</span>
      {!compact && showPeriod && (
        <span className="text-[11px] font-normal text-slate-400">
          {periodCaption(delta.period)}
        </span>
      )}
    </span>
  );
}
