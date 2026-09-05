import Link from "next/link";
import type { Sector, SectorMetrics } from "@/data/types";
import { modeClass } from "@/lib/format";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

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

function allHomeMetricsExample(sector: Sector, secondary: MetricSlot): boolean {
  return (
    sector.metrics.northStar.value.isExample && secondary.value.isExample
  );
}

export function SectorCard({ sector }: { sector: Sector }) {
  const { metrics } = sector;
  const ns = metrics.northStar.value;
  const secondary = pickSecondary(metrics);
  const whollyExample = allHomeMetricsExample(sector, secondary);

  return (
    <article className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-slate-300">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: sector.accent }}
            />
            <Link
              href={`/sector/${sector.slug}`}
              className="text-[15px] font-semibold tracking-tight text-slate-900 hover:text-blue-600"
            >
              {sector.name}
            </Link>
          </div>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-slate-500">
            {sector.blurb}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${modeClass(
              sector.mode
            )}`}
          >
            {sector.mode}
          </span>
          {whollyExample ? <ExampleBadge /> : null}
        </div>
      </div>

      <div className="mb-3 space-y-1 border-b border-slate-100 pb-3">
        <div className="text-[11px] font-medium text-slate-400">
          {metrics.northStar.label}
          {ns.isExample && !metrics.northStar.label.includes("(EXAMPLE)")
            ? " · EXAMPLE"
            : ""}
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[1.65rem] font-light tracking-tight tabular-nums text-slate-900">
            {ns.display}
          </span>
          <DeltaPill delta={metrics.northStar.delta} />
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {ns.isExample ? (
            <ExampleBadge />
          ) : (
            <>
              <ProvenanceBadge value={ns} />
              <span className="text-[10px] text-slate-400">as of {ns.asOf}</span>
            </>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[11px] font-medium text-slate-400">
          {secondary.label}
          {secondary.value.isExample &&
          !secondary.label.includes("(EXAMPLE)")
            ? " · EXAMPLE"
            : ""}
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-medium tabular-nums text-slate-900">
            {secondary.value.display}
          </span>
          <DeltaPill delta={secondary.delta} compact />
        </div>
        <div className="mt-1">
          {secondary.value.isExample ? (
            <ExampleBadge />
          ) : (
            <ProvenanceBadge value={secondary.value} />
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="truncate text-xs text-slate-400">
          {sector.catalyst.label}
        </span>
        <Link
          href={`/sector/${sector.slug}`}
          className="shrink-0 text-[13px] font-medium text-blue-600 transition group-hover:text-blue-700"
        >
          Open →
        </Link>
      </div>
    </article>
  );
}
