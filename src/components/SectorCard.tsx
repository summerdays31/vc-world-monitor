import Link from "next/link";
import type { Sector } from "@/data/types";
import { modeClass, urgencyClass } from "@/lib/format";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge } from "./ExampleBadge";
import { PolicyToggle } from "./PolicyToggle";

export function SectorCard({ sector }: { sector: Sector }) {
  const { metrics } = sector;
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
          <ExampleBadge />
        </div>
      </div>

      <div className="mb-3 rounded-lg border border-zinc-800/80 bg-black/40 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          North star · {metrics.northStar.label}
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="font-mono text-2xl font-semibold text-zinc-50">
            {metrics.northStar.value.display}
          </span>
          <DeltaPill delta={metrics.northStar.delta} />
        </div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          metrics.capitalPulse,
          metrics.infraOrAdoption,
          metrics.talentOrAdoption,
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-zinc-800/60 bg-zinc-950/50 p-2"
          >
            <div className="line-clamp-2 font-mono text-[9px] uppercase leading-tight tracking-wide text-zinc-500">
              {m.label}
            </div>
            <div className="mt-1 font-mono text-sm font-medium text-zinc-200">
              {m.value.display}
            </div>
            <DeltaPill delta={m.delta} compact />
          </div>
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
        {sector.sources.map((s) => (
          <span
            key={s.label}
            className="rounded border border-zinc-800 bg-zinc-900/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-zinc-500"
          >
            {s.label}
          </span>
        ))}
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
