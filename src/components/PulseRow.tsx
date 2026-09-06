import Link from "next/link";
import type { PulseItem } from "@/data/types";

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
 * No twin panels, no KPI strip, no costume labels.
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

  // Quiet caption: metric · sector · source · as of — never ALL-CAPS ornament.
  const bits = [
    primary.label,
    primary.sectorName,
    source,
    asOf ? `as of ${asOf}` : null,
  ].filter(Boolean);

  return (
    <section>
      <Link
        href={`/sector/${primary.sectorSlug}`}
        className="group block max-w-3xl"
      >
        <p className="font-mono text-[clamp(3.75rem,13vw,7rem)] font-medium leading-[0.9] tracking-tight text-slate-900 [font-variant-numeric:tabular-nums] group-hover:text-slate-800">
          {primary.valueDisplay}
        </p>
        <p className="mt-3 text-[13px] leading-snug text-slate-500">
          {bits.join(" · ")}
          {primary.delta.display ? (
            <span className="ml-2 font-mono text-[12px] text-slate-400 [font-variant-numeric:tabular-nums]">
              {primary.delta.display}
            </span>
          ) : null}
        </p>
      </Link>
    </section>
  );
}
