import { NextResponse } from "next/server";
import {
  fetchDcDebtIssuance,
  fetchDcDebtShare,
} from "@/lib/live/dcDebt";

export const revalidate = 86400;

/** Curated US DC debt issuance + debt share of hyperscaler capex. */
export async function GET() {
  const [issuance, share] = await Promise.all([
    fetchDcDebtIssuance(),
    fetchDcDebtShare(),
  ]);
  return NextResponse.json(
    { issuance, share },
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
