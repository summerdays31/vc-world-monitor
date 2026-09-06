import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel } from "@/lib/homeMetrics";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";

/** Fixed importance order for wired home rows; then alpha. */
const IMPORTANCE: Record<string, number> = {
  ai: 0,
  "data-center": 1,
  "capital-formation": 2,
  "compute-semiconductors": 3,
};

/**
 * Dense typeset ledger — Sector | Metric | Value (Δ folded into Value).
 * Optical grid, tabular nums, hairline rules. No hero, no Δ column.
 */
export function SectorLeagueTable({
  sectors,
}: {
  sectors: Sector[];
}) {
  const ranked = [...sectors].sort((a, b) => {
    const ai = IMPORTANCE[a.slug] ?? 50;
    const bi = IMPORTANCE[b.slug] ?? 50;
    if (ai !== bi) return ai - bi;
    return a.name.localeCompare(b.name);
  });

  if (ranked.length === 0) return null;

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-300 text-[11px] tracking-wide text-slate-500">
              <th className="pb-1.5 pr-3 font-semibold">Sector</th>
              <th className="pb-1.5 pr-3 font-semibold">Metric</th>
              <th className="pb-1.5 text-right font-semibold">Value</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => {
              const ns = s.metrics.northStar;
              const label = cleanLabel(ns.label);
              const showDelta = isMeaningfulDelta(ns.delta);
              return (
                <tr
                  key={s.slug}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <td className="whitespace-nowrap py-1.5 pr-3 align-baseline">
                    <Link
                      href={`/sector/${s.slug}`}
                      className="text-[14px] font-semibold text-slate-900 hover:text-slate-700"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td
                    className="max-w-[14rem] truncate py-1.5 pr-3 align-baseline text-[12px] text-slate-500 sm:max-w-[18rem]"
                    title={label}
                  >
                    {label}
                  </td>
                  <td className="whitespace-nowrap py-1.5 text-right align-baseline">
                    <span className="text-[14px] font-semibold tabular-nums tracking-tight text-slate-900">
                      {ns.value.display}
                    </span>
                    {showDelta ? (
                      <span
                        className={`ml-1.5 text-[11px] tabular-nums ${deltaClass(
                          ns.delta.direction
                        )}`}
                      >
                        {ns.delta.display}
                      </span>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
