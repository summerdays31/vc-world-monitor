import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { Sector } from "@/data/types";
import { InstrumentBand } from "./InstrumentBand";
import { SectorCard } from "./SectorCard";
import { SectorLeagueTable } from "./SectorLeagueTable";

export type ModeFilter = "Mature" | "Emerging" | "All";

/**
 * Full product home: compact live strip + Mature / Emerging sector boards
 * (max 2 metrics each). EXAMPLE sectors stay visible — product completeness
 * over critic austerity. League table is secondary scan only.
 */
export function HomeBrowse({
  mature,
  emerging,
  mode = "All",
  asOf,
  instruments,
}: {
  mature: Sector[];
  emerging: Sector[];
  mode?: ModeFilter;
  asOf?: string;
  instruments: {
    gpu: LiveMetricPayload;
    interconnect: LiveMetricPayload;
    vc: LiveMetricPayload;
    debt: LiveMetricPayload;
    deficit?: LiveMetricPayload | null;
  };
}) {
  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const leagueSectors = [
    ...(showMature ? mature : []),
    ...(showEmerging ? emerging : []),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-5 py-8 sm:px-8 sm:py-10">
      <InstrumentBand
        gpu={instruments.gpu}
        interconnect={instruments.interconnect}
        vc={instruments.vc}
        debt={instruments.debt}
        deficit={instruments.deficit}
      />

      {showMature ? (
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
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      ) : null}

      {showEmerging ? (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3 border-b border-[#e5e2db] pb-2">
            <h2 className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">
              Emerging
            </h2>
            <span className="text-[11px] tabular-nums text-[#8a847a]">
              {emerging.length} sectors
              {asOf ? ` · as of ${asOf}` : ""}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {emerging.map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      ) : null}

      {leagueSectors.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-3 border-b border-[#e5e2db] pb-2">
            <h2 className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">
              League table
            </h2>
            <span className="text-[11px] text-[#8a847a]">
              Dense scan · two metrics per sector
            </span>
          </div>
          <SectorLeagueTable sectors={leagueSectors} />
        </section>
      ) : null}

      <footer className="border-t border-[#e5e2db] pt-3">
        <p className="text-[11px] leading-relaxed text-[#8a847a]">
          Live / curated: GPU (RunPod), interconnect (LBNL), Global VC
          (Dealroom), US national debt (Kalshi CDF). Other figures are example
          placeholders — open a sector for full detail.
          {asOf ? ` Bundle as of ${asOf}.` : ""}
        </p>
      </footer>
    </div>
  );
}
