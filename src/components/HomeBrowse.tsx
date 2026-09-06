"use client";

import { useMemo, useState } from "react";
import type { Sector } from "@/data/types";
import { ModeFilter, ModeSegment } from "./ModeSegment";
import { SectorCard } from "./SectorCard";
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

  const showMature = mode === "All" || mode === "Mature";
  const showEmerging = mode === "All" || mode === "Emerging";

  const leagueSectors = useMemo(() => {
    if (mode === "Mature") return mature;
    if (mode === "Emerging") return emerging;
    return [...mature, ...emerging];
  }, [mode, mature, emerging]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          Sectors
        </h2>
        <ModeSegment value={mode} onChange={setMode} />
      </div>

      {showMature && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-[13px] font-semibold text-slate-900">Mature</h3>
            <span className="text-[11px] text-slate-400">{mature.length}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mature.map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      )}

      {showEmerging && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-[13px] font-semibold text-slate-900">
              Emerging
            </h3>
            <span className="text-[11px] text-slate-400">{emerging.length}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {emerging.map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </section>
      )}

      <SectorLeagueTable sectors={leagueSectors} />
    </div>
  );
}
