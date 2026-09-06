import Link from "next/link";
import type { Sector } from "@/data/types";
import {
  cleanLabel,
  isPlaceholderSector,
  pickSecondary,
  type MetricSlot,
} from "@/lib/homeMetrics";
import { DeltaPill } from "./DeltaPill";

function MetricLane({
  label,
  display,
  delta,
  primary,
}: {
  label: string;
  display: string;
  delta: MetricSlot["delta"];
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
      </div>
      <div className="justify-self-end">
        <DeltaPill delta={delta} compact showPeriod={false} />
      </div>
      <div
        className={`col-span-2 font-mono tracking-tight text-slate-900 [font-variant-numeric:tabular-nums] ${
          primary
            ? "text-[1.55rem] font-medium leading-none"
            : "text-[15px] font-medium leading-none text-slate-700"
        }`}
      >
        {display}
      </div>
    </div>
  );
}

/** Legacy card — prefer league / editorial on home. Kept for reuse. */
export function SectorCard({ sector }: { sector: Sector }) {
  const { metrics } = sector;
  const ns = metrics.northStar.value;
  const secondary = pickSecondary(metrics);
  const whollyExample = isPlaceholderSector(sector);

  return (
    <Link
      href={`/sector/${sector.slug}`}
      className={`group block border-b border-slate-200/70 py-4 ${
        whollyExample ? "opacity-50 hover:opacity-90" : ""
      }`}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
          {sector.name}
        </h3>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-slate-400">
          {sector.mode}
        </span>
      </div>

      <p className="mb-3 line-clamp-2 text-[12px] leading-snug text-slate-400">
        {sector.blurb}
      </p>

      <div className="divide-y divide-slate-100">
        <MetricLane
          label={metrics.northStar.label}
          display={ns.display}
          delta={metrics.northStar.delta}
          primary
        />
        <MetricLane
          label={secondary.label}
          display={secondary.value.display}
          delta={secondary.delta}
        />
      </div>
    </Link>
  );
}
