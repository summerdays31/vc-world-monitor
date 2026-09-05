import { NextResponse } from "next/server";
import { fetchGpuRentalSpot } from "@/lib/live/gpu";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchGpuRentalSpot();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}
