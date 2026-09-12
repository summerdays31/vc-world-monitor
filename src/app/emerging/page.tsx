import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Method",
  description:
    "How World Monitor chooses live and curated public signals — no unsourced editorial cards.",
};

export default function EmergingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-8 sm:px-8 sm:py-10">
      <header className="max-w-2xl space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#8a847a]">
          Method
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl">
          Sourced signals only
        </h1>
        <p className="text-[15px] leading-relaxed text-[#6b6560]">
          Early-signal editorial cards without public sources have been
          removed. The public surface shows live fetches and curated published
          figures only — never invented numbers.
        </p>
      </header>

      <section className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5">
        <h2 className="text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
          What qualifies
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            [
              "01 Live",
              "Public API or scrapeable page with a clear level (e.g. RunPod GraphQL, Dealroom guide).",
            ],
            [
              "02 Curated",
              "Published report or primary post with a citable figure (e.g. LBNL Queued Up, Kalshi CDF, MS via Steffen).",
            ],
            [
              "03 Charts",
              "Only when ≥2 real published points exist. Single-point metrics stay headline-only.",
            ],
            [
              "04 Out",
              "Any unsourced seed metric is deleted from home, sector, brief, and pulse.",
            ],
          ].map(([t, b]) => (
            <li key={t} className="rounded-lg bg-[#f0eee8]/50 p-3">
              <div className="text-xs font-medium text-[#0a0a0a]">{t}</div>
              <p className="mt-1 text-[13px] text-[#6b6560]">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-[14px] text-[#6b6560]">
        See the{" "}
        <Link href="/" className="font-medium text-[#0a0a0a] hover:underline">
          overview
        </Link>{" "}
        for current instruments, or the{" "}
        <Link
          href="/brief"
          className="font-medium text-[#0a0a0a] hover:underline"
        >
          brief
        </Link>{" "}
        for a short real-data summary.
      </p>
    </div>
  );
}
