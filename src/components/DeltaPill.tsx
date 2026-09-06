import type { Delta } from "@/data/types";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";

function periodCaption(period: string): string {
  const p = period.trim();
  if (!p) return "";
  if (/^\d+\s*[dDwWmMyY]$/i.test(p) || /^\d+d$/i.test(p)) {
    return `from ${p} ago`;
  }
  if (/ago|ytd|vs/i.test(p)) return p;
  return p;
}

/** Quiet secondary voice — tabular figure; accent only on real direction. */
export function DeltaPill({
  delta,
  compact = false,
  showPeriod = true,
}: {
  delta: Delta;
  compact?: boolean;
  showPeriod?: boolean;
}) {
  if (!isMeaningfulDelta(delta)) {
    return (
      <span
        className={`tabular-nums text-slate-400 ${compact ? "text-[11px]" : "text-[12px]"}`}
      >
        —
      </span>
    );
  }

  const period = periodCaption(delta.period);

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-x-1.5 tabular-nums ${deltaClass(
        delta.direction
      )} ${compact ? "text-[11px]" : "text-[12px]"}`}
    >
      <span className="font-medium">{delta.display}</span>
      {!compact && showPeriod && period ? (
        <span className="text-[11px] font-normal text-slate-400">{period}</span>
      ) : null}
    </span>
  );
}
