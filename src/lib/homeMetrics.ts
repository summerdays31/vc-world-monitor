import type { Sector, SectorMetrics } from "@/data/types";

export type MetricSlot = SectorMetrics["capitalPulse"];

/** All first-class sectors with at least one live/curated metric. */
export const WIRED_SECTOR_SLUGS = [
  "ai",
  "healthcare",
  "consumer",
  "robotics",
  "data-center",
  "defense",
  "space",
  "materials",
  "leisure",
  "energy-grid",
  "compute-semiconductors",
  "labor-demography",
  "capital-formation",
  "bio-longevity",
  "security-cyber",
  "climate-adaptation",
  "education-skills",
  "attention-media",
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

/** Home cards: max 2 real metrics per sector. */
export function homeMetricSlots(metrics: SectorMetrics): MetricSlot[] {
  return realMetricSlots(metrics).slice(0, 2);
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
