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
      className={`inline-flex flex-wrap items-center gap-x-1 gap-y-0.5 ${deltaClass(
        delta.direction
      )} ${compact ? "text-xs" : "text-[13px]"}`}
    >
      <span aria-hidden className="text-[10px]">
        {deltaArrow(delta.direction)}
      </span>
      <span className="font-semibold tabular-nums">{delta.display}</span>
      {!compact && showPeriod && (
        <span className="text-[12px] font-normal text-slate-400">
          {periodCaption(delta.period)}
        </span>
      )}
    </span>
  );
}
