import Link from "next/link";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { MetricSeries } from "@/data/series";
import { deltaClass, isMeaningfulDelta } from "@/lib/format";
import { ContextBars } from "./charts/ContextBars";

/**
 * Artemis-style metric card: big headline KPI (+ Δ) and optional chart
 * when a real series exists. Shared as-of / grain — no dense fake legends.
 */
export function MetricHero({
  sector,
  metric,
  href,
  payload,
  series,
  muted,
  size = "md",
}: {
  sector: string;
  metric: string;
  href: string;
  payload: LiveMetricPayload;
  series?: MetricSeries | null;
  muted?: string | null;
  size?: "md" | "lg";
}) {
  const { value, delta } = payload;
  const showDelta = isMeaningfulDelta(delta ?? undefined);
  const asOf = value.asOf ? `as of ${value.asOf}` : null;
  const provenance = [value.sourceLabel, asOf, value.stale ? "stale" : null]
    .filter(Boolean)
    .join(" · ");
  const grain = series?.grain ?? null;
  const isLg = size === "lg";

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-xl border border-[#e5e2db] bg-[#fffcf7] transition hover:border-[#d9d4cb] hover:bg-[#f0eee8]/40 ${
        isLg ? "p-5 sm:p-6" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a847a]">
            {sector}
          </p>
          <h3
            className={`leading-snug text-[#0a0a0a] ${
              isLg
                ? "text-[15px] font-semibold"
                : "text-[13px] font-medium text-[#3d3a36]"
            }`}
          >
            {metric}
          </h3>
        </div>
        {grain ? (
          <span className="shrink-0 text-[10px] tabular-nums text-[#a39e94]">
            {grain}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span
          className={`font-semibold tracking-tight tabular-nums text-[#0a0a0a] ${
            isLg
              ? "text-[2rem] leading-none sm:text-[2.35rem]"
              : "text-[1.55rem] leading-none sm:text-[1.75rem]"
          }`}
        >
          {value.display}
        </span>
        {showDelta ? (
          <span
            className={`tabular-nums ${
              isLg ? "text-[15px]" : "text-[13px]"
            } ${deltaClass(delta!.direction)}`}
          >
            {delta!.display}
            {delta!.period ? (
              <span className="ml-1 font-normal text-[#a39e94]">
                {delta!.period}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>

      {muted ? (
        <p className="mt-1.5 text-[11px] leading-snug text-[#a39e94]">{muted}</p>
      ) : null}

      {series && series.points.length >= 2 ? (
        <div className={`mt-4 ${isLg ? "min-h-[7.5rem]" : "min-h-[5.5rem]"}`}>
          <ContextBars series={series} height={isLg ? 140 : 110} />
          <p className="mt-1 text-[10px] leading-snug text-[#a39e94]">
            {series.caption}
          </p>
        </div>
      ) : (
        <div className="mt-auto pt-4" />
      )}

      <p className="mt-3 text-[11px] leading-snug text-[#8a847a]">{provenance}</p>
    </Link>
  );
}
