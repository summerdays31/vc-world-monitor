import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { Sector } from "@/data/types";
import { isWiredSector } from "@/lib/homeMetrics";
import { InstrumentBand } from "./InstrumentBand";
import { SectorCard } from "./SectorCard";
import { SectorLeagueTable } from "./SectorLeagueTable";

/**
 * Home: instrument strip of all real headline numbers, then sector cards
 * only for sectors that still have live/curated metrics.
 */
export function HomeBrowse({
  sectors,
  asOf,
  instruments,
}: {
  sectors: Sector[];
  asOf?: string;
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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-5 py-8 sm:px-8 sm:py-10">
      <InstrumentBand instruments={instruments} />

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 border-b border-[#e5e2db] pb-2">
          <h2 className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">
            Sectors with sourced metrics
          </h2>
          <span className="text-[11px] tabular-nums text-[#8a847a]">
            {wired.length} sectors
            {asOf ? ` · as of ${asOf}` : ""}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {wired.map((s) => (
            <SectorCard key={s.slug} sector={s} />
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
              Sourced metrics only
            </span>
          </div>
          <SectorLeagueTable sectors={wired} />
        </section>
      ) : null}

      <footer className="border-t border-[#e5e2db] pt-3">
        <p className="text-[11px] leading-relaxed text-[#8a847a]">
          Live / curated only: GPU (RunPod), interconnect (LBNL), Global VC
          (Dealroom), US national debt + FY26 deficit (Kalshi CDF), US DC debt
          issuance + debt share of hyperscaler capex (MS via Steffen). Charts
          use published comparison points only — no invented history.
          {asOf ? ` Bundle as of ${asOf}.` : ""}
        </p>
      </footer>
    </div>
  );
}
