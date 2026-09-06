import { HomeBrowse } from "@/components/HomeBrowse";
import { PulseRow } from "@/components/PulseRow";
import { getMonitorBundle } from "@/lib/adapters";

/** Page HTML can regenerate hourly on traffic; live fetches are daily + cron-warmed. */
export const revalidate = 3600;

export default async function HomePage() {
  const { sectors, pulse, asOf, live } = await getMonitorBundle();
  const mature = sectors.filter((s) => s.mode === "Mature");
  const emerging = sectors.filter((s) => s.mode === "Emerging");

  const liveCount = live
    ? [live.gpu, live.interconnect, live.vc].filter(
        (m) => m.value.provenance === "live" && !m.value.stale
      ).length
    : 0;
  const curatedCount = live
    ? [live.gpu, live.interconnect, live.vc].filter(
        (m) =>
          m.value.provenance === "curated" ||
          (m.value.provenance === "live" && m.value.stale)
      ).length
    : 0;

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-3 pb-1">
        <div className="max-w-xl space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
            Global Market Overview
          </h1>
          <p className="text-[13px] leading-relaxed text-slate-500">
            What matters today across{" "}
            <span className="font-medium text-slate-700">
              {sectors.length} themes
            </span>
            — live capacity, grid queue, and capital first.
          </p>
        </div>
        <p className="font-mono text-[11px] text-slate-400 [font-variant-numeric:tabular-nums]">
          as of {asOf}
          {liveCount > 0 ? ` · ${liveCount} live` : null}
          {curatedCount > 0 ? ` · ${curatedCount} curated` : null}
          {" · "}daily
        </p>
      </section>

      <PulseRow items={pulse} asOf={asOf} />

      <HomeBrowse mature={mature} emerging={emerging} asOf={asOf} />
    </div>
  );
}
