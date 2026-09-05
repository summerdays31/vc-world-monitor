import {
  gpuFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const RUNPOD_URL = "https://api.runpod.io/graphql";
const QUERY = `{ gpuTypes { id displayName lowestPrice { uninterruptablePrice } } }`;

type GpuType = {
  id: string;
  displayName: string;
  lowestPrice: { uninterruptablePrice: number | null } | null;
};

/**
 * Live H100-equivalent spot: RunPod public GraphQL (no API key).
 * Prefer H100 SXM / NVL on-demand floor; median of available H100 prices.
 * Cached via Next fetch revalidate (daily); Vercel cron also warms daily.
 */
export async function fetchGpuRentalSpot(): Promise<LiveMetricPayload> {
  try {
    const res = await fetch(RUNPOD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`RunPod HTTP ${res.status}`);
    const json = (await res.json()) as {
      data?: { gpuTypes?: GpuType[] };
      errors?: unknown;
    };
    if (!json.data?.gpuTypes?.length) throw new Error("RunPod empty payload");

    const h100 = json.data.gpuTypes.filter(
      (g) =>
        /H100/i.test(g.displayName || g.id) &&
        g.lowestPrice?.uninterruptablePrice != null &&
        g.lowestPrice.uninterruptablePrice > 0
    );
    if (!h100.length) throw new Error("No H100 prices");

    const prices = h100
      .map((g) => g.lowestPrice!.uninterruptablePrice as number)
      .sort((a, b) => a - b);
    // Prefer SXM if present; else lowest H100-eq on-demand floor
    const sxm = h100.find((g) => /SXM/i.test(g.displayName));
    const pick =
      sxm?.lowestPrice?.uninterruptablePrice ??
      prices[Math.floor(prices.length / 2)];

    const asOf = new Date().toISOString().slice(0, 10);
    return {
      value: {
        display: `$${pick.toFixed(2)}/hr`,
        numeric: pick,
        unit: "CUSTOM",
        isExample: false,
        provenance: "live",
        asOf,
        sourceLabel: "RunPod GraphQL",
        sourceUrl: "https://www.runpod.io/pricing",
      },
      delta: {
        display: "spot",
        direction: "flat",
        period: "H100 on-demand floor",
        isExample: false,
      },
      note: `Live RunPod community on-demand floor across ${h100
        .map((g) => g.displayName)
        .join(", ")}.`,
    };
  } catch {
    return {
      ...gpuFallback,
      value: { ...gpuFallback.value, stale: true },
    };
  }
}
