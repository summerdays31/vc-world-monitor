import {
  dcDebtIssuanceFallback,
  dcDebtShareFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const STEFFEN_URL =
  "https://www.sascha-steffen.de/updates/nvidia-500bn-ai-financing-credit-risk";

/**
 * US data-center debt issuance ~$182B (2025) — curated industry estimate via
 * Morgan Stanley / FT·Bloomberg as summarized by Steffen (2026-08-14).
 * No live scrape; figure is manually curated (same pattern as US national debt).
 */
export async function fetchDcDebtIssuance(): Promise<LiveMetricPayload> {
  return {
    ...dcDebtIssuanceFallback,
    value: {
      ...dcDebtIssuanceFallback.value,
      stale: false,
      provenance: "curated",
      sourceLabel: "MS via Steffen",
      sourceUrl: STEFFEN_URL,
    },
  };
}

/**
 * Incremental debt share of hyperscaler capex ~32% (trailing mid-2026).
 * Secondary DC capital-structure slot — curated, not EXAMPLE.
 */
export async function fetchDcDebtShare(): Promise<LiveMetricPayload> {
  return {
    ...dcDebtShareFallback,
    value: {
      ...dcDebtShareFallback.value,
      stale: false,
      provenance: "curated",
      sourceLabel: "MS via Steffen",
      sourceUrl: STEFFEN_URL,
    },
  };
}
