import Link from "next/link";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";

type Cell = {
  key: string;
  sector: string;
  metric: string;
  href: string;
  payload: LiveMetricPayload;
  /** Optional muted secondary line (e.g. FY26 deficit under debt). */
  muted?: string | null;
};

/**
 * Compact live / curated pulse strip — four instruments at top of home.
 * Not the whole page; sector board lives below.
 */
export function InstrumentBand({
  gpu,
  interconnect,
  vc,
  debt,
  deficit,
}: {
  gpu: LiveMetricPayload;
  interconnect: LiveMetricPayload;
  vc: LiveMetricPayload;
  debt: LiveMetricPayload;
  deficit?: LiveMetricPayload | null;
}) {
  const deficitLine =
    deficit && !deficit.value.isExample
      ? `FY26 deficit ${deficit.value.display}`
      : null;

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
    {
      key: "debt",
      sector: "Fiscal",
      metric: "US national debt",
      href: "/sector/capital-formation",
      payload: debt,
      muted: deficitLine,
    },
  ];

  return (
    <section
      aria-label="Live instruments"
      className="grid grid-cols-1 divide-y divide-[#d9d4cb] border border-[#d9d4cb] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4"
    >
      {cells.map((cell, i) => {
        const { value, delta } = cell.payload;
        const showDelta = isMeaningfulDelta(delta ?? undefined);
        const source = value.sourceLabel ?? "Source";
        const asOf = value.asOf ? `as of ${value.asOf}` : null;
        const provenance = [source, asOf, value.stale ? "stale" : null]
          .filter(Boolean)
          .join(" · ");

        // sm 2×2: left border on odd; top border on bottom row
        // lg 1×4: left border on all but first; clear sm top
        const edge =
          [
            i % 2 === 1 ? "sm:border-l sm:border-[#d9d4cb]" : "",
            i >= 2 ? "sm:border-t sm:border-[#d9d4cb]" : "",
            i > 0 ? "lg:border-l lg:border-[#d9d4cb]" : "",
            "lg:border-t-0",
          ]
            .filter(Boolean)
            .join(" ");

        return (
          <Link
            key={cell.key}
            href={cell.href}
            className={`group flex min-h-[8.5rem] flex-col justify-between gap-4 px-4 py-4 transition hover:bg-[#f0eee8]/70 sm:min-h-[9.5rem] sm:px-5 sm:py-5 ${edge}`}
          >
            <div className="space-y-1.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a847a]">
                {cell.sector}
              </p>
              <p className="text-[13px] leading-snug text-[#3d3a36]">
                {cell.metric}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-[1.45rem] font-semibold leading-none tracking-tight text-[#0a0a0a] tabular-nums sm:text-[1.65rem]">
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
              {cell.muted ? (
                <p className="text-[11px] leading-snug text-[#a39e94]">
                  {cell.muted}
                </p>
              ) : null}
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
