import Link from "next/link";
import type { PulseItem } from "@/data/types";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

function isWired(item: PulseItem): boolean {
  if (item.isExample === false) return true;
  return item.provenance === "live" || item.provenance === "curated";
}

function PulseLink({ item }: { item: PulseItem }) {
  const wired = isWired(item);

  return (
    <Link
      href={`/sector/${item.sectorSlug}`}
      className={`group flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition hover:border-zinc-600 hover:bg-zinc-900/80 ${
        wired
          ? "border-emerald-900/50 bg-emerald-950/20"
          : "border-dashed border-amber-800/40 bg-amber-950/10"
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="truncate font-mono text-[10px] uppercase tracking-wide text-zinc-500">
            {item.sectorName}
          </div>
          {wired ? (
            <ProvenanceBadge
              value={{
                isExample: false,
                provenance: item.provenance ?? "live",
                asOf: "",
                stale: item.stale,
                sourceLabel: item.sourceLabel,
              }}
            />
          ) : (
            <ExampleBadge className="scale-90 origin-left" />
          )}
        </div>
        <div className="truncate text-sm text-zinc-200 group-hover:text-white">
          {item.label}
          {item.valueDisplay ? (
            <span className="ml-1.5 font-mono text-zinc-400">
              {item.valueDisplay}
            </span>
          ) : null}
        </div>
      </div>
      <DeltaPill delta={item.delta} compact />
    </Link>
  );
}

export function PulseRow({ items }: { items: PulseItem[] }) {
  const wired = items.filter(isWired);
  const examples = items.filter((i) => !isWired(i));

  return (
    <section className="rounded-xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 to-[#0a0d12] p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Global pulse
          </h2>
          <p className="text-sm text-zinc-300">
            Wired signals first · EXAMPLE movers below
          </p>
        </div>
      </div>

      {wired.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-500/80">
            Live / curated
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {wired.map((item) => (
              <PulseLink key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {examples.length > 0 && (
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-500/80">
              EXAMPLE movers
            </span>
            <ExampleBadge />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((item) => (
              <PulseLink key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
