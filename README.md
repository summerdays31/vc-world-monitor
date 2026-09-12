# VC World Monitor

Public Sequoia/a16z-style world monitor: sector change and capital signals from **live or curated** public sources only.

**No EXAMPLE / placeholder metrics** appear on home, sector detail, brief, or pulse. If a figure is not sourced, it is omitted.

## Refresh behavior

| Layer | Cadence | Notes |
| --- | --- | --- |
| **Live fetches** (GPU, VC scrape, interconnect HTML check) | `revalidate: 86400` (≤ daily) | Next.js Data Cache |
| **Vercel Cron** `GET /api/cron/refresh` | `0 19 * * *` (19:00 UTC ≈ **03:00 SGT**) | Force-warms GPU + interconnect + VC |
| **Homepage / sector ISR** | `revalidate: 3600` | Regenerates HTML on traffic |
| **Interconnect figure** | **Annual curated** (LBNL Queued Up) | Soft HTML confirm daily; bump median when LBNL republishes |

### Cron auth

Set **`CRON_SECRET`** in the Vercel project env. Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. If unset (local/dev), `/api/cron/refresh` allows unauthenticated calls.

## Live / curated metrics

| Metric | Sector | Mode | Source | Chart |
| --- | --- | --- | --- | --- |
| **GPU rental spot (H100-eq)** | AI · north star | **LIVE** | [RunPod GraphQL](https://api.runpod.io/graphql) | Headline only (no public history series) |
| **Interconnect queue (median IR→COD)** | Data center · north star | **CURATED** | [LBNL Queued Up 2026](https://emp.lbl.gov/queues) — 5.1 yrs (61 mo) for 2025 completions; prior 4.6 yrs (55 mo) | Context bars 2024→2025 |
| **US DC debt issuance** | Data center · capital pulse | **CURATED** | ~$182B in 2025 (~2× YoY) — MS via [Steffen](https://www.sascha-steffen.de/updates/nvidia-500bn-ai-financing-credit-risk) | Headline only (no precise prior $) |
| **Debt share of hyperscaler capex** | Data center · infra | **CURATED** | ~32% mid-2026 vs ~9% FY2024 (same cite) | Context bars FY24→mid-26 |
| **Global VC deployed (H1 YTD)** | Capital · capital pulse | **LIVE** / curated fallback | [Dealroom Global](https://dealroom.co/guides/global) | Headline only (no public H1’25 Δ) |
| **US national debt** | Capital · north star | **CURATED** | [Kalshi CDF / Mansour](https://x.com/mansourtarek_/status/2095562339479437369) — $40.10T | Headline only |
| **FY26 federal deficit** | Capital · infra | **CURATED** | Same post — $1.9T; books $5.6T / $7.4T | Context bars revenue vs spend |

API routes: `/api/metrics/gpu`, `interconnect`, `vc`, `debt`, `dc-debt`, `bundle`, plus `/api/cron/refresh`.

## Homepage UX

- Artemis-inspired hierarchy: **full-width overview chart** where a real series exists (interconnect), then **paired metric cards** with big headline KPIs (+ Δ / as-of) and charts only when ≥2 published points exist.
- Sector cards only for **AI**, **Data center**, and **Capital formation**.
- Brief is a short real-data summary from the live bundle — not an EXAMPLE editorial page.
- `/emerging` is method documentation (no unsourced signal cards).

## Routes

- `/` — Overview (instruments + wired sectors)
- `/sector/ai` · `/sector/data-center` · `/sector/capital-formation`
- `/brief` — Sourced summary
- `/emerging` — Method (what qualifies as live/curated)

## Stack

Next.js App Router, TypeScript, Tailwind v4. Typed schema in `src/data/types.ts`. Seed retained in `src/data/sectors.ts` but filtered to wired sectors. Curated fallbacks in `src/data/curated/fallbacks.ts`. Honest chart series in `src/data/series.ts`. Live fetchers in `src/lib/live/`.

## Run

```
bun install
bun run dev
bun run build
```

## Deploy on Vercel

Import `summerdays31/vc-world-monitor`. Set `CRON_SECRET`. Cron schedule is in `vercel.json`.

## License

As configured on the GitHub repo.
