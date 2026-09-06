import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel, pickSecondary } from "@/lib/homeMetrics";

/**
 * Emerging anatomy — editorial, sparse, thesis-forward.
 * Not the mature title+chip+blurb+big+mini stack.
 */
export function EmergingEditorial({
  sector,
  muted = false,
}: {
  sector: Sector;
  muted?: boolean;
}) {
  const ns = sector.metrics.northStar;
  const secondary = pickSecondary(sector.metrics);

  return (
    <Link
      href={`/sector/${sector.slug}`}
      className={`group block border-b border-slate-200/60 py-6 last:border-0 ${
        muted ? "opacity-45 hover:opacity-80" : ""
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-end">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Emerging
          </p>
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900 group-hover:text-slate-700 sm:text-2xl">
            {sector.name}
          </h3>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-slate-500">
            {sector.blurb}
          </p>
          <p className="mt-3 text-[12px] leading-snug text-slate-400">
            <span className="text-slate-500">Catalyst · </span>
            {sector.catalyst.label}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-[11px] text-slate-400">
            {cleanLabel(ns.label)}
          </p>
          <p className="mt-1 font-mono text-[1.75rem] font-medium tracking-tight text-slate-900 [font-variant-numeric:tabular-nums]">
            {ns.value.display}
          </p>
          <p className="mt-2 font-mono text-[12px] text-slate-400 [font-variant-numeric:tabular-nums]">
            {secondary.value.display}
            <span className="ml-1.5 font-sans text-[11px]">
              {cleanLabel(secondary.label)}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
