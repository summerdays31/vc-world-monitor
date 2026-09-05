import Link from "next/link";
import type { PulseItem } from "@/data/types";
import { DeltaPill } from "./DeltaPill";
import { ExampleBadge } from "./ExampleBadge";

export function PulseRow({ items }: { items: PulseItem[] }) {
  return (
    <section className="rounded-xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/80 to-[#0a0d12] p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Global pulse
          </h2>
          <p className="text-sm text-zinc-300">Biggest movers across sectors</p>
        </div>
        <ExampleBadge />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/sector/${item.sectorSlug}`}
            className="group flex items-center justify-between gap-3 rounded-lg border border-zinc-800/80 bg-black/30 px-3 py-2.5 transition hover:border-zinc-600 hover:bg-zinc-900/80"
          >
            <div className="min-w-0">
              <div className="truncate font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                {item.sectorName}
              </div>
              <div className="truncate text-sm text-zinc-200 group-hover:text-white">
                {item.label}
              </div>
            </div>
            <DeltaPill delta={item.delta} compact />
          </Link>
        ))}
      </div>
    </section>
  );
}
