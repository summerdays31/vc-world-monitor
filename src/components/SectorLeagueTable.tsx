import Link from "next/link";
import type { Sector, SectorMetrics } from "@/data/types";
import { deltaArrow, deltaClass } from "@/lib/format";

type MetricSlot = SectorMetrics["capitalPulse"];

function pickSecondary(metrics: SectorMetrics): MetricSlot {
  const candidates: MetricSlot[] = [
    metrics.capitalPulse,
    metrics.infraOrAdoption,
  ];
  const wired = candidates.filter((m) => !m.value.isExample);
  if (wired.length === 1) return wired[0];
  if (wired.length === 2) {
    const live = wired.find((m) => m.value.provenance === "live");
    if (live) return live;
    return metrics.capitalPulse;
  }
  return metrics.capitalPulse;
}

function cleanLabel(label: string): string {
  return label.replace(/\s*\(EXAMPLE\)\s*/gi, "").trim();
}

export function SectorLeagueTable({
  sectors,
}: {
  sectors: Sector[];
  asOf?: string;
}) {
  const ranked = [...sectors].sort((a, b) => {
    const an = a.metrics.northStar.value.numeric ?? -Infinity;
    const bn = b.metrics.northStar.value.numeric ?? -Infinity;
    return bn - an;
  });

  return (
    <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/80">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          League table
        </h2>
        <p className="mt-0.5 text-[12px] text-slate-400">
          Ranked by north-star value · two metrics per sector
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              <th className="px-5 py-2.5 font-medium">#</th>
              <th className="px-3 py-2.5 font-medium">Sector</th>
              <th className="px-3 py-2.5 font-medium">Mode</th>
              <th className="px-3 py-2.5 font-medium">North star</th>
              <th className="px-3 py-2.5 font-medium">Value</th>
              <th className="px-3 py-2.5 font-medium">Δ</th>
              <th className="px-5 py-2.5 font-medium">Secondary</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s, i) => {
              const ns = s.metrics.northStar;
              const sec = pickSecondary(s.metrics);
              const d = ns.delta;
              const example = ns.value.isExample;
              return (
                <tr
                  key={s.slug}
                  className={`border-b border-slate-50 last:border-0 ${
                    example ? "opacity-70" : ""
                  } ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}
                >
                  <td className="px-5 py-3 tabular-nums text-slate-400">
                    {i + 1}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/sector/${s.slug}`}
                      className="font-medium text-slate-900 hover:text-blue-700"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-[11px] uppercase tracking-wide text-slate-400">
                    {s.mode}
                  </td>
                  <td className="max-w-[11rem] truncate px-3 py-3 text-slate-500">
                    {cleanLabel(ns.label)}
                    {example ? (
                      <span className="ml-1.5 text-[10px] text-slate-400">
                        example
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 text-[15px] font-medium tabular-nums text-slate-900">
                    {ns.value.display}
                  </td>
                  <td
                    className={`px-3 py-3 text-[12px] tabular-nums ${deltaClass(d.direction)}`}
                  >
                    <span className="text-[9px] opacity-80">
                      {deltaArrow(d.direction)}
                    </span>{" "}
                    {d.display}
                  </td>
                  <td className="px-5 py-3">
                    <span className="tabular-nums font-medium text-slate-800">
                      {sec.value.display}
                    </span>
                    <span className="ml-1.5 text-[11px] text-slate-400">
                      {cleanLabel(sec.label)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
