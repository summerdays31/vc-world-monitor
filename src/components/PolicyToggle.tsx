"use client";

import { useState } from "react";
import type { RegionPolicy, Sector } from "@/data/types";

const regions: RegionPolicy[] = ["US", "China", "EU"];

export function PolicyToggle({ policy }: { policy: Sector["policy"] }) {
  const [region, setRegion] = useState<RegionPolicy>("US");
  const active = policy[region];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          Industrial policy
        </span>
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                region === r
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
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
