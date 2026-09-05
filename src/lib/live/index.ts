import type { PulseItem, Sector } from "@/data/types";
import { globalPulseExample } from "@/data/sectors";
import { fetchGpuRentalSpot } from "./gpu";
import { fetchInterconnectQueue } from "./interconnect";
import { fetchGlobalVcDeployed } from "./vc";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";

export type WiredMetricKey =
  | "ai.northStar"
  | "data-center.northStar"
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

function ensureExampleLabel(label: string): string {
  return /\(EXAMPLE\)/i.test(label) ? label : `${label} (EXAMPLE)`;
}

/**
 * Overlay live / curated public figures onto seed sectors.
 * Wired metrics are promoted to North Star for AI / Data center / Capital.
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
      catalysts: [...s.catalysts],
    };
    // Deep-copy metric slots we may mutate
    copy.metrics.northStar = { ...s.metrics.northStar };
    copy.metrics.capitalPulse = { ...s.metrics.capitalPulse };
    copy.metrics.infraOrAdoption = { ...s.metrics.infraOrAdoption };
    copy.metrics.talentOrAdoption = { ...s.metrics.talentOrAdoption };

    if (s.slug === "ai") {
      // Keep ARR (or prior north-star EXAMPLE) in infra slot
      if (!/GPU rental/i.test(copy.metrics.infraOrAdoption.label)) {
        // already swapped in seed
      } else {
        // legacy seed safety: swap if GPU still in infra
        const arr = { ...copy.metrics.northStar };
        copy.metrics.infraOrAdoption = {
          label: ensureExampleLabel(arr.label),
          value: arr.value,
          delta: arr.delta,
        };
      }
      copy.metrics.infraOrAdoption = {
        ...copy.metrics.infraOrAdoption,
        label: ensureExampleLabel(
          copy.metrics.infraOrAdoption.label.replace(/\s*\(EXAMPLE\)\s*$/i, "")
        ),
      };
      applyMetric(copy, "northStar", live.gpu, "GPU rental spot (H100-eq)");
      copy.whyItMoved =
        "Public H100-eq rental floors are the live capacity-price signal; software ARR estimates remain EXAMPLE placeholders.";
      copy.catalyst = {
        id: "ai-c-gpu",
        label: "GPU rental spot floor",
        urgency: "high",
        note: live.gpu.note ?? "RunPod public H100 on-demand floor",
      };
      copy.catalysts = [
        {
          id: "ai-c-gpu",
          label: "GPU rental spot floor",
          urgency: "high",
          note: live.gpu.note,
        },
        ...s.catalysts.filter((c) => c.id !== "ai-c-gpu" && c.id !== "ai-c1"),
      ];
      copy.sources = [
        {
          label: live.gpu.value.sourceLabel ?? "RunPod",
          kind: live.gpu.value.provenance === "live" ? "live" : "curated",
          url: live.gpu.value.sourceUrl,
        },
        ...s.sources.filter((x) => !/GPU|gpu/i.test(x.label)),
      ];
      copy.methodology =
        "North star is GPU rental spot — RunPod public GraphQL H100 on-demand floor (live, hourly cache; curated stale fallback). Est. AI software ARR and other metrics remain EXAMPLE DATA.";
    }

    if (s.slug === "data-center") {
      if (/Hyperscale|capex/i.test(copy.metrics.infraOrAdoption.label) === false) {
        // legacy: capex may still be north star in old seed
        if (/Hyperscale|capex/i.test(copy.metrics.northStar.label)) {
          const capex = { ...copy.metrics.northStar };
          copy.metrics.infraOrAdoption = {
            label: ensureExampleLabel(capex.label),
            value: capex.value,
            delta: capex.delta,
          };
        }
      }
      copy.metrics.infraOrAdoption = {
        ...copy.metrics.infraOrAdoption,
        label: ensureExampleLabel(
          copy.metrics.infraOrAdoption.label.replace(/\s*\(EXAMPLE\)\s*$/i, "")
        ),
      };
      applyMetric(
        copy,
        "northStar",
        live.interconnect,
        "Interconnect queue (median IR→COD)"
      );
      copy.whyItMoved =
        "U.S. median IR→COD interconnect queue is the binding curated bottleneck signal; hyperscale capex remains an EXAMPLE proxy.";
      copy.catalyst = {
        id: "dc-c1",
        label: "Grid interconnection queue",
        urgency: "high",
        note: live.interconnect.note ?? "LBNL Queued Up median IR→COD",
      };
      copy.sources = [
        {
          label: live.interconnect.value.sourceLabel ?? "LBNL Queued Up",
          kind: "curated",
          url: live.interconnect.value.sourceUrl,
        },
        ...s.sources.filter((x) => !/queue/i.test(x.label)),
      ];
      copy.methodology =
        "North star is interconnect queue — LBNL Queued Up 2026 median IR→COD for U.S. projects completed in 2025 (61 months ≈ 5.1 yrs; curated). Hyperscale capex and other DC metrics remain EXAMPLE DATA.";
    }

    if (s.slug === "capital-formation") {
      applyMetric(
        copy,
        "northStar",
        live.vc,
        "Global VC deployed (H1 YTD)"
      );
      copy.whyItMoved =
        "Dealroom H1’26 YTD global VC level is the wired capital signal (no misleading H1-vs-FY %); IPO window and private credit remain EXAMPLE narrative.";
      copy.sources = [
        {
          label: live.vc.value.sourceLabel ?? "Dealroom",
          kind: live.vc.value.provenance === "live" ? "live" : "curated",
          url: live.vc.value.sourceUrl,
        },
        ...s.sources.filter((x) => !/VC deployed/i.test(x.label)),
      ];
      copy.methodology =
        "North star is Global VC H1 YTD from Dealroom’s public Global guide (scraped daily with curated fallback). Period is H1’26 YTD level only unless Dealroom publishes H1’25. Other capital metrics remain EXAMPLE DATA.";
    }

    // Harden EXAMPLE labels on remaining example north stars
    if (copy.metrics.northStar.value.isExample) {
      copy.metrics.northStar = {
        ...copy.metrics.northStar,
        label: ensureExampleLabel(
          copy.metrics.northStar.label.replace(/\s*\(EXAMPLE\)\s*$/i, "")
        ),
      };
    }

    return copy;
  });
}

/** Build global pulse: three wired metrics first, then non-conflicting EXAMPLE movers. */
export function buildGlobalPulse(live: LiveBundle): PulseItem[] {
  const wired: PulseItem[] = [
    {
      id: "live-gpu",
      sectorSlug: "ai",
      sectorName: "AI",
      label: "GPU rental spot (H100-eq)",
      valueDisplay: live.gpu.value.display,
      delta: live.gpu.delta,
      isExample: false,
      provenance: live.gpu.value.provenance,
      stale: live.gpu.value.stale,
      sourceLabel: live.gpu.value.sourceLabel,
    },
    {
      id: "live-interconnect",
      sectorSlug: "data-center",
      sectorName: "Data center",
      label: "Interconnect queue (median IR→COD)",
      valueDisplay: live.interconnect.value.display,
      delta: live.interconnect.delta,
      isExample: false,
      provenance: live.interconnect.value.provenance,
      stale: live.interconnect.value.stale,
      sourceLabel: live.interconnect.value.sourceLabel,
    },
    {
      id: "live-vc",
      sectorSlug: "capital-formation",
      sectorName: "Capital",
      label: "Global VC deployed (H1 YTD)",
      valueDisplay: live.vc.value.display,
      delta: live.vc.delta,
      isExample: false,
      provenance: live.vc.value.provenance,
      stale: live.vc.value.stale,
      sourceLabel: live.vc.value.sourceLabel,
    },
  ];

  // Drop EXAMPLE pulse items that conflict with wired signals (e.g. old GPU −22%)
  const exampleSafe = globalPulseExample.filter((p) => {
    if (p.sectorSlug === "ai" && /GPU/i.test(p.label)) return false;
    if (p.sectorSlug === "data-center" && /Interconnect|queue/i.test(p.label))
      return false;
    if (p.sectorSlug === "capital-formation" && /VC deployed|Global VC/i.test(p.label))
      return false;
    return true;
  });

  return [...wired, ...exampleSafe];
}

export { fetchGpuRentalSpot, fetchInterconnectQueue, fetchGlobalVcDeployed };
