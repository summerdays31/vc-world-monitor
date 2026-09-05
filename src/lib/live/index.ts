import type { Sector } from "@/data/types";
import { fetchGpuRentalSpot } from "./gpu";
import { fetchInterconnectQueue } from "./interconnect";
import { fetchGlobalVcDeployed } from "./vc";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";

export type WiredMetricKey =
  | "ai.infraOrAdoption"
  | "data-center.infraOrAdoption"
  | "capital-formation.northStar";

export type LiveBundle = {
  gpu: LiveMetricPayload;
  interconnect: LiveMetricPayload;
  vc: LiveMetricPayload;
  fetchedAt: string;
};

export async function fetchLiveBundle(): Promise<LiveBundle> {
  const [gpu, interconnect, vc] = await Promise.all([
    fetchGpuRentalSpot(),
    fetchInterconnectQueue(),
    fetchGlobalVcDeployed(),
  ]);
  return {
    gpu,
    interconnect,
    vc,
    fetchedAt: new Date().toISOString(),
  };
}

function applyMetric(
  sector: Sector,
  slot: "northStar" | "infraOrAdoption",
  payload: LiveMetricPayload,
  label?: string
) {
  const m = sector.metrics[slot];
  if (label) m.label = label;
  m.value = payload.value;
  m.delta = payload.delta;
}

/**
 * Overlay live / curated public figures onto seed sectors.
 * All other metrics remain EXAMPLE DATA.
 */
export function applyLiveOverlays(
  sectors: Sector[],
  live: LiveBundle
): Sector[] {
  return sectors.map((s) => {
    const copy: Sector = {
      ...s,
      metrics: { ...s.metrics },
      sources: [...s.sources],
    };
    // Deep-copy metric slots we may mutate
    copy.metrics.northStar = { ...s.metrics.northStar };
    copy.metrics.capitalPulse = { ...s.metrics.capitalPulse };
    copy.metrics.infraOrAdoption = { ...s.metrics.infraOrAdoption };
    copy.metrics.talentOrAdoption = { ...s.metrics.talentOrAdoption };

    if (s.slug === "ai") {
      applyMetric(copy, "infraOrAdoption", live.gpu, "GPU rental spot (H100-eq)");
      copy.sources = [
        {
          label: live.gpu.value.sourceLabel ?? "RunPod",
          kind: live.gpu.value.provenance === "live" ? "live" : "curated",
          url: live.gpu.value.sourceUrl,
        },
        ...s.sources.filter((x) => !/GPU|gpu/i.test(x.label)),
      ];
      copy.methodology =
        "GPU rental spot is the RunPod public GraphQL H100 on-demand floor (live, hourly cache). Other AI metrics remain EXAMPLE DATA.";
    }

    if (s.slug === "data-center") {
      applyMetric(
        copy,
        "infraOrAdoption",
        live.interconnect,
        "Interconnect queue (median IR→COD)"
      );
      copy.sources = [
        {
          label: live.interconnect.value.sourceLabel ?? "LBNL Queued Up",
          kind: "curated",
          url: live.interconnect.value.sourceUrl,
        },
        ...s.sources.filter((x) => !/queue/i.test(x.label)),
      ];
      copy.methodology =
        "Interconnect queue is the LBNL Queued Up 2026 median IR→COD for U.S. projects completed in 2025 (61 months ≈ 5.1 yrs; curated from public report, verified against emp.lbl.gov/queues). Other DC metrics remain EXAMPLE DATA.";
    }

    if (s.slug === "capital-formation") {
      applyMetric(
        copy,
        "northStar",
        live.vc,
        "Global VC deployed (H1 YTD)"
      );
      copy.sources = [
        {
          label: live.vc.value.sourceLabel ?? "Dealroom",
          kind: live.vc.value.provenance === "live" ? "live" : "curated",
          url: live.vc.value.sourceUrl,
        },
        ...s.sources.filter((x) => !/VC deployed/i.test(x.label)),
      ];
      copy.methodology =
        "Global VC H1 YTD from Dealroom’s public Global guide (scraped daily with curated fallback). Alternate public cite: KPMG Venture Pulse. Other capital metrics remain EXAMPLE DATA.";
    }

    return copy;
  });
}

export { fetchGpuRentalSpot, fetchInterconnectQueue, fetchGlobalVcDeployed };
