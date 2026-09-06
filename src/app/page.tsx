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

  return (
    <div className="space-y-10">
      <section className="max-w-2xl space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Global Market Overview
        </h1>
        <p className="text-[15px] leading-relaxed text-slate-500">
          Sector change, value accrual, and early signals across{" "}
          <span className="font-medium text-slate-700">
            {sectors.length} themes
          </span>
          . Mature and emerging, two metrics per sector on home.
        </p>
        <p className="text-[11px] text-slate-400">
          as of {asOf}
          {liveCount > 0 ? ` · ${liveCount} live feeds` : null}
          {" · "}refreshed daily
        </p>
      </section>

      <PulseRow items={pulse} asOf={asOf} />

      <HomeBrowse mature={mature} emerging={emerging} asOf={asOf} />
    </div>
  );
}
