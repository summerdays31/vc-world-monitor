import type { Delta } from "@/data/types";

/** Deltas as secondary voice — not traffic-light garnish. */
export function deltaClass(direction: Delta["direction"]): string {
  if (direction === "up") return "text-slate-600";
  if (direction === "down") return "text-slate-600";
  return "text-slate-400";
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
    return "border-slate-300 bg-slate-50 text-slate-700";
  if (urgency === "medium")
    return "border-slate-200 bg-white text-slate-600";
  return "border-slate-200 bg-slate-50 text-slate-500";
}

export function modeClass(mode: "Mature" | "Emerging"): string {
  return "text-slate-500";
}
