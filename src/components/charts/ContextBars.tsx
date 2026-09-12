import type { MetricSeries } from "@/data/series";

/**
 * Honest SVG context bars for 2–N real points.
 * No fake issuer stacks — one series, clear labels, shared grain in parent.
 */
export function ContextBars({
  series,
  height = 120,
  accent = "#0a0a0a",
}: {
  series: MetricSeries;
  height?: number;
  accent?: string;
}) {
  const { points, formatValue } = series;
  if (points.length < 2) return null;

  const max = Math.max(...points.map((p) => p.value), 1e-9);
  const padL = 8;
  const padR = 8;
  const padT = 12;
  const padB = 28;
  const w = 320;
  const h = height;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const gap = 16;
  const barW = (innerW - gap * (points.length - 1)) / points.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-auto w-full"
      role="img"
      aria-label={series.caption}
    >
      {points.map((p, i) => {
        const bh = Math.max(2, (p.value / max) * innerH);
        const x = padL + i * (barW + gap);
        const y = padT + innerH - bh;
        return (
          <g key={p.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={bh}
              fill={accent}
              opacity={0.15 + (0.55 * (i + 1)) / points.length}
              rx={3}
            />
            <text
              x={x + barW / 2}
              y={y - 4}
              textAnchor="middle"
              className="fill-[#0a0a0a]"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              {formatValue(p.value)}
            </text>
            <text
              x={x + barW / 2}
              y={h - 8}
              textAnchor="middle"
              className="fill-[#8a847a]"
              style={{ fontSize: 10 }}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
