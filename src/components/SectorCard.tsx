import Link from "next/link";
import type { Sector } from "@/data/types";
import { modeClass, urgencyClass } from "@/lib/format";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";
import { MetricBlock } from "./MetricBlock";
import { PolicyToggle } from "./PolicyToggle";

function allMetricsExample(sector: Sector): boolean {
  const vals = [
    sector.metrics.northStar.value,
    sector.metrics.capitalPulse.value,
    sector.metrics.infraOrAdoption.value,
    sector.metrics.talentOrAdoption.value,
  ];
  return vals.every((v) => v.isExample);
}

export function SectorCard({ sector }: { sector: Sector }) {
  const { metrics } = sector;
  const ns = metrics.northStar.value;
  const whollyExample = allMetricsExample(sector);
  return (
    <article
      className="group flex flex-col rounded-xl border border-zinc-800/90 bg-[#0b0e13] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-zinc-600/80 hover:shadow-[0_0_40px_-20px_rgba(125,211,252,0.35)]"
      style={{ borderTopColor: `${sector.accent}55`, borderTopWidth: 2 }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <Link
            href={`/sector/${sector.slug}`}
            className="text-lg font-semibold tracking-tight text-zinc-50 hover:underline"
          >
            {sector.name}
          </Link>
          <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{sector.blurb}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${modeClass(
              sector.mode
            )}`}
          >
            {sector.mode}
          </span>
          {/* Card chrome: EXAMPLE only when every metric is placeholder.
              Never put Live/Curated on the sector chrome — that implied the
              whole sector was wired when only one metric was. */}
          {whollyExample ? <ExampleBadge /> : null}
        </div>
      </div>

      <div
        className={`mb-3 rounded-lg border p-3 ${
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

      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          metrics.capitalPulse,
          metrics.infraOrAdoption,
          metrics.talentOrAdoption,
        ].map((m) => (
          <MetricBlock
            key={m.label}
            label={m.label}
            value={m.value}
            delta={m.delta}
          />
        ))}
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

      <p className="mb-3 text-sm leading-snug text-zinc-400">
        <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-600">
          Why it moved ·{" "}
        </span>
        {sector.whyItMoved}
      </p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {sector.sources.map((s) =>
          s.url ? (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide ${
                s.kind === "live"
                  ? "border-emerald-800 bg-emerald-950/50 text-emerald-400"
                  : s.kind === "curated"
                    ? "border-sky-800 bg-sky-950/50 text-sky-400"
                    : "border-amber-800/60 bg-amber-950/30 text-amber-500/90"
              }`}
            >
              {s.label}
            </a>
          ) : (
            <span
              key={s.label}
              className="rounded border border-amber-800/60 bg-amber-950/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-amber-500/90"
            >
              {s.label}
            </span>
          )
        )}
      </div>

      <div className="mt-auto space-y-3">
        <PolicyToggle policy={sector.policy} />
        <Link
          href={`/sector/${sector.slug}`}
          className="inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-400/90 transition group-hover:text-emerald-300"
        >
          Open sector →
        </Link>
      </div>
    </article>
  );
}
