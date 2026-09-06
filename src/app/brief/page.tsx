import Link from "next/link";
import type { Metadata } from "next";
import { getMonitorBundle } from "@/lib/adapters";

export const metadata: Metadata = {
  title: "Brief",
  description:
    "Yellowcake-style brief: anchor, structural proxy, movers, catalysts — EXAMPLE DATA.",
};

export const revalidate = 3600;

export default async function BriefPage() {
  const { brief } = await getMonitorBundle();
  const { meta, sections } = brief;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 space-y-6">
      <header className="max-w-2xl space-y-2 border-b border-slate-200 pb-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Editorial brief
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {meta.title}
        </h1>
        <p className="text-[14px] text-slate-500">{meta.subtitle}</p>
        <p className="text-[11px] text-slate-400">as of {meta.asOf}</p>
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-[13px] text-slate-600 ring-1 ring-slate-200/80">
          {meta.disclaimer}
        </p>
      </header>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <section
            key={section.id}
            className="rounded-xl bg-white p-5 ring-1 ring-slate-200/80"
          >
            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-xs tabular-nums text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
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
                    className="flex gap-2 text-[13px] text-slate-500 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-slate-400 before:content-['']"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {section.relatedSlug && (
              <Link
                href={`/sector/${section.relatedSlug}`}
                className="mt-4 inline-flex text-[13px] font-medium text-slate-600 hover:text-slate-900"
              >
                Related sector →
              </Link>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
