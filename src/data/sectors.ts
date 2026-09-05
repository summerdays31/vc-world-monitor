import type { EmergingSignalCard, PulseItem, Sector } from "./types";

const ex = true as const;

function d(
  display: string,
  direction: "up" | "down" | "flat",
  period = "30d"
) {
  return { display, direction, period, isExample: ex };
}

function v(display: string, numeric?: number, unit?: import("./types").MetricUnit) {
  return {
    display,
    numeric,
    unit,
    isExample: true,
    provenance: "example" as const,
    asOf: "2026-09-01",
  };
}

/**
 * All 19 first-class sectors with EXAMPLE DATA only.
 * Numbers are plausible placeholders — never cite as real sources.
 */
export const sectors: Sector[] = [
  {
    slug: "ai",
    name: "AI",
    shortName: "AI",
    mode: "Mature",
    blurb: "Foundation models, agents, and enterprise copilot spend.",
    whyItMoved: "Enterprise seat expansion + inference price war compressed unit costs.",
    catalyst: {
      id: "ai-c1",
      label: "Agentic workflows GA",
      urgency: "high",
      note: "Multi-step tools shipping into CRM/ITSM stacks",
    },
    accent: "#7dd3fc",
    metrics: {
      northStar: {
        label: "Est. AI software ARR",
        value: v("$48.2B", 48.2, "USD_B"),
        delta: d("+18.4%", "up"),
      },
      capitalPulse: {
        label: "Private rounds (30d)",
        value: v("$6.1B", 6.1, "USD_B"),
        delta: d("+9.2%", "up"),
      },
      infraOrAdoption: {
        label: "GPU rental spot (H100-eq)",
        value: v("$1.85/hr", 1.85, "CUSTOM"),
        delta: d("−22%", "down", "90d"),
      },
      talentOrAdoption: {
        label: "Open roles: ML eng",
        value: v("41.2k", 41200, "COUNT"),
        delta: d("+6.1%", "up"),
      },
      structuralGauge: {
        label: "Inference utilization",
        score: 72,
        caption: "Capacity fill vs published cluster additions (proxy)",
      },
    },
    movers: [
      {
        id: "ai-m1",
        name: "Inference ASP",
        delta: d("−14%", "down", "90d"),
        context: "Price competition on frontier APIs",
      },
      {
        id: "ai-m2",
        name: "Enterprise seats",
        delta: d("+21%", "up", "90d"),
        context: "Seat → usage attach rising",
      },
      {
        id: "ai-m3",
        name: "Open-weight downloads",
        delta: d("+38%", "up", "30d"),
        context: "On-prem / sovereign demand",
      },
    ],
    catalysts: [
      {
        id: "ai-c1",
        label: "Agentic workflows GA",
        urgency: "high",
      },
      {
        id: "ai-c2",
        label: "EU AI Act obligations",
        urgency: "medium",
      },
      {
        id: "ai-c3",
        label: "Next-gen interconnect bids",
        urgency: "high",
      },
    ],
    policy: {
      US: { stance: "Accelerate + export control", note: "CHIPS + compute export rules" },
      China: { stance: "Domestic stack push", note: "Local silicon + open weights" },
      EU: { stance: "Regulate + fund", note: "AI Act + EuroHPC" },
    },
    sources: [
      { label: "EXAMPLE — ARR rollup", kind: "example" },
      { label: "EXAMPLE — GPU spot index", kind: "example" },
    ],
    methodology:
      "North star blends public ARR disclosures and EXAMPLE private estimates. GPU rental is a synthetic spot composite. All figures labeled EXAMPLE DATA.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Health",
    mode: "Mature",
    blurb: "Care delivery software, diagnostics, and payer-provider tech.",
    whyItMoved: "Prior-auth automation wins + GLP-1 adjacency spend.",
    catalyst: {
      id: "hc-c1",
      label: "CMS digital QI pilots",
      urgency: "medium",
    },
    accent: "#86efac",
    metrics: {
      northStar: {
        label: "Digital health ARR proxy",
        value: v("$29.4B", 29.4, "USD_B"),
        delta: d("+7.8%", "up"),
      },
      capitalPulse: {
        label: "VC into care tech",
        value: v("$1.9B", 1.9, "USD_B"),
        delta: d("−4.2%", "down"),
      },
      infraOrAdoption: {
        label: "EHR API call growth",
        value: v("+31%", 31, "PCT"),
        delta: d("+4.0pp", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Clinical informatics hires",
        value: v("8.4k", 8400, "COUNT"),
        delta: d("+3.2%", "up"),
      },
      structuralGauge: {
        label: "Interoperability readiness",
        score: 58,
        caption: "FHIR / TEFCA adoption proxy across IDNs",
      },
    },
    movers: [
      {
        id: "hc-m1",
        name: "Prior-auth auto rate",
        delta: d("+9pp", "up", "90d"),
        context: "Payer mandates + LLM triage",
      },
      {
        id: "hc-m2",
        name: "Imaging AI clearance",
        delta: d("+12", "up", "90d"),
        context: "EXAMPLE clearance count",
      },
    ],
    catalysts: [
      { id: "hc-c1", label: "CMS digital QI pilots", urgency: "medium" },
      { id: "hc-c2", label: "Drug-pricing spillover", urgency: "high" },
    ],
    policy: {
      US: { stance: "Interop mandates", note: "TEFCA / info blocking" },
      China: { stance: "Hospital digitization", note: "Provincial EHR upgrades" },
      EU: { stance: "EHDS rollout", note: "Health data space rules" },
    },
    sources: [
      { label: "EXAMPLE — digital health rollup", kind: "example" },
    ],
    methodology:
      "ARR proxy from EXAMPLE category models. EHR API growth is a synthetic adoption index.",
  },
  {
    slug: "consumer",
    name: "Consumer",
    shortName: "Consumer",
    mode: "Mature",
    blurb: "Brand, commerce, and product cycles under attention scarcity.",
    whyItMoved: "Short-form commerce attach offset soft discretionary spend.",
    catalyst: {
      id: "co-c1",
      label: "Holiday AOV guidance",
      urgency: "medium",
    },
    accent: "#f9a8d4",
    metrics: {
      northStar: {
        label: "DTC + marketplace GMV proxy",
        value: v("$412B", 412, "USD_B"),
        delta: d("+5.1%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Brand / consumer rounds",
        value: v("$0.84B", 0.84, "USD_B"),
        delta: d("−11%", "down"),
      },
      infraOrAdoption: {
        label: "Social commerce attach",
        value: v("19.4%", 19.4, "PCT"),
        delta: d("+1.8pp", "up"),
      },
      talentOrAdoption: {
        label: "Growth marketing roles",
        value: v("22.1k", 22100, "COUNT"),
        delta: d("−2.4%", "down"),
      },
      structuralGauge: {
        label: "Repeat purchase health",
        score: 61,
        caption: "Cohort retention composite (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "co-m1",
        name: "Short-form GMV",
        delta: d("+16%", "up", "90d"),
        context: "Live + shop tabs",
      },
      {
        id: "co-m2",
        name: "CAC (paid social)",
        delta: d("+8%", "up", "90d"),
        context: "Auction tightness",
      },
    ],
    catalysts: [
      { id: "co-c1", label: "Holiday AOV guidance", urgency: "medium" },
      { id: "co-c2", label: "Platform fee changes", urgency: "high" },
    ],
    policy: {
      US: { stance: "Privacy / ads", note: "State privacy acts" },
      China: { stance: "Platform governance", note: "Live-commerce rules" },
      EU: { stance: "DSA / DMA", note: "Gatekeeper obligations" },
    },
    sources: [{ label: "EXAMPLE — GMV composite", kind: "example" }],
    methodology: "GMV and attach rates are EXAMPLE composites for dashboard UX.",
  },
  {
    slug: "robotics",
    name: "Robotics",
    shortName: "Robotics",
    mode: "Emerging",
    blurb: "Warehouse, humanoid pilots, and industrial autonomy.",
    whyItMoved: "Warehouse AMR bookings + humanoid pilot announcements.",
    catalyst: {
      id: "ro-c1",
      label: "Humanoid factory pilots",
      urgency: "high",
    },
    accent: "#c4b5fd",
    metrics: {
      northStar: {
        label: "Robotics systems bookings",
        value: v("$9.7B", 9.7, "USD_B"),
        delta: d("+14%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Robotics VC",
        value: v("$2.4B", 2.4, "USD_B"),
        delta: d("+27%", "up"),
      },
      infraOrAdoption: {
        label: "AMR fleet deployed (proxy)",
        value: v("184k", 184000, "COUNT"),
        delta: d("+19%", "up"),
      },
      talentOrAdoption: {
        label: "Robotics eng openings",
        value: v("6.9k", 6900, "COUNT"),
        delta: d("+11%", "up"),
      },
      structuralGauge: {
        label: "Autonomy readiness",
        score: 44,
        caption: "Pilot → production conversion proxy",
      },
    },
    movers: [
      {
        id: "ro-m1",
        name: "Warehouse AMR",
        delta: d("+22%", "up", "90d"),
        context: "Labor scarcity pull",
      },
      {
        id: "ro-m2",
        name: "Actuator lead times",
        delta: d("−9%", "down", "90d"),
        context: "Supply easing (EXAMPLE)",
      },
    ],
    catalysts: [
      { id: "ro-c1", label: "Humanoid factory pilots", urgency: "high" },
      { id: "ro-c2", label: "Safety cert pathways", urgency: "medium" },
    ],
    policy: {
      US: { stance: "Manufacturing incentives", note: "Reshoring + IRA adjacency" },
      China: { stance: "National robotics plan", note: "Industrial density targets" },
      EU: { stance: "Machinery regulation", note: "CE / AI-machine overlap" },
    },
    sources: [{ label: "EXAMPLE — bookings model", kind: "example" }],
    methodology: "Bookings and fleet counts are EXAMPLE DATA for interaction design.",
  },
  {
    slug: "data-center",
    name: "Data center",
    shortName: "DC",
    mode: "Mature",
    blurb: "Power, land, cooling, and interconnect for AI/cloud load.",
    whyItMoved: "Power-constrained campuses repriced; interconnect queue rose.",
    catalyst: {
      id: "dc-c1",
      label: "Grid interconnection queue",
      urgency: "high",
    },
    accent: "#67e8f9",
    metrics: {
      northStar: {
        label: "Hyperscale capex proxy",
        value: v("$214B", 214, "USD_B"),
        delta: d("+24%", "up", "YoY"),
      },
      capitalPulse: {
        label: "DC / infra PE+debt",
        value: v("$18.6B", 18.6, "USD_B"),
        delta: d("+12%", "up"),
      },
      infraOrAdoption: {
        label: "Interconnect queue (median)",
        value: v("4.8 yrs", 4.8, "CUSTOM"),
        delta: d("+0.4y", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Critical facilities roles",
        value: v("12.3k", 12300, "COUNT"),
        delta: d("+15%", "up"),
      },
      structuralGauge: {
        label: "Power availability",
        score: 38,
        caption: "MW available vs requested (EXAMPLE tightness)",
      },
    },
    movers: [
      {
        id: "dc-m1",
        name: "Liquid cooling attach",
        delta: d("+28%", "up", "90d"),
        context: "High-density racks",
      },
      {
        id: "dc-m2",
        name: "Secondary market lease",
        delta: d("+11%", "up", "90d"),
        context: "Scarce powered shells",
      },
    ],
    catalysts: [
      { id: "dc-c1", label: "Grid interconnection queue", urgency: "high" },
      { id: "dc-c2", label: "Nuclear / SMR PPAs", urgency: "medium" },
    ],
    policy: {
      US: { stance: "Grid + permitting", note: "State siting races" },
      China: { stance: "East-data West-compute", note: "Regional load balancing" },
      EU: { stance: "Energy efficiency rules", note: "PUE / water reporting" },
    },
    sources: [
      { label: "EXAMPLE — capex composite", kind: "example" },
      { label: "EXAMPLE — queue proxy", kind: "example" },
    ],
    methodology:
      "Capex and queue figures are EXAMPLE composites illustrating structural bottlenecks.",
  },
  {
    slug: "defense",
    name: "Defense",
    shortName: "Defense",
    mode: "Mature",
    blurb: "Autonomy, munitions, C4ISR, and dual-use manufacturing.",
    whyItMoved: "Munitions restocking + attritable UAV contract flow.",
    catalyst: {
      id: "de-c1",
      label: "Attritable UAV awards",
      urgency: "high",
    },
    accent: "#fcd34d",
    metrics: {
      northStar: {
        label: "Prime + dual-use backlog proxy",
        value: v("$186B", 186, "USD_B"),
        delta: d("+9.6%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Defense tech VC",
        value: v("$1.6B", 1.6, "USD_B"),
        delta: d("+18%", "up"),
      },
      infraOrAdoption: {
        label: "Munitions monthly output idx",
        value: v("128", 128, "INDEX"),
        delta: d("+14%", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Cleared eng openings",
        value: v("9.1k", 9100, "COUNT"),
        delta: d("+8%", "up"),
      },
      structuralGauge: {
        label: "Industrial base stretch",
        score: 67,
        caption: "Capacity utilization vs surge demand (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "de-m1",
        name: "UAV / one-way attack",
        delta: d("+31%", "up", "90d"),
        context: "Contract velocity",
      },
      {
        id: "de-m2",
        name: "Space ISR spend",
        delta: d("+12%", "up", "90d"),
        context: "Constellation tasking",
      },
    ],
    catalysts: [
      { id: "de-c1", label: "Attritable UAV awards", urgency: "high" },
      { id: "de-c2", label: "FY budget markups", urgency: "medium" },
    ],
    policy: {
      US: { stance: "Reindustrialize", note: "DIU / OT acceleration" },
      China: { stance: "Civil-military fuse", note: "Dual-use prioritization" },
      EU: { stance: "Collective procurement", note: "EDF + ammo initiatives" },
    },
    sources: [{ label: "EXAMPLE — backlog proxy", kind: "example" }],
    methodology: "Backlog and output indices are EXAMPLE DATA, not official tallies.",
  },
  {
    slug: "space",
    name: "Space",
    shortName: "Space",
    mode: "Emerging",
    blurb: "Launch cadence, LEO broadband, and Earth observation value.",
    whyItMoved: "Launch cadence up; LEO capacity pricing under pressure.",
    catalyst: {
      id: "sp-c1",
      label: "Next rideshare wave",
      urgency: "medium",
    },
    accent: "#a5b4fc",
    metrics: {
      northStar: {
        label: "Launch + sat services rev proxy",
        value: v("$14.8B", 14.8, "USD_B"),
        delta: d("+16%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Space VC / growth",
        value: v("$1.1B", 1.1, "USD_B"),
        delta: d("+5%", "up"),
      },
      infraOrAdoption: {
        label: "Orbital launches (YTD)",
        value: v("148", 148, "COUNT"),
        delta: d("+11%", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Aerospace eng roles",
        value: v("7.2k", 7200, "COUNT"),
        delta: d("+4%", "up"),
      },
      structuralGauge: {
        label: "Launch accessibility",
        score: 63,
        caption: "$/kg to LEO trend vs cadence (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "sp-m1",
        name: "$/kg to LEO",
        delta: d("−8%", "down", "YoY"),
        context: "Reusable cadence",
      },
      {
        id: "sp-m2",
        name: "EO tasking demand",
        delta: d("+17%", "up", "90d"),
        context: "Defense + climate",
      },
    ],
    catalysts: [
      { id: "sp-c1", label: "Next rideshare wave", urgency: "medium" },
      { id: "sp-c2", label: "Spectrum / debris rules", urgency: "low" },
    ],
    policy: {
      US: { stance: "Commercial LEO lead", note: "FCC / DoD contracts" },
      China: { stance: "Constellation buildout", note: "National LEO plans" },
      EU: { stance: "IRIS² + sovereignty", note: "Secure connectivity" },
    },
    sources: [{ label: "EXAMPLE — launch tally", kind: "example" }],
    methodology: "Launch counts and revenue proxies are EXAMPLE DATA.",
  },
  {
    slug: "materials",
    name: "Materials",
    shortName: "Materials",
    mode: "Mature",
    blurb: "Critical minerals, advanced materials, and supply chokepoints.",
    whyItMoved: "Critical mineral spreads widened on policy stockpiling.",
    catalyst: {
      id: "ma-c1",
      label: "Critical minerals stockpile",
      urgency: "high",
    },
    accent: "#fdbA74",
    metrics: {
      northStar: {
        label: "Critical minerals basket",
        value: v("142", 142, "INDEX"),
        delta: d("+9.3%", "up"),
      },
      capitalPulse: {
        label: "Mining / materials raises",
        value: v("$2.8B", 2.8, "USD_B"),
        delta: d("+6%", "up"),
      },
      infraOrAdoption: {
        label: "Refining capacity (ex-CN share)",
        value: v("28%", 28, "PCT"),
        delta: d("+2.1pp", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Process eng openings",
        value: v("4.6k", 4600, "COUNT"),
        delta: d("+7%", "up"),
      },
      structuralGauge: {
        label: "Supply concentration risk",
        score: 74,
        caption: "Herfindahl-style chokepoint score (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "ma-m1",
        name: "NdPr oxide",
        delta: d("+14%", "up", "90d"),
        context: "Magnet demand",
      },
      {
        id: "ma-m2",
        name: "Copper TC/RCs",
        delta: d("−12%", "down", "90d"),
        context: "Concentrate tightness",
      },
    ],
    catalysts: [
      { id: "ma-c1", label: "Critical minerals stockpile", urgency: "high" },
      { id: "ma-c2", label: "Export license shifts", urgency: "high" },
    ],
    policy: {
      US: { stance: "Friend-shore + DPA", note: "Stockpile + offtake" },
      China: { stance: "Export leverage", note: "Licensing on key inputs" },
      EU: { stance: "CRMA targets", note: "Domestic refining goals" },
    },
    sources: [{ label: "EXAMPLE — minerals basket", kind: "example" }],
    methodology: "Basket index and refining shares are EXAMPLE constructs.",
  },
  {
    slug: "leisure",
    name: "Leisure",
    shortName: "Leisure",
    mode: "Emerging",
    blurb: "Post-AGI non-digital time thesis: IRL experiences, hospitality, craft.",
    whyItMoved: "Experience bookings outpaced digital entertainment ARPU.",
    catalyst: {
      id: "le-c1",
      label: "IRL membership clubs",
      urgency: "medium",
    },
    accent: "#fca5a5",
    metrics: {
      northStar: {
        label: "Experience spend proxy",
        value: v("$1.12T", 1120, "USD_B"),
        delta: d("+8.4%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Hospitality / leisure VC",
        value: v("$0.62B", 0.62, "USD_B"),
        delta: d("+14%", "up"),
      },
      infraOrAdoption: {
        label: "Premium IRL occupancy",
        value: v("78%", 78, "PCT"),
        delta: d("+3.2pp", "up"),
      },
      talentOrAdoption: {
        label: "Hospitality mgmt roles",
        value: v("18.7k", 18700, "COUNT"),
        delta: d("+5%", "up"),
      },
      structuralGauge: {
        label: "Time reallocation",
        score: 52,
        caption: "Non-screen leisure hours vs baseline (EXAMPLE thesis)",
      },
    },
    movers: [
      {
        id: "le-m1",
        name: "Boutique hotel ADR",
        delta: d("+7%", "up", "90d"),
        context: "Experience premium",
      },
      {
        id: "le-m2",
        name: "Digital ARPU (games/stream)",
        delta: d("+1.2%", "up", "90d"),
        context: "Saturation contrast",
      },
    ],
    catalysts: [
      { id: "le-c1", label: "IRL membership clubs", urgency: "medium" },
      { id: "le-c2", label: "Creator → venue migration", urgency: "low" },
    ],
    policy: {
      US: { stance: "Neutral / labor", note: "Service wage floors" },
      China: { stance: "Domestic tourism push", note: "Holiday economy" },
      EU: { stance: "Tourism sustainability", note: "Overtourism rules" },
    },
    sources: [{ label: "EXAMPLE — experience spend", kind: "example" }],
    methodology:
      "Leisure thesis metrics are EXAMPLE illustrations of post-AGI time allocation — not measured GDP series.",
  },
  {
    slug: "energy-grid",
    name: "Energy & grid",
    shortName: "Energy",
    mode: "Mature",
    blurb: "Generation, transmission, storage, and AI-driven load growth.",
    whyItMoved: "Data-center load forecasts forced T&D and storage re-rating.",
    catalyst: {
      id: "eg-c1",
      label: "Transmission megaprojects",
      urgency: "high",
    },
    accent: "#4ade80",
    metrics: {
      northStar: {
        label: "Grid investment proxy",
        value: v("$392B", 392, "USD_B"),
        delta: d("+11%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Energy transition raises",
        value: v("$7.4B", 7.4, "USD_B"),
        delta: d("+3%", "up"),
      },
      infraOrAdoption: {
        label: "Battery storage additions",
        value: v("48 GW", 48, "CUSTOM"),
        delta: d("+26%", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Power systems eng roles",
        value: v("14.5k", 14500, "COUNT"),
        delta: d("+13%", "up"),
      },
      structuralGauge: {
        label: "T&D bottleneck score",
        score: 71,
        caption: "Queue + transformer lead-time composite (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "eg-m1",
        name: "Transformer lead time",
        delta: d("+6%", "up", "90d"),
        context: "Still tight",
      },
      {
        id: "eg-m2",
        name: "Utility-scale storage LCOS",
        delta: d("−9%", "down", "YoY"),
        context: "Cell + system costs",
      },
    ],
    catalysts: [
      { id: "eg-c1", label: "Transmission megaprojects", urgency: "high" },
      { id: "eg-c2", label: "AI load interconnection", urgency: "high" },
    ],
    policy: {
      US: { stance: "IRA + permitting reform", note: "Storage / T&D incentives" },
      China: { stance: "Ultra-high-voltage build", note: "Provincial targets" },
      EU: { stance: "REPower / grids", note: "Cross-border interconnects" },
    },
    sources: [{ label: "EXAMPLE — grid investment", kind: "example" }],
    methodology: "Investment and GW figures are EXAMPLE DATA placeholders.",
  },
  {
    slug: "compute-semiconductors",
    name: "Compute / semiconductors",
    shortName: "Compute",
    mode: "Mature",
    blurb: "Leading-edge logic, memory, packaging, and equipment cycles.",
    whyItMoved: "Advanced packaging scarcity + memory rebound.",
    catalyst: {
      id: "cs-c1",
      label: "CoWoS / advanced pkg capacity",
      urgency: "high",
    },
    accent: "#38bdf8",
    metrics: {
      northStar: {
        label: "Semi revenue proxy",
        value: v("$628B", 628, "USD_B"),
        delta: d("+12%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Fab / equip investment",
        value: v("$118B", 118, "USD_B"),
        delta: d("+8%", "up"),
      },
      infraOrAdoption: {
        label: "Leading-edge utilization",
        value: v("93%", 93, "PCT"),
        delta: d("+2pp", "up"),
      },
      talentOrAdoption: {
        label: "Process / packaging roles",
        value: v("11.8k", 11800, "COUNT"),
        delta: d("+10%", "up"),
      },
      structuralGauge: {
        label: "Packaging bottleneck",
        score: 78,
        caption: "Advanced package capacity vs AI die demand (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "cs-m1",
        name: "HBM ASP",
        delta: d("+19%", "up", "90d"),
        context: "AI memory attach",
      },
      {
        id: "cs-m2",
        name: "Equipment bookings",
        delta: d("+7%", "up", "90d"),
        context: "Logic + memory fabs",
      },
    ],
    catalysts: [
      { id: "cs-c1", label: "CoWoS / advanced pkg capacity", urgency: "high" },
      { id: "cs-c2", label: "Export control updates", urgency: "high" },
    ],
    policy: {
      US: { stance: "CHIPS Act build", note: "Onshore fabs + tools" },
      China: { stance: "Mature-node scale", note: "Domestic tooling push" },
      EU: { stance: "Chips Act fabs", note: "Subsidy competition" },
    },
    sources: [{ label: "EXAMPLE — semi revenue", kind: "example" }],
    methodology: "Industry revenue and utilization are EXAMPLE rollups for UI demos.",
  },
  {
    slug: "labor-demography",
    name: "Labor & demography",
    shortName: "Labor",
    mode: "Mature",
    blurb: "Workforce aging, participation, and automation substitution.",
    whyItMoved: "Prime-age tightness + immigration policy shifts.",
    catalyst: {
      id: "ld-c1",
      label: "Skilled immigration bills",
      urgency: "medium",
    },
    accent: "#e879f9",
    metrics: {
      northStar: {
        label: "Prime-age employment ratio",
        value: v("80.6%", 80.6, "PCT"),
        delta: d("+0.3pp", "up"),
      },
      capitalPulse: {
        label: "HR-tech / staffing capital",
        value: v("$0.91B", 0.91, "USD_B"),
        delta: d("−6%", "down"),
      },
      infraOrAdoption: {
        label: "Automation job-post ratio",
        value: v("1.34×", 1.34, "RATIO"),
        delta: d("+0.08×", "up"),
      },
      talentOrAdoption: {
        label: "Healthcare aide openings",
        value: v("96k", 96000, "COUNT"),
        delta: d("+4%", "up"),
      },
      structuralGauge: {
        label: "Demographic pressure",
        score: 69,
        caption: "Dependency + vacancy composite (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "ld-m1",
        name: "Construction labor cost",
        delta: d("+5.2%", "up", "YoY"),
        context: "Trades scarcity",
      },
      {
        id: "ld-m2",
        name: "Remote job share",
        delta: d("−1.1pp", "down", "90d"),
        context: "RTO consolidation",
      },
    ],
    catalysts: [
      { id: "ld-c1", label: "Skilled immigration bills", urgency: "medium" },
      { id: "ld-c2", label: "Care-economy funding", urgency: "low" },
    ],
    policy: {
      US: { stance: "Immigration + reskilling", note: "Visa backlog politics" },
      China: { stance: "Aging response", note: "Retirement / birth policy" },
      EU: { stance: "Labor mobility", note: "Skills visas + aging" },
    },
    sources: [{ label: "EXAMPLE — labor composite", kind: "example" }],
    methodology: "Ratios are EXAMPLE stylized facts for the dashboard narrative.",
  },
  {
    slug: "capital-formation",
    name: "Capital formation",
    shortName: "Capital",
    mode: "Mature",
    blurb: "VC, growth, private credit, and IPO/window conditions.",
    whyItMoved: "IPO window flickers; private credit still absorbs duration.",
    catalyst: {
      id: "cf-c1",
      label: "IPO calendar reopen",
      urgency: "medium",
    },
    accent: "#fde047",
    metrics: {
      northStar: {
        label: "Global VC deployed (YTD)",
        value: v("$186B", 186, "USD_B"),
        delta: d("+8%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Private credit AUM add",
        value: v("$42B", 42, "USD_B"),
        delta: d("+11%", "up"),
      },
      infraOrAdoption: {
        label: "IPO proceeds (YTD)",
        value: v("$38B", 38, "USD_B"),
        delta: d("+44%", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Investor / IB openings",
        value: v("5.4k", 5400, "COUNT"),
        delta: d("+2%", "up"),
      },
      structuralGauge: {
        label: "Exit window health",
        score: 48,
        caption: "IPO + M&A velocity vs backlog (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "cf-m1",
        name: "Late-stage valuations",
        delta: d("+6%", "up", "90d"),
        context: "Selective rebound",
      },
      {
        id: "cf-m2",
        name: "Dry powder deploy rate",
        delta: d("+3%", "up", "90d"),
        context: "Still cautious pace",
      },
    ],
    catalysts: [
      { id: "cf-c1", label: "IPO calendar reopen", urgency: "medium" },
      { id: "cf-c2", label: "Rate path clarity", urgency: "high" },
    ],
    policy: {
      US: { stance: "Market structure", note: "Listing / accreditation rules" },
      China: { stance: "Domestic listings", note: "Fundraising controls" },
      EU: { stance: "Listing Act", note: "Capital markets union" },
    },
    sources: [{ label: "EXAMPLE — VC deployed", kind: "example" }],
    methodology: "Capital figures are EXAMPLE aggregates for product demonstration.",
  },
  {
    slug: "bio-longevity",
    name: "Bio / longevity",
    shortName: "Bio",
    mode: "Emerging",
    blurb: "Therapeutics platforms, aging biology, and preventive stacks.",
    whyItMoved: "Obesity adjacency cashflows funding broader longevity bets.",
    catalyst: {
      id: "bl-c1",
      label: "Oral incretin readouts",
      urgency: "high",
    },
    accent: "#6ee7b7",
    metrics: {
      northStar: {
        label: "Platform biotech EV proxy",
        value: v("$214B", 214, "USD_B"),
        delta: d("+13%", "up"),
      },
      capitalPulse: {
        label: "Bio / longevity raises",
        value: v("$3.2B", 3.2, "USD_B"),
        delta: d("+9%", "up"),
      },
      infraOrAdoption: {
        label: "Clinic trial starts (proxy)",
        value: v("1,840", 1840, "COUNT"),
        delta: d("+6%", "up", "YoY"),
      },
      talentOrAdoption: {
        label: "Computational bio roles",
        value: v("3.8k", 3800, "COUNT"),
        delta: d("+16%", "up"),
      },
      structuralGauge: {
        label: "Translational velocity",
        score: 55,
        caption: "Discovery → clinic cycle-time proxy (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "bl-m1",
        name: "GLP-1 adjacency M&A",
        delta: d("+24%", "up", "90d"),
        context: "Cashflow recycling",
      },
      {
        id: "bl-m2",
        name: "Aging biomarker kits",
        delta: d("+18%", "up", "90d"),
        context: "Consumer + clinic",
      },
    ],
    catalysts: [
      { id: "bl-c1", label: "Oral incretin readouts", urgency: "high" },
      { id: "bl-c2", label: "FDA aging endpoints", urgency: "low" },
    ],
    policy: {
      US: { stance: "FDA pathway experiments", note: "Accelerated programs" },
      China: { stance: "Biotech scale-up", note: "Domestic innovative drugs" },
      EU: { stance: "HTA / access", note: "Joint clinical assessment" },
    },
    sources: [{ label: "EXAMPLE — biotech EV", kind: "example" }],
    methodology: "EV and trial counts are EXAMPLE DATA — not clinical claims.",
  },
  {
    slug: "security-cyber",
    name: "Security / cyber + trust",
    shortName: "Security",
    mode: "Mature",
    blurb: "Identity, cloud security, OT, and AI-era trust layers.",
    whyItMoved: "Identity + cloud CNAPP consolidation; AI phishing spike.",
    catalyst: {
      id: "sc-c1",
      label: "AI-assisted phishing wave",
      urgency: "high",
    },
    accent: "#fb7185",
    metrics: {
      northStar: {
        label: "Cybersecurity ARR proxy",
        value: v("$92B", 92, "USD_B"),
        delta: d("+14%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Security VC",
        value: v("$2.1B", 2.1, "USD_B"),
        delta: d("+4%", "up"),
      },
      infraOrAdoption: {
        label: "Zero-trust adopt index",
        value: v("61", 61, "INDEX"),
        delta: d("+5", "up"),
      },
      talentOrAdoption: {
        label: "Security eng openings",
        value: v("28.4k", 28400, "COUNT"),
        delta: d("+7%", "up"),
      },
      structuralGauge: {
        label: "Threat surface growth",
        score: 76,
        caption: "API + identity attack surface composite (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "sc-m1",
        name: "Identity spend",
        delta: d("+17%", "up", "90d"),
        context: "Workforce + machine ID",
      },
      {
        id: "sc-m2",
        name: "OT security attach",
        delta: d("+11%", "up", "90d"),
        context: "Critical infra",
      },
    ],
    catalysts: [
      { id: "sc-c1", label: "AI-assisted phishing wave", urgency: "high" },
      { id: "sc-c2", label: "Secure software EO follow-ons", urgency: "medium" },
    ],
    policy: {
      US: { stance: "Critical infra rules", note: "CISA / EO software" },
      China: { stance: "Data security law", note: "Domestic stacks" },
      EU: { stance: "NIS2 / CRA", note: "Product security duties" },
    },
    sources: [{ label: "EXAMPLE — cyber ARR", kind: "example" }],
    methodology: "ARR and indices are EXAMPLE placeholders for product UX.",
  },
  {
    slug: "climate-adaptation",
    name: "Climate adaptation",
    shortName: "Climate",
    mode: "Emerging",
    blurb: "Resilience infra, insurance tech, water, and heat adaptation.",
    whyItMoved: "Insured loss seasons + municipal resilience bonds.",
    catalyst: {
      id: "ca-c1",
      label: "Municipal resilience bonds",
      urgency: "medium",
    },
    accent: "#2dd4bf",
    metrics: {
      northStar: {
        label: "Adaptation spend proxy",
        value: v("$74B", 74, "USD_B"),
        delta: d("+15%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Climate adaptation capital",
        value: v("$1.4B", 1.4, "USD_B"),
        delta: d("+21%", "up"),
      },
      infraOrAdoption: {
        label: "Parametric insurance GWP",
        value: v("$6.8B", 6.8, "USD_B"),
        delta: d("+18%", "up"),
      },
      talentOrAdoption: {
        label: "Climate risk analyst roles",
        value: v("2.9k", 2900, "COUNT"),
        delta: d("+22%", "up"),
      },
      structuralGauge: {
        label: "Physical risk pricing",
        score: 57,
        caption: "Insurance retreat vs retrofit spend (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "ca-m1",
        name: "Flood / wildfire premiums",
        delta: d("+12%", "up", "YoY"),
        context: "Reprice cycle",
      },
      {
        id: "ca-m2",
        name: "Cooling degree demand",
        delta: d("+9%", "up", "YoY"),
        context: "Heat adaptation",
      },
    ],
    catalysts: [
      { id: "ca-c1", label: "Municipal resilience bonds", urgency: "medium" },
      { id: "ca-c2", label: "Insurance retreat maps", urgency: "high" },
    ],
    policy: {
      US: { stance: "FEMA / IRA adaptation", note: "State resilience funds" },
      China: { stance: "Sponge cities", note: "Urban water infra" },
      EU: { stance: "Adaptation strategy", note: "Nature-based solutions" },
    },
    sources: [{ label: "EXAMPLE — adaptation spend", kind: "example" }],
    methodology: "Spend and GWP figures are EXAMPLE DATA for narrative demos.",
  },
  {
    slug: "education-skills",
    name: "Education / skill formation",
    shortName: "Education",
    mode: "Emerging",
    blurb: "Reskilling, credentials, and AI tutoring at workforce scale.",
    whyItMoved: "Employer-funded upskilling + AI tutor engagement spikes.",
    catalyst: {
      id: "es-c1",
      label: "Employer tuition benefits",
      urgency: "medium",
    },
    accent: "#93c5fd",
    metrics: {
      northStar: {
        label: "Ed / skilling ARR proxy",
        value: v("$24.6B", 24.6, "USD_B"),
        delta: d("+9%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Edtech / skilling VC",
        value: v("$1.05B", 1.05, "USD_B"),
        delta: d("−8%", "down"),
      },
      infraOrAdoption: {
        label: "AI tutor weekly actives",
        value: v("38M", 38, "COUNT"),
        delta: d("+41%", "up"),
      },
      talentOrAdoption: {
        label: "Instructional design roles",
        value: v("4.1k", 4100, "COUNT"),
        delta: d("+3%", "up"),
      },
      structuralGauge: {
        label: "Credential ROI clarity",
        score: 46,
        caption: "Completion → wage lift evidence score (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "es-m1",
        name: "Corporate L&D budgets",
        delta: d("+6%", "up", "YoY"),
        context: "AI tool training",
      },
      {
        id: "es-m2",
        name: "Bootcamp placements",
        delta: d("−4%", "down", "90d"),
        context: "Hiring selectivity",
      },
    ],
    catalysts: [
      { id: "es-c1", label: "Employer tuition benefits", urgency: "medium" },
      { id: "es-c2", label: "Skills-based hiring pledges", urgency: "low" },
    ],
    policy: {
      US: { stance: "WIOA / apprenticeships", note: "State skills funds" },
      China: { stance: "Vocational push", note: "Technical colleges" },
      EU: { stance: "Pact for Skills", note: "Reskilling coalitions" },
    },
    sources: [{ label: "EXAMPLE — ed ARR", kind: "example" }],
    methodology: "ARR and WAU figures are EXAMPLE DATA placeholders.",
  },
  {
    slug: "attention-media",
    name: "Attention / media platforms",
    shortName: "Attention",
    mode: "Mature",
    blurb: "Feeds, creators, ad auctions, and micro-drama formats.",
    whyItMoved: "Micro-drama monetization + ad auction CPM rebound.",
    catalyst: {
      id: "am-c1",
      label: "Micro-drama exports",
      urgency: "high",
    },
    accent: "#f472b6",
    metrics: {
      northStar: {
        label: "Digital ad + creator take",
        value: v("$318B", 318, "USD_B"),
        delta: d("+7.2%", "up", "YoY"),
      },
      capitalPulse: {
        label: "Media / creator rounds",
        value: v("$1.3B", 1.3, "USD_B"),
        delta: d("+16%", "up"),
      },
      infraOrAdoption: {
        label: "Short-form watch hours",
        value: v("112", 112, "INDEX"),
        delta: d("+9%", "up"),
      },
      talentOrAdoption: {
        label: "Creator economy roles",
        value: v("9.6k", 9600, "COUNT"),
        delta: d("+8%", "up"),
      },
      structuralGauge: {
        label: "Attention concentration",
        score: 81,
        caption: "Top-platform share of incremental minutes (EXAMPLE)",
      },
    },
    movers: [
      {
        id: "am-m1",
        name: "Micro-drama ARPU",
        delta: d("+33%", "up", "90d"),
        context: "Paid episodic shorts",
      },
      {
        id: "am-m2",
        name: "Open-web CPM",
        delta: d("+5%", "up", "90d"),
        context: "Brand budget thaw",
      },
    ],
    catalysts: [
      { id: "am-c1", label: "Micro-drama exports", urgency: "high" },
      { id: "am-c2", label: "Youth time-limit rules", urgency: "medium" },
    ],
    policy: {
      US: { stance: "Kids / privacy bills", note: "State age rules" },
      China: { stance: "Content + time limits", note: "Platform governance" },
      EU: { stance: "DSA enforcement", note: "Systemic risk audits" },
    },
    sources: [{ label: "EXAMPLE — ad + creator take", kind: "example" }],
    methodology: "Ad and watch metrics are EXAMPLE composites for the early-signal kit.",
  },
];

export const sectorBySlug = Object.fromEntries(
  sectors.map((s) => [s.slug, s])
) as Record<string, Sector>;

export function getSector(slug: string): Sector | undefined {
  return sectorBySlug[slug];
}

/** Global pulse: biggest absolute movers across sectors (EXAMPLE). */
export const globalPulse: PulseItem[] = [
  {
    id: "p1",
    sectorSlug: "attention-media",
    sectorName: "Attention",
    label: "Micro-drama ARPU",
    delta: d("+33%", "up", "90d"),
  },
  {
    id: "p2",
    sectorSlug: "data-center",
    sectorName: "Data center",
    label: "Liquid cooling attach",
    delta: d("+28%", "up", "90d"),
  },
  {
    id: "p3",
    sectorSlug: "robotics",
    sectorName: "Robotics",
    label: "Robotics VC",
    delta: d("+27%", "up", "30d"),
  },
  {
    id: "p4",
    sectorSlug: "ai",
    sectorName: "AI",
    label: "GPU rental spot",
    delta: d("−22%", "down", "90d"),
  },
  {
    id: "p5",
    sectorSlug: "defense",
    sectorName: "Defense",
    label: "UAV contract velocity",
    delta: d("+31%", "up", "90d"),
  },
  {
    id: "p6",
    sectorSlug: "climate-adaptation",
    sectorName: "Climate",
    label: "Adaptation capital",
    delta: d("+21%", "up", "30d"),
  },
];

export const emergingSignals: EmergingSignalCard[] = [
  {
    id: "micro-drama",
    title: "Micro-drama",
    thesis:
      "Paid episodic vertical shorts: search demand → creator supply → capital into enablers → unit economics → export → regulation → public comps.",
    stages: [
      { name: "Search", signal: "Query volume for vertical drama formats", status: "hot" },
      { name: "Creators", signal: "Studio + indie scripted short pipelines", status: "hot" },
      { name: "Capital → enablers", signal: "Payments, localization, adkit tooling", status: "warming" },
      { name: "Unit economics", signal: "ARPU / completion / refund rates", status: "warming" },
      { name: "Export", signal: "EN/ES/SEA localization velocity", status: "hot" },
      { name: "Regulation", signal: "Youth time limits + content ratings", status: "watch" },
      { name: "Public comps", signal: "Platform take-rate disclosures", status: "watch" },
    ],
    relatedSectors: ["attention-media", "consumer", "capital-formation"],
  },
  {
    id: "grid-constrained-ai",
    title: "Grid-constrained AI campuses",
    thesis:
      "Power queue as the binding constraint: interconnection → behind-the-meter gen → cooling → secondary powered-shell market.",
    stages: [
      { name: "Search / filings", signal: "Interconnection queue lengthening", status: "hot" },
      { name: "Enablers", signal: "SMR PPAs, gas peakers, liquid cooling OEMs", status: "hot" },
      { name: "Capital", signal: "Infra debt into powered land", status: "warming" },
      { name: "Unit economics", signal: "$/kW delivered vs GPU ROI", status: "warming" },
      { name: "Policy", signal: "State siting races + water use", status: "watch" },
      { name: "Public comps", signal: "Hyperscale capex + REIT NOI", status: "hot" },
    ],
    relatedSectors: ["data-center", "energy-grid", "compute-semiconductors"],
  },
  {
    id: "attritable-autonomy",
    title: "Attritable autonomy",
    thesis:
      "Cheap mass over exquisite platforms: software autonomy + commodity airframes + munitions industrial base stretch.",
    stages: [
      { name: "Demand signal", signal: "OT / rapid awards language", status: "hot" },
      { name: "Creators / primes", signal: "Dual-use startups + prime teaming", status: "warming" },
      { name: "Capital", signal: "Defense tech rounds + offtakes", status: "hot" },
      { name: "Unit economics", signal: "Cost/kill-chain hour proxies", status: "watch" },
      { name: "Export / ITAR", signal: "Allied transfer pathways", status: "watch" },
      { name: "Public comps", signal: "Munitions + UAV suppliers", status: "warming" },
    ],
    relatedSectors: ["defense", "robotics", "materials"],
  },
];

export const originalNine = [
  "ai",
  "healthcare",
  "consumer",
  "robotics",
  "data-center",
  "defense",
  "space",
  "materials",
  "leisure",
] as const;

export const addedTen = [
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
