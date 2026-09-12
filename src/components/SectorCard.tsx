import Link from "next/link";
import type { Sector } from "@/data/types";
import { seriesByKey } from "@/data/series";
import {
  cleanLabel,
  realMetricSlots,
  type MetricSlot,
} from "@/lib/homeMetrics";
import { DeltaPill } from "./DeltaPill";
import { ProvenanceMark } from "./ProvenanceBadge";
import { ContextBars } from "./charts/ContextBars";

function seriesForSlot(sectorSlug: string, slot: MetricSlot) {
  if (sectorSlug === "data-center") {
    if (/Interconnect/i.test(slot.label)) return seriesByKey.interconnect;
    if (/Debt share/i.test(slot.label)) return seriesByKey.dcDebtShare;
  }
  if (sectorSlug === "capital-formation") {
    if (/deficit/i.test(slot.label)) return seriesByKey.deficit;
  }
  return undefined;
}

function MetricLane({
  sectorSlug,
  slot,
  primary,
}: {
  sectorSlug: string;
  slot: MetricSlot;
  primary?: boolean;
}) {
  const { value, delta } = slot;
  const series = seriesForSlot(sectorSlug, slot);
  return (
    <div className={primary ? "space-y-2 pb-3" : "space-y-2 pt-3"}>
      <div className="flex items-baseline justify-between gap-2">
        <p
          className={`min-w-0 truncate text-[11px] ${
            primary
              ? "font-medium text-[#6b6560]"
              : "font-normal text-[#8a847a]"
          }`}
          title={cleanLabel(slot.label)}
        >
          {cleanLabel(slot.label)}
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
        <ProvenanceMark value={value} />
      </div>
      {series && series.points.length >= 2 ? (
        <div className="pt-1">
          <ContextBars series={series} height={72} />
        </div>
      ) : null}
    </div>
  );
}

/** Home sector card — real metrics only (headline + chart when series exists). */
export function SectorCard({ sector }: { sector: Sector }) {
  const slots = realMetricSlots(sector.metrics);
  if (slots.length === 0) return null;

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
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
          {sector.mode}
        </span>
      </div>

      <div className="mt-auto divide-y divide-[#e5e2db]">
        {slots.map((slot, i) => (
          <MetricLane
            key={slot.label}
            sectorSlug={sector.slug}
            slot={slot}
            primary={i === 0}
          />
        ))}
      </div>
    </Link>
  );
}
