import type { Sector } from "@/data/types";
import { isWiredSector } from "@/lib/homeMetrics";
import { EmergingEditorial } from "./EmergingEditorial";
import { SectorLeagueTable } from "./SectorLeagueTable";

export type ModeFilter = "Mature" | "Emerging" | "All";

/**
 * Home body — live/curated mature table + optional emerging editorial.
 * Placeholders never appear here.
 */
export function HomeBrowse({
  mature,
  emerging,
  mode = "All",
}: {
  mature: Sector[];
  emerging: Sector[];
  mode?: ModeFilter;
}) {
  const wiredMature = mature.filter(isWiredSector);
  const wiredEmerging = emerging.filter(isWiredSector);

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const matureRows = showMature ? wiredMature : [];
  const emergingRows = showEmerging ? wiredEmerging : [];

  return (
    <div className="space-y-10">
      {matureRows.length > 0 ? (
        <SectorLeagueTable sectors={matureRows} />
      ) : null}

      {emergingRows.length > 0 ? (
        <section>
          <h2 className="mb-1 text-[13px] font-medium text-slate-800">
            Emerging
          </h2>
          <div className="border-t border-slate-200">
            {emergingRows.map((s) => (
              <EmergingEditorial key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
