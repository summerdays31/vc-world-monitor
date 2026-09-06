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

/** Quiet secondary voice — mono figure, no color theater. */
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
      className={`inline-flex flex-wrap items-baseline gap-x-1.5 font-mono ${deltaClass(
        delta.direction
      )} ${compact ? "text-[11px]" : "text-[12px]"} [font-variant-numeric:tabular-nums]`}
    >
      <span aria-hidden className="opacity-50">
        {deltaArrow(delta.direction)}
      </span>
      <span className="font-medium">{delta.display}</span>
      {!compact && showPeriod && (
        <span className="font-sans text-[11px] font-normal text-slate-400">
          {periodCaption(delta.period)}
        </span>
      )}
    </span>
  );
}
