/**
 * Keyless FRED CSV observations: https://fred.stlouisfed.org/graph/fredgraph.csv?id=SERIES
 * Never invent — on failure return curated fallback.
 */

import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { Delta } from "@/data/types";
import type { MetricSeries, SeriesPoint } from "@/data/series";

export type FredObs = { date: string; value: number };

export async function fetchFredCsv(seriesId: string): Promise<FredObs[]> {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(seriesId)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "vc-world-monitor/0.1 (public FRED CSV)" },
    next: { revalidate: 86400 }
  });
  if (!res.ok) throw new Error(`FRED HTTP ${res.status} for ${seriesId}`);
  const text = await res.text();
  const rows: FredObs[] = [];
  for (const line of text.trim().split("\n").slice(1)) {
    const [date, raw] = line.split(",");
    if (!date || raw == null) continue;
    const v = raw.trim();
    if (v === "" || v === ".") continue;
    const num = Number(v);
    if (!Number.isFinite(num)) continue;
    rows.push({ date: date.trim(), value: num });
  }
  if (!rows.length) throw new Error(`FRED empty ${seriesId}`);
  return rows;
}

function pctChange(curr: number, prior: number): number {
  return ((curr / prior - 1) * 100);
}

function deltaFromChange(
  curr: number,
  prior: number,
  period: string,
  digits = 1
): Delta {
  const pct = pctChange(curr, prior);
  const rounded =
    Math.abs(pct) >= 10 ? pct.toFixed(0) : pct.toFixed(digits);
  const n = Number(rounded);
  return {
    display: `${n >= 0 ? "+" : ""}${rounded}%`,
    direction: n > 0 ? "up" : n < 0 ? "down" : "flat",
    period,
    isExample: false,
  };
}

function deltaPp(curr: number, prior: number, period: string): Delta {
  const pp = curr - prior;
  const rounded = pp.toFixed(1);
  const n = Number(rounded);
  return {
    display: `${n >= 0 ? "+" : ""}${rounded}pp`,
    direction: n > 0 ? "up" : n < 0 ? "down" : "flat",
    period,
    isExample: false,
  };
}

function findYoY(rows: FredObs[], latest: FredObs): FredObs | null {
  const [y, m] = latest.date.split("-").map(Number);
  const target = `${y - 1}-${String(m).padStart(2, "0")}`;
  const hits = rows.filter((r) => r.date.startsWith(target));
  return hits.length ? hits[hits.length - 1] : null;
}

export type FredMetricOpts = {
  seriesId: string;
  fallback: LiveMetricPayload;
  /** How to format the headline number */
  format: (n: number) => { display: string; numeric: number; unit: LiveMetricPayload["value"]["unit"] };
  deltaMode: "yoy-pct" | "yoy-pp" | "mom-pct" | "mom-pp" | "none";
  sourceLabel?: string;
  note?: string;
  /** Last N observations for an optional context chart (real points only). */
  chartPoints?: number;
  chartTitle?: string;
  chartFormat?: (n: number) => string;
};

export async function fetchFredMetric(
  opts: FredMetricOpts
): Promise<LiveMetricPayload & { series?: MetricSeries }> {
  try {
    const rows = await fetchFredCsv(opts.seriesId);
    const latest = rows[rows.length - 1];
    const formatted = opts.format(latest.value);

    let delta: Delta | null = null;
    if (opts.deltaMode === "yoy-pct" || opts.deltaMode === "yoy-pp") {
      const yoy = findYoY(rows, latest);
      if (yoy) {
        delta =
          opts.deltaMode === "yoy-pp"
            ? deltaPp(latest.value, yoy.value, "YoY")
            : deltaFromChange(latest.value, yoy.value, "YoY");
      }
    } else if (opts.deltaMode === "mom-pct" || opts.deltaMode === "mom-pp") {
      const prior = rows[rows.length - 2];
      if (prior) {
        delta =
          opts.deltaMode === "mom-pp"
            ? deltaPp(latest.value, prior.value, "MoM")
            : deltaFromChange(latest.value, prior.value, "MoM");
      }
    }

    let series: MetricSeries | undefined;
    if (opts.chartPoints && opts.chartPoints >= 2) {
      const slice = rows.slice(-opts.chartPoints);
      const points: SeriesPoint[] = slice.map((r) => ({
        label: r.date.slice(0, 7),
        value: r.value,
      }));
      series = {
        id: opts.seriesId,
        title: opts.chartTitle ?? opts.seriesId,
        grain: `FRED ${opts.seriesId}`,
        caption: "Published FRED observations (keyless CSV)",
        points,
        formatValue: opts.chartFormat ?? ((n) => String(n)),
      };
    }

    return {
      value: {
        display: formatted.display,
        numeric: formatted.numeric,
        unit: formatted.unit,
        isExample: false,
        provenance: "live",
        asOf: latest.date,
        sourceLabel: opts.sourceLabel ?? `FRED ${opts.seriesId}`,
        sourceUrl: `https://fred.stlouisfed.org/series/${opts.seriesId}`,
      },
      delta,
      note: opts.note,
      series,
    };
  } catch {
    return {
      ...opts.fallback,
      value: { ...opts.fallback.value, stale: true },
    };
  }
}
