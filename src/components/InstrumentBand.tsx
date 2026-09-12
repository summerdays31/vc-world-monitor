import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import { seriesByKey } from "@/data/series";
import { MetricHero } from "./MetricHero";

type Instruments = {
  gpu: LiveMetricPayload;
  interconnect: LiveMetricPayload;
  vc: LiveMetricPayload;
  debt: LiveMetricPayload;
  deficit: LiveMetricPayload;
  dcDebtIssuance: LiveMetricPayload;
  dcDebtShare: LiveMetricPayload;
};

/**
 * Live / curated instrument grid — every real headline number.
 * Artemis layout: full-width hero where a series exists, then paired cards.
 */
export function InstrumentBand({ instruments }: { instruments: Instruments }) {
  const {
    gpu,
    interconnect,
    vc,
    debt,
    deficit,
    dcDebtIssuance,
    dcDebtShare,
  } = instruments;

  const hero = {
    sector: "Data center",
    metric: "Interconnect queue (median IR→COD)",
    href: "/sector/data-center",
    payload: interconnect,
    series: seriesByKey.interconnect,
  };

  const pairs: {
    sector: string;
    metric: string;
    href: string;
    payload: LiveMetricPayload;
    seriesKey?: keyof typeof seriesByKey;
    muted?: string | null;
  }[] = [
    {
      sector: "AI",
      metric: "GPU rental spot (H100-eq)",
      href: "/sector/ai",
      payload: gpu,
    },
    {
      sector: "Capital",
      metric: "Global VC deployed (H1 YTD)",
      href: "/sector/capital-formation",
      payload: vc,
    },
    {
      sector: "Fiscal",
      metric: "US national debt",
      href: "/sector/capital-formation",
      payload: debt,
      muted:
        deficit && !deficit.value.isExample
          ? `FY26 deficit ${deficit.value.display}`
          : null,
    },
    {
      sector: "Fiscal",
      metric: "FY26 federal deficit",
      href: "/sector/capital-formation",
      payload: deficit,
      seriesKey: "deficit",
    },
    {
      sector: "Data center",
      metric: "US DC debt issuance (2025)",
      href: "/sector/data-center",
      payload: dcDebtIssuance,
    },
    {
      sector: "Data center",
      metric: "Debt share of hyperscaler capex",
      href: "/sector/data-center",
      payload: dcDebtShare,
      seriesKey: "dcDebtShare",
    },
  ];

  return (
    <section aria-label="Live instruments" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
            Global Market Overview
          </h1>
          <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[#6b6560]">
            Signature live/curated instruments — GPU, interconnect, DC capital,
            fiscal / VC — plus a full Mature/Emerging sector board below. No
            placeholder metrics.
          </p>
        </div>
      </div>

      {/* Full-width overview where a real series exists */}
      <MetricHero
        sector={hero.sector}
        metric={hero.metric}
        href={hero.href}
        payload={hero.payload}
        series={hero.series}
        size="lg"
      />

      {/* Paired metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pairs.map((cell) => (
          <MetricHero
            key={cell.metric}
            sector={cell.sector}
            metric={cell.metric}
            href={cell.href}
            payload={cell.payload}
            series={
              cell.seriesKey ? seriesByKey[cell.seriesKey] : undefined
            }
            muted={cell.muted}
          />
        ))}
      </div>
    </section>
  );
}
