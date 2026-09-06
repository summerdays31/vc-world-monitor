import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel } from "@/lib/homeMetrics";

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
    const an = a.metrics.northStar.value.numeric ?? -Infinity;
    const bn = b.metrics.northStar.value.numeric ?? -Infinity;
    return bn - an;
  });

  if (ranked.length === 0) return null;

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] text-slate-400">
              <th className="py-2 pr-4 font-medium">Sector</th>
              <th className="py-2 pr-4 font-medium">Metric</th>
              <th className="py-2 pr-4 text-right font-medium">Value</th>
              <th className="py-2 text-right font-medium">Δ</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => {
              const ns = s.metrics.northStar;
              return (
                <tr
                  key={s.slug}
                  className="border-b border-slate-100 last:border-slate-200"
                >
                  <td className="py-2.5 pr-4 align-baseline">
                    <Link
                      href={`/sector/${s.slug}`}
                      className="text-[14px] font-medium text-slate-900 hover:underline"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="max-w-[16rem] truncate py-2.5 pr-4 align-baseline text-[13px] text-slate-500">
                    {cleanLabel(ns.label)}
                  </td>
                  <td className="py-2.5 pr-4 text-right align-baseline font-mono text-[15px] font-medium tracking-tight text-slate-900 [font-variant-numeric:tabular-nums]">
                    {ns.value.display}
                  </td>
                  <td className="py-2.5 text-right align-baseline font-mono text-[12px] text-slate-400 [font-variant-numeric:tabular-nums]">
                    {ns.delta.display}
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
