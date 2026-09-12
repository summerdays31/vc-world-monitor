import Link from "next/link";
import type { Metadata } from "next";
import { getMonitorBundle } from "@/lib/adapters";
import { isMeaningfulDelta } from "@/lib/format";

export const metadata: Metadata = {
  title: "Brief",
  description:
    "Short summary of live and curated World Monitor instruments.",
};

export const revalidate = 3600;

export default async function BriefPage() {
  const { live, asOf, pulse } = await getMonitorBundle();

  const lines = [
    {
      title: "AI infra price",
      body: `H100-eq rental floor is ${live.gpu.value.display} (${live.gpu.value.sourceLabel ?? "RunPod"}${live.gpu.value.stale ? ", stale fallback" : ""}).`,
      href: "/sector/ai",
    },
    {
      title: "Grid bottleneck",
      body: `Median interconnect IR→COD is ${live.interconnect.value.display}${
        isMeaningfulDelta(live.interconnect.delta ?? undefined)
          ? ` (${live.interconnect.delta!.display} ${live.interconnect.delta!.period})`
          : ""
      } — LBNL Queued Up curated.`,
      href: "/sector/data-center",
    },
    {
      title: "DC capital",
      body: `US data-center debt issuance ${live.dcDebtIssuance.value.display} in 2025 (${live.dcDebtIssuance.delta?.display ?? "~2×"} YoY). Debt share of hyperscaler capex ${live.dcDebtShare.value.display} (${live.dcDebtShare.delta?.display ?? "vs ~9% FY24"}).`,
      href: "/sector/data-center",
    },
    {
      title: "Private capital",
      body: `Global VC H1 YTD ${live.vc.value.display} (Dealroom${live.vc.value.stale ? ", stale fallback" : ""}).`,
      href: "/sector/capital-formation",
    },
    {
      title: "Fiscal",
      body: `US national debt ${live.debt.value.display}; FY26 deficit ${live.deficit.value.display} (${live.deficit.delta?.display ?? "5.9% GDP"}). Kalshi CDF curated.`,
      href: "/sector/capital-formation",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-8 sm:px-8 sm:py-10">
      <header className="max-w-2xl space-y-2 border-b border-[#e5e2db] pb-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#8a847a]">
          Brief
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
          Sourced instruments
        </h1>
        <p className="text-[14px] text-[#6b6560]">
          Short real-data summary from the live / curated bundle.
        </p>
        <p className="text-[11px] text-[#8a847a]">as of {asOf}</p>
      </header>

      <div className="space-y-3">
        {lines.map((section, i) => (
          <section
            key={section.title}
            className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5"
          >
            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-xs tabular-nums text-[#a39e94]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-lg font-semibold text-[#0a0a0a]">
                {section.title}
              </h2>
            </div>
            <p className="text-[14px] leading-relaxed text-[#3d3a36]">
              {section.body}
            </p>
            <Link
              href={section.href}
              className="mt-3 inline-flex text-[13px] font-medium text-[#6b6560] hover:text-[#0a0a0a]"
            >
              Open sector →
            </Link>
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5">
        <h2 className="text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
          Pulse
        </h2>
        <ul className="mt-3 divide-y divide-[#e5e2db]">
          {pulse.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-baseline justify-between gap-2 py-2"
            >
              <div>
                <span className="text-[13px] font-medium text-[#0a0a0a]">
                  {p.label}
                </span>
                <span className="ml-2 text-[11px] text-[#a39e94]">
                  {p.sectorName}
                  {p.sourceLabel ? ` · ${p.sourceLabel}` : ""}
                </span>
              </div>
              <span className="text-[14px] font-semibold tabular-nums text-[#0a0a0a]">
                {p.valueDisplay ?? "—"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
