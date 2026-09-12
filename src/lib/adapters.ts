/**
 * Data adapters — live/curated overlays only on the public surface.
 * Seed EXAMPLE sectors remain in the file for reference but are filtered out
 * of listSectors / home / chip strips.
 */

import { cache } from "react";
import { sectors as seedSectors } from "@/data/sectors";
import type { PulseItem, Sector } from "@/data/types";
import {
  applyLiveOverlays,
  buildGlobalPulse,
  fetchLiveBundle,
  type LiveBundle,
} from "@/lib/live";
import { isWiredSector, WIRED_SECTOR_SLUGS } from "@/lib/homeMetrics";

export type DataProvenance = "live-curated";

export type MonitorBundle = {
  provenance: DataProvenance;
  label: string;
  asOf: string;
  refreshedAt: string;
  sectors: Sector[];
  pulse: PulseItem[];
  live: LiveBundle;
};

export const getMonitorBundle = cache(async (): Promise<MonitorBundle> => {
  const live = await fetchLiveBundle();
  const all = applyLiveOverlays(
    seedSectors.map((s) => structuredClone(s)),
    live
  );
  const sectors = all.filter(isWiredSector);
  const pulse = buildGlobalPulse(live);

  return {
    provenance: "live-curated",
    label: "LIVE / CURATED — no EXAMPLE metrics on the public surface",
    asOf: live.fetchedAt.slice(0, 10),
    refreshedAt: live.fetchedAt,
    sectors,
    pulse,
    live,
  };
});

export async function listSectors(): Promise<Sector[]> {
  return (await getMonitorBundle()).sectors;
}

export async function getSectorLive(slug: string): Promise<Sector | null> {
  const live = await fetchLiveBundle();
  const all = applyLiveOverlays(
    seedSectors.map((s) => structuredClone(s)),
    live
  );
  const sector = all.find((s) => s.slug === slug) ?? null;
  if (!sector || !isWiredSector(sector)) return null;
  return sector;
}

/** Slugs that have a public sector page. */
export function wiredSectorParams() {
  return WIRED_SECTOR_SLUGS.map((slug) => ({ slug }));
}

/**
 * @deprecated Prefer getSectorLive
 */
export async function fetchLiveSector(slug: string): Promise<Sector | null> {
  return getSectorLive(slug);
}
