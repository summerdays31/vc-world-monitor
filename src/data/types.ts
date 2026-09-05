/** Typed metrics schema — adding a metric is data, not a UI rewrite. */

export type RegionPolicy = "US" | "China" | "EU";

export type SectorMode = "Mature" | "Emerging";

export type MetricUnit =
  | "USD"
  | "USD_B"
  | "USD_M"
  | "PCT"
  | "INDEX"
  | "COUNT"
  | "RATIO"
  | "MW"
  | "TWH"
  | "CUSTOM";

export interface MetricValue {
  /** Display value already formatted for UI */
  display: string;
  /** Numeric for sorting / delta math when available */
  numeric?: number;
  unit?: MetricUnit;
  /** Always true for seed data */
  isExample: true;
  asOf: string;
}

export interface Delta {
  /** e.g. "+12.4%" or "−3.1pp" */
  display: string;
  direction: "up" | "down" | "flat";
  period: string;
  isExample: true;
}

export interface SourceTag {
  label: string;
  /** Never invent real citations for example data */
  kind: "example" | "placeholder";
}

export interface Catalyst {
  id: string;
  label: string;
  urgency: "high" | "medium" | "low";
  note?: string;
}

export interface Mover {
  id: string;
  name: string;
  delta: Delta;
  context: string;
}

export interface SectorMetrics {
  northStar: {
    label: string;
    value: MetricValue;
    delta: Delta;
  };
  capitalPulse: {
    label: string;
    value: MetricValue;
    delta: Delta;
  };
  infraOrAdoption: {
    label: string;
    value: MetricValue;
    delta: Delta;
  };
  talentOrAdoption: {
    label: string;
    value: MetricValue;
    delta: Delta;
  };
  /** 0–100 structural proxy for Yellowcake-style gauge */
  structuralGauge: {
    label: string;
    score: number;
    caption: string;
  };
}

export interface Sector {
  slug: string;
  name: string;
  shortName: string;
  mode: SectorMode;
  blurb: string;
  whyItMoved: string;
  catalyst: Catalyst;
  metrics: SectorMetrics;
  movers: Mover[];
  catalysts: Catalyst[];
  /** Cross-cut industrial-policy signals (not its own tile) */
  policy: Record<RegionPolicy, { stance: string; note: string }>;
  sources: SourceTag[];
  methodology: string;
  accent: string;
}

export interface PulseItem {
  id: string;
  sectorSlug: string;
  sectorName: string;
  label: string;
  delta: Delta;
}

export interface EmergingSignalCard {
  id: string;
  title: string;
  thesis: string;
  stages: { name: string; signal: string; status: "hot" | "warming" | "watch" }[];
  relatedSectors: string[];
}

export interface BriefSection {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  relatedSlug?: string;
}
