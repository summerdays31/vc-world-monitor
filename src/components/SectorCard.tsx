import Link from "next/link";
import type { Sector, SectorMetrics } from "@/data/types";
import { DeltaPill } from "./DeltaPill";

type MetricSlot = SectorMetrics["capitalPulse"];

function pickSecondary(metrics: SectorMetrics): MetricSlot {
  const candidates: MetricSlot[] = [
    metrics.capitalPulse,
    metrics.infraOrAdoption,
  ];
  const wired = candidates.filter((m) => !m.value.isExample);
  if (wired.length === 1) return wired[0];
  if (wired.length === 2) {
    const live = wired.find((m) => m.value.provenance === "live");
    if (live) return live;
    return metrics.capitalPulse;
  }
  const rank = (m: MetricSlot) => {
    let score = 0;
    if (m.delta.direction !== "flat") score += 2;
    if (m.value.numeric != null) score += 1;
    if (/capital|deployed|funding|ARR|capex|spend/i.test(m.label)) score += 1;
    return score;
  };
  const [a, b] = candidates;
  return rank(b) > rank(a) ? b : a;
}

function cleanLabel(label: string): string {
  return label.replace(/\s*\(EXAMPLE\)\s*/gi, "").trim();
}

function allHomeMetricsExample(sector: Sector, secondary: MetricSlot): boolean {
  return (
    sector.metrics.northStar.value.isExample && secondary.value.isExample
  );
}

function MetricLane({
  label,
  display,
  delta,
  isExample,
  primary,
}: {
  label: string;
  display: string;
  delta: MetricSlot["delta"];
  isExample: boolean;
  primary?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-0.5 ${
        primary ? "pb-3" : "pt-3"
      }`}
    >
      <div
        className={`min-w-0 truncate ${
          primary
            ? "text-[11px] font-medium text-slate-500"
            : "text-[11px] text-slate-400"
        }`}
      >
        {cleanLabel(label)}
        {isExample ? (
          <span className="ml-1.5 text-[10px] font-normal text-slate-400">
            example
          </span>
        ) : null}
      </div>
      <div className="justify-self-end">
        <DeltaPill delta={delta} compact showPeriod={false} />
      </div>
      <div
        className={`col-span-2 tabular-nums tracking-tight text-slate-900 ${
          primary
            ? "text-[1.55rem] font-light leading-none"
            : "text-[15px] font-medium leading-none text-slate-700"
        }`}
      >
        {display}
      </div>
    </div>
  );
}

/**
 * Sector card — optical lanes for label / value / delta.
 * No footer CTA, no colored dots, quiet EXAMPLE.
 * Wholly-example sectors are visually demoted.
 */
export function SectorCard({ sector }: { sector: Sector }) {
  const { metrics } = sector;
  const ns = metrics.northStar.value;
  const secondary = pickSecondary(metrics);
  const whollyExample = allHomeMetricsExample(sector, secondary);

  return (
    <Link
      href={`/sector/${sector.slug}`}
      className={`group block rounded-xl bg-white p-5 ring-1 transition ${
        whollyExample
          ? "ring-slate-200/50 opacity-[0.82] hover:opacity-100 hover:ring-slate-300"
          : "ring-slate-200/80 hover:ring-slate-300"
      }`}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="truncate text-[15px] font-semibold tracking-tight text-slate-900 group-hover:text-blue-700">
          {sector.name}
        </h3>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-slate-400">
          {sector.mode}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 text-[12px] leading-snug text-slate-400">
        {sector.blurb}
      </p>

      <div className="divide-y divide-slate-100">
        <MetricLane
          label={metrics.northStar.label}
          display={ns.display}
          delta={metrics.northStar.delta}
          isExample={ns.isExample}
          primary
        />
        <MetricLane
          label={secondary.label}
          display={secondary.value.display}
          delta={secondary.delta}
          isExample={secondary.value.isExample}
        />
      </div>
    </Link>
  );
}
