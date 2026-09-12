import {
  tsaFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const TSA_URL = "https://www.tsa.gov/travel/passenger-volumes";

/**
 * Live TSA checkpoint traveler counts — scrape the public HTML table.
 * Delta = vs same calendar day 7 days earlier on the same page (when present).
 */
export async function fetchTsaThroughput(): Promise<LiveMetricPayload> {
  try {
    const res = await fetch(TSA_URL, {
      headers: {
        "User-Agent": "vc-world-monitor/0.1 (public TSA passenger volumes)",
      },
      next: { revalidate: 86400 }
    });
    if (!res.ok) throw new Error(`TSA HTTP ${res.status}`);
    const html = await res.text();
    const rowRe =
      /<tr[^>]*>\s*<td[^>]*>\s*(\d{1,2}\/\d{1,2}\/\d{4})\s*<\/td>\s*<td[^>]*>\s*([0-9,]+)\s*<\/td>/gi;
    const rows: { date: string; count: number }[] = [];
    let m: RegExpExecArray | null;
    while ((m = rowRe.exec(html))) {
      const count = Number(m[2].replace(/,/g, ""));
      if (!Number.isFinite(count) || count <= 0) continue;
      rows.push({ date: m[1], count });
    }
    if (!rows.length) throw new Error("TSA table empty");

    // Table is newest-first
    const latest = rows[0];
    const [mm, dd, yyyy] = latest.date.split("/").map(Number);
    const asOf = `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;

    let delta: LiveMetricPayload["delta"] = null;
    if (rows.length > 7) {
      const weekAgo = rows[7];
      const pct = ((latest.count / weekAgo.count - 1) * 100).toFixed(1);
      const n = Number(pct);
      delta = {
        display: `${n >= 0 ? "+" : ""}${pct}%`,
        direction: n > 0 ? "up" : n < 0 ? "down" : "flat",
        period: "7d",
        isExample: false,
      };
    }

    const millions = latest.count / 1_000_000;
    return {
      value: {
        display: `${millions.toFixed(2)}M`,
        numeric: latest.count,
        unit: "COUNT",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "TSA checkpoint",
        sourceUrl: TSA_URL,
      },
      delta,
      note: `TSA checkpoint travelers on ${latest.date}: ${latest.count.toLocaleString("en-US")}.`,
    };
  } catch {
    return {
      ...tsaFallback,
      value: { ...tsaFallback.value, stale: true },
    };
  }
}
