import { vcFallback, type LiveMetricPayload } from "@/data/curated/fallbacks";

const DEALROOM_URL = "https://dealroom.co/guides/global";

/**
 * Global VC deployed H1 YTD — scrape Dealroom public guide when possible;
 * fall back to curated H1’26 figure from the same page / KPMG Venture Pulse.
 *
 * Methodology: show the H1’26 level only. Do not compare H1 YTD to full-year
 * FY25 (misleading %). Prefer H1’26 vs H1’25 only if Dealroom publishes it —
 * the public guide currently does not, so we never invent a prior-year figure.
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

    // Optional: H1’25 if ever published as "first 6 months of 2025"
    const h1Prior =
      html.match(
        /\$([0-9]+(?:\.[0-9]+)?)B[^.]{0,80}first 6 months of 2025/i
      ) ||
      html.match(
        /first 6 months of 2025[^$]{0,40}\$([0-9]+(?:\.[0-9]+)?)B/i
      );

    if (!ytd) {
      return {
        ...vcFallback,
        value: { ...vcFallback.value, stale: true },
      };
    }

    const ytdNum = parseFloat(ytd[1]);
    const asOf = "2026-06-30"; // closed H1 / Q2 on Dealroom guide

    let delta: LiveMetricPayload["delta"] = {
      display: "level",
      direction: "flat",
      period: "H1’26 YTD",
      isExample: false,
    };

    if (h1Prior) {
      const prior = parseFloat(h1Prior[1]);
      if (prior > 0) {
        const pct = ((ytdNum / prior - 1) * 100).toFixed(0);
        delta = {
          display: `${Number(pct) >= 0 ? "+" : ""}${pct}%`,
          direction:
            Number(pct) > 0 ? "up" : Number(pct) < 0 ? "down" : "flat",
          period: "H1’26 vs H1’25",
          isExample: false,
        };
      }
    }

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
      delta,
      note: `Dealroom public guide: $${ytdNum}B in first 6 months of 2026 (H1 YTD).${
        h1Prior
          ? ""
          : " No public H1’25 figure on page — level only (not vs FY25)."
      }`,
    };
  } catch {
    return {
      ...vcFallback,
      value: { ...vcFallback.value, stale: true },
    };
  }
}
