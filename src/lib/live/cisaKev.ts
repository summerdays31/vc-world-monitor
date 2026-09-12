import {
  cisaKevFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const KEV_PAGE =
  "https://www.cisa.gov/known-exploited-vulnerabilities-catalog";

/**
 * Live CISA Known Exploited Vulnerabilities catalog size.
 * Scrapes the HTML catalog page (`N results`) — the JSON feed is >2MB and
 * cannot enter Next.js Data Cache, so we do not fetch it at request time.
 */
export async function fetchCisaKevCount(): Promise<LiveMetricPayload> {
  try {
    const res = await fetch(KEV_PAGE, {
      headers: { "User-Agent": "vc-world-monitor/0.1 (CISA KEV)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`CISA KEV page HTTP ${res.status}`);
    const html = await res.text();
    const m =
      html.match(/results-total-wrapper">\s*([0-9,]+)\s*results/i) ||
      html.match(/>([0-9,]+)\s*results</i);
    if (!m) throw new Error("KEV count not on page");
    const n = Number(m[1].replace(/,/g, ""));
    if (!Number.isFinite(n) || n < 100) throw new Error("KEV count implausible");
    const asOf = new Date().toISOString().slice(0, 10);
    return {
      value: {
        display: n.toLocaleString("en-US"),
        numeric: n,
        unit: "COUNT",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "CISA KEV",
        sourceUrl: KEV_PAGE,
      },
      delta: null,
      note: `CISA Known Exploited Vulnerabilities catalog size (${n} results on public catalog page).`,
    };
  } catch {
    return {
      ...cisaKevFallback,
      value: { ...cisaKevFallback.value, stale: true },
    };
  }
}
