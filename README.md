# VC World Monitor

Public Sequoia/a16z-style world monitor: sector change, value accrual, and early signals.

Most metrics are **EXAMPLE DATA** placeholders (amber badge). Key metrics are wired to **public live or curated** sources (emerald / sky badges) with honest stale fallbacks — never invented figures.

## Refresh behavior

| Layer | Cadence | Notes |
| --- | --- | --- |
| **Live fetches** (GPU, VC scrape, interconnect HTML check) | `revalidate: 86400` (≤ daily) | Next.js Data Cache. All three share a daily ceiling. |
| **Vercel Cron** `GET /api/cron/refresh` | `0 19 * * *` (19:00 UTC ≈ **03:00 SGT**) | Force-warms GPU + interconnect + VC even with no traffic. ISR alone is not enough. |
| **Homepage / sector ISR** | `revalidate: 3600` (hourly on traffic) | Regenerates HTML when visited; reads the daily-cached live bundle. |
| **Interconnect figure** | **Annual curated** (LBNL Queued Up) | Checked daily for page confirmation; the numeric median is bumped manually when LBNL publishes the next edition. |

### Cron auth

Set **`CRON_SECRET`** in the Vercel project env. Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. If `CRON_SECRET` is unset (local/dev), `/api/cron/refresh` allows unauthenticated calls.

Homepage shows **Bundle refreshed** (UTC + SGT) from the live bundle `fetchedAt`.

## Live / curated metrics

| Metric | Sector slot | Mode | Source | Refresh |
| --- | --- | --- | --- | --- |
| **GPU rental spot (H100-eq)** | AI → **north star** | **LIVE** | [RunPod public GraphQL](https://api.runpod.io/graphql) (H100 SXM/NVL on-demand floor). Pricing page: https://www.runpod.io/pricing | Daily fetch cache + daily cron warm. Fallback: last-known curated in `src/data/curated/fallbacks.ts` with **stale** flag. Est. AI software ARR demoted to EXAMPLE infra slot. |
| **Interconnect queue (median IR→COD)** | Data center → **north star** | **CURATED** | [LBNL Queued Up 2026](https://emp.lbl.gov/queues) — median ~61 months (5.1 yrs) for U.S. projects completed in 2025; PDF: https://emp.lbl.gov/sites/default/files/2026-06/Queued%20Up%202026%20Edition.pdf | Soft HTML confirm daily; figure itself is **annual curated**. Manually bump `interconnectFallback` when LBNL publishes the next edition. EXAMPLE hyperscale capex replaced by curated DC debt issuance (capital pulse) + debt share of capex (infra). |
| **Global VC deployed (H1 YTD)** | Capital formation → north star | **LIVE** (scrape) / curated fallback | [Dealroom Global guide](https://dealroom.co/guides/global) (`$506.2B` H1’26 as of closed Q2). Alternate cite: [KPMG Venture Pulse Q2’26](https://kpmg.com/xx/en/media/press-releases/2026/07/vc-investment-already-at-five-year-high-of-billions.html) mid-year `$560.4B` | Daily scrape + cron warm. On failure, curated fallback + **stale**. Delta is **level / H1’26 YTD** (not vs FY25). Prefer H1’26 vs H1’25 only if Dealroom publishes it. Update `vcFallback` after each closed quarter. |
| **US national debt** | Capital formation → **north star** (home instrument #4) | **CURATED** | [Kalshi CDF / Mansour](https://x.com/mansourtarek_/status/2095562339479437369) — gross debt `$40.10T` as of 2026-09-03. Optional FY26 deficit `$1.9T` as muted secondary / sector infra slot. | Event curated (manual bump). Not EXAMPLE. |
| **US DC debt issuance** | Data center → **capital pulse** (2nd home-card metric) | **CURATED** | ~`$182B` in 2025, roughly doubled YoY — Morgan Stanley / FT·Bloomberg as summarized by [Steffen](https://www.sascha-steffen.de/updates/nvidia-500bn-ai-financing-credit-risk) (2026-08-14). Industry estimate, not a live API. Delta labeled `~2× YoY` (no invented prior). | Event curated (manual bump). Secondary on detail: debt share of hyperscaler capex `~32%` trailing mid-2026 vs `~9%` FY2024 (same cite). Catalyst chip: Nvidia [>$500B financing MOUs](https://nvidianews.nvidia.com/news/nvidia-partners-with-apollo-blackrock-blackstone-brookfield-goldman-sachs-and-kkr-to-establish-ai-compute-infrastructure-financing-platforms-to-mobilize-over-500-billion-of-third-party-capital) (announced / not committed). Mover: Meta Hyperion `$27B` SPV debt. Replaces EXAMPLE hyperscale capex on the home card. |

API route handlers (same fetchers, CDN cache headers):

- `GET /api/metrics/gpu`
- `GET /api/metrics/interconnect`
- `GET /api/metrics/vc`
- `GET /api/metrics/debt`
- `GET /api/metrics/dc-debt`
- `GET /api/metrics/bundle`
- `GET /api/cron/refresh` — daily warm (cron-protected when `CRON_SECRET` is set)

No API keys required for public metric sources.

## Homepage UX

- Light RWA.xyz-style analytics UI: near-white page, white cards, cobalt accents, green/red deltas.
- Title **Global Market Overview** + welcome line; top **KPI strip** (5 large tiles) from market pulse.
- Segmented **Mature | Emerging | All** filter; segregated Mature / Emerging card blocks; compact **sector league table**.
- Each home card shows **at most 2 metrics**: North Star + one secondary. Provenance badges are quiet small text (Live / Curated / EXAMPLE).
- Detail / Emerging / Brief pages share the same light visual system.

## Still EXAMPLE DATA

All other north stars, capital pulses, talent metrics, movers, catalysts, EXAMPLE pulse movers, emerging cards, and the editorial brief remain seed placeholders with amber **EXAMPLE DATA** badges. Card chrome never shows Live/Curated for a whole sector — only the wired metric does. Home instrument strip stays at four slots (GPU / interconnect / VC / US debt). Data center home card shows interconnect + DC debt issuance. Global pulse leads with the four strip instruments, then EXAMPLE movers.

## Routes

- `/` — Home (Mature / Emerging grids, chip strip, pulse)
- `/sector/[slug]` — Sector detail (full metric set, gauge, movers, catalysts, methodology)
- `/emerging` — Early-signal kit + example cards
- `/brief` — Editorial brief

## Themes

Original 9: AI, Healthcare, Consumer, Robotics, Data center, Defense, Space, Materials, Leisure.

Added: Energy and grid, Compute/semiconductors, Labor and demography, Capital formation, Bio/longevity, Security/cyber+trust, Climate adaptation, Education/skill formation, Attention/media platforms.

Cross-cut (not a tile): US / China / EU industrial-policy toggle on sector detail.

## Stack

Next.js App Router, TypeScript, Tailwind v4. Typed schema in `src/data/types.ts`. Seed in `src/data/sectors.ts`. Curated fallbacks in `src/data/curated/fallbacks.ts`. Live fetchers in `src/lib/live/`. Adapters in `src/lib/adapters.ts`. Cron: `vercel.json` → `/api/cron/refresh`.

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

Import `summerdays31/vc-world-monitor` at vercel.com/new. Next.js preset.

**Env (recommended):** set `CRON_SECRET` to a random string so only Vercel Cron (and you) can hit `/api/cron/refresh`. Cron schedule is already in `vercel.json`.

## License

As configured on the GitHub repo.
