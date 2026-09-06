import { NextResponse } from "next/server";
import { fetchUsNationalDebt } from "@/lib/live/debt";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchUsNationalDebt();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
