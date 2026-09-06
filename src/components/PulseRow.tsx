import Link from "next/link";
import type { PulseItem } from "@/data/types";
import { formatDeltaCell, isMeaningfulDelta } from "@/lib/format";

function isWired(item: PulseItem): boolean {
  if (item.isExample === false) return true;
  return item.provenance === "live" || item.provenance === "curated";
}

function hasDisplay(item: PulseItem): boolean {
  return Boolean(item.valueDisplay && item.valueDisplay !== "—");
}

function pickPrimary(wired: PulseItem[]): PulseItem {
  const ranked = [...wired].sort((a, b) => {
    const score = (i: PulseItem) => {
      let s = 0;
      if (i.provenance === "live" && !i.stale) s += 4;
      if (i.provenance === "curated") s += 2;
      if (hasDisplay(i)) s += 1;
      if (i.delta.direction !== "flat") s += 1;
      return s;
    };
    return score(b) - score(a);
  });
  return ranked[0];
}

/**
 * Single north-star — one enormous figure, one quiet caption.
 * One sans family for UI + numbers (tabular). Max two metadata clauses.
 */
export function PulseRow({
  items,
  asOf,
}: {
  items: PulseItem[];
  asOf?: string;
}) {
  const wired = items.filter((i) => isWired(i) && hasDisplay(i));
  if (wired.length === 0) return null;

  const primary = pickPrimary(wired);
  const source =
    primary.sourceLabel ||
    (primary.provenance === "live"
      ? "live"
      : primary.provenance === "curated"
        ? "curated"
        : null);

  // Max 2 clauses: metric name · as-of date. Source on title/hover only.
  const bits = [primary.label, asOf ? `as of ${asOf}` : null].filter(Boolean);
  const titleBits = [primary.sectorName, source].filter(Boolean).join(" · ");

  return (
    <section>
      <Link
        href={`/sector/${primary.sectorSlug}`}
        className="group block"
        title={titleBits || undefined}
      >
        <p className="text-[clamp(3.5rem,9vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-slate-900 tabular-nums group-hover:text-slate-800">
          {primary.valueDisplay}
        </p>
        <p className="mt-2 text-[12px] leading-snug text-slate-500">
          {bits.join(" · ")}
          {isMeaningfulDelta(primary.delta) ? (
            <span className="ml-2 text-[12px] tabular-nums text-slate-400">
              {formatDeltaCell(primary.delta)}
            </span>
          ) : null}
        </p>
      </Link>
    </section>
  );
}
