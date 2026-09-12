import { seriesByKey, type MetricSeries } from "@/data/series";
import type { MetricSlot } from "@/lib/homeMetrics";

/** Resolve a chart series for a sector metric slot. */
export function seriesForSectorSlot(
  sectorSlug: string,
  slot: MetricSlot,
  liveSeries?: Record<string, MetricSeries | undefined>
): MetricSeries | undefined {
  if (sectorSlug === "data-center") {
    if (/Interconnect/i.test(slot.label)) return seriesByKey.interconnect;
    if (/Debt share/i.test(slot.label)) return seriesByKey.dcDebtShare;
  }
  if (sectorSlug === "capital-formation" && /deficit/i.test(slot.label)) {
    return seriesByKey.deficit;
  }
  if (sectorSlug === "climate-adaptation" && /billion-dollar/i.test(slot.label)) {
    return seriesByKey.noaaDisasters;
  }
  if (sectorSlug === "attention-media" && /Netflix/i.test(slot.label)) {
    return seriesByKey.netflixRevenue;
  }

  // Live FRED series from bundle (when provided)
  if (liveSeries) {
    if (sectorSlug === "consumer" && /retail/i.test(slot.label))
      return liveSeries.retailSales;
    if (sectorSlug === "labor-demography" && /unemployment/i.test(slot.label))
      return liveSeries.unemployment;
    if (sectorSlug === "labor-demography" && /JOLTS/i.test(slot.label))
      return liveSeries.jolts;
    if (sectorSlug === "materials" && /copper/i.test(slot.label))
      return liveSeries.copper;
    if (sectorSlug === "defense" && /defense outlays/i.test(slot.label))
      return liveSeries.defenseOutlays;
    if (sectorSlug === "compute-semiconductors" && /industrial production/i.test(slot.label))
      return liveSeries.semiIp;
    if (sectorSlug === "compute-semiconductors" && /SOX/i.test(slot.label))
      return liveSeries.sox;
    if (sectorSlug === "energy-grid" && /Henry Hub/i.test(slot.label))
      return liveSeries.henryHub;
    if (sectorSlug === "education-skills" && /Education/i.test(slot.label))
      return liveSeries.eduEmployment;
  }

  return undefined;
}
