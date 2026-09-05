import Link from "next/link";
import type { PulseItem } from "@/data/types";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

function isWired(item: PulseItem): boolean {
  if (item.isExample === false) return true;
  return item.provenance === "live" || item.provenance === "curated";
}

/** RWA-style top KPI strip: 4–5 large metric tiles. */
export function PulseRow({
  items,
  asOf,
}: {
  items: PulseItem[];
  asOf?: string;
}) {
  const wired = items.filter(isWired);
  const examples = items.filter((i) => !isWired(i));
  const tiles = [...wired, ...examples].slice(0, 5);

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tiles.map((item) => {
          const wiredItem = isWired(item);
          return (
            <Link
              key={item.id}
              href={`/sector/${item.sectorSlug}`}
              className="group flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-slate-300"
            >
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] leading-snug text-slate-500">
                    {item.label}
                  </p>
                  {wiredItem ? (
                    <ProvenanceBadge
                      className="shrink-0"
                      value={{
                        isExample: false,
                        provenance: item.provenance ?? "live",
                        asOf: "",
                        stale: item.stale,
                        sourceLabel: item.sourceLabel,
                      }}
                    />
                  ) : (
                    <ExampleBadge className="shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400">{item.sectorName}</p>
              </div>
              <div className="mt-5 space-y-1">
                <div className="text-[1.75rem] font-light leading-none tracking-tight tabular-nums text-slate-900 sm:text-[2rem]">
                  {item.valueDisplay ?? "—"}
                </div>
                <DeltaPill delta={item.delta} />
              </div>
            </Link>
          );
        })}
      </div>
      {asOf ? (
        <p className="text-xs text-slate-400">as of {asOf}</p>
      ) : null}
    </section>
  );
}
