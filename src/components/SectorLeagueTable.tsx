import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel } from "@/lib/homeMetrics";
import { formatDeltaCell } from "@/lib/format";

/** Fixed importance order for wired home rows; then alpha. */
const IMPORTANCE: Record<string, number> = {
  ai: 0,
  "data-center": 1,
  "capital-formation": 2,
  "compute-semiconductors": 3,
};

/**
 * Mature dense league — Sector, Metric, Value, Δ.
 * Optical grid, tabular nums, hairline rules. No card farm.
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
        <table className="w-full min-w-[480px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[28%]" />
            <col className="w-[40%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-300 text-[11px] tracking-wide text-slate-500">
              <th className="pb-1.5 pr-3 font-semibold">Sector</th>
              <th className="pb-1.5 pr-3 font-semibold">Metric</th>
              <th className="pb-1.5 pr-3 text-right font-semibold">Value</th>
              <th className="pb-1.5 text-right font-semibold">Δ</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => {
              const ns = s.metrics.northStar;
              return (
                <tr
                  key={s.slug}
                  className="border-b border-slate-200/80 last:border-slate-300"
                >
                  <td className="py-1.5 pr-3 align-baseline">
                    <Link
                      href={`/sector/${s.slug}`}
                      className="text-[15px] font-semibold text-slate-900 hover:underline"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="truncate py-1.5 pr-3 align-baseline text-[12px] text-slate-500">
                    {cleanLabel(ns.label)}
                  </td>
                  <td className="py-1.5 pr-3 text-right align-baseline text-[15px] font-semibold tabular-nums tracking-tight text-slate-900">
                    {ns.value.display}
                  </td>
                  <td className="py-1.5 text-right align-baseline text-[12px] tabular-nums text-slate-400">
                    {formatDeltaCell(ns.delta)}
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
