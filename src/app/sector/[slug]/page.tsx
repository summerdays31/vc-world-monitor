import Link from "next/link";
import { notFound } from "next/navigation";
import { DeltaPill } from "@/components/DeltaPill";
import { ExampleBadge } from "@/components/ExampleBadge";
import { PolicyToggle } from "@/components/PolicyToggle";
import { SectorChipStrip } from "@/components/SectorChipStrip";
import { StructuralGauge } from "@/components/StructuralGauge";
import { getSector, sectors } from "@/data/sectors";
import { modeClass, urgencyClass } from "@/lib/format";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return { title: "Sector" };
  return {
    title: sector.name,
    description: sector.blurb,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const { metrics } = sector;

  return (
    <div className="space-y-8">
      <SectorChipStrip sectors={sectors} activeSlug={sector.slug} />

      <header className="space-y-3 border-b border-zinc-800/80 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${modeClass(
              sector.mode
            )}`}
          >
            {sector.mode}
          </span>
          <ExampleBadge />
          <Link
            href="/"
            className="ml-auto font-mono text-[11px] uppercase tracking-wide text-zinc-500 hover:text-zinc-300"
          >
            ← Monitor
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          <span
            className="mr-3 inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: sector.accent }}
          />
          {sector.name}
        </h1>
        <p className="max-w-2xl text-zinc-400">{sector.blurb}</p>
        <p className="text-sm text-zinc-300">
          <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-600">
            Why it moved ·{" "}
          </span>
          {sector.whyItMoved}
        </p>
      </header>

      {/* Anchor metric — Yellowcake style */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#0a0d12] p-5 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Anchor metric
            </h2>
            <ExampleBadge />
          </div>
          <p className="text-sm text-zinc-400">{metrics.northStar.label}</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-4xl font-semibold text-zinc-50 sm:text-5xl">
              {metrics.northStar.value.display}
            </span>
            <DeltaPill delta={metrics.northStar.delta} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              metrics.capitalPulse,
              metrics.infraOrAdoption,
              metrics.talentOrAdoption,
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-zinc-800/80 bg-black/30 p-3"
              >
                <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                  {m.label}
                </div>
                <div className="mt-1 font-mono text-lg text-zinc-100">
                  {m.value.display}
                </div>
                <DeltaPill delta={m.delta} compact />
              </div>
            ))}
          </div>
        </div>
        <StructuralGauge
          label={metrics.structuralGauge.label}
          score={metrics.structuralGauge.score}
          caption={metrics.structuralGauge.caption}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-5">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Movers
          </h2>
          <ul className="space-y-2">
            {sector.movers.map((m) => (
              <li
                key={m.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800/70 bg-black/20 px-3 py-2.5"
              >
                <div>
                  <div className="text-sm font-medium text-zinc-200">{m.name}</div>
                  <div className="text-xs text-zinc-500">{m.context}</div>
                </div>
                <DeltaPill delta={m.delta} compact />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-5">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Catalysts
            </h2>
            <ul className="flex flex-col gap-2">
              {sector.catalysts.map((c) => (
                <li
                  key={c.id}
                  className={`rounded-lg border px-3 py-2 ${urgencyClass(c.urgency)}`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wide opacity-70">
                    {c.urgency} urgency
                  </div>
                  <div className="text-sm font-medium">{c.label}</div>
                  {c.note && <div className="text-xs opacity-80">{c.note}</div>}
                </li>
              ))}
            </ul>
          </div>
          <PolicyToggle policy={sector.policy} />
        </div>
      </section>

      <footer className="rounded-xl border border-dashed border-zinc-700/80 bg-zinc-950/30 p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Methodology
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {sector.methodology}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sector.sources.map((s) => (
            <span
              key={s.label}
              className="rounded border border-zinc-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-zinc-500"
            >
              {s.label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
