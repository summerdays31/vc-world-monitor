"use client";

import { useMemo, useState } from "react";
import type { Sector } from "@/data/types";
import { ModeFilter, ModeSegment } from "./ModeSegment";
import { SectorCard } from "./SectorCard";
import { SectorLeagueTable } from "./SectorLeagueTable";

export function HomeBrowse({
  mature,
  emerging,
  asOf,
}: {
  mature: Sector[];
  emerging: Sector[];
  asOf: string;
}) {
  const [mode, setMode] = useState<ModeFilter>("All");

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const leagueSectors = useMemo(() => {
    if (mode === "Mature") return mature;
    if (mode === "Emerging") return emerging;
    return [...mature, ...emerging];
  }, [mode, mature, emerging]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Asset classes
          </h2>
          <p className="text-[13px] text-slate-500">
            Mature vs emerging segregation · two metrics per sector on home
          </p>
        </div>
        <ModeSegment value={mode} onChange={setMode} />
      </div>

      {showMature && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900">Mature</h3>
            <span className="text-xs text-slate-400">
              {mature.length} sectors · as of {asOf}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mature.map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      )}

      {showEmerging && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900">Emerging</h3>
            <span className="text-xs text-slate-400">
              {emerging.length} sectors · as of {asOf}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {emerging.map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      )}

      <SectorLeagueTable sectors={leagueSectors} asOf={asOf} />
    </div>
  );
}
