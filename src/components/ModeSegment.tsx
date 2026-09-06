"use client";

export type ModeFilter = "Mature" | "Emerging" | "All";

const OPTIONS: ModeFilter[] = ["Mature", "Emerging", "All"];

/** Compact product-grade segmented control (RWA.xyz density). */
export function ModeSegment({
  value,
  onChange,
}: {
  value: ModeFilter;
  onChange: (v: ModeFilter) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Sector mode filter"
      className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white p-0.5"
    >
      {OPTIONS.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={`h-7 rounded-[5px] px-2.5 text-[12px] font-medium transition ${
              active
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
