import type { PulseItem, Sector } from "@/data/types";
import { fetchGpuRentalSpot } from "./gpu";
import { fetchInterconnectQueue } from "./interconnect";
import { fetchGlobalVcDeployed } from "./vc";
import { fetchUsNationalDebt, fetchFy26Deficit } from "./debt";
import { fetchDcDebtIssuance, fetchDcDebtShare } from "./dcDebt";
import {
  fetchRetailSales,
  fetchUnemployment,
  fetchJoltsOpenings,
  fetchCopperPrice,
  fetchDefenseOutlays,
  fetchSemiIp,
  fetchSoxIndex,
  fetchHenryHub,
  fetchEduEmployment,
  fetchRoboticsUsInstalls,
  fetchNoaaDisasters,
  fetchNetflixRevenue,
  fetchTsaThroughput,
  fetchActiveInterventionalTrials,
  fetchLongevityTrials,
  fetchCisaKevCount,
  fetchOrbitalLaunchesYtd,
} from "./sectorPublic";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { MetricSeries } from "@/data/series";

export type LiveBundle = {
  gpu: LiveMetricPayload;
  interconnect: LiveMetricPayload;
  vc: LiveMetricPayload;
  debt: LiveMetricPayload;
  deficit: LiveMetricPayload;
  dcDebtIssuance: LiveMetricPayload;
  dcDebtShare: LiveMetricPayload;
  // New sector instruments
  retailSales: LiveMetricPayload;
  unemployment: LiveMetricPayload;
  jolts: LiveMetricPayload;
  copper: LiveMetricPayload;
  defenseOutlays: LiveMetricPayload;
  semiIp: LiveMetricPayload;
  sox: LiveMetricPayload;
  henryHub: LiveMetricPayload;
  eduEmployment: LiveMetricPayload;
  roboticsUs: LiveMetricPayload;
  noaaDisasters: LiveMetricPayload;
  netflixRevenue: LiveMetricPayload;
  tsa: LiveMetricPayload;
  clinicalTrialsActive: LiveMetricPayload;
  longevityTrials: LiveMetricPayload;
  cisaKev: LiveMetricPayload;
  orbitalLaunches: LiveMetricPayload;
  fetchedAt: string;
  /** Optional chart series keyed for UI lookup */
  series: Record<string, MetricSeries | undefined>;
};

type PayloadWithSeries = LiveMetricPayload & { series?: MetricSeries };

function pickSeries(p: PayloadWithSeries): MetricSeries | undefined {
  return p.series;
}

export async function fetchLiveBundle(): Promise<LiveBundle> {
  const [
    gpu,
    interconnect,
    vc,
    debt,
    deficit,
    dcDebtIssuance,
    dcDebtShare,
    retailSales,
    unemployment,
    jolts,
    copper,
    defenseOutlays,
    semiIp,
    sox,
    henryHub,
    eduEmployment,
    roboticsUs,
    noaaDisasters,
    netflixRevenue,
    tsa,
    clinicalTrialsActive,
    longevityTrials,
    cisaKev,
    orbitalLaunches,
  ] = await Promise.all([
    fetchGpuRentalSpot(),
    fetchInterconnectQueue(),
    fetchGlobalVcDeployed(),
    fetchUsNationalDebt(),
    fetchFy26Deficit(),
    fetchDcDebtIssuance(),
    fetchDcDebtShare(),
    fetchRetailSales(),
    fetchUnemployment(),
    fetchJoltsOpenings(),
    fetchCopperPrice(),
    fetchDefenseOutlays(),
    fetchSemiIp(),
    fetchSoxIndex(),
    fetchHenryHub(),
    fetchEduEmployment(),
    fetchRoboticsUsInstalls(),
    fetchNoaaDisasters(),
    fetchNetflixRevenue(),
    fetchTsaThroughput(),
    fetchActiveInterventionalTrials(),
    fetchLongevityTrials(),
    fetchCisaKevCount(),
    fetchOrbitalLaunchesYtd(),
  ]);

  const series: LiveBundle["series"] = {
    retailSales: pickSeries(retailSales as PayloadWithSeries),
    unemployment: pickSeries(unemployment as PayloadWithSeries),
    jolts: pickSeries(jolts as PayloadWithSeries),
    copper: pickSeries(copper as PayloadWithSeries),
    defenseOutlays: pickSeries(defenseOutlays as PayloadWithSeries),
    semiIp: pickSeries(semiIp as PayloadWithSeries),
    sox: pickSeries(sox as PayloadWithSeries),
    henryHub: pickSeries(henryHub as PayloadWithSeries),
    eduEmployment: pickSeries(eduEmployment as PayloadWithSeries),
  };

  return {
    gpu,
    interconnect,
    vc,
    debt,
    deficit,
    dcDebtIssuance,
    dcDebtShare,
    retailSales,
    unemployment,
    jolts,
    copper,
    defenseOutlays,
    semiIp,
    sox,
    henryHub,
    eduEmployment,
    roboticsUs,
    noaaDisasters,
    netflixRevenue,
    tsa,
    clinicalTrialsActive,
    longevityTrials,
    cisaKev,
    orbitalLaunches,
    fetchedAt: new Date().toISOString(),
    series,
  };
}

function applyMetric(
  sector: Sector,
  slot: "northStar" | "infraOrAdoption" | "capitalPulse",
  payload: LiveMetricPayload,
  label?: string
) {
  const m = sector.metrics[slot];
  if (label) m.label = label;
  m.value = payload.value;
  m.delta = payload.delta ?? {
    display: "",
    direction: "flat",
    period: "",
    isExample: false,
  };
}

function ensureExampleLabel(label: string): string {
  return /\(EXAMPLE\)/i.test(label) ? label : `${label} (EXAMPLE)`;
}

/** Drop EXAMPLE movers / example-kind sources; zero structural gauge. */
function sanitizeWiredSector(copy: Sector): Sector {
  copy.movers = copy.movers.filter((m) => !m.delta.isExample);
  copy.sources = copy.sources.filter(
    (s) => s.kind !== "example" && s.kind !== "placeholder"
  );
  for (const slot of [
    "northStar",
    "capitalPulse",
    "infraOrAdoption",
    "talentOrAdoption",
  ] as const) {
    const m = copy.metrics[slot];
    if (m.value.isExample) {
      copy.metrics[slot] = {
        label: m.label.replace(/\s*\(EXAMPLE\)\s*$/i, "").trim(),
        value: {
          ...m.value,
          display: "—",
          numeric: undefined,
          isExample: true,
          provenance: "example",
        },
        delta: {
          display: "",
          direction: "flat",
          period: "",
          isExample: true,
        },
      };
    }
  }
  copy.metrics.structuralGauge = {
    label: "",
    score: 0,
    caption: "",
  };
  return copy;
}

function sourceTag(payload: LiveMetricPayload) {
  return {
    label: payload.value.sourceLabel ?? "Source",
    kind: (payload.value.provenance === "live" ? "live" : "curated") as
      | "live"
      | "curated",
    url: payload.value.sourceUrl,
  };
}

const WIRED_SLUGS = new Set([
  "ai",
  "data-center",
  "capital-formation",
  "healthcare",
  "consumer",
  "robotics",
  "defense",
  "space",
  "materials",
  "leisure",
  "energy-grid",
  "compute-semiconductors",
  "labor-demography",
  "bio-longevity",
  "security-cyber",
  "climate-adaptation",
  "education-skills",
  "attention-media",
]);

export function applyLiveOverlays(
  sectors: Sector[],
  live: LiveBundle
): Sector[] {
  return sectors.map((s) => {
    const copy: Sector = {
      ...s,
      metrics: { ...s.metrics },
      sources: [...s.sources],
      catalysts: [...s.catalysts],
      movers: [...s.movers],
    };
    copy.metrics.northStar = { ...s.metrics.northStar };
    copy.metrics.capitalPulse = { ...s.metrics.capitalPulse };
    copy.metrics.infraOrAdoption = { ...s.metrics.infraOrAdoption };
    copy.metrics.talentOrAdoption = { ...s.metrics.talentOrAdoption };

    if (s.slug === "ai") {
      if (/GPU rental/i.test(copy.metrics.infraOrAdoption.label)) {
        const arr = { ...copy.metrics.northStar };
        copy.metrics.infraOrAdoption = {
          label: ensureExampleLabel(arr.label),
          value: arr.value,
          delta: arr.delta,
        };
      }
      copy.metrics.infraOrAdoption = {
        ...copy.metrics.infraOrAdoption,
        label: ensureExampleLabel(
          copy.metrics.infraOrAdoption.label.replace(/\s*\(EXAMPLE\)\s*$/i, "")
        ),
      };
      applyMetric(copy, "northStar", live.gpu, "GPU rental spot (H100-eq)");
      copy.whyItMoved =
        "Public H100-eq rental floors are the live capacity-price signal for AI infra pricing.";
      copy.catalyst = {
        id: "ai-c-gpu",
        label: "GPU rental spot floor",
        urgency: "high",
        note: live.gpu.note ?? "RunPod public H100 on-demand floor",
      };
      copy.catalysts = [
        {
          id: "ai-c-gpu",
          label: "GPU rental spot floor",
          urgency: "high",
          note: live.gpu.note,
        },
      ];
      copy.sources = [sourceTag(live.gpu)];
      copy.methodology =
        "North star is GPU rental spot — RunPod public GraphQL H100 on-demand floor (live, daily cache + cron warm; curated stale fallback).";
    }

    if (s.slug === "data-center") {
      applyMetric(
        copy,
        "northStar",
        live.interconnect,
        "Interconnect queue (median IR→COD)"
      );
      applyMetric(
        copy,
        "capitalPulse",
        live.dcDebtIssuance,
        "US DC debt issuance (2025)"
      );
      applyMetric(
        copy,
        "infraOrAdoption",
        live.dcDebtShare,
        "Debt share of hyperscaler capex"
      );
      copy.whyItMoved =
        "Interconnect queue remains the binding physical bottleneck; US data-center debt issuance ~$182B in 2025 (~2× YoY) is the curated capital pulse into DC build-out (MS via Steffen).";
      copy.catalyst = {
        id: "dc-c1",
        label: "Grid interconnection queue",
        urgency: "high",
        note: live.interconnect.note ?? "LBNL Queued Up median IR→COD",
      };
      copy.catalysts = [
        {
          id: "dc-c1",
          label: "Grid interconnection queue",
          urgency: "high",
          note: live.interconnect.note,
        },
        {
          id: "dc-c-nvda-financing",
          label: "Nvidia >$500B compute financing MOUs",
          urgency: "high",
          note:
            "Apollo / BlackRock / Blackstone / Brookfield / GS / KKR — announced platforms to mobilize >$500B third-party capital; MOUs, not committed (Nvidia, Aug 10, 2026).",
        },
      ];
      copy.movers = [
        {
          id: "dc-m-hyperion",
          name: "Meta Hyperion SPV debt",
          delta: {
            display: "$27B",
            direction: "up",
            period: "issue",
            isExample: false,
          },
          context:
            "A+ SPV/JV (Blue Owl 80%, Meta 20%); off Meta BS — template for platform model (MS/Steffen).",
        },
      ];
      copy.sources = [
        sourceTag(live.interconnect),
        sourceTag(live.dcDebtIssuance),
        {
          label: "Nvidia >$500B financing MOUs",
          kind: "curated",
          url: "https://nvidianews.nvidia.com/news/nvidia-partners-with-apollo-blackrock-blackstone-brookfield-goldman-sachs-and-kkr-to-establish-ai-compute-infrastructure-financing-platforms-to-mobilize-over-500-billion-of-third-party-capital",
        },
      ];
      copy.methodology =
        "North star is interconnect queue — LBNL Queued Up 2026. Capital pulse is US DC debt issuance ~$182B (2025). Secondary: debt share of hyperscaler capex ~32% mid-2026.";
    }

    if (s.slug === "capital-formation") {
      applyMetric(copy, "northStar", live.debt, "US national debt");
      applyMetric(
        copy,
        "capitalPulse",
        live.vc,
        "Global VC deployed (H1 YTD)"
      );
      applyMetric(
        copy,
        "infraOrAdoption",
        live.deficit,
        "FY26 federal deficit"
      );
      copy.whyItMoved =
        "Gross US national debt at $40.10T is the curated capital/fiscal north star (Kalshi CDF); Dealroom H1’26 YTD global VC remains the wired private-capital pulse.";
      copy.catalyst = {
        id: "cf-c-debt",
        label: "US national debt $40.10T",
        urgency: "high",
        note: live.debt.note ?? "Kalshi Citizen Debt Forecast",
      };
      copy.catalysts = [
        {
          id: "cf-c-debt",
          label: "US national debt $40.10T",
          urgency: "high",
          note: live.debt.note,
        },
      ];
      copy.sources = [sourceTag(live.debt), sourceTag(live.vc)];
      copy.methodology =
        "North star is gross US national debt ($40.10T) curated from Kalshi CDF / Mansour (2026-09-03). Capital pulse is Global VC H1 YTD from Dealroom. FY26 deficit $1.9T same curated fiscal post.";
    }

    if (s.slug === "healthcare") {
      applyMetric(
        copy,
        "northStar",
        live.clinicalTrialsActive,
        "Active interventional trials"
      );
      copy.whyItMoved =
        "ClinicalTrials.gov active interventional study count is the live pipeline signal for care / therapeutics activity.";
      copy.catalyst = {
        id: "hc-c-trials",
        label: "Active interventional trials",
        urgency: "medium",
        note: live.clinicalTrialsActive.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.clinicalTrialsActive)];
      copy.methodology =
        "North star is ClinicalTrials.gov totalCount for interventional studies in Recruiting / Enrolling by invitation / Active, not recruiting (live API).";
    }

    if (s.slug === "consumer") {
      applyMetric(
        copy,
        "northStar",
        live.retailSales,
        "US retail sales (monthly)"
      );
      copy.whyItMoved =
        "Advance US retail & food services sales (FRED RSAFS) is the live demand pulse for consumer spend.";
      copy.catalyst = {
        id: "co-c-retail",
        label: "US retail sales",
        urgency: "medium",
        note: live.retailSales.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.retailSales)];
      copy.methodology =
        "North star is FRED RSAFS (advance monthly retail & food services sales, SA) via keyless CSV; YoY Δ when prior-year month exists.";
    }

    if (s.slug === "robotics") {
      applyMetric(
        copy,
        "northStar",
        live.roboticsUs,
        "US industrial robot installs (2025)"
      );
      copy.whyItMoved =
        "IFR preliminary US industrial robot installations rose 11% to 38,000 units in 2025 — curated annual pulse.";
      copy.catalyst = {
        id: "ro-c-ifr",
        label: "US robot installs +11%",
        urgency: "medium",
        note: live.roboticsUs.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.roboticsUs)];
      copy.methodology =
        "North star is IFR preliminary US industrial robot installations for 2025 (38,000, +11% YoY) — press release Jun 18, 2026. Curated annual figure.";
    }

    if (s.slug === "defense") {
      applyMetric(
        copy,
        "northStar",
        live.defenseOutlays,
        "US defense outlays (SAAR)"
      );
      copy.whyItMoved =
        "Federal defense consumption & investment (FRED FDEFX) is the live fiscal demand signal for the defense industrial base.";
      copy.catalyst = {
        id: "de-c-outlays",
        label: "US defense outlays",
        urgency: "medium",
        note: live.defenseOutlays.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.defenseOutlays)];
      copy.methodology =
        "North star is FRED FDEFX (federal defense consumption expenditures & gross investment, bil$ SAAR) via keyless CSV.";
    }

    if (s.slug === "space") {
      applyMetric(
        copy,
        "northStar",
        live.orbitalLaunches,
        "Orbital launches (YTD)"
      );
      copy.whyItMoved =
        "Wikipedia 2026 in spaceflight monthly orbital-launch tally is the live cadence signal for launch / LEO activity.";
      copy.catalyst = {
        id: "sp-c-launches",
        label: "Orbital launches YTD",
        urgency: "medium",
        note: live.orbitalLaunches.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.orbitalLaunches)];
      copy.methodology =
        "North star is YTD orbital launch attempts from Wikipedia 2026 in spaceflight (Numbers of orbital launches → Total). Live scrape + curated fallback.";
    }

    if (s.slug === "materials") {
      applyMetric(copy, "northStar", live.copper, "Global copper price");
      copy.whyItMoved =
        "Global copper price (FRED PCOPPUSDM) is the live critical-minerals / electrification materials pulse.";
      copy.catalyst = {
        id: "ma-c-copper",
        label: "Copper price",
        urgency: "medium",
        note: live.copper.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.copper)];
      copy.methodology =
        "North star is FRED PCOPPUSDM (global copper price, USD/metric ton) via keyless CSV.";
    }

    if (s.slug === "leisure") {
      applyMetric(
        copy,
        "northStar",
        live.tsa,
        "TSA checkpoint travelers"
      );
      copy.whyItMoved =
        "Daily TSA checkpoint traveler counts are the live IRL mobility / leisure demand signal.";
      copy.catalyst = {
        id: "le-c-tsa",
        label: "TSA throughput",
        urgency: "medium",
        note: live.tsa.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.tsa)];
      copy.methodology =
        "North star is TSA public checkpoint traveler table (daily). Δ vs same table 7 days earlier when available.";
    }

    if (s.slug === "energy-grid") {
      applyMetric(copy, "northStar", live.henryHub, "Henry Hub gas spot");
      copy.whyItMoved =
        "Henry Hub natural gas spot (FRED DHHNGSP) is the live US gas / power-input price signal.";
      copy.catalyst = {
        id: "eg-c-hh",
        label: "Henry Hub spot",
        urgency: "medium",
        note: live.henryHub.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.henryHub)];
      copy.methodology =
        "North star is FRED DHHNGSP (Henry Hub natural gas spot, $/MMBtu) via keyless CSV.";
    }

    if (s.slug === "compute-semiconductors") {
      applyMetric(
        copy,
        "northStar",
        live.semiIp,
        "Semiconductor industrial production"
      );
      applyMetric(copy, "capitalPulse", live.sox, "PHLX SOX index");
      copy.whyItMoved =
        "Semiconductor industrial production (FRED IPG3344S) and PHLX SOX are the live compute / silicon cycle signals.";
      copy.catalyst = {
        id: "cs-c-semi",
        label: "Semi IP + SOX",
        urgency: "high",
        note: live.semiIp.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.semiIp), sourceTag(live.sox)];
      copy.methodology =
        "North star is FRED IPG3344S (semiconductor IP index). Capital pulse is FRED NASDAQSOX (PHLX Semiconductor Sector Index).";
    }

    if (s.slug === "labor-demography") {
      applyMetric(copy, "northStar", live.unemployment, "US unemployment rate");
      applyMetric(copy, "capitalPulse", live.jolts, "JOLTS job openings");
      copy.whyItMoved =
        "Unemployment rate and JOLTS openings are the live labor-market tightness pair.";
      copy.catalyst = {
        id: "ld-c-labor",
        label: "Unemployment + JOLTS",
        urgency: "medium",
        note: live.unemployment.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.unemployment), sourceTag(live.jolts)];
      copy.methodology =
        "North star is FRED UNRATE. Secondary is FRED JTSJOL (JOLTS job openings). Keyless CSV.";
    }

    if (s.slug === "bio-longevity") {
      applyMetric(
        copy,
        "northStar",
        live.longevityTrials,
        "Active aging / longevity trials"
      );
      copy.whyItMoved =
        "ClinicalTrials.gov active aging/longevity study count is the live translational pipeline proxy.";
      copy.catalyst = {
        id: "bl-c-trials",
        label: "Aging / longevity trials",
        urgency: "medium",
        note: live.longevityTrials.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.longevityTrials)];
      copy.methodology =
        "North star is ClinicalTrials.gov totalCount for active studies matching aging OR longevity OR \"healthy aging\".";
    }

    if (s.slug === "security-cyber") {
      applyMetric(
        copy,
        "northStar",
        live.cisaKev,
        "CISA KEV catalog size"
      );
      copy.whyItMoved =
        "CISA Known Exploited Vulnerabilities catalog size is the live exploited-threat inventory signal.";
      copy.catalyst = {
        id: "sc-c-kev",
        label: "CISA KEV catalog",
        urgency: "high",
        note: live.cisaKev.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.cisaKev)];
      copy.methodology =
        "North star is CISA KEV JSON feed vulnerability count (live).";
    }

    if (s.slug === "climate-adaptation") {
      applyMetric(
        copy,
        "northStar",
        live.noaaDisasters,
        "US billion-dollar disasters (2024)"
      );
      copy.whyItMoved =
        "NOAA NCEI billion-dollar disaster losses are the curated physical-risk pulse (latest complete year in public time-series).";
      copy.catalyst = {
        id: "ca-c-noaa",
        label: "NOAA billion-dollar disasters",
        urgency: "high",
        note: live.noaaDisasters.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.noaaDisasters)];
      copy.methodology =
        "North star is NOAA NCEI US billion-dollar disasters 2024 annual cost ($182.7B, 27 events) from public time-series JSON. 2025/2026 annual not yet published there.";
    }

    if (s.slug === "education-skills") {
      applyMetric(
        copy,
        "northStar",
        live.eduEmployment,
        "Education services employment"
      );
      copy.whyItMoved =
        "BLS educational services employment (FRED CEU6561000001) is the live skill-formation labor pulse.";
      copy.catalyst = {
        id: "es-c-edu",
        label: "Education employment",
        urgency: "low",
        note: live.eduEmployment.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.eduEmployment)];
      copy.methodology =
        "North star is FRED CEU6561000001 (all employees, educational services) via keyless CSV.";
    }

    if (s.slug === "attention-media") {
      applyMetric(
        copy,
        "northStar",
        live.netflixRevenue,
        "Netflix quarterly revenue"
      );
      copy.whyItMoved =
        "Netflix Q2'26 revenue (+13.4% YoY) is the curated public streaming / attention monetization pulse from IR.";
      copy.catalyst = {
        id: "am-c-nflx",
        label: "Netflix Q2 revenue",
        urgency: "medium",
        note: live.netflixRevenue.note,
      };
      copy.catalysts = [copy.catalyst];
      copy.sources = [sourceTag(live.netflixRevenue)];
      copy.methodology =
        "North star is Netflix Q2'26 revenue $12.56B from the Jul 16, 2026 shareholder letter (public IR PDF). Curated quarterly.";
    }

    if (WIRED_SLUGS.has(s.slug)) {
      return sanitizeWiredSector(copy);
    }

    return copy;
  });
}

function pulseItem(
  id: string,
  sectorSlug: string,
  sectorName: string,
  label: string,
  payload: LiveMetricPayload
): PulseItem {
  return {
    id,
    sectorSlug,
    sectorName,
    label,
    valueDisplay: payload.value.display,
    delta: payload.delta ?? {
      display: "",
      direction: "flat" as const,
      period: "",
      isExample: false,
    },
    isExample: false,
    provenance: payload.value.provenance,
    stale: payload.value.stale,
    sourceLabel: payload.value.sourceLabel,
  };
}

/** Global pulse — signature instruments + a sample of new sector signals. */
export function buildGlobalPulse(live: LiveBundle): PulseItem[] {
  return [
    pulseItem("live-gpu", "ai", "AI", "GPU rental spot (H100-eq)", live.gpu),
    pulseItem(
      "live-interconnect",
      "data-center",
      "Data center",
      "Interconnect queue (median IR→COD)",
      live.interconnect
    ),
    pulseItem(
      "live-dc-debt",
      "data-center",
      "Data center",
      "US DC debt issuance (2025)",
      live.dcDebtIssuance
    ),
    pulseItem(
      "live-vc",
      "capital-formation",
      "Capital",
      "Global VC deployed (H1 YTD)",
      live.vc
    ),
    pulseItem(
      "live-debt",
      "capital-formation",
      "Capital",
      "US national debt",
      live.debt
    ),
    pulseItem("live-tsa", "leisure", "Leisure", "TSA checkpoint travelers", live.tsa),
    pulseItem(
      "live-retail",
      "consumer",
      "Consumer",
      "US retail sales (monthly)",
      live.retailSales
    ),
    pulseItem(
      "live-unrate",
      "labor-demography",
      "Labor",
      "US unemployment rate",
      live.unemployment
    ),
    pulseItem(
      "live-kev",
      "security-cyber",
      "Security",
      "CISA KEV catalog size",
      live.cisaKev
    ),
    pulseItem(
      "live-launches",
      "space",
      "Space",
      "Orbital launches (YTD)",
      live.orbitalLaunches
    ),
  ];
}

export {
  fetchGpuRentalSpot,
  fetchInterconnectQueue,
  fetchGlobalVcDeployed,
  fetchUsNationalDebt,
  fetchFy26Deficit,
  fetchDcDebtIssuance,
  fetchDcDebtShare,
};
