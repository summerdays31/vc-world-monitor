/**
 * Honest comparison series for charts — only real published points.
 * Never invent intermediate history. If only a level exists, omit series.
 */

export type SeriesPoint = {
  label: string;
  value: number;
};

export type MetricSeries = {
  id: string;
  title: string;
  /** Time grain / as-of context shown beside the chart title */
  grain: string;
  /** Short caption under chart — provenance, not dense issuer legends */
  caption: string;
  points: SeriesPoint[];
  formatValue: (n: number) => string;
};

/** LBNL Queued Up: median IR→COD — 55 mo (~4.6y) for 2024 → 61 mo (~5.1y) for 2025. */
export const interconnectSeries: MetricSeries = {
  id: "interconnect",
  title: "Median IR→COD",
  grain: "Annual · LBNL Queued Up",
  caption: "U.S. projects completed in year · 55 mo → 61 mo",
  points: [
    { label: "2024", value: 4.6 },
    { label: "2025", value: 5.1 },
  ],
  formatValue: (n) => `${n.toFixed(1)}y`,
};

/**
 * Debt share of hyperscaler capex — ~9% FY2024 → ~32% trailing mid-2026
 * (MS via Steffen). Two real points only.
 */
export const dcDebtShareSeries: MetricSeries = {
  id: "dc-debt-share",
  title: "Debt share of hyperscaler capex",
  grain: "FY24 → mid-2026 · MS via Steffen",
  caption: "Incremental debt funded share of hyperscaler capex",
  points: [
    { label: "FY24", value: 9 },
    { label: "mid-26", value: 32 },
  ],
  formatValue: (n) => `~${n}%`,
};

/**
 * FY26 federal books from Kalshi CDF / Mansour: made $5.6T, spent $7.4T.
 * Context bars — not a fabricated multi-year series.
 */
export const deficitBooksSeries: MetricSeries = {
  id: "deficit-books",
  title: "FY26 federal books",
  grain: "FY26 · Kalshi CDF",
  caption: "Revenue $5.6T vs spend $7.4T → deficit $1.9T (5.9% GDP)",
  points: [
    { label: "Revenue", value: 5.6 },
    { label: "Spend", value: 7.4 },
  ],
  formatValue: (n) => `$${n.toFixed(1)}T`,
};

/** NOAA billion-dollar disaster costs — published annual points only. */
export const noaaDisastersSeries: MetricSeries = {
  id: "noaa-disasters",
  title: "US billion-dollar disaster cost",
  grain: "Annual · NOAA NCEI",
  caption: "CPI-adjusted cost ($B) · complete years only",
  points: [
    { label: "2021", value: 164.5 },
    { label: "2022", value: 183.6 },
    { label: "2023", value: 95.3 },
    { label: "2024", value: 182.7 },
  ],
  formatValue: (n) => `$${n.toFixed(1)}B`,
};

/** Netflix quarterly revenue from public shareholder letters (real points). */
export const netflixRevenueSeries: MetricSeries = {
  id: "netflix-revenue",
  title: "Netflix quarterly revenue",
  grain: "Quarterly · Netflix IR",
  caption: "Q2'25 → Q2'26 from shareholder letters",
  points: [
    { label: "Q2'25", value: 11.079 },
    { label: "Q3'25", value: 11.51 },
    { label: "Q4'25", value: 12.051 },
    { label: "Q1'26", value: 12.25 },
    { label: "Q2'26", value: 12.56 },
  ],
  formatValue: (n) => `$${n.toFixed(2)}B`,
};

/**
 * Instrument key → series. Keys without an entry are headline-only
 * (GPU, VC H1, DC debt issuance ~2× with no precise prior, US debt level).
 */
export const seriesByKey: Record<string, MetricSeries | undefined> = {
  interconnect: interconnectSeries,
  dcDebtShare: dcDebtShareSeries,
  deficit: deficitBooksSeries,
  noaaDisasters: noaaDisastersSeries,
  netflixRevenue: netflixRevenueSeries,
};
