import type { Delta } from "@/data/types";

/** Controlled accent — green/red only on real directional change. */
export function deltaClass(direction: Delta["direction"]): string {
  if (direction === "up") return "text-emerald-800";
  if (direction === "down") return "text-red-800";
  return "text-[#8a847a]";
}

export function deltaArrow(direction: Delta["direction"]): string {
  if (direction === "up") return "↑";
  if (direction === "down") return "↓";
  return "·";
}

const JUNK_DELTA = /^(spot|level|n\/?a|—|-|–|flat|none|null|undefined)$/i;

/** True only for numeric / directional change strings — never junk labels. */
export function isMeaningfulDelta(
  delta: Delta | null | undefined
): delta is Delta {
  if (!delta) return false;
  const d = delta.display?.trim() ?? "";
  if (!d) return false;
  if (JUNK_DELTA.test(d)) return false;
  // Require a digit or signed change cue
  if (!/[0-9]/.test(d) && !/^[+\-−]/.test(d)) return false;
  return true;
}

/** Table / hero Δ cell: meaningful change or em dash. */
export function formatDeltaCell(delta: Delta | null | undefined): string {
  return isMeaningfulDelta(delta) ? delta.display : "—";
}

export function urgencyClass(urgency: "high" | "medium" | "low"): string {
  if (urgency === "high")
    return "border-[#d9d4cb] bg-[#f0eee8] text-[#3d3a36]";
  if (urgency === "medium")
    return "border-[#e5e2db] bg-[#f7f6f3] text-[#3d3a36]";
  return "border-[#e5e2db] bg-[#f0eee8] text-[#8a847a]";
}

export function modeClass(mode: "Mature" | "Emerging"): string {
  return "text-[#8a847a]";
}
