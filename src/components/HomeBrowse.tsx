import Link from "next/link";
import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import type { Sector } from "@/data/types";
import { isWiredSector } from "@/lib/homeMetrics";
import { EmergingEditorial } from "./EmergingEditorial";
import { InstrumentBand } from "./InstrumentBand";
import { SectorLeagueTable } from "./SectorLeagueTable";

export type ModeFilter = "Mature" | "Emerging" | "All";

const MODES: ModeFilter[] = ["Mature", "Emerging", "All"];

/**
 * Claim-the-frame home: instrument band + dense ledger + sources strip.
 * No centered stub, no pill filters, no EXAMPLE on home.
 */
export function HomeBrowse({
  mature,
  emerging,
  mode = "All",
  asOf,
  instruments,
}: {
  mature: Sector[];
  emerging: Sector[];
  mode?: ModeFilter;
  asOf?: string;
  instruments: {
    gpu: LiveMetricPayload;
    interconnect: LiveMetricPayload;
    vc: LiveMetricPayload;
  };
}) {
  const wiredMature = mature.filter(isWiredSector);
  const wiredEmerging = emerging.filter(isWiredSector);

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const matureRows = showMature ? wiredMature : [];
  const emergingRows = showEmerging ? wiredEmerging : [];
  const emergingEmpty = mode === "Emerging" && emergingRows.length === 0;

  return (
    <div className="flex min-h-[calc(100vh-2.5rem)] flex-col">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-0.5 text-[12px] text-slate-500">
            Live and curated public signals across AI, infrastructure, and capital
          </p>
        </div>
        <nav
          className="flex items-center gap-4"
          aria-label="Sector mode filter"
        >
          {MODES.map((m) => {
            const active = mode === m;
            return (
              <Link
                key={m}
                href={`/?mode=${m}`}
                className={`border-b-2 pb-0.5 text-[12px] transition ${
                  active
                    ? "border-slate-900 font-medium text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {m}
              </Link>
            );
          })}
        </nav>
      </header>

      <InstrumentBand
        gpu={instruments.gpu}
        interconnect={instruments.interconnect}
        vc={instruments.vc}
      />

      <div className="mt-5 flex-1">
        {emergingEmpty ? (
          <p className="text-[13px] leading-relaxed text-slate-600">
            No live emerging feeds yet.
          </p>
        ) : (
          <>
            {matureRows.length > 0 ? (
              <SectorLeagueTable sectors={matureRows} />
            ) : null}

            {emergingRows.length > 0 ? (
              <section className={matureRows.length > 0 ? "mt-6" : undefined}>
                <h2 className="mb-1.5 text-[11px] font-semibold tracking-wide text-slate-500">
                  Emerging
                </h2>
                <div className="border-t border-slate-300">
                  {emergingRows.map((s) => (
                    <EmergingEditorial key={s.slug} sector={s} />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </div>

      <footer className="mt-8 border-t border-slate-200 pt-3">
        <p className="text-[11px] leading-relaxed text-slate-500">
          <span className="font-medium text-slate-600">Sources / methodology</span>
          {" — "}
          GPU: RunPod public H100-eq on-demand floor (live, daily). Interconnect:
          LBNL Queued Up median IR→COD (curated). VC: Dealroom Global H1 YTD
          (live/curated). Sector ledger shows wired north-star figures only;
          secondary values omit example placeholders.
          {asOf ? ` As of ${asOf}.` : ""}
        </p>
      </footer>
    </div>
  );
}
