import { NextRequest, NextResponse } from "next/server";
import { fetchLiveBundle } from "@/lib/live";

export const dynamic = "force-dynamic";

/**
 * Daily warm of GPU + interconnect + VC + debt + DC debt caches.
 * Vercel Cron: schedule in vercel.json (`0 19 * * *` ≈ 03:00 SGT).
 * Auth: when CRON_SECRET is set, require Authorization: Bearer <CRON_SECRET>.
 * When unset (local/dev), allow unauthenticated calls.
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
  return NextResponse.json(
    {
      ok: true,
      refreshedAt: data.fetchedAt,
      gpu: {
        display: data.gpu.value.display,
        provenance: data.gpu.value.provenance,
        stale: data.gpu.value.stale ?? false,
        asOf: data.gpu.value.asOf,
      },
      interconnect: {
        display: data.interconnect.value.display,
        provenance: data.interconnect.value.provenance,
        stale: data.interconnect.value.stale ?? false,
        asOf: data.interconnect.value.asOf,
      },
      vc: {
        display: data.vc.value.display,
        provenance: data.vc.value.provenance,
        stale: data.vc.value.stale ?? false,
        asOf: data.vc.value.asOf,
      },
      debt: {
        display: data.debt.value.display,
        provenance: data.debt.value.provenance,
        stale: data.debt.value.stale ?? false,
        asOf: data.debt.value.asOf,
      },
      deficit: {
        display: data.deficit.value.display,
        provenance: data.deficit.value.provenance,
        stale: data.deficit.value.stale ?? false,
        asOf: data.deficit.value.asOf,
      },
      dcDebtIssuance: {
        display: data.dcDebtIssuance.value.display,
        provenance: data.dcDebtIssuance.value.provenance,
        stale: data.dcDebtIssuance.value.stale ?? false,
        asOf: data.dcDebtIssuance.value.asOf,
      },
      dcDebtShare: {
        display: data.dcDebtShare.value.display,
        provenance: data.dcDebtShare.value.provenance,
        stale: data.dcDebtShare.value.stale ?? false,
        asOf: data.dcDebtShare.value.asOf,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
