import { NextRequest, NextResponse } from "next/server";
import { fetchLiveBundle } from "@/lib/live";

export const dynamic = "force-dynamic";

/**
 * Daily warm of all live/curated sector fetches.
 * Vercel Cron: schedule in vercel.json (`0 19 * * *` ≈ 03:00 SGT).
 * Auth: when CRON_SECRET is set, require Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const data = await fetchLiveBundle();
  const snap = (p: typeof data.gpu) => ({
    display: p.value.display,
    provenance: p.value.provenance,
    stale: p.value.stale ?? false,
    asOf: p.value.asOf,
  });

  return NextResponse.json(
    {
      ok: true,
      refreshedAt: data.fetchedAt,
      gpu: snap(data.gpu),
      interconnect: snap(data.interconnect),
      vc: snap(data.vc),
      debt: snap(data.debt),
      deficit: snap(data.deficit),
      dcDebtIssuance: snap(data.dcDebtIssuance),
      dcDebtShare: snap(data.dcDebtShare),
      retailSales: snap(data.retailSales),
      unemployment: snap(data.unemployment),
      jolts: snap(data.jolts),
      copper: snap(data.copper),
      defenseOutlays: snap(data.defenseOutlays),
      semiIp: snap(data.semiIp),
      sox: snap(data.sox),
      henryHub: snap(data.henryHub),
      eduEmployment: snap(data.eduEmployment),
      roboticsUs: snap(data.roboticsUs),
      noaaDisasters: snap(data.noaaDisasters),
      netflixRevenue: snap(data.netflixRevenue),
      tsa: snap(data.tsa),
      clinicalTrialsActive: snap(data.clinicalTrialsActive),
      longevityTrials: snap(data.longevityTrials),
      cisaKev: snap(data.cisaKev),
      orbitalLaunches: snap(data.orbitalLaunches),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
