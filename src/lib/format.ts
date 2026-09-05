import type { Delta } from "@/data/types";

export function deltaClass(direction: Delta["direction"]): string {
  if (direction === "up") return "text-emerald-400";
  if (direction === "down") return "text-rose-400";
  return "text-zinc-400";
}

export function deltaArrow(direction: Delta["direction"]): string {
  if (direction === "up") return "▲";
  if (direction === "down") return "▼";
  return "●";
}

export function urgencyClass(urgency: "high" | "medium" | "low"): string {
  if (urgency === "high") return "border-amber-400/40 bg-amber-400/10 text-amber-200";
  if (urgency === "medium") return "border-sky-400/40 bg-sky-400/10 text-sky-200";
  return "border-zinc-500/40 bg-zinc-500/10 text-zinc-300";
}

export function modeClass(mode: "Mature" | "Emerging"): string {
  if (mode === "Emerging")
    return "border-violet-400/40 bg-violet-400/10 text-violet-200";
  return "border-zinc-500/40 bg-zinc-500/10 text-zinc-300";
}
