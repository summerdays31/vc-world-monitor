import { vcFallback, type LiveMetricPayload } from "@/data/curated/fallbacks";

const DEALROOM_URL = "https://dealroom.co/guides/global";

/**
 * Global VC deployed YTD — scrape Dealroom public guide when possible;
 * fall back to curated H1’26 figure from the same page / KPMG Venture Pulse.
 * Revalidate daily.
 */
export async function fetchGlobalVcDeployed(): Promise<LiveMetricPayload> {
  try {
    const res = await fetch(DEALROOM_URL, {
      headers: { "User-Agent": "vc-world-monitor/0.1 (public data)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Dealroom HTTP ${res.status}`);
    const html = await res.text();

    // "$506.2B raised in the first 6 months of 2026"
    const ytd =
      html.match(
        /\$([0-9]+(?:\.[0-9]+)?)B<\/strong>\s+raised in the first 6 months of 2026/i
      ) ||
      html.match(
        /With <strong>\$([0-9]+(?:\.[0-9]+)?)B<\/strong> raised in the first 6 months of 2026/i
      ) ||
      html.match(
        /raised in the first 6 months of 2026[^$]{0,40}\$([0-9]+(?:\.[0-9]+)?)B/i
      );

    const fy2025 = html.match(
      /reaching <strong>\$([0-9]+(?:\.[0-9]+)?)B<\/strong> in 2025/i
    );

    if (!ytd) {
      return {
        ...vcFallback,
        value: { ...vcFallback.value, stale: true },
      };
    }

    const ytdNum = parseFloat(ytd[1]);
    const fyNum = fy2025 ? parseFloat(fy2025[1]) : 444.1;
    const vsFy = ((ytdNum / fyNum - 1) * 100).toFixed(0);
    const asOf = "2026-06-30"; // closed H1 / Q2 on Dealroom guide

    return {
      value: {
        display: `$${Math.round(ytdNum)}B`,
        numeric: ytdNum,
        unit: "USD_B",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "Dealroom Global",
        sourceUrl: DEALROOM_URL,
      },
      delta: {
        display: `${Number(vsFy) >= 0 ? "+" : ""}${vsFy}%`,
        direction: Number(vsFy) > 0 ? "up" : Number(vsFy) < 0 ? "down" : "flat",
        period: "vs FY25",
        isExample: false,
      },
      note: `Dealroom public guide: $${ytdNum}B in first 6 months of 2026 (H1 YTD).`,
    };
  } catch {
    return {
      ...vcFallback,
      value: { ...vcFallback.value, stale: true },
    };
  }
}
