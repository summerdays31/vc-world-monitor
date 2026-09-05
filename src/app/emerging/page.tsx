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
  hot: "border-rose-200 bg-rose-50 text-rose-800",
  warming: "border-amber-200 bg-amber-50 text-amber-800",
  watch: "border-slate-200 bg-slate-50 text-slate-600",
} as const;

export default function EmergingPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-violet-600">
          Early-signal kit
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Emerging categories
        </h1>
        <p className="text-[15px] leading-relaxed text-slate-500">
          A repeatable ladder for spotting value accrual before the theme
          becomes a mature tile:{" "}
          <span className="font-medium text-slate-700">
            search → creators → capital into enablers → unit economics → export →
            regulation → public comps
          </span>
          . Cards below are worked examples with{" "}
          <ExampleBadge className="align-middle" /> only.
        </p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
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
              className="rounded-lg border border-slate-200 bg-slate-50/60 p-3"
            >
              <div className="text-xs font-medium text-blue-600">{t}</div>
              <p className="mt-1 text-[13px] text-slate-500">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-5">
        {emergingSignals.map((card) => (
          <article
            key={card.id}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {card.title}
                </h2>
                <p className="mt-1 max-w-3xl text-[13px] text-slate-500">
                  {card.thesis}
                </p>
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
                    <span className="text-[10px] font-medium uppercase tracking-wide">
                      {st.name}
                    </span>
                    <span className="text-[9px] uppercase opacity-70">
                      {st.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug opacity-90">
                    {st.signal}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Related sectors
              </span>
              {card.relatedSectors.map((slug) => {
                const s = getSector(slug);
                return (
                  <Link
                    key={slug}
                    href={`/sector/${slug}`}
                    className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[12px] text-blue-600 hover:border-blue-300 hover:bg-blue-50"
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
