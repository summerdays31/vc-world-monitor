import Link from "next/link";
import type { Sector, SectorMetrics } from "@/data/types";
import { deltaArrow, deltaClass } from "@/lib/format";
import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

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

export function SectorLeagueTable({
  sectors,
  asOf,
}: {
  sectors: Sector[];
  asOf: string;
}) {
  const ranked = [...sectors].sort((a, b) => {
    const an = a.metrics.northStar.value.numeric ?? -Infinity;
    const bn = b.metrics.northStar.value.numeric ?? -Infinity;
    return bn - an;
  });

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Sector league table
          </h2>
          <p className="mt-0.5 text-[13px] text-slate-500">
            North star + secondary · max two metrics per sector
          </p>
        </div>
        <p className="text-xs text-slate-400">as of {asOf}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              <th className="px-5 py-2.5 font-medium">#</th>
              <th className="px-3 py-2.5 font-medium">Sector</th>
              <th className="px-3 py-2.5 font-medium">Mode</th>
              <th className="px-3 py-2.5 font-medium">North star</th>
              <th className="px-3 py-2.5 font-medium">Value</th>
              <th className="px-3 py-2.5 font-medium">30D%</th>
              <th className="px-5 py-2.5 font-medium">Secondary</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s, i) => {
              const ns = s.metrics.northStar;
              const sec = pickSecondary(s.metrics);
              const d = ns.delta;
              return (
                <tr
                  key={s.slug}
                  className={`border-b border-slate-50 ${
                    i % 2 === 1 ? "bg-slate-50/60" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3 tabular-nums text-slate-400">
                    {i + 1}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/sector/${s.slug}`}
                      className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: s.accent }}
                      />
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-slate-500">{s.mode}</td>
                  <td className="max-w-[10rem] truncate px-3 py-3 text-slate-600">
                    {ns.label.replace(/\s*\(EXAMPLE\)\s*/gi, "")}
                    {ns.value.isExample ? (
                      <span className="ml-1">
                        <ExampleBadge />
                      </span>
                    ) : (
                      <span className="ml-1">
                        <ProvenanceBadge value={ns.value} />
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 font-medium tabular-nums text-slate-900">
                    {ns.value.display}
                  </td>
                  <td className={`px-3 py-3 tabular-nums ${deltaClass(d.direction)}`}>
                    <span className="text-[10px]">{deltaArrow(d.direction)}</span>{" "}
                    {d.display}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    <span className="tabular-nums font-medium text-slate-800">
                      {sec.value.display}
                    </span>
                    <span className="ml-1.5 text-slate-400">
                      {sec.label.replace(/\s*\(EXAMPLE\)\s*/gi, "")}
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
