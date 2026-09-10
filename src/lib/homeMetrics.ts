import type { Sector, SectorMetrics } from "@/data/types";

export type MetricSlot = SectorMetrics["capitalPulse"];

/** Prefer live/curated secondary; else score example slots. */
export function pickSecondary(metrics: SectorMetrics): MetricSlot {
  const candidates: MetricSlot[] = [
    metrics.capitalPulse,
    metrics.infraOrAdoption,
  ];
  const wired = candidates.filter((m) => !m.value.isExample);
  if (wired.length === 1) return wired[0];
  if (wired.length === 2) {
    const live = wired.find((m) => m.value.provenance === "live");
    if (live) return live;
    return metrics.capitalPulse;
  }
  const rank = (m: MetricSlot) => {
    let score = 0;
    if (m.delta.direction !== "flat") score += 2;
    if (m.value.numeric != null) score += 1;
    if (/capital|deployed|funding|ARR|capex|spend|debt|issuance/i.test(m.label)) score += 1;
    return score;
  };
  const [a, b] = candidates;
  return rank(b) > rank(a) ? b : a;
}

export function cleanLabel(label: string): string {
  return label.replace(/\s*\(EXAMPLE\)\s*/gi, "").trim();
}

/** Sector has at least one live/curated figure on the home pair. */
export function isWiredSector(sector: Sector): boolean {
  const { northStar, capitalPulse, infraOrAdoption } = sector.metrics;
  return (
    !northStar.value.isExample ||
    !capitalPulse.value.isExample ||
    !infraOrAdoption.value.isExample
  );
}

export function isPlaceholderSector(sector: Sector): boolean {
  return !isWiredSector(sector);
}
