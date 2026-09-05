import { PulseRow } from "@/components/PulseRow";
import { SectorCard } from "@/components/SectorCard";
import { SectorChipStrip } from "@/components/SectorChipStrip";
import { ExampleBadge, ProvenanceBadge } from "@/components/ProvenanceBadge";
import { getMonitorBundle } from "@/lib/adapters";

export const revalidate = 3600;

export default async function HomePage() {
  const { sectors, pulse, asOf, live } = await getMonitorBundle();

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
              <span className="text-zinc-200">{sectors.length} themes</span>. Three
              key metrics pull public live/curated feeds; all others remain{" "}
              <ExampleBadge />.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-right">
            <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
              Bundle as of
            </div>
            <div className="font-mono text-sm text-zinc-200">{asOf}</div>
            <div className="mt-1 flex flex-col items-end gap-1">
              {live && (
                <>
                  <ProvenanceBadge value={live.gpu.value} />
                  <ProvenanceBadge value={live.interconnect.value} />
                  <ProvenanceBadge value={live.vc.value} />
                </>
              )}
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
