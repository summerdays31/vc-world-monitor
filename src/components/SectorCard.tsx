import Link from "next/link";
import type { Sector, SectorMetrics } from "@/data/types";
import { modeClass, urgencyClass } from "@/lib/format";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";
import { MetricBlock } from "./MetricBlock";

type MetricSlot = SectorMetrics["capitalPulse"];

/** Home: North Star + one secondary. Prefer live/curated; else stronger of capital vs infra. */
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
    // both curated — prefer capital pulse as the markets signal
    return metrics.capitalPulse;
  }
  // both EXAMPLE — pick stronger: non-flat delta beats flat; else capital
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
    <article
      className="group flex flex-col rounded-xl border border-zinc-800/90 bg-[#0b0e13] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-zinc-600/80 hover:shadow-[0_0_40px_-20px_rgba(125,211,252,0.35)]"
      style={{ borderTopColor: `${sector.accent}55`, borderTopWidth: 2 }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            href={`/sector/${sector.slug}`}
            className="text-lg font-semibold tracking-tight text-zinc-50 hover:underline"
          >
            {sector.name}
          </Link>
          <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
            {sector.blurb}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${modeClass(
              sector.mode
            )}`}
          >
            {sector.mode}
          </span>
          {whollyExample ? <ExampleBadge /> : null}
        </div>
      </div>

      <div
        className={`mb-2 rounded-lg border p-3 ${
          ns.isExample
            ? "border-amber-500/40 border-dashed bg-amber-950/20"
            : "border-zinc-800/80 bg-black/40"
        }`}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          North star · {metrics.northStar.label}
          {ns.isExample && !metrics.northStar.label.includes("(EXAMPLE)")
            ? " · EXAMPLE"
            : ""}
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span
            className={`font-mono text-2xl font-semibold ${
              ns.isExample ? "text-amber-100/90" : "text-zinc-50"
            }`}
          >
            {ns.display}
          </span>
          <DeltaPill delta={metrics.northStar.delta} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {ns.isExample ? (
            <ExampleBadge />
          ) : (
            <>
              <ProvenanceBadge value={ns} />
              <span className="font-mono text-[9px] text-zinc-600">
                as of {ns.asOf}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="mb-3">
        <MetricBlock
          label={secondary.label}
          value={secondary.value}
          delta={secondary.delta}
        />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${urgencyClass(
            sector.catalyst.urgency
          )}`}
        >
          Catalyst · {sector.catalyst.label}
        </span>
      </div>

      <div className="mt-auto">
        <Link
          href={`/sector/${sector.slug}`}
          className="inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-400/90 transition group-hover:text-emerald-300"
        >
          Full metrics & why it moved →
        </Link>
      </div>
    </article>
  );
}
