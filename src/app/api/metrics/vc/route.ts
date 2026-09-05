import { NextResponse } from "next/server";
import { fetchGlobalVcDeployed } from "@/lib/live/vc";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchGlobalVcDeployed();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
