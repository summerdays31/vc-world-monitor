import { HomeBrowse, type ModeFilter } from "@/components/HomeBrowse";
import { PulseRow } from "@/components/PulseRow";
import { getMonitorBundle } from "@/lib/adapters";

/** Page HTML can regenerate hourly on traffic; live fetches are daily + cron-warmed. */
export const revalidate = 3600;

function parseMode(raw: string | string[] | undefined): ModeFilter {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "Mature" || v === "Emerging" || v === "All") return v;
  return "All";
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string | string[] }>;
}) {
  const sp = await searchParams;
  const mode = parseMode(sp.mode);
  const { sectors, pulse, asOf } = await getMonitorBundle();
  const mature = sectors.filter((s) => s.mode === "Mature");
  const emerging = sectors.filter((s) => s.mode === "Emerging");

  return (
    <div className="space-y-8">
      {(mode === "All" || mode === "Mature") && (
        <PulseRow items={pulse} asOf={asOf} />
      )}
      <HomeBrowse mature={mature} emerging={emerging} mode={mode} />
    </div>
  );
}
