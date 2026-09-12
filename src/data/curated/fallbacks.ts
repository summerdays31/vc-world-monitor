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

/**
 * US data-center debt issuance ~$182B in 2025 — roughly doubled YoY.
 * Industry estimate via Morgan Stanley as summarized by Steffen (Aug 14, 2026)
 * citing contemporaneous FT/Bloomberg reporting. Not a live API; do not invent
 * a precise prior-year figure — label ~2× YoY only.
 */
export const dcDebtIssuanceFallback: LiveMetricPayload = {
  value: {
    display: "$182B",
    numeric: 182,
    unit: "USD_B",
    isExample: false,
    provenance: "curated",
    asOf: "2025-12-31",
    sourceLabel: "MS via Steffen",
    sourceUrl:
      "https://www.sascha-steffen.de/updates/nvidia-500bn-ai-financing-credit-risk",
  },
  delta: {
    display: "~2×",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note:
    "US data-center debt issuance about $182B in 2025 — roughly doubled YoY (Morgan Stanley / FT·Bloomberg as summarized by Steffen, Aug 14, 2026). Industry estimate, not a live feed. Cite date 2026-08-14; year figure asOf 2025-12-31.",
};

/**
 * Incremental debt share of hyperscaler capex ~32% trailing mid-2026
 * (vs ~9% FY2024) — same Steffen / Morgan Stanley summary.
 */
export const dcDebtShareFallback: LiveMetricPayload = {
  value: {
    display: "~32%",
    numeric: 32,
    unit: "PCT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-06-30",
    sourceLabel: "MS via Steffen",
    sourceUrl:
      "https://www.sascha-steffen.de/updates/nvidia-500bn-ai-financing-credit-risk",
  },
  delta: {
    display: "vs ~9% FY24",
    direction: "up",
    period: "mid-2026",
    isExample: false,
  },
  note:
    "Incremental debt funded ~32% of hyperscaler capex on a trailing basis by mid-2026, vs ~9% in FY2024 (Steffen summarizing Morgan Stanley, Aug 14, 2026). Curated industry estimate.",
};

/** US retail & food services sales — FRED RSAFS Jul 2026 (millions → $B display). */
export const retailSalesFallback: LiveMetricPayload = {
  value: {
    display: "$763.6B",
    numeric: 763.6,
    unit: "USD_B",
    isExample: false,
    provenance: "curated",
    asOf: "2026-07-01",
    sourceLabel: "FRED RSAFS",
    sourceUrl: "https://fred.stlouisfed.org/series/RSAFS",
  },
  delta: {
    display: "+5.0%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "Advance monthly US retail & food services sales $763,602M SA (Jul 2026). YoY vs Jul 2025 $727,176M.",
};

/** US unemployment rate — FRED UNRATE Aug 2026. */
export const unemploymentFallback: LiveMetricPayload = {
  value: {
    display: "4.1%",
    numeric: 4.1,
    unit: "PCT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-08-01",
    sourceLabel: "FRED UNRATE",
    sourceUrl: "https://fred.stlouisfed.org/series/UNRATE",
  },
  delta: {
    display: "-0.2pp",
    direction: "down",
    period: "YoY",
    isExample: false,
  },
  note: "Civilian unemployment rate 4.1% (Aug 2026); Aug 2025 was 4.3%.",
};

/** JOLTS job openings — FRED JTSJOL Jul 2026 (thousands). */
export const joltsFallback: LiveMetricPayload = {
  value: {
    display: "7.27M",
    numeric: 7.271,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-07-01",
    sourceLabel: "FRED JTSJOL",
    sourceUrl: "https://fred.stlouisfed.org/series/JTSJOL",
  },
  delta: {
    display: "+2.6%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "JOLTS total nonfarm job openings 7,271k (Jul 2026) vs 7,089k Jul 2025.",
};

/** Global copper price — FRED PCOPPUSDM Jul 2026 USD/mt. */
export const copperFallback: LiveMetricPayload = {
  value: {
    display: "$13,543/t",
    numeric: 13542.82,
    unit: "CUSTOM",
    isExample: false,
    provenance: "curated",
    asOf: "2026-07-01",
    sourceLabel: "FRED PCOPPUSDM",
    sourceUrl: "https://fred.stlouisfed.org/series/PCOPPUSDM",
  },
  delta: {
    display: "+38.6%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "Global copper price ~$13,543/mt (Jul 2026) vs ~$9,771 Jul 2025.",
};

/** US defense outlays — FRED FDEFX Q2 2026 bil$ SAAR. */
export const defenseOutlaysFallback: LiveMetricPayload = {
  value: {
    display: "$1,198B",
    numeric: 1198.038,
    unit: "USD_B",
    isExample: false,
    provenance: "curated",
    asOf: "2026-04-01",
    sourceLabel: "FRED FDEFX",
    sourceUrl: "https://fred.stlouisfed.org/series/FDEFX",
  },
  delta: {
    display: "+5.5%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "Federal defense consumption & investment $1,198B SAAR (2026-Q2) vs $1,136B 2025-Q2.",
};

/** Semiconductor industrial production — FRED IPG3344S Jul 2026. */
export const semiIpFallback: LiveMetricPayload = {
  value: {
    display: "191.9",
    numeric: 191.8973,
    unit: "INDEX",
    isExample: false,
    provenance: "curated",
    asOf: "2026-07-01",
    sourceLabel: "FRED IPG3344S",
    sourceUrl: "https://fred.stlouisfed.org/series/IPG3344S",
  },
  delta: {
    display: "+11.9%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "IP: semiconductors & related devices index 191.9 (Jul 2026) vs 171.6 Jul 2025 (2017=100).",
};

/** PHLX SOX — FRED NASDAQSOX. */
export const soxFallback: LiveMetricPayload = {
  value: {
    display: "11,824",
    numeric: 11824,
    unit: "INDEX",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-11",
    sourceLabel: "FRED NASDAQSOX",
    sourceUrl: "https://fred.stlouisfed.org/series/NASDAQSOX",
  },
  delta: null,
  note: "PHLX Semiconductor Sector Index close (FRED NASDAQSOX).",
};

/** Henry Hub spot — FRED DHHNGSP. */
export const henryHubFallback: LiveMetricPayload = {
  value: {
    display: "$2.81",
    numeric: 2.81,
    unit: "CUSTOM",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-09",
    sourceLabel: "FRED DHHNGSP",
    sourceUrl: "https://fred.stlouisfed.org/series/DHHNGSP",
  },
  delta: {
    display: "-9.9%",
    direction: "down",
    period: "YoY",
    isExample: false,
  },
  note: "Henry Hub natural gas spot $2.81/MMBtu (2026-09-09) vs $3.12 on 2025-09-09.",
};

/** Educational services employment — FRED CEU6561000001 Aug 2026. */
export const eduEmploymentFallback: LiveMetricPayload = {
  value: {
    display: "3.78M",
    numeric: 3.7791,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-08-01",
    sourceLabel: "FRED CEU6561000001",
    sourceUrl: "https://fred.stlouisfed.org/series/CEU6561000001",
  },
  delta: {
    display: "-0.4%",
    direction: "down",
    period: "YoY",
    isExample: false,
  },
  note: "All employees, educational services 3,779.1k (Aug 2026 NSA) vs 3,793.5k Aug 2025.",
};

/** TSA checkpoint travelers — last-known from tsa.gov table. */
export const tsaFallback: LiveMetricPayload = {
  value: {
    display: "2.42M",
    numeric: 2420875,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-10",
    sourceLabel: "TSA checkpoint",
    sourceUrl: "https://www.tsa.gov/travel/passenger-volumes",
  },
  delta: null,
  note: "TSA checkpoint travelers 2,420,875 on 2026-09-10 (public table).",
};

/** ClinicalTrials.gov active interventional — last-known live count. */
export const clinicalTrialsActiveFallback: LiveMetricPayload = {
  value: {
    display: "67,713",
    numeric: 67713,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-12",
    sourceLabel: "ClinicalTrials.gov",
    sourceUrl: "https://clinicaltrials.gov/",
  },
  delta: null,
  note: "Active interventional studies (Recruiting / Enrolling by invitation / Active, not recruiting).",
};

/** ClinicalTrials.gov aging/longevity active trials. */
export const longevityTrialsFallback: LiveMetricPayload = {
  value: {
    display: "2,211",
    numeric: 2211,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-12",
    sourceLabel: "ClinicalTrials.gov",
    sourceUrl: "https://clinicaltrials.gov/",
  },
  delta: null,
  note: "Active studies matching aging OR longevity OR \"healthy aging\".",
};

/** CISA KEV catalog size. */
export const cisaKevFallback: LiveMetricPayload = {
  value: {
    display: "1,709",
    numeric: 1709,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-11",
    sourceLabel: "CISA KEV",
    sourceUrl:
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
  },
  delta: null,
  note: "CISA Known Exploited Vulnerabilities catalog size as of 2026-09-11.",
};

/**
 * Orbital launches YTD 2026 — Wikipedia monthly tally Total row (215 through early Sep).
 */
export const orbitalLaunchesFallback: LiveMetricPayload = {
  value: {
    display: "215",
    numeric: 215,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2026-09-12",
    sourceLabel: "Wikipedia 2026 spaceflight",
    sourceUrl: "https://en.wikipedia.org/wiki/2026_in_spaceflight",
  },
  delta: null,
  note: "YTD orbital launch attempts from Wikipedia 2026 in spaceflight (Total 215 as of early Sep tally).",
};

/**
 * IFR preliminary: US industrial robot installations 38,000 in 2025 (+11% YoY).
 * Press release 2026-06-18.
 */
export const roboticsUsFallback: LiveMetricPayload = {
  value: {
    display: "38,000",
    numeric: 38000,
    unit: "COUNT",
    isExample: false,
    provenance: "curated",
    asOf: "2025-12-31",
    sourceLabel: "IFR (US prelim 2025)",
    sourceUrl:
      "https://ifr.org/ifr-press-releases/news/us-robot-industry-returns-to-double-digit-growth",
  },
  delta: {
    display: "+11%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "US industrial robot installations reached 38,000 units in 2025 (+11% YoY) — IFR preliminary results, Jun 18, 2026.",
};

/**
 * NOAA NCEI billion-dollar weather/climate disasters — 2024 annual (latest complete year in time-series JSON).
 * 27 events, $182.7B CPI-adjusted cost.
 */
export const noaaDisastersFallback: LiveMetricPayload = {
  value: {
    display: "$182.7B",
    numeric: 182.7,
    unit: "USD_B",
    isExample: false,
    provenance: "curated",
    asOf: "2024-12-31",
    sourceLabel: "NOAA NCEI Billions",
    sourceUrl: "https://www.ncei.noaa.gov/access/billions/",
  },
  delta: {
    display: "27 events",
    direction: "up",
    period: "2024",
    isExample: false,
  },
  note: "US billion-dollar disasters 2024: 27 events, $182.7B CPI-adjusted cost (NOAA NCEI time-series). 2025/2026 annual totals not yet in the public JSON as of 2026-09.",
};

/**
 * Netflix Q2'26 revenue $12.56B (+13.4% YoY) — shareholder letter Jul 16, 2026.
 */
export const netflixRevenueFallback: LiveMetricPayload = {
  value: {
    display: "$12.56B",
    numeric: 12.56,
    unit: "USD_B",
    isExample: false,
    provenance: "curated",
    asOf: "2026-06-30",
    sourceLabel: "Netflix Q2'26 letter",
    sourceUrl:
      "https://s22.q4cdn.com/959853165/files/doc_financials/2026/q2/FINAL-Q2-26-Shareholder-Letter.pdf",
  },
  delta: {
    display: "+13.4%",
    direction: "up",
    period: "YoY",
    isExample: false,
  },
  note: "Netflix Q2'26 revenue $12.56B (+13.4% YoY / +12% FX-neutral). Public shareholder letter Jul 16, 2026.",
};
