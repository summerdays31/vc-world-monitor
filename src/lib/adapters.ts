/**
 * Data adapters — swap EXAMPLE seed for live feeds later.
 * Keep adapters thin: map external payloads → Sector / MetricValue schema.
 */

import { sectors, globalPulse, emergingSignals } from "@/data/sectors";
import { briefSections, briefMeta } from "@/data/brief";
import type { Sector } from "@/data/types";

export type DataProvenance = "example";

export function getMonitorBundle() {
  return {
    provenance: "example" as DataProvenance,
    label: "EXAMPLE DATA",
    asOf: "2026-09-01",
    sectors,
    pulse: globalPulse,
    emerging: emergingSignals,
    brief: { meta: briefMeta, sections: briefSections },
  };
}

export function listSectors(): Sector[] {
  return getMonitorBundle().sectors;
}

/**
 * Future: replace body with fetch to your warehouse / API.
 * Signature stays stable so UI does not churn.
 */
export async function fetchLiveSector(_slug: string): Promise<Sector | null> {
  // Placeholder — live wiring documented in README
  return null;
}
