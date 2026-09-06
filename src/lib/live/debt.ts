import {
  debtFallback,
  deficitFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const SOURCE_URL =
  "https://x.com/mansourtarek_/status/2095562339479437369";

/**
 * US national debt $40.10T — curated from Tarek Mansour / Kalshi Citizen Debt
 * Forecast launch (2026-09-03). No live scrape of X; figure is manually curated.
 * Soft-confirm path left as identity return so the instrument stays wired like
 * interconnect (annual/event curated, not EXAMPLE).
 */
export async function fetchUsNationalDebt(): Promise<LiveMetricPayload> {
  return {
    ...debtFallback,
    value: {
      ...debtFallback.value,
      stale: false,
      provenance: "curated",
      sourceLabel: "Kalshi CDF",
      sourceUrl: SOURCE_URL,
    },
  };
}

/**
 * FY26 federal deficit $1.9T — same curated post. Secondary capital/fiscal
 * slot only (not a homepage instrument).
 */
export async function fetchFy26Deficit(): Promise<LiveMetricPayload> {
  return {
    ...deficitFallback,
    value: {
      ...deficitFallback.value,
      stale: false,
      provenance: "curated",
      sourceLabel: "Kalshi CDF",
      sourceUrl: SOURCE_URL,
    },
  };
}
