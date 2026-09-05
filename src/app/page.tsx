import { PulseRow } from "@/components/PulseRow";
import { SectorCard } from "@/components/SectorCard";
import { SectorChipStrip } from "@/components/SectorChipStrip";
import { ExampleBadge } from "@/components/ExampleBadge";
import { getMonitorBundle } from "@/lib/adapters";

export default function HomePage() {
  const { sectors, pulse, asOf } = getMonitorBundle();

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-400/80">
              Public world monitor
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Sector change, value accrual, early signals
            </h1>
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              Dark terminal-meets-editorial dashboard across{" "}
              <span className="text-zinc-200">{sectors.length} themes</span>. Visual
              blend of live pulse chips + Yellowcake-style structural brief.
              Industrial policy is a US / China / EU toggle on every card.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-right">
            <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
              As of
            </div>
            <div className="font-mono text-sm text-zinc-200">{asOf}</div>
            <div className="mt-1">
              <ExampleBadge />
            </div>
          </div>
        </div>
        <SectorChipStrip sectors={sectors} />
      </section>

      <PulseRow items={pulse} />

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Sector grid
          </h2>
          <span className="font-mono text-[10px] text-zinc-600">
            {sectors.length} first-class tiles
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sectors.map((s) => (
            <SectorCard key={s.slug} sector={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
