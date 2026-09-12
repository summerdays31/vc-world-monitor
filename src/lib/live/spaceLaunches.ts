import {
  orbitalLaunchesFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const WIKI_URL = "https://en.wikipedia.org/wiki/2026_in_spaceflight";

/**
 * Orbital launches YTD — scrape Wikipedia "Numbers of orbital launches" Total row.
 * Curated fallback if scrape fails.
 */
export async function fetchOrbitalLaunchesYtd(): Promise<LiveMetricPayload> {
  try {
    const res = await fetch(WIKI_URL, {
      headers: { "User-Agent": "vc-world-monitor/0.1 (public citation)" },
      next: { revalidate: 86400 }
    });
    if (!res.ok) throw new Error(`Wikipedia HTTP ${res.status}`);
    const html = await res.text();
    const idx = html.indexOf("Numbers of orbital launches");
    if (idx < 0) throw new Error("Launches table missing");
    const chunk = html.slice(idx, idx + 6000);
    // Total row: >Total</td><td...>215</td> or |Total|215|
    const m =
      chunk.match(/>Total<\/t[dh]>\s*<td[^>]*>\s*(\d{2,4})\s*</i) ||
      chunk.match(/\|\s*Total\s*\|\s*(\d{2,4})\s*\|/i);
    if (!m) throw new Error("Total launches not parsed");
    const n = Number(m[1]);
    if (!Number.isFinite(n) || n < 10) throw new Error("Implausible launch count");
    const asOf = new Date().toISOString().slice(0, 10);
    return {
      value: {
        display: String(n),
        numeric: n,
        unit: "COUNT",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "Wikipedia 2026 spaceflight",
        sourceUrl: WIKI_URL,
      },
      delta: null,
      note: "YTD orbital launch attempts from Wikipedia 2026 in spaceflight monthly tally (Total row).",
    };
  } catch {
    return {
      ...orbitalLaunchesFallback,
      value: { ...orbitalLaunchesFallback.value, stale: true },
    };
  }
}
