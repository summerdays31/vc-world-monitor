import Link from "next/link";
import type { Sector } from "@/data/types";
import {
  cleanLabel,
  isPlaceholderSector,
  pickSecondary,
  type MetricSlot,
} from "@/lib/homeMetrics";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceMark } from "./ProvenanceBadge";

function MetricLane({
  label,
  slot,
  primary,
}: {
  label: string;
  slot: MetricSlot;
  primary?: boolean;
}) {
  const { value, delta } = slot;
  return (
    <div className={primary ? "space-y-1 pb-3" : "space-y-1 pt-3"}>
      <div className="flex items-baseline justify-between gap-2">
        <p
          className={`min-w-0 truncate text-[11px] ${
            primary
              ? "font-medium text-[#6b6560]"
              : "font-normal text-[#8a847a]"
          }`}
          title={cleanLabel(label)}
        >
          {cleanLabel(label)}
        </p>
        <DeltaPill delta={delta} compact showPeriod={false} />
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span
          className={`tracking-tight tabular-nums text-[#0a0a0a] ${
            primary
              ? "text-[1.55rem] font-semibold leading-none"
              : "text-[15px] font-medium leading-none text-[#3d3a36]"
          }`}
        >
          {value.display}
        </span>
        {value.isExample ? (
          <ExampleBadge />
        ) : (
          <ProvenanceMark value={value} />
        )}
      </div>
    </div>
  );
}

/** Home sector card — at most two metrics (north star + one secondary). */
export function SectorCard({ sector }: { sector: Sector }) {
  const { metrics } = sector;
  const secondary = pickSecondary(metrics);
  const whollyExample = isPlaceholderSector(sector);

  return (
    <Link
      href={`/sector/${sector.slug}`}
      className="group flex h-full flex-col rounded-lg border border-[#e5e2db] bg-[#fffcf7] p-4 transition hover:border-[#d9d4cb] hover:bg-[#f0eee8]/40 sm:p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: sector.accent }}
              aria-hidden
            />
            <h3 className="truncate text-[15px] font-semibold tracking-tight text-[#0a0a0a] group-hover:text-[#3d3a36]">
              {sector.name}
            </h3>
          </div>
          <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-[#8a847a]">
            {sector.blurb}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
            {sector.mode}
          </span>
          {whollyExample ? <ExampleBadge /> : null}
        </div>
      </div>

      <div className="mt-auto divide-y divide-[#e5e2db]">
        <MetricLane
          label={metrics.northStar.label}
          slot={metrics.northStar}
          primary
        />
        <MetricLane label={secondary.label} slot={secondary} />
      </div>
    </Link>
  );
}
