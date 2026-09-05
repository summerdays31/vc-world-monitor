import type { BriefSection } from "./types";

export const briefMeta = {
  title: "World Monitor Brief",
  subtitle: "Structural proxies, movers, and catalysts — EXAMPLE DATA edition",
  asOf: "2026-09-01",
  disclaimer:
    "Every figure on this page is EXAMPLE DATA for product demonstration. Do not treat as research, advice, or cited fact.",
};

export const briefSections: BriefSection[] = [
  {
    id: "anchor",
    title: "Anchor",
    body: "The binding constraint this cycle is still physical: power interconnection and advanced packaging, not model parameter counts. Software ASP compression continues while infra scarcity re-prices real assets.",
    bullets: [
      "GPU rental spot down (EXAMPLE) while hyperscale capex proxy up — classic value shift to scarcity layers.",
      "Micro-drama ARPU spike is the clearest early consumer signal in attention.",
      "Defense attritable UAV awards keep dual-use robotics capital warm.",
    ],
    relatedSlug: "data-center",
  },
  {
    id: "structural",
    title: "Structural proxy",
    body: "Watch the gap between digital demand curves and physical delivery: interconnect queue, transformer lead times, HBM/CoWoS capacity, and critical-mineral refining share outside concentrated nodes.",
    bullets: [
      "Data-center power availability gauge remains in the danger band (EXAMPLE).",
      "Compute packaging bottleneck score elevated — die demand > package supply.",
      "Materials concentration risk still high; policy stockpiles amplify spreads.",
    ],
    relatedSlug: "compute-semiconductors",
  },
  {
    id: "movers",
    title: "Movers",
    body: "Biggest 30–90d EXAMPLE deltas cluster in attention monetization, robotics capital, liquid cooling attach, and UAV contract velocity. Soft spots: consumer brand fundraising and edtech capital.",
    relatedSlug: "attention-media",
  },
  {
    id: "catalysts",
    title: "Catalysts",
    body: "Near-term: grid megaprojects, agentic workflow GA, oral incretin readouts, and micro-drama export localization. Medium-term: IPO window clarity and EU AI Act operational obligations.",
    bullets: [
      "Industrial-policy toggles (US / China / EU) matter most on AI, semis, materials, and defense cards.",
      "Leisure remains a thesis tile: track IRL occupancy vs digital ARPU as a post-AGI time-allocation signal.",
    ],
    relatedSlug: "energy-grid",
  },
];
