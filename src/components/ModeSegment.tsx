"use client";

export type ModeFilter = "Mature" | "Emerging" | "All";

const OPTIONS: ModeFilter[] = ["Mature", "Emerging", "All"];

/** Text tabs with underline active — not pill chrome. */
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
      className="flex items-center gap-4"
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
            className={`border-b-2 pb-0.5 text-[12px] transition ${
              active
                ? "border-slate-900 font-medium text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
