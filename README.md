# VC World Monitor

Public Sequoia/a16z-style world monitor: sector change, value accrual, and early signals.

> All metrics are EXAMPLE DATA placeholders. Visible badges on every figure.

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

Next.js App Router, TypeScript, Tailwind v4. Typed schema in `src/data/types.ts`. Seed in `src/data/sectors.ts`. Adapters in `src/lib/adapters.ts`.

## Run

```
bun install
bun run dev
bun run build
```

Node alternative: use your package manager install / run dev / run build scripts from package.json.

## Add a sector or metric

1. Append a `Sector` object in `src/data/sectors.ts`.
2. Extend `SectorMetrics` in `src/data/types.ts` if adding fields.
3. Keep `isExample: true` and ExampleBadge visible.
4. Source tags must be example/placeholder — never fake citations.

## Deploy on Vercel free tier

Import `summerdays31/vc-world-monitor` at vercel.com/new. Next.js preset. No env vars needed for EXAMPLE DATA.

## Wire live data later

Implement fetches in `src/lib/adapters.ts`, map into `Sector` / `MetricValue` / `Delta`, then flip provenance off example mode only when sourced.

## License

As configured on the GitHub repo.
