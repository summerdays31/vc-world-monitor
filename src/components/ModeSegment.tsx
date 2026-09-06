"use client";

export type ModeFilter = "Mature" | "Emerging" | "All";

const OPTIONS: ModeFilter[] = ["Mature", "Emerging", "All"];

/** Bordered pill segment — active filled dark, inactive muted. */
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
      className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5"
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
            className={`rounded-full px-2.5 py-1 text-[11px] transition ${
              active
                ? "bg-slate-900 font-medium text-white"
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
