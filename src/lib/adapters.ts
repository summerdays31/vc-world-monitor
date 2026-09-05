/**
 * Data adapters — EXAMPLE seed + selective live/curated overlays.
 * Keep adapters thin: map external payloads → Sector / MetricValue schema.
 */

import {
  sectors as seedSectors,
  globalPulse,
  emergingSignals,
} from "@/data/sectors";
import { briefSections, briefMeta } from "@/data/brief";
import type { Sector } from "@/data/types";
import { applyLiveOverlays, fetchLiveBundle, type LiveBundle } from "@/lib/live";

export type DataProvenance = "example" | "mixed";

export type MonitorBundle = {
  provenance: DataProvenance;
  label: string;
  asOf: string;
  sectors: Sector[];
  pulse: typeof globalPulse;
  emerging: typeof emergingSignals;
  brief: { meta: typeof briefMeta; sections: typeof briefSections };
  live?: LiveBundle;
};

export async function getMonitorBundle(): Promise<MonitorBundle> {
  const live = await fetchLiveBundle();
  const sectors = applyLiveOverlays(
    seedSectors.map((s) => structuredClone(s)),
    live
  );

  return {
    provenance: "mixed",
    label: "MIXED — live/curated overlays + EXAMPLE seed",
    asOf: live.fetchedAt.slice(0, 10),
    sectors,
    pulse: globalPulse,
    emerging: emergingSignals,
    brief: { meta: briefMeta, sections: briefSections },
    live,
  };
}

export async function listSectors(): Promise<Sector[]> {
  return (await getMonitorBundle()).sectors;
}

export async function getSectorLive(slug: string): Promise<Sector | null> {
  const sectors = await listSectors();
  return sectors.find((s) => s.slug === slug) ?? null;
}

/**
 * @deprecated Prefer getSectorLive — kept for sync static params from seed.
 */
export async function fetchLiveSector(slug: string): Promise<Sector | null> {
  return getSectorLive(slug);
}
