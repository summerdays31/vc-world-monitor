import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel } from "@/lib/homeMetrics";

/**
 * Emerging — short editorial list, not a cloned table/card farm.
 */
export function EmergingEditorial({
  sector,
}: {
  sector: Sector;
  muted?: boolean;
}) {
  const ns = sector.metrics.northStar;

  return (
    <Link
      href={`/sector/${sector.slug}`}
      className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-slate-100 py-4 last:border-0"
    >
      <div className="min-w-0">
        <h3 className="text-[15px] font-medium tracking-tight text-slate-900 group-hover:underline">
          {sector.name}
        </h3>
        <p className="mt-0.5 truncate text-[13px] text-slate-500">
          {sector.blurb}
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono text-[1.125rem] font-medium tracking-tight text-slate-900 [font-variant-numeric:tabular-nums]">
          {ns.value.display}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400">
          {cleanLabel(ns.label)}
        </p>
      </div>
    </Link>
  );
}
