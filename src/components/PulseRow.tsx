import Link from "next/link";
import type { PulseItem } from "@/data/types";
import { DeltaPill } from "./DeltaPill";

function isWired(item: PulseItem): boolean {
  if (item.isExample === false) return true;
  return item.provenance === "live" || item.provenance === "curated";
}

/**
 * Hero KPI strip — larger numerals, sparse captions.
 * Differentiated from sector cards: open tiles, no chip theater.
 * Freshness lives on the page header — not repeated here.
 */
export function PulseRow({
  items,
}: {
  items: PulseItem[];
  asOf?: string;
}) {
  const wired = items.filter(isWired);
  const examples = items.filter((i) => !isWired(i));
  const tiles = [...wired, ...examples].slice(0, 5);

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {tiles.map((item) => {
          const wiredItem = isWired(item);
          return (
            <Link
              key={item.id}
              href={`/sector/${item.sectorSlug}`}
              className="group flex flex-col justify-between rounded-xl bg-white px-5 py-5 ring-1 ring-slate-200/80 transition hover:ring-slate-300"
            >
              <div>
                <p className="text-[12px] leading-snug text-slate-500">
                  {item.label}
                  {!wiredItem ? (
                    <span className="ml-1.5 text-[10px] text-slate-400">
                      example
                    </span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  {item.sectorName}
                </p>
              </div>
              <div className="mt-6">
                <div className="text-[1.85rem] font-light leading-none tracking-tight tabular-nums text-slate-900 sm:text-[2.1rem]">
                  {item.valueDisplay ?? "—"}
                </div>
                <div className="mt-2">
                  <DeltaPill delta={item.delta} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
