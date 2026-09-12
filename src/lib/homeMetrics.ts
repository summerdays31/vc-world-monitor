import type { Sector, SectorMetrics } from "@/data/types";

export type MetricSlot = SectorMetrics["capitalPulse"];

export const WIRED_SECTOR_SLUGS = [
  "ai",
  "data-center",
  "capital-formation",
] as const;

export type WiredSectorSlug = (typeof WIRED_SECTOR_SLUGS)[number];

export function isWiredSlug(slug: string): slug is WiredSectorSlug {
  return (WIRED_SECTOR_SLUGS as readonly string[]).includes(slug);
}

/** Prefer live/curated secondary; never fall back to EXAMPLE. */
export function pickSecondary(metrics: SectorMetrics): MetricSlot | null {
  const candidates: MetricSlot[] = [
    metrics.capitalPulse,
    metrics.infraOrAdoption,
    metrics.talentOrAdoption,
  ];
  const wired = candidates.filter((m) => !m.value.isExample);
  if (wired.length === 0) return null;
  if (wired.length === 1) return wired[0];
  const live = wired.find((m) => m.value.provenance === "live");
  if (live) return live;
  return wired[0];
}

/** All non-EXAMPLE metric slots in display order. */
export function realMetricSlots(metrics: SectorMetrics): MetricSlot[] {
  const order: MetricSlot[] = [
    metrics.northStar,
    metrics.capitalPulse,
    metrics.infraOrAdoption,
    metrics.talentOrAdoption,
  ];
  return order.filter((m) => !m.value.isExample);
}

export function cleanLabel(label: string): string {
  return label.replace(/\s*\(EXAMPLE\)\s*/gi, "").trim();
}

/** Sector has at least one live/curated figure. */
export function isWiredSector(sector: Sector): boolean {
  return realMetricSlots(sector.metrics).length > 0;
}

export function isPlaceholderSector(sector: Sector): boolean {
  return !isWiredSector(sector);
}
