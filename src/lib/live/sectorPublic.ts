/**
 * Public live/curated metrics for sectors beyond AI / DC / Capital.
 */

import {
  retailSalesFallback,
  unemploymentFallback,
  joltsFallback,
  copperFallback,
  defenseOutlaysFallback,
  semiIpFallback,
  soxFallback,
  henryHubFallback,
  eduEmploymentFallback,
  roboticsUsFallback,
  noaaDisastersFallback,
  netflixRevenueFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";
import { fetchFredMetric } from "./fred";
import { fetchTsaThroughput } from "./tsa";
import {
  fetchActiveInterventionalTrials,
  fetchLongevityTrials,
} from "./clinicalTrials";
import { fetchCisaKevCount } from "./cisaKev";
import { fetchOrbitalLaunchesYtd } from "./spaceLaunches";

export async function fetchRetailSales() {
  return fetchFredMetric({
    seriesId: "RSAFS",
    fallback: retailSalesFallback,
    deltaMode: "yoy-pct",
    chartPoints: 6,
    chartTitle: "US retail sales",
    chartFormat: (n) => `$${(n / 1000).toFixed(0)}B`,
    note: "Advance monthly US retail & food services sales (FRED RSAFS, millions SA).",
    format: (n) => ({
      display: `$${(n / 1000).toFixed(1)}B`,
      numeric: n / 1000,
      unit: "USD_B",
    }),
  });
}

export async function fetchUnemployment() {
  return fetchFredMetric({
    seriesId: "UNRATE",
    fallback: unemploymentFallback,
    deltaMode: "yoy-pp",
    chartPoints: 8,
    chartTitle: "US unemployment rate",
    chartFormat: (n) => `${n.toFixed(1)}%`,
    note: "US civilian unemployment rate (FRED UNRATE).",
    format: (n) => ({
      display: `${n.toFixed(1)}%`,
      numeric: n,
      unit: "PCT",
    }),
  });
}

export async function fetchJoltsOpenings() {
  return fetchFredMetric({
    seriesId: "JTSJOL",
    fallback: joltsFallback,
    deltaMode: "yoy-pct",
    chartPoints: 6,
    chartTitle: "JOLTS job openings",
    chartFormat: (n) => `${(n / 1000).toFixed(1)}M`,
    note: "JOLTS total nonfarm job openings (FRED JTSJOL, thousands).",
    format: (n) => ({
      display: `${(n / 1000).toFixed(2)}M`,
      numeric: n / 1000,
      unit: "COUNT",
    }),
  });
}

export async function fetchCopperPrice() {
  return fetchFredMetric({
    seriesId: "PCOPPUSDM",
    fallback: copperFallback,
    deltaMode: "yoy-pct",
    chartPoints: 6,
    chartTitle: "Global copper price",
    chartFormat: (n) => `$${Math.round(n).toLocaleString("en-US")}`,
    note: "Global price of copper (FRED PCOPPUSDM, USD per metric ton).",
    format: (n) => ({
      display: `$${Math.round(n).toLocaleString("en-US")}/t`,
      numeric: n,
      unit: "CUSTOM",
    }),
  });
}

export async function fetchDefenseOutlays() {
  return fetchFredMetric({
    seriesId: "FDEFX",
    fallback: defenseOutlaysFallback,
    deltaMode: "yoy-pct",
    chartPoints: 6,
    chartTitle: "US defense outlays",
    chartFormat: (n) => `$${n.toFixed(0)}B`,
    note: "Federal government defense consumption expenditures & gross investment (FRED FDEFX, bil$ SAAR).",
    format: (n) => ({
      display: `$${n.toFixed(0)}B`,
      numeric: n,
      unit: "USD_B",
    }),
  });
}

export async function fetchSemiIp() {
  return fetchFredMetric({
    seriesId: "IPG3344S",
    fallback: semiIpFallback,
    deltaMode: "yoy-pct",
    chartPoints: 6,
    chartTitle: "Semiconductor IP",
    chartFormat: (n) => n.toFixed(0),
    note: "Industrial production: semiconductors & related devices (FRED IPG3344S, index 2017=100).",
    format: (n) => ({
      display: n.toFixed(1),
      numeric: n,
      unit: "INDEX",
    }),
  });
}

export async function fetchSoxIndex() {
  return fetchFredMetric({
    seriesId: "NASDAQSOX",
    fallback: soxFallback,
    deltaMode: "mom-pct",
    chartPoints: 8,
    chartTitle: "PHLX SOX",
    chartFormat: (n) => n.toFixed(0),
    note: "PHLX Semiconductor Sector Index (FRED NASDAQSOX).",
    format: (n) => ({
      display: Math.round(n).toLocaleString("en-US"),
      numeric: n,
      unit: "INDEX",
    }),
  });
}

export async function fetchHenryHub() {
  return fetchFredMetric({
    seriesId: "DHHNGSP",
    fallback: henryHubFallback,
    deltaMode: "yoy-pct",
    chartPoints: 8,
    chartTitle: "Henry Hub spot",
    chartFormat: (n) => `$${n.toFixed(2)}`,
    note: "Henry Hub natural gas spot price (FRED DHHNGSP, $/MMBtu).",
    format: (n) => ({
      display: `$${n.toFixed(2)}`,
      numeric: n,
      unit: "CUSTOM",
    }),
  });
}

export async function fetchEduEmployment() {
  return fetchFredMetric({
    seriesId: "CEU6561000001",
    fallback: eduEmploymentFallback,
    deltaMode: "yoy-pct",
    chartPoints: 6,
    chartTitle: "Education employment",
    chartFormat: (n) => `${(n / 1000).toFixed(2)}M`,
    note: "All employees, educational services (FRED CEU6561000001, thousands, NSA).",
    format: (n) => ({
      display: `${(n / 1000).toFixed(2)}M`,
      numeric: n / 1000,
      unit: "COUNT",
    }),
  });
}

/** Curated IFR US industrial robot installations 2025. */
export async function fetchRoboticsUsInstalls(): Promise<LiveMetricPayload> {
  return {
    ...roboticsUsFallback,
    value: { ...roboticsUsFallback.value, stale: false },
  };
}

/** Curated NOAA billion-dollar disasters 2024 annual. */
export async function fetchNoaaDisasters(): Promise<LiveMetricPayload> {
  return {
    ...noaaDisastersFallback,
    value: { ...noaaDisastersFallback.value, stale: false },
  };
}

/** Curated Netflix Q2'26 revenue from shareholder letter. */
export async function fetchNetflixRevenue(): Promise<LiveMetricPayload> {
  return {
    ...netflixRevenueFallback,
    value: { ...netflixRevenueFallback.value, stale: false },
  };
}

export {
  fetchTsaThroughput,
  fetchActiveInterventionalTrials,
  fetchLongevityTrials,
  fetchCisaKevCount,
  fetchOrbitalLaunchesYtd,
};
