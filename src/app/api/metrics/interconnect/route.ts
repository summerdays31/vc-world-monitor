import { NextResponse } from "next/server";
import { fetchInterconnectQueue } from "@/lib/live/interconnect";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchInterconnectQueue();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
