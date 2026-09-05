"use client";

import { useState } from "react";
import type { RegionPolicy, Sector } from "@/data/types";

const regions: RegionPolicy[] = ["US", "China", "EU"];

export function PolicyToggle({ policy }: { policy: Sector["policy"] }) {
  const [region, setRegion] = useState<RegionPolicy>("US");
  const active = policy[region];

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          Industrial policy
        </span>
        <div className="flex rounded-md border border-zinc-700/80 p-0.5">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide transition ${
                region === r
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm font-medium text-zinc-200">{active.stance}</p>
      <p className="mt-0.5 text-xs text-zinc-500">{active.note}</p>
    </div>
  );
}
