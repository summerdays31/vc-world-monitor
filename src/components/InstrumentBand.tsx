import Link from "next/link";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";

type Cell = {
  key: string;
  title: string;
  href: string;
  payload: LiveMetricPayload;
};

/**
 * Full-width instrument band — three equal cells, hairline divided.
 * Same visual weight; dense tabular nums; no hero.
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
      title: "GPU",
      href: "/sector/ai",
      payload: gpu,
    },
    {
      key: "interconnect",
      title: "Interconnect",
      href: "/sector/data-center",
      payload: interconnect,
    },
    {
      key: "vc",
      title: "VC",
      href: "/sector/capital-formation",
      payload: vc,
    },
  ];

  return (
    <section
      aria-label="Live instruments"
      className="grid grid-cols-1 border border-slate-300 sm:grid-cols-3"
    >
      {cells.map((cell, i) => {
        const { value, delta } = cell.payload;
        const showDelta = isMeaningfulDelta(delta ?? undefined);
        const caption =
          cell.key === "gpu"
            ? "H100-eq rental spot"
            : cell.key === "interconnect"
              ? "Median IR→COD"
              : "Global H1 YTD";
        return (
          <Link
            key={cell.key}
            href={cell.href}
            className={`group flex min-h-[4.75rem] flex-col justify-between gap-1 px-3.5 py-3 transition hover:bg-slate-50/80 ${
              i > 0 ? "border-t border-slate-300 sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-semibold tracking-wide text-slate-500">
                {cell.title}
              </span>
              <span className="truncate text-[10px] text-slate-400">
                {caption}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[22px] font-semibold leading-none tracking-tight text-slate-900 tabular-nums group-hover:text-slate-800">
                {value.display}
              </span>
              {showDelta ? (
                <span
                  className={`text-[12px] tabular-nums ${deltaClass(
                    delta!.direction
                  )}`}
                >
                  {delta!.display}
                </span>
              ) : null}
            </div>
            {value.sourceLabel ? (
              <p className="truncate text-[10px] text-slate-400">
                {value.sourceLabel}
                {value.stale ? " · stale" : ""}
              </p>
            ) : (
              <span className="h-[14px]" aria-hidden />
            )}
          </Link>
        );
      })}
    </section>
  );
}
