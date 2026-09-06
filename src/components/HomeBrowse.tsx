"use client";

import { useMemo, useState } from "react";
import type { Sector } from "@/data/types";
import { isPlaceholderSector, isWiredSector } from "@/lib/homeMetrics";
import { EmergingEditorial } from "./EmergingEditorial";
import { ModeFilter, ModeSegment } from "./ModeSegment";
import { SectorLeagueTable } from "./SectorLeagueTable";

export function HomeBrowse({
  mature,
  emerging,
}: {
  mature: Sector[];
  emerging: Sector[];
  asOf?: string;
}) {
  const [mode, setMode] = useState<ModeFilter>("All");
  const [includePlaceholders, setIncludePlaceholders] = useState(false);
  const [placeholdersOpen, setPlaceholdersOpen] = useState(false);

  const wiredMature = useMemo(
    () => mature.filter(isWiredSector),
    [mature]
  );
  const wiredEmerging = useMemo(
    () => emerging.filter(isWiredSector),
    [emerging]
  );
  const placeholderMature = useMemo(
    () => mature.filter(isPlaceholderSector),
    [mature]
  );
  const placeholderEmerging = useMemo(
    () => emerging.filter(isPlaceholderSector),
    [emerging]
  );

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const primaryMature =
    mode === "Emerging" ? [] : includePlaceholders ? mature : wiredMature;
  const primaryEmerging =
    mode === "Mature" ? [] : includePlaceholders ? emerging : wiredEmerging;

  const placeholderPool = useMemo(() => {
    const m =
      mode === "Emerging" ? [] : placeholderMature;
    const e =
      mode === "Mature" ? [] : placeholderEmerging;
    return { mature: m, emerging: e, total: m.length + e.length };
  }, [mode, placeholderMature, placeholderEmerging]);

  const showCollapsedPlaceholders =
    !includePlaceholders && placeholderPool.total > 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-[13px] font-semibold tracking-tight text-slate-800">
            Sectors
          </h2>
          <ModeSegment value={mode} onChange={setMode} />
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[11px] text-slate-400 select-none">
          <input
            type="checkbox"
            checked={includePlaceholders}
            onChange={(e) => {
              setIncludePlaceholders(e.target.checked);
              if (e.target.checked) setPlaceholdersOpen(false);
            }}
            className="h-3 w-3 rounded border-slate-300 text-slate-700 focus:ring-slate-400"
          />
          Include placeholders
        </label>
      </div>

      {showMature && primaryMature.length > 0 ? (
        <SectorLeagueTable
          sectors={primaryMature}
          title={includePlaceholders ? "Mature" : "Live & curated · mature"}
          caption="Dense scan · two metrics per sector"
        />
      ) : null}

      {showEmerging ? (
        <section>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <div>
              <h2 className="text-[13px] font-semibold tracking-tight text-slate-800">
                {includePlaceholders
                  ? "Emerging"
                  : "Live & curated · emerging"}
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Editorial read · fewer figures, more thesis
              </p>
            </div>
            <span className="font-mono text-[11px] text-slate-400 [font-variant-numeric:tabular-nums]">
              {primaryEmerging.length}
            </span>
          </div>

          {primaryEmerging.length > 0 ? (
            <div className="border-t border-slate-200/80">
              {primaryEmerging.map((s) => (
                <EmergingEditorial key={s.slug} sector={s} />
              ))}
            </div>
          ) : (
            <p className="border-t border-slate-100 py-5 text-[13px] text-slate-400">
              No live emerging feeds yet
              {showCollapsedPlaceholders
                ? " — placeholder themes are collapsed below."
                : "."}
            </p>
          )}
        </section>
      ) : null}

      {showCollapsedPlaceholders ? (
        <section className="pt-2">
          <button
            type="button"
            onClick={() => setPlaceholdersOpen((v) => !v)}
            className="flex w-full items-baseline justify-between gap-3 border-t border-dashed border-slate-200/80 pt-4 text-left"
          >
            <span className="text-[11px] uppercase tracking-[0.14em] text-slate-300">
              Placeholder sectors
            </span>
            <span className="font-mono text-[11px] text-slate-300 [font-variant-numeric:tabular-nums]">
              {placeholderPool.total}
              <span className="ml-2 font-sans normal-case tracking-normal">
                {placeholdersOpen ? "hide" : "show"}
              </span>
            </span>
          </button>

          {placeholdersOpen ? (
            <div className="mt-4 space-y-8 opacity-[0.42] transition-opacity hover:opacity-70">
              {showMature && placeholderPool.mature.length > 0 ? (
                <SectorLeagueTable
                  sectors={placeholderPool.mature}
                  title="Placeholder · mature"
                  caption="EXAMPLE seed — not live"
                  muted
                />
              ) : null}
              {showEmerging && placeholderPool.emerging.length > 0 ? (
                <div>
                  <h3 className="mb-1 text-[12px] font-medium text-slate-400">
                    Placeholder · emerging
                  </h3>
                  <div className="border-t border-slate-200/50">
                    {placeholderPool.emerging.map((s) => (
                      <EmergingEditorial key={s.slug} sector={s} muted />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
