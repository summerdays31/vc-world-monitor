import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel, pickSecondary } from "@/lib/homeMetrics";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";

/** Fixed importance order for wired home rows; then alpha. */
const IMPORTANCE: Record<string, number> = {
  ai: 0,
  "data-center": 1,
  "capital-formation": 2,
  "compute-semiconductors": 3,
};

/**
 * Full-width ledger — Sector | Metrics (two-line) | Values (lattice).
 * Stronger sector column; secondary metric densifies each row.
 * Inline Δ only when meaningful.
 */
export function SectorLeagueTable({ sectors }: { sectors: Sector[] }) {
  const ranked = [...sectors].sort((a, b) => {
    const ai = IMPORTANCE[a.slug] ?? 50;
    const bi = IMPORTANCE[b.slug] ?? 50;
    if (ai !== bi) return ai - bi;
    return a.name.localeCompare(b.name);
  });

  if (ranked.length === 0) return null;

  return (
    <section aria-label="Sector ledger">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d9d4cb] text-[11px] tracking-wide text-[#8a847a]">
              <th className="pb-1.5 pr-4 font-semibold">Sector</th>
              <th className="pb-1.5 pr-4 font-semibold">Metric</th>
              <th className="w-[9.5rem] pb-1.5 text-right font-semibold sm:w-[11rem]">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => {
              const ns = s.metrics.northStar;
              const sec = pickSecondary(s.metrics);
              const primaryLabel = cleanLabel(ns.label);
              const secondaryLabel = cleanLabel(sec.label);
              const showPrimaryDelta = isMeaningfulDelta(ns.delta);
              const showSecondaryDelta =
                !sec.value.isExample && isMeaningfulDelta(sec.delta);

              return (
                <tr
                  key={s.slug}
                  className="border-b border-[#e5e2db] last:border-b-0"
                >
                  <td className="whitespace-nowrap py-2.5 pr-4 align-top">
                    <Link
                      href={`/sector/${s.slug}`}
                      className="text-[14px] font-semibold text-[#0a0a0a] hover:text-[#3d3a36]"
                    >
                      {s.name}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-[#a39e94]">
                      {s.mode}
                    </p>
                  </td>
                  <td className="max-w-[16rem] py-2.5 pr-4 align-top sm:max-w-[22rem]">
                    <p
                      className="truncate text-[12px] text-[#6b6560]"
                      title={primaryLabel}
                    >
                      {primaryLabel}
                    </p>
                    <p
                      className="mt-0.5 truncate text-[11px] text-[#a39e94]"
                      title={secondaryLabel}
                    >
                      {secondaryLabel}
                    </p>
                  </td>
                  <td className="w-[9.5rem] whitespace-nowrap py-2.5 text-right align-top sm:w-[11rem]">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-[14px] font-semibold tabular-nums tracking-tight text-[#0a0a0a]">
                        {ns.value.display}
                      </span>
                      {showPrimaryDelta ? (
                        <span
                          className={`text-[11px] tabular-nums ${deltaClass(
                            ns.delta.direction
                          )}`}
                        >
                          {ns.delta.display}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-0.5 flex items-baseline justify-end gap-1.5">
                      <span className="text-[12px] tabular-nums tracking-tight text-[#8a847a]">
                        {sec.value.isExample ? "—" : sec.value.display}
                      </span>
                      {showSecondaryDelta ? (
                        <span
                          className={`text-[10px] tabular-nums ${deltaClass(
                            sec.delta.direction
                          )}`}
                        >
                          {sec.delta.display}
                        </span>
                      ) : null}
                    </div>
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
