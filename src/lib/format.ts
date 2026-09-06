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
