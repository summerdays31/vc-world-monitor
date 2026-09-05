import Link from "next/link";
import type { Metadata } from "next";
import { ExampleBadge } from "@/components/ExampleBadge";
import { emergingSignals, getSector } from "@/data/sectors";

export const metadata: Metadata = {
  title: "Emerging signals",
  description:
    "Early-signal kit: search → creators → capital into enablers → unit economics → export → regulation → public comps.",
};

const statusStyles = {
  hot: "border-rose-400/40 bg-rose-400/10 text-rose-200",
  warming: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  watch: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
} as const;

export default function EmergingPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet-300/90">
          Early-signal kit
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Emerging categories
        </h1>
        <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
          A repeatable ladder for spotting value accrual before the theme
          becomes a mature tile:{" "}
          <span className="text-zinc-200">
            search → creators → capital into enablers → unit economics → export →
            regulation → public comps
          </span>
          . Cards below are worked examples with{" "}
          <ExampleBadge className="align-middle" /> only.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          How to use the kit
        </h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01 Search", "Query / filing / waitlist spikes before revenue"],
            ["02 Supply", "Creators, labs, or OEMs forming pipelines"],
            ["03 Enablers", "Capital concentrates in picks-and-shovels"],
            ["04 Proof", "Unit economics + export + policy + comps"],
          ].map(([t, b]) => (
            <li
              key={t}
              className="rounded-lg border border-zinc-800/80 bg-black/30 p-3"
            >
              <div className="font-mono text-xs text-emerald-300/90">{t}</div>
              <p className="mt-1 text-sm text-zinc-400">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-5 lg:grid-cols-1">
        {emergingSignals.map((card) => (
          <article
            key={card.id}
            className="rounded-xl border border-zinc-800 bg-[#0b0e13] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-zinc-50">{card.title}</h2>
                <p className="mt-1 max-w-3xl text-sm text-zinc-400">{card.thesis}</p>
              </div>
              <ExampleBadge />
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {card.stages.map((st) => (
                <div
                  key={st.name}
                  className={`max-w-xs rounded-lg border px-3 py-2 ${statusStyles[st.status]}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wide">
                      {st.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase opacity-70">
                      {st.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug opacity-90">{st.signal}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-600">
                Related sectors
              </span>
              {card.relatedSectors.map((slug) => {
                const s = getSector(slug);
                return (
                  <Link
                    key={slug}
                    href={`/sector/${slug}`}
                    className="rounded-full border border-zinc-700 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300 hover:border-zinc-500 hover:text-white"
                  >
                    {s?.shortName ?? slug}
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
