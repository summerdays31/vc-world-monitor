import {
  interconnectFallback,
  type LiveMetricPayload,
} from "@/data/curated/fallbacks";

const LBNL_URL = "https://emp.lbl.gov/queues";

/**
 * US grid interconnection queue duration — curated from LBNL Queued Up.
 * Attempts a soft confirm against the public HTML summary; never invents
 * a new figure if scrape fails (returns curated with optional stale flag).
 * Revalidate daily.
 */
export async function fetchInterconnectQueue(): Promise<LiveMetricPayload> {
  try {
    const res = await fetch(LBNL_URL, {
      headers: { "User-Agent": "vc-world-monitor/0.1 (public citation check)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`LBNL HTTP ${res.status}`);
    const html = await res.text();

    // Soft confirm: page still cites end-2025 / over 5 years / 2,060 GW
    const confirms =
      /over 5 years/i.test(html) ||
      /median duration from IR to COD/i.test(html) ||
      /2,?060/i.test(html);

    if (!confirms) {
      return {
        ...interconnectFallback,
        value: {
          ...interconnectFallback.value,
          stale: true,
          sourceLabel: "LBNL Queued Up 2026 (unverified page)",
        },
      };
    }

    return {
      ...interconnectFallback,
      value: {
        ...interconnectFallback.value,
        stale: false,
        provenance: "curated",
        sourceLabel: "LBNL Queued Up 2026",
        sourceUrl: LBNL_URL,
      },
    };
  } catch {
    return {
      ...interconnectFallback,
      value: { ...interconnectFallback.value, stale: true },
    };
  }
}
