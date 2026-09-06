"use client";

import { useState } from "react";
import type { RegionPolicy, Sector } from "@/data/types";

const regions: RegionPolicy[] = ["US", "China", "EU"];

export function PolicyToggle({ policy }: { policy: Sector["policy"] }) {
  const [region, setRegion] = useState<RegionPolicy>("US");
  const active = policy[region];

  return (
    <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200/80">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Industrial policy
        </span>
        <div className="inline-flex h-7 items-center rounded-md border border-slate-200 bg-white p-0.5">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`h-6 rounded-[5px] px-2 text-[11px] font-medium transition ${
                region === r
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm font-medium text-slate-900">{active.stance}</p>
      <p className="mt-0.5 text-[13px] text-slate-500">{active.note}</p>
    </div>
  );
}
