import {
  clinicalTrialsActiveFallback,
  longevityTrialsFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const BASE = "https://clinicaltrials.gov/api/v2/studies";

async function fetchCount(params: string): Promise<number> {
  const res = await fetch(`${BASE}?${params}&pageSize=1&countTotal=true`, {
    headers: { "User-Agent": "vc-world-monitor/0.1 (ClinicalTrials.gov)" },
    next: { revalidate: 86400 }
  });
  if (!res.ok) throw new Error(`CT.gov HTTP ${res.status}`);
  const json = (await res.json()) as { totalCount?: number };
  if (typeof json.totalCount !== "number") throw new Error("CT.gov missing totalCount");
  return json.totalCount;
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

/** Active interventional studies (recruiting / enrolling / active). */
export async function fetchActiveInterventionalTrials(): Promise<LiveMetricPayload> {
  try {
    const n = await fetchCount(
      "query.term=AREA%5BStudyType%5DInterventional&filter.overallStatus=RECRUITING%2CENROLLING_BY_INVITATION%2CACTIVE_NOT_RECRUITING"
    );
    const asOf = new Date().toISOString().slice(0, 10);
    return {
      value: {
        display: formatCount(n),
        numeric: n,
        unit: "COUNT",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "ClinicalTrials.gov",
        sourceUrl: "https://clinicaltrials.gov/",
      },
      delta: null,
      note: "Active interventional studies (Recruiting / Enrolling by invitation / Active, not recruiting).",
    };
  } catch {
    return {
      ...clinicalTrialsActiveFallback,
      value: { ...clinicalTrialsActiveFallback.value, stale: true },
    };
  }
}

/** Active trials matching aging / longevity / healthy aging query. */
export async function fetchLongevityTrials(): Promise<LiveMetricPayload> {
  try {
    const n = await fetchCount(
      "query.term=%28aging+OR+longevity+OR+%22healthy+aging%22%29&filter.overallStatus=RECRUITING%2CENROLLING_BY_INVITATION%2CACTIVE_NOT_RECRUITING"
    );
    const asOf = new Date().toISOString().slice(0, 10);
    return {
      value: {
        display: formatCount(n),
        numeric: n,
        unit: "COUNT",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "ClinicalTrials.gov",
        sourceUrl: "https://clinicaltrials.gov/",
      },
      delta: null,
      note: "Active studies matching aging OR longevity OR \"healthy aging\".",
    };
  } catch {
    return {
      ...longevityTrialsFallback,
      value: { ...longevityTrialsFallback.value, stale: true },
    };
  }
}
