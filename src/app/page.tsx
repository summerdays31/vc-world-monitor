import { PulseRow } from "@/components/PulseRow";
import { SectorCard } from "@/components/SectorCard";
import { SectorChipStrip } from "@/components/SectorChipStrip";
import { ExampleBadge, ProvenanceBadge } from "@/components/ProvenanceBadge";
import { getMonitorBundle } from "@/lib/adapters";

/** Page HTML can regenerate hourly on traffic; live fetches are daily + cron-warmed. */
export const revalidate = 3600;

function formatRefreshed(iso: string): string {
  try {
    const d = new Date(iso);
    // Show UTC and SGT (UTC+8) for operators in Singapore
    const utc = d.toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");
    const sgt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
    return `${utc} · ${sgt} SGT`;
  } catch {
    return iso;
  }
}

export default async function HomePage() {
  const { sectors, pulse, asOf, refreshedAt, live } = await getMonitorBundle();
  const mature = sectors.filter((s) => s.mode === "Mature");
  const emerging = sectors.filter((s) => s.mode === "Emerging");

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
              <span className="text-zinc-200">{sectors.length} themes</span>,
              split Mature / Emerging. Cards show North Star + one secondary;
              three key metrics pull public live/curated feeds — others remain{" "}
              <ExampleBadge />.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-right">
            <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
              Bundle refreshed
            </div>
            <div className="max-w-[16rem] font-mono text-[11px] leading-snug text-zinc-200">
              {formatRefreshed(refreshedAt)}
            </div>
            <div className="mt-1 font-mono text-[10px] text-zinc-600">
              as-of date {asOf} · daily warm + ≤daily fetch cache
            </div>
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
            Mature
          </h2>
          <span className="font-mono text-[10px] text-zinc-600">
            {mature.length} sectors · 2 metrics each
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mature.map((s) => (
            <SectorCard key={s.slug} sector={s} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400/80">
            Emerging
          </h2>
          <span className="font-mono text-[10px] text-zinc-600">
            {emerging.length} sectors · 2 metrics each
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {emerging.map((s) => (
            <SectorCard key={s.slug} sector={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
