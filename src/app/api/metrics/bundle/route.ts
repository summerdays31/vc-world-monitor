import { NextResponse } from "next/server";
import { fetchLiveBundle } from "@/lib/live";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchLiveBundle();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
