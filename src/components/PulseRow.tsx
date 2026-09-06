import Link from "next/link";
import type { PulseItem } from "@/data/types";

function isWired(item: PulseItem): boolean {
  if (item.isExample === false) return true;
  return item.provenance === "live" || item.provenance === "curated";
}

function hasDisplay(item: PulseItem): boolean {
  return Boolean(item.valueDisplay && item.valueDisplay !== "—");
}

function pickStory(wired: PulseItem[]): {
  primary: PulseItem;
  secondary: PulseItem[];
} {
  // Prefer fresh live over curated; else first wired with a real figure.
  const ranked = [...wired].sort((a, b) => {
    const score = (i: PulseItem) => {
      let s = 0;
      if (i.provenance === "live" && !i.stale) s += 4;
      if (i.provenance === "curated") s += 2;
      if (hasDisplay(i)) s += 1;
      if (i.delta.direction !== "flat") s += 1;
      return s;
    };
    return score(b) - score(a);
  });
  const primary = ranked[0];
  const secondary = ranked.filter((i) => i.id !== primary.id).slice(0, 2);
  return { primary, secondary };
}

function provenanceWhisper(item: PulseItem): string {
  if (item.stale) return "stale";
  if (item.provenance === "live") return "live";
  if (item.provenance === "curated") return "curated";
  return "";
}

/**
 * One story of the day — a decisive primary figure, then 2 quieter secondaries.
 * EXAMPLE / empty tiles never enter the hero path.
 */
export function PulseRow({
  items,
}: {
  items: PulseItem[];
  asOf?: string;
}) {
  const wired = items.filter((i) => isWired(i) && hasDisplay(i));
  if (wired.length === 0) return null;

  const { primary, secondary } = pickStory(wired);

  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Link
          href={`/sector/${primary.sectorSlug}`}
          className="group block px-1 py-7 sm:px-2 sm:py-8 lg:pr-10"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Today · {primary.sectorName}
            {provenanceWhisper(primary) ? (
              <span className="ml-2 font-normal normal-case tracking-normal text-slate-300">
                {provenanceWhisper(primary)}
              </span>
            ) : null}
          </p>
          <h2 className="mt-2 max-w-xl text-[15px] font-medium leading-snug text-slate-600 group-hover:text-slate-900">
            {primary.label}
          </h2>
          <p className="mt-4 font-mono text-[2.75rem] font-medium leading-none tracking-tight text-slate-900 sm:text-[3.5rem] [font-variant-numeric:tabular-nums]">
            {primary.valueDisplay}
          </p>
          <p className="mt-3 font-mono text-[13px] text-slate-500 [font-variant-numeric:tabular-nums]">
            {primary.delta.display}
            <span className="ml-2 font-sans text-[12px] text-slate-400">
              {primary.delta.period}
            </span>
          </p>
        </Link>

        {secondary.length > 0 ? (
          <div className="flex flex-col justify-stretch border-t border-slate-100 lg:border-l lg:border-t-0">
            {secondary.map((item, idx) => (
              <Link
                key={item.id}
                href={`/sector/${item.sectorSlug}`}
                className={`group flex flex-1 flex-col justify-center px-1 py-5 sm:px-2 sm:py-6 lg:pl-8 ${
                  idx > 0 ? "border-t border-slate-100" : ""
                }`}
              >
                <p className="text-[11px] text-slate-400">
                  {item.sectorName}
                  {provenanceWhisper(item) ? (
                    <span className="ml-1.5 text-slate-300">
                      · {provenanceWhisper(item)}
                    </span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-[13px] text-slate-600 group-hover:text-slate-900">
                  {item.label}
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-[1.55rem] font-medium tracking-tight text-slate-900 [font-variant-numeric:tabular-nums]">
                    {item.valueDisplay}
                  </span>
                  <span className="font-mono text-[12px] text-slate-400 [font-variant-numeric:tabular-nums]">
                    {item.delta.display}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
