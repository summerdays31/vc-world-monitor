/**
 * Last-known public figures used when live fetch fails, or when the metric
 * is only available from occasional published reports (CURATED, not EXAMPLE).
 * Never invent numbers — refresh from the cited URLs only.
 */

import type { Delta, MetricValue } from "@/data/types";

export type LiveMetricPayload = {
  value: MetricValue;
  /** Omit or null when there is no meaningful period change. */
  delta?: Delta | null;
  note?: string;
};

/** Empty flat delta for schema slots that still require a Delta object. */
export const noChangeDelta: Delta = {
  display: "",
  direction: "flat",
  period: "",
  isExample: false,
};

/** RunPod community on-demand floor observed 2026-09-05 (fallback if GraphQL fails). */
export const gpuFallback: LiveMetricPayload = {
  value: {
    display: "$2.69/hr",
    numeric: 2.69,
    unit: "CUSTOM",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-05",
    stale: true,
    sourceLabel: "RunPod (last known)",
    sourceUrl: "https://www.runpod.io/pricing",
  },
  delta: null,
  note: "H100 SXM / NVL community on-demand floor from RunPod public GraphQL.",
};

/**
 * LBNL Queued Up 2026 Edition: median IR→COD for projects completed in 2025
 * was 61 months (~5.1 yrs); page summary says “over 5 years”.
 * Prior edition: 55 months for 2024 completions (~4.6 yrs).
 */
export const interconnectFallback: LiveMetricPayload = {
  value: {
    display: "5.1 yrs",
    numeric: 5.1,
    unit: "CUSTOM",
    isExample: false,
    provenance: "curated",
    asOf: "2025-12-31",
    sourceLabel: "LBNL Queued Up 2026",
    sourceUrl: "https://emp.lbl.gov/queues",
  },
  delta: {
    display: "+0.5y",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note:
    "Median months from interconnection request to commercial operation for U.S. projects completed in 2025 (61 mo). Refresh when LBNL publishes the next Queued Up edition (annual).",
};

/**
 * Dealroom Global VC guide: $506.2B raised in first 6 months of 2026
 * (closed quarters through Q2 2026). Full-year 2025 was $444.1B on the same
 * page — do NOT compare H1 YTD to full-year FY as a %. Dealroom does not
 * publish a clear H1’25 figure on the public guide, so no Δ until comparable.
 */
export const vcFallback: LiveMetricPayload = {
  value: {
    display: "$506B",
    numeric: 506.2,
    unit: "USD_B",
    isExample: false,
    provenance: "curated",
    asOf: "2026-06-30",
    sourceLabel: "Dealroom Global",
    sourceUrl: "https://dealroom.co/guides/global",
  },
  delta: null,
  note:
    "H1 2026 YTD global VC from Dealroom public guide ($506.2B). No H1’25 comparable on the public page — no Δ (not vs FY25). Alternate cite: KPMG Venture Pulse Q2’26 mid-year $560.4B. Refresh after each closed quarter.",
};

/**
 * US national debt crossed $40T — curated from Tarek Mansour / Kalshi
 * Citizen Debt Forecast launch post (2026-09-03). First $20T took hundreds
 * of years; next $20T ~18 years. Do not invent; refresh only from cited post
 * or Treasury Fiscal Data.
 */
export const debtFallback: LiveMetricPayload = {
  value: {
    display: "$40.10T",
    numeric: 40.1,
    unit: "CUSTOM",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-03",
    sourceLabel: "Kalshi CDF",
    sourceUrl: "https://x.com/mansourtarek_/status/2095562339479437369",
  },
  delta: {
    display: "~18y",
    direction: "up",
    period: "2nd $20T",
    isExample: false,
  },
  note:
    "Gross US national debt $40.10T (Kalshi CDF / Mansour launch 2026-09-03). First $20T: hundreds of years; next $20T: ~18 years. Also cited: intragovernmental $7.68T; +$78,703/sec; $95,364 per citizen; CDF 2036 debt/GDP 118% vs CBO 120%.",
};

/**
 * FY 2026 fiscal snapshot from the same Mansour / Kalshi post:
 * made $5.6T, spent $7.4T, deficit $1.9T (5.9% of GDP).
 */
export const deficitFallback: LiveMetricPayload = {
  value: {
    display: "$1.9T",
    numeric: 1.9,
    unit: "CUSTOM",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-03",
    sourceLabel: "Kalshi CDF",
    sourceUrl: "https://x.com/mansourtarek_/status/2095562339479437369",
  },
  delta: {
    display: "5.9% GDP",
    direction: "up",
    period: "FY26",
    isExample: false,
  },
  note:
    "FY 2026: made $5.6T, spent $7.4T, deficit $1.9T (5.9% of GDP). Spend mix: $4.4T mandatory (60%), $1.9T discretionary (26%), $1T net interest (15%). Same curated post as US debt $40T.",
};
