import type { Delta } from "@/data/types";

export function deltaClass(direction: Delta["direction"]): string {
  if (direction === "up") return "text-[#16a34a]";
  if (direction === "down") return "text-[#dc2626]";
  return "text-slate-500";
}

export function deltaArrow(direction: Delta["direction"]): string {
  if (direction === "up") return "▲";
  if (direction === "down") return "▼";
  return "●";
}

export function urgencyClass(urgency: "high" | "medium" | "low"): string {
  if (urgency === "high")
    return "border-amber-200/70 bg-amber-50/50 text-amber-800";
  if (urgency === "medium")
    return "border-sky-200/70 bg-sky-50/50 text-sky-800";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

export function modeClass(mode: "Mature" | "Emerging"): string {
  if (mode === "Emerging") return "text-slate-500";
  return "text-slate-500";
}
