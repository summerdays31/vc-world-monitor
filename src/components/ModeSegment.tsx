"use client";

export type ModeFilter = "Mature" | "Emerging" | "All";

const OPTIONS: ModeFilter[] = ["Mature", "Emerging", "All"];

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
      className="inline-flex rounded-lg bg-slate-100 p-0.5"
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
            className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition ${
              active
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
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
