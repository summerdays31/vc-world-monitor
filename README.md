# VC World Monitor

Public Sequoia/a16z-style world monitor: sector change and capital signals from **live or curated** public sources only.

**No EXAMPLE / placeholder metrics** appear on home, sector detail, brief, or pulse. If a figure is not sourced, it is omitted.

## Refresh behavior

| Layer | Cadence | Notes |
| --- | --- | --- |
| **Live fetches** (GPU, FRED CSV, TSA, CT.gov, CISA, Wikipedia launches, VC scrape, interconnect HTML check) | `revalidate: 86400` (≤ daily) | Next.js Data Cache |
| **Vercel Cron** `GET /api/cron/refresh` | `0 19 * * *` (19:00 UTC ≈ **03:00 SGT**) | Force-warms all live adapters |
| **Homepage / sector ISR** | `revalidate: 3600` | Regenerates HTML on traffic |
| **Interconnect / IFR / NOAA / Netflix / debt** | **Curated** (annual / quarterly / event) | Soft-confirm or identity return; bump when source republishes |

### Cron auth

Set **`CRON_SECRET`** in the Vercel project env. Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. If unset (local/dev), `/api/cron/refresh` allows unauthenticated calls.

### FRED

Uses **keyless** public CSV: `https://fred.stlouisfed.org/graph/fredgraph.csv?id=SERIES`. No `FRED_API_KEY` required.

## Live / curated metrics

### Signature instruments (home masthead)

| Metric | Sector | Mode | Source | Chart |
| --- | --- | --- | --- | --- |
| **GPU rental spot (H100-eq)** | AI · north star | **LIVE** | [RunPod GraphQL](https://api.runpod.io/graphql) | Headline only |
| **Interconnect queue (median IR→COD)** | Data center · north star | **CURATED** | [LBNL Queued Up 2026](https://emp.lbl.gov/queues) | Context bars 2024→2025 |
| **US DC debt issuance** | Data center · capital pulse | **CURATED** | ~$182B in 2025 — MS via [Steffen](https://www.sascha-steffen.de/updates/nvidia-500bn-ai-financing-credit-risk) | Headline only |
| **Debt share of hyperscaler capex** | Data center · infra | **CURATED** | ~32% mid-2026 vs ~9% FY2024 | Context bars |
| **Global VC deployed (H1 YTD)** | Capital · capital pulse | **LIVE** / curated fallback | [Dealroom Global](https://dealroom.co/guides/global) | Headline only |
| **US national debt** | Capital · north star | **CURATED** | [Kalshi CDF / Mansour](https://x.com/mansourtarek_/status/2095562339479437369) — $40.10T | Headline only |
| **FY26 federal deficit** | Capital · infra | **CURATED** | Same post — $1.9T | Context bars revenue vs spend |

### Sector board (Mature / Emerging · max 2 metrics on home cards)

| Sector | Metric(s) | Provenance | Source |
| --- | --- | --- | --- |
| Healthcare | Active interventional trials | LIVE | ClinicalTrials.gov API |
| Consumer | US retail sales (RSAFS) | LIVE | FRED CSV |
| Robotics | US industrial robot installs 2025 | CURATED | IFR press (Jun 18, 2026) |
| Defense | US defense outlays (FDEFX) | LIVE | FRED CSV |
| Space | Orbital launches YTD | LIVE | Wikipedia 2026 in spaceflight |
| Materials | Global copper price (PCOPPUSDM) | LIVE | FRED CSV |
| Leisure | TSA checkpoint travelers | LIVE | tsa.gov passenger volumes |
| Energy & grid | Henry Hub gas spot (DHHNGSP) | LIVE | FRED CSV |
| Compute / semis | Semi IP (IPG3344S) + PHLX SOX | LIVE | FRED CSV |
| Labor & demography | Unemployment (UNRATE) + JOLTS (JTSJOL) | LIVE | FRED CSV |
| Bio / longevity | Active aging / longevity trials | LIVE | ClinicalTrials.gov API |
| Security / cyber | CISA KEV catalog size | LIVE | CISA KEV JSON |
| Climate adaptation | US billion-dollar disasters 2024 | CURATED | NOAA NCEI Billions |
| Education / skills | Education services employment | LIVE | FRED CEU6561000001 |
| Attention / media | Netflix Q2'26 revenue | CURATED | Netflix shareholder letter |

API routes: `/api/metrics/gpu`, `interconnect`, `vc`, `debt`, `dc-debt`, `bundle`, plus `/api/cron/refresh`.

## Homepage UX

- Artemis-inspired hierarchy: **signature instrument strip**, then **Mature** and **Emerging** sector boards (max 2 metrics per card).
- Charts only when ≥2 published points exist (static curated series or live FRED observation windows).
- Brief is a short real-data summary from the live bundle — not an EXAMPLE editorial page.
- `/emerging` is method documentation (no unsourced signal cards).

## Routes

- `/` — Overview (instruments + all wired sectors)
- `/sector/[slug]` — any wired sector
- `/brief` — Sourced summary
- `/emerging` — Method (what qualifies as live/curated)

## Stack

Next.js App Router, TypeScript, Tailwind v4. Typed schema in `src/data/types.ts`. Seed retained in `src/data/sectors.ts` but filtered to wired sectors. Curated fallbacks in `src/data/curated/fallbacks.ts`. Honest chart series in `src/data/series.ts`. Live fetchers in `src/lib/live/`.

## Run

```
bun install
bun run build
bun run dev
```

## Deploy on Vercel

Import `summerdays31/vc-world-monitor`. Set `CRON_SECRET`. Cron schedule is in `vercel.json`.

## License

As configured on the GitHub repo.
