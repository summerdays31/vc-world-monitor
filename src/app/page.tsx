import { HomeBrowse } from "@/components/HomeBrowse";
import { getMonitorBundle } from "@/lib/adapters";

/** Page HTML can regenerate hourly on traffic; live fetches are daily + cron-warmed. */
export const revalidate = 3600;

export default async function HomePage() {
  const { sectors, asOf, live } = await getMonitorBundle();

  return (
    <HomeBrowse
      sectors={sectors}
      asOf={asOf}
      liveSeries={live.series}
      instruments={{
        gpu: live.gpu,
        interconnect: live.interconnect,
        vc: live.vc,
        debt: live.debt,
        deficit: live.deficit,
        dcDebtIssuance: live.dcDebtIssuance,
        dcDebtShare: live.dcDebtShare,
      }}
    />
  );
}
