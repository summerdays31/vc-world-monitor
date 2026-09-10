import type { PulseItem, Sector } from "@/data/types";
import { globalPulseExample } from "@/data/sectors";
import { fetchGpuRentalSpot } from "./gpu";
import { fetchInterconnectQueue } from "./interconnect";
import { fetchGlobalVcDeployed } from "./vc";
import { fetchUsNationalDebt, fetchFy26Deficit } from "./debt";
import { fetchDcDebtIssuance, fetchDcDebtShare } from "./dcDebt";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";

export type WiredMetricKey =
  | "ai.northStar"
  | "data-center.northStar"
  | "data-center.capitalPulse"
  | "data-center.infraOrAdoption"
  | "capital-formation.northStar"
  | "capital-formation.capitalPulse"
  | "capital-formation.infraOrAdoption";

export type LiveBundle = {
  gpu: LiveMetricPayload;
  interconnect: LiveMetricPayload;
  vc: LiveMetricPayload;
  debt: LiveMetricPayload;
  deficit: LiveMetricPayload;
  dcDebtIssuance: LiveMetricPayload;
  dcDebtShare: LiveMetricPayload;
  fetchedAt: string;
};

export async function fetchLiveBundle(): Promise<LiveBundle> {
  const [gpu, interconnect, vc, debt, deficit, dcDebtIssuance, dcDebtShare] =
    await Promise.all([
      fetchGpuRentalSpot(),
      fetchInterconnectQueue(),
      fetchGlobalVcDeployed(),
      fetchUsNationalDebt(),
      fetchFy26Deficit(),
      fetchDcDebtIssuance(),
      fetchDcDebtShare(),
    ]);
  return {
    gpu,
    interconnect,
    vc,
    debt,
    deficit,
    dcDebtIssuance,
    dcDebtShare,
    fetchedAt: new Date().toISOString(),
  };
}

function applyMetric(
  sector: Sector,
  slot: "northStar" | "infraOrAdoption" | "capitalPulse",
  payload: LiveMetricPayload,
  label?: string
) {
  const m = sector.metrics[slot];
  if (label) m.label = label;
  m.value = payload.value;
  // Schema still requires Delta; empty display = no change (UI shows —)
  m.delta = payload.delta ?? {
    display: "",
    direction: "flat",
    period: "",
    isExample: false,
  };
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
        "North star is GPU rental spot — RunPod public GraphQL H100 on-demand floor (live, daily cache + cron warm; curated stale fallback). Est. AI software ARR and other metrics remain EXAMPLE DATA.";
    }

    if (s.slug === "data-center") {
      applyMetric(
        copy,
        "northStar",
        live.interconnect,
        "Interconnect queue (median IR→COD)"
      );
      // Capital pulse = DC debt issuance (second homepage metric); debt share replaces EXAMPLE hyperscale capex.
      applyMetric(
        copy,
        "capitalPulse",
        live.dcDebtIssuance,
        "US DC debt issuance (2025)"
      );
      applyMetric(
        copy,
        "infraOrAdoption",
        live.dcDebtShare,
        "Debt share of hyperscaler capex"
      );
      copy.whyItMoved =
        "Interconnect queue remains the binding physical bottleneck; US data-center debt issuance ~$182B in 2025 (~2× YoY) is the curated capital pulse into DC build-out (MS via Steffen) — not EXAMPLE.";
      copy.catalyst = {
        id: "dc-c1",
        label: "Grid interconnection queue",
        urgency: "high",
        note: live.interconnect.note ?? "LBNL Queued Up median IR→COD",
      };
      copy.catalysts = [
        {
          id: "dc-c1",
          label: "Grid interconnection queue",
          urgency: "high",
          note: live.interconnect.note,
        },
        {
          id: "dc-c-nvda-financing",
          label: "Nvidia >$500B compute financing MOUs",
          urgency: "high",
          note:
            "Apollo / BlackRock / Blackstone / Brookfield / GS / KKR — announced platforms to mobilize >$500B third-party capital; MOUs, not committed (Nvidia, Aug 10, 2026).",
        },
        ...s.catalysts.filter(
          (c) => c.id !== "dc-c1" && c.id !== "dc-c-nvda-financing"
        ),
      ];
      copy.movers = [
        {
          id: "dc-m-hyperion",
          name: "Meta Hyperion SPV debt",
          delta: {
            display: "$27B",
            direction: "up",
            period: "issue",
            isExample: false,
          },
          context:
            "A+ SPV/JV (Blue Owl 80%, Meta 20%); off Meta BS — template for platform model (MS/Steffen).",
        },
        ...s.movers.filter((m) => m.id !== "dc-m-hyperion"),
      ];
      copy.sources = [
        {
          label: live.interconnect.value.sourceLabel ?? "LBNL Queued Up",
          kind: "curated",
          url: live.interconnect.value.sourceUrl,
        },
        {
          label: live.dcDebtIssuance.value.sourceLabel ?? "MS via Steffen",
          kind: "curated",
          url: live.dcDebtIssuance.value.sourceUrl,
        },
        {
          label: "Nvidia >$500B financing MOUs",
          kind: "curated",
          url: "https://nvidianews.nvidia.com/news/nvidia-partners-with-apollo-blackrock-blackstone-brookfield-goldman-sachs-and-kkr-to-establish-ai-compute-infrastructure-financing-platforms-to-mobilize-over-500-billion-of-third-party-capital",
        },
        ...s.sources.filter(
          (x) =>
            !/queue|capex|Steffen|DC debt|debt issuance|Hyperion|Nvidia/i.test(
              x.label
            )
        ),
      ];
      copy.methodology =
        "North star is interconnect queue — LBNL Queued Up 2026 median IR→COD for U.S. projects completed in 2025 (61 months ≈ 5.1 yrs; curated). Capital pulse is US data-center debt issuance ~$182B in 2025 (~2× YoY) — industry estimate via Morgan Stanley / FT·Bloomberg as summarized by Steffen (2026-08-14), curated not live API. Secondary: incremental debt share of hyperscaler capex ~32% trailing mid-2026 vs ~9% FY2024 (same cite). Catalyst: Nvidia MOUs with Apollo/BlackRock/Blackstone/Brookfield/GS/KKR to mobilize >$500B third-party compute financing (announced platforms, not committed; Aug 10, 2026). Mover: Meta Hyperion ~$27B SPV debt. Talent/facilities roles remain EXAMPLE DATA.";
    }

    if (s.slug === "capital-formation") {
      // Debt is capital north star; keep Global VC as wired capitalPulse;
      // FY26 deficit as quiet infra secondary.
      applyMetric(copy, "northStar", live.debt, "US national debt");
      applyMetric(
        copy,
        "capitalPulse",
        live.vc,
        "Global VC deployed (H1 YTD)"
      );
      applyMetric(
        copy,
        "infraOrAdoption",
        live.deficit,
        "FY26 federal deficit"
      );
      copy.whyItMoved =
        "Gross US national debt at $40.10T is the curated capital/fiscal north star (Kalshi CDF); Dealroom H1’26 YTD global VC remains the wired private-capital pulse.";
      copy.catalyst = {
        id: "cf-c-debt",
        label: "US national debt $40.10T",
        urgency: "high",
        note: live.debt.note ?? "Kalshi Citizen Debt Forecast",
      };
      copy.catalysts = [
        {
          id: "cf-c-debt",
          label: "US national debt $40.10T",
          urgency: "high",
          note: live.debt.note,
        },
        ...s.catalysts.filter((c) => c.id !== "cf-c-debt"),
      ];
      copy.sources = [
        {
          label: live.debt.value.sourceLabel ?? "Kalshi CDF",
          kind: "curated",
          url: live.debt.value.sourceUrl,
        },
        {
          label: live.vc.value.sourceLabel ?? "Dealroom",
          kind: live.vc.value.provenance === "live" ? "live" : "curated",
          url: live.vc.value.sourceUrl,
        },
        ...s.sources.filter(
          (x) => !/VC deployed|national debt|Kalshi|Mansour/i.test(x.label)
        ),
      ];
      copy.methodology =
        "North star is gross US national debt ($40.10T) curated from the Kalshi Citizen Debt Forecast / Tarek Mansour launch post (2026-09-03) — not EXAMPLE. Capital pulse is Global VC H1 YTD from Dealroom (live scrape + curated fallback). FY26 deficit $1.9T is the same curated fiscal post. Other capital figures remain EXAMPLE DATA.";
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

/** Build global pulse: wired instruments first, then non-conflicting EXAMPLE movers. */
export function buildGlobalPulse(live: LiveBundle): PulseItem[] {
  const wired: PulseItem[] = [
    {
      id: "live-gpu",
      sectorSlug: "ai",
      sectorName: "AI",
      label: "GPU rental spot (H100-eq)",
      valueDisplay: live.gpu.value.display,
      delta: live.gpu.delta ?? {
        display: "",
        direction: "flat" as const,
        period: "",
        isExample: false,
      },
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
      delta: live.interconnect.delta ?? {
        display: "",
        direction: "flat" as const,
        period: "",
        isExample: false,
      },
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
      delta: live.vc.delta ?? {
        display: "",
        direction: "flat" as const,
        period: "",
        isExample: false,
      },
      isExample: false,
      provenance: live.vc.value.provenance,
      stale: live.vc.value.stale,
      sourceLabel: live.vc.value.sourceLabel,
    },
    {
      id: "live-debt",
      sectorSlug: "capital-formation",
      sectorName: "Capital",
      label: "US national debt",
      valueDisplay: live.debt.value.display,
      delta: live.debt.delta ?? {
        display: "",
        direction: "flat" as const,
        period: "",
        isExample: false,
      },
      isExample: false,
      provenance: live.debt.value.provenance,
      stale: live.debt.value.stale,
      sourceLabel: live.debt.value.sourceLabel,
    },
  ];

  // Drop EXAMPLE pulse items that conflict with wired signals (e.g. old GPU −22%)
  const exampleSafe = globalPulseExample.filter((p) => {
    if (p.sectorSlug === "ai" && /GPU/i.test(p.label)) return false;
    if (
      p.sectorSlug === "data-center" &&
      /Interconnect|queue|DC debt|debt issuance/i.test(p.label)
    )
      return false;
    if (p.sectorSlug === "capital-formation" && /VC deployed|Global VC|national debt|debt/i.test(p.label))
      return false;
    return true;
  });

  return [...wired, ...exampleSafe];
}

export {
  fetchGpuRentalSpot,
  fetchInterconnectQueue,
  fetchGlobalVcDeployed,
  fetchUsNationalDebt,
  fetchFy26Deficit,
  fetchDcDebtIssuance,
  fetchDcDebtShare,
};
