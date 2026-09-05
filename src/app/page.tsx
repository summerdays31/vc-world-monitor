import { HomeBrowse } from "@/components/HomeBrowse";
import { PulseRow } from "@/components/PulseRow";
import { ProvenanceBadge } from "@/components/ProvenanceBadge";
import { getMonitorBundle } from "@/lib/adapters";

/** Page HTML can regenerate hourly on traffic; live fetches are daily + cron-warmed. */
export const revalidate = 3600;

export default async function HomePage() {
  const { sectors, pulse, asOf, live } = await getMonitorBundle();
  const mature = sectors.filter((s) => s.mode === "Mature");
  const emerging = sectors.filter((s) => s.mode === "Emerging");

  return (
    <div className="space-y-8">
      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Global Market Overview
        </h1>
        <p className="text-[15px] leading-relaxed text-slate-500">
          Welcome to VC World Monitor. Track sector change, value accrual, and
          early signals across{" "}
          <span className="font-medium text-slate-700">
            {sectors.length} themes
          </span>
          , split Mature / Emerging. Cards show at most two metrics on home;
          three key figures pull public live/curated feeds — others remain
          EXAMPLE.
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          <span>as of {asOf}</span>
          {live && (
            <>
              <span className="text-slate-300">·</span>
              <ProvenanceBadge value={live.gpu.value} />
              <ProvenanceBadge value={live.interconnect.value} />
              <ProvenanceBadge value={live.vc.value} />
            </>
          )}
        </div>
      </section>

      <PulseRow items={pulse} asOf={asOf} />

      <HomeBrowse mature={mature} emerging={emerging} asOf={asOf} />
    </div>
  );
}
