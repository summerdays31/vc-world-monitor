import Link from "next/link";
import type { Sector } from "@/data/types";
import { cleanLabel, pickSecondary } from "@/lib/homeMetrics";

/**
 * Mature scannable map — dense league rows, mono figures, no card chrome.
 */
export function SectorLeagueTable({
  sectors,
  muted = false,
  title = "Mature map",
  caption,
}: {
  sectors: Sector[];
  asOf?: string;
  muted?: boolean;
  title?: string;
  caption?: string;
}) {
  const ranked = [...sectors].sort((a, b) => {
    const aw = a.metrics.northStar.value.isExample ? 0 : 1;
    const bw = b.metrics.northStar.value.isExample ? 0 : 1;
    if (bw !== aw) return bw - aw;
    const an = a.metrics.northStar.value.numeric ?? -Infinity;
    const bn = b.metrics.northStar.value.numeric ?? -Infinity;
    return bn - an;
  });

  if (ranked.length === 0) return null;

  return (
    <section className={muted ? "opacity-40" : undefined}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="text-[13px] font-semibold tracking-tight text-slate-800">
            {title}
          </h2>
          {caption ? (
            <p className="mt-0.5 text-[11px] text-slate-400">{caption}</p>
          ) : null}
        </div>
        <span className="font-mono text-[11px] text-slate-400 [font-variant-numeric:tabular-nums]">
          {ranked.length}
        </span>
      </div>

      <div className="overflow-x-auto border-y border-slate-200/80">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
              <th className="w-10 py-2.5 pr-2 font-medium">#</th>
              <th className="py-2.5 pr-3 font-medium">Sector</th>
              <th className="py-2.5 pr-3 font-medium">North star</th>
              <th className="py-2.5 pr-3 text-right font-medium">Value</th>
              <th className="py-2.5 pr-3 text-right font-medium">Δ</th>
              <th className="py-2.5 text-right font-medium">Secondary</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((s, i) => {
              const ns = s.metrics.northStar;
              const sec = pickSecondary(s.metrics);
              const wired = !ns.value.isExample;
              return (
                <tr
                  key={s.slug}
                  className={`border-b border-slate-50 last:border-0 ${
                    wired ? "" : "text-slate-400"
                  }`}
                >
                  <td className="py-3 pr-2 font-mono text-[12px] text-slate-300 [font-variant-numeric:tabular-nums]">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 pr-3">
                    <Link
                      href={`/sector/${s.slug}`}
                      className={`text-[14px] font-medium hover:underline ${
                        wired ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="max-w-[14rem] truncate py-3 pr-3 text-[12px] text-slate-500">
                    {cleanLabel(ns.label)}
                  </td>
                  <td className="py-3 pr-3 text-right font-mono text-[15px] font-medium tracking-tight text-slate-900 [font-variant-numeric:tabular-nums]">
                    {ns.value.display}
                  </td>
                  <td className="py-3 pr-3 text-right font-mono text-[12px] text-slate-500 [font-variant-numeric:tabular-nums]">
                    {ns.delta.display}
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-mono text-[13px] font-medium text-slate-800 [font-variant-numeric:tabular-nums]">
                      {sec.value.display}
                    </span>
                    <span className="ml-2 text-[11px] text-slate-400">
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
