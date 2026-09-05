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
  const { brief, pulse } = await getMonitorBundle();
  const { meta, sections } = brief;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3 border-b border-zinc-800/80 pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/80">
          Editorial brief
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {meta.title}
        </h1>
        <p className="text-zinc-400">{meta.subtitle}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-zinc-500">As of {meta.asOf}</span>
          <ExampleBadge />
        </div>
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-amber-100/90">
          {meta.disclaimer}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <section
              key={section.id}
              className="rounded-xl border border-zinc-800 bg-[#0b0e13] p-5"
            >
              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-mono text-xs text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold text-zinc-50">{section.title}</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-sm text-zinc-400 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-emerald-400/70 before:content-['']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.relatedSlug && (
                <Link
                  href={`/sector/${section.relatedSlug}`}
                  className="mt-4 inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-400 hover:text-emerald-300"
                >
                  Open related sector →
                </Link>
              )}
            </section>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Sourced?
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Source tags on sector cards are explicitly marked{" "}
              <span className="text-amber-300">EXAMPLE</span> or placeholder —
              never fabricated journal citations.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Cross-cut
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              US / China / EU industrial-policy stance lives on every sector card
              as a toggle — not a nineteenth tile.
            </p>
          </div>
        </aside>
      </div>

      <PulseRow items={pulse} />
    </div>
  );
}
