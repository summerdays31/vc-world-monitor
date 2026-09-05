import { NextResponse } from "next/server";
import { fetchGpuRentalSpot } from "@/lib/live/gpu";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchGpuRentalSpot();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
