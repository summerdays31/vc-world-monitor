"use client";

export type ModeFilter = "Mature" | "Emerging" | "All";

const OPTIONS: ModeFilter[] = ["Mature", "Emerging", "All"];

/** Quiet text segment — almost invisible chrome. */
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
      className="inline-flex items-center gap-0.5"
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
            className={`px-2 py-0.5 text-[12px] transition ${
              active
                ? "font-medium text-slate-800"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
