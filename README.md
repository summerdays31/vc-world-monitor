# VC World Monitor

Public Sequoia/a16z-style world monitor: sector change, value accrual, and early signals.

Most metrics are **EXAMPLE DATA** placeholders (amber badge). Three key metrics are wired to **public live or curated** sources (emerald / sky badges) with honest stale fallbacks — never invented figures.

## Live / curated metrics

| Metric | Sector slot | Mode | Source | Refresh |
| --- | --- | --- | --- | --- |
| **GPU rental spot (H100-eq)** | AI → **north star** | **LIVE** | [RunPod public GraphQL](https://api.runpod.io/graphql) (H100 SXM/NVL on-demand floor). Pricing page: https://www.runpod.io/pricing | Hourly (`revalidate: 3600`). Fallback: last-known curated in `src/data/curated/fallbacks.ts` with **stale** flag. Est. AI software ARR demoted to EXAMPLE infra slot. |
| **Interconnect queue (median IR→COD)** | Data center → **north star** | **CURATED** | [LBNL Queued Up 2026](https://emp.lbl.gov/queues) — median ~61 months (5.1 yrs) for U.S. projects completed in 2025; PDF: https://emp.lbl.gov/sites/default/files/2026-06/Queued%20Up%202026%20Edition.pdf | Soft HTML confirm daily. Manually bump `interconnectFallback` when LBNL publishes the next annual edition. Hyperscale capex demoted to EXAMPLE infra slot. |
| **Global VC deployed (H1 YTD)** | Capital formation → north star | **LIVE** (scrape) / curated fallback | [Dealroom Global guide](https://dealroom.co/guides/global) (`$506.2B` H1’26 as of closed Q2). Alternate cite: [KPMG Venture Pulse Q2’26](https://kpmg.com/xx/en/media/press-releases/2026/07/vc-investment-already-at-five-year-high-of-billions.html) mid-year `$560.4B` | Daily scrape. On failure, curated fallback + **stale**. Delta is **level / H1’26 YTD** (not vs FY25). Prefer H1’26 vs H1’25 only if Dealroom publishes it. Update `vcFallback` after each closed quarter. |

API route handlers (same fetchers, CDN cache headers):

- `GET /api/metrics/gpu`
- `GET /api/metrics/interconnect`
- `GET /api/metrics/vc`
- `GET /api/metrics/bundle`

No API keys required.

## Still EXAMPLE DATA

All other north stars, capital pulses, talent metrics, movers, catalysts, EXAMPLE pulse movers, emerging cards, and the editorial brief remain seed placeholders with amber **EXAMPLE DATA** badges. Card chrome never shows Live/Curated for a whole sector — only the wired metric does. Global pulse leads with the three wired metrics, then a separated EXAMPLE movers section.

## Routes

- `/` — Home (chip strip, pulse, sector cards)
- `/sector/[slug]` — Sector detail (anchor, gauge, movers, catalysts, methodology)
- `/emerging` — Early-signal kit + example cards
- `/brief` — Editorial brief

## Themes

Original 9: AI, Healthcare, Consumer, Robotics, Data center, Defense, Space, Materials, Leisure.

Added: Energy and grid, Compute/semiconductors, Labor and demography, Capital formation, Bio/longevity, Security/cyber+trust, Climate adaptation, Education/skill formation, Attention/media platforms.

Cross-cut (not a tile): US / China / EU industrial-policy toggle on cards.

## Stack

Next.js App Router, TypeScript, Tailwind v4. Typed schema in `src/data/types.ts`. Seed in `src/data/sectors.ts`. Curated fallbacks in `src/data/curated/fallbacks.ts`. Live fetchers in `src/lib/live/`. Adapters in `src/lib/adapters.ts`.

## Run

```
bun install
bun run dev
bun run build
```

Node alternative: use your package manager install / run scripts from `package.json`.

## Add a sector or metric

1. Append a `Sector` object in `src/data/sectors.ts`.
2. Extend `SectorMetrics` in `src/data/types.ts` if adding fields.
3. Keep `isExample: true` / `provenance: "example"` and ExampleBadge visible for unsourced figures.
4. To wire a public feed: add a fetcher under `src/lib/live/`, curated fallback, overlay in `applyLiveOverlays`, and document it here.

## Deploy on Vercel free tier

Import `summerdays31/vc-world-monitor` at vercel.com/new. Next.js preset. No env vars needed.

## License

As configured on the GitHub repo.
