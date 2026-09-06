import Link from "next/link";
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
  asOf,
}: {
  mature: Sector[];
  emerging: Sector[];
  mode?: ModeFilter;
  asOf?: string;
}) {
  const wiredMature = mature.filter(isWiredSector);
  const wiredEmerging = emerging.filter(isWiredSector);

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const matureRows = showMature ? wiredMature : [];
  const emergingRows = showEmerging ? wiredEmerging : [];
  const hasContent = matureRows.length > 0 || emergingRows.length > 0;

  return (
    <div className="space-y-6">
      {matureRows.length > 0 ? (
        <SectorLeagueTable sectors={matureRows} />
      ) : null}

      {emergingRows.length > 0 ? (
        <section>
          <h2 className="mb-1 text-[12px] font-medium tracking-wide text-slate-600">
            Emerging
          </h2>
          <div className="border-t border-slate-200">
            {emergingRows.map((s) => (
              <EmergingEditorial key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      ) : null}

      {hasContent ? (
        <aside className="border-t border-slate-200 pt-4 text-[11px] leading-relaxed text-slate-400">
          {asOf ? <span>As of {asOf}. </span> : null}
          Live rental floors and curated public reports; details on each sector
          page.{" "}
          <Link
            href="/brief"
            className="text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
          >
            Brief
          </Link>
        </aside>
      ) : null}
    </div>
  );
}
