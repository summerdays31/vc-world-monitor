/**
 * Last-known public figures used when live fetch fails, or when the metric
 * is only available from occasional published reports (CURATED, not EXAMPLE).
 * Never invent numbers — refresh from the cited URLs only.
 */

import type { Delta, MetricValue } from "@/data/types";

export type LiveMetricPayload = {
  value: MetricValue;
  delta: Delta;
  note?: string;
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
  delta: {
    display: "spot",
    direction: "flat",
    period: "on-demand floor",
    isExample: false,
  },
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
 * publish a clear H1’25 figure on the public guide, so delta is level-only.
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
  delta: {
    display: "level",
    direction: "flat",
    period: "H1’26 YTD",
    isExample: false,
  },
  note:
    "H1 2026 YTD global VC from Dealroom public guide ($506.2B). No H1’25 comparable on the public page — show level only (not vs FY25). Alternate cite: KPMG Venture Pulse Q2’26 mid-year $560.4B. Refresh after each closed quarter.",
};
