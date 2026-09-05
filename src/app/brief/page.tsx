import Link from "next/link";
import type { Metadata } from "next";
import { ExampleBadge } from "@/components/ExampleBadge";
import { PulseRow } from "@/components/PulseRow";
import { getMonitorBundle } from "@/lib/adapters";

export const metadata: Metadata = {
  title: "Brief",
  description:
    "Yellowcake-style brief: anchor, structural proxy, movers, catalysts — EXAMPLE DATA.",
};

export const revalidate = 3600;

export default async function BriefPage() {
  const { brief, pulse, asOf } = await getMonitorBundle();
  const { meta, sections } = brief;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3 border-b border-slate-200 pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700">
          Editorial brief
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {meta.title}
        </h1>
        <p className="text-[15px] text-slate-500">{meta.subtitle}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400">As of {meta.asOf}</span>
          <ExampleBadge />
        </div>
        <p className="rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-[13px] text-amber-900">
          {meta.disclaimer}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <section
              key={section.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold text-slate-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-[14px] leading-relaxed text-slate-600">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-[13px] text-slate-500 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-blue-500 before:content-['']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.relatedSlug && (
                <Link
                  href={`/sector/${section.relatedSlug}`}
                  className="mt-4 inline-flex text-[13px] font-medium text-blue-600 hover:text-blue-700"
                >
                  Open related sector →
                </Link>
              )}
            </section>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Sourced?
            </h3>
            <p className="mt-2 text-[13px] text-slate-500">
              Source tags on sector cards are explicitly marked{" "}
              <span className="text-amber-700">EXAMPLE</span> or placeholder —
              never fabricated journal citations.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Cross-cut
            </h3>
            <p className="mt-2 text-[13px] text-slate-500">
              US / China / EU industrial-policy stance lives on every sector
              detail as a toggle — not a nineteenth tile.
            </p>
          </div>
        </aside>
      </div>

      <PulseRow items={pulse} asOf={asOf} />
    </div>
  );
}
