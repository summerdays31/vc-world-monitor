import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { MetricSeries } from "@/data/series";
import type { Sector } from "@/data/types";
import { isWiredSector } from "@/lib/homeMetrics";
import { InstrumentBand } from "./InstrumentBand";
import { SectorCard } from "./SectorCard";
import { SectorLeagueTable } from "./SectorLeagueTable";

/**
 * Home: signature instrument strip, then Mature / Emerging sector boards
 * for every sector with live/curated metrics.
 */
export function HomeBrowse({
  sectors,
  asOf,
  instruments,
  liveSeries,
}: {
  sectors: Sector[];
  asOf?: string;
  liveSeries?: Record<string, MetricSeries | undefined>;
  instruments: {
    gpu: LiveMetricPayload;
    interconnect: LiveMetricPayload;
    vc: LiveMetricPayload;
    debt: LiveMetricPayload;
    deficit: LiveMetricPayload;
    dcDebtIssuance: LiveMetricPayload;
    dcDebtShare: LiveMetricPayload;
  };
}) {
  const wired = sectors.filter(isWiredSector);
  const mature = wired.filter((s) => s.mode === "Mature");
  const emerging = wired.filter((s) => s.mode === "Emerging");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-5 py-8 sm:px-8 sm:py-10">
      <InstrumentBand instruments={instruments} />

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 border-b border-[#e5e2db] pb-2">
          <h2 className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">
            Mature
          </h2>
          <span className="text-[11px] tabular-nums text-[#8a847a]">
            {mature.length} sectors
            {asOf ? ` · as of ${asOf}` : ""}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mature.map((s) => (
            <SectorCard key={s.slug} sector={s} liveSeries={liveSeries} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 border-b border-[#e5e2db] pb-2">
          <h2 className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">
            Emerging
          </h2>
          <span className="text-[11px] tabular-nums text-[#8a847a]">
            {emerging.length} sectors
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {emerging.map((s) => (
            <SectorCard key={s.slug} sector={s} liveSeries={liveSeries} />
          ))}
        </div>
      </section>

      {wired.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-3 border-b border-[#e5e2db] pb-2">
            <h2 className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">
              League table
            </h2>
            <span className="text-[11px] text-[#8a847a]">
              Sourced metrics only · {wired.length} sectors
            </span>
          </div>
          <SectorLeagueTable sectors={wired} />
        </section>
      ) : null}

      <footer className="border-t border-[#e5e2db] pt-3">
        <p className="text-[11px] leading-relaxed text-[#8a847a]">
          Live / curated only across all first-class sectors. Signature
          instruments: GPU (RunPod), interconnect (LBNL), Global VC (Dealroom),
          US national debt + FY26 deficit (Kalshi CDF), US DC debt + debt share
          (MS via Steffen). Additional sector proxies from FRED, TSA,
          ClinicalTrials.gov, CISA KEV, NOAA, IFR, Netflix IR, and Wikipedia
          launch tallies. Charts use published comparison points only — no
          invented history.
          {asOf ? ` Bundle as of ${asOf}.` : ""}
        </p>
      </footer>
    </div>
  );
}
