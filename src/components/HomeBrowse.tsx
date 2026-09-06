import Link from "next/link";
import type { Sector } from "@/data/types";
import { isWiredSector } from "@/lib/homeMetrics";
import { EmergingEditorial } from "./EmergingEditorial";
import { SectorLeagueTable } from "./SectorLeagueTable";

export type ModeFilter = "Mature" | "Emerging" | "All";

const MODES: ModeFilter[] = ["Mature", "Emerging", "All"];

/**
 * Ledger-first home — masthead tight to a dense typeset table.
 * No hero KPI. Placeholders never appear here.
 */
export function HomeBrowse({
  mature,
  emerging,
  mode = "All",
  asOf,
}: {
  mature: Sector[];
  emerging: Sector[];
  mode?: ModeFilter;
  asOf?: string;
}) {
  const wiredMature = mature.filter(isWiredSector);
  const wiredEmerging = emerging.filter(isWiredSector);

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const matureRows = showMature ? wiredMature : [];
  const emergingRows = showEmerging ? wiredEmerging : [];
  const emergingEmpty = mode === "Emerging" && emergingRows.length === 0;

  return (
    <div>
      <header className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
            World Monitor
          </h1>
          {asOf ? (
            <p className="mt-0.5 text-[11px] leading-none text-slate-500">
              as of {asOf}
            </p>
          ) : null}
        </div>
        <nav
          className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5"
          aria-label="Sector mode filter"
        >
          {MODES.map((m) => {
            const active = mode === m;
            return (
              <Link
                key={m}
                href={`/?mode=${m}`}
                className={`rounded-full px-2.5 py-1 text-[11px] transition ${
                  active
                    ? "bg-slate-900 font-medium text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {m}
              </Link>
            );
          })}
        </nav>
      </header>

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
            <section className={matureRows.length > 0 ? "mt-5" : undefined}>
              <h2 className="mb-1 text-[11px] font-medium tracking-wide text-slate-500">
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
  );
}
