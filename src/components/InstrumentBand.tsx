import Link from "next/link";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";

type Cell = {
  key: string;
  sector: string;
  metric: string;
  href: string;
  payload: LiveMetricPayload;
};

/**
 * Three equal instrument panels — north star only.
 * Provenance lives in-cell; no secondary rows, no em-dash placeholders.
 */
export function InstrumentBand({
  gpu,
  interconnect,
  vc,
}: {
  gpu: LiveMetricPayload;
  interconnect: LiveMetricPayload;
  vc: LiveMetricPayload;
}) {
  const cells: Cell[] = [
    {
      key: "gpu",
      sector: "AI",
      metric: "H100-eq rental spot",
      href: "/sector/ai",
      payload: gpu,
    },
    {
      key: "interconnect",
      sector: "Data center",
      metric: "Median IR→COD",
      href: "/sector/data-center",
      payload: interconnect,
    },
    {
      key: "vc",
      sector: "Capital",
      metric: "Global VC · H1 YTD",
      href: "/sector/capital-formation",
      payload: vc,
    },
  ];

  return (
    <section
      aria-label="Live instruments"
      className="grid grid-cols-1 border border-[#d9d4cb] sm:grid-cols-3"
    >
      {cells.map((cell, i) => {
        const { value, delta } = cell.payload;
        const showDelta = isMeaningfulDelta(delta ?? undefined);
        const source = value.sourceLabel ?? "Source";
        const asOf = value.asOf ? `as of ${value.asOf}` : null;
        const provenance = [source, asOf, value.stale ? "stale" : null]
          .filter(Boolean)
          .join(" · ");

        return (
          <Link
            key={cell.key}
            href={cell.href}
            className={`group flex min-h-[11.5rem] flex-col justify-between gap-6 px-5 py-6 transition hover:bg-[#f0eee8]/70 sm:min-h-[13.5rem] sm:px-6 sm:py-7 ${
              i > 0 ? "border-t border-[#d9d4cb] sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <div className="space-y-1.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a847a]">
                {cell.sector}
              </p>
              <p className="text-[13px] leading-snug text-[#3d3a36]">
                {cell.metric}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[2rem] font-semibold leading-none tracking-tight text-[#0a0a0a] tabular-nums sm:text-[2.25rem]">
                  {value.display}
                </span>
                {showDelta ? (
                  <span
                    className={`text-[13px] tabular-nums ${deltaClass(
                      delta!.direction
                    )}`}
                  >
                    {delta!.display}
                  </span>
                ) : null}
              </div>
              <p className="text-[11px] leading-snug text-[#8a847a]">
                {provenance}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
