import Link from "next/link";
import { notFound } from "next/navigation";
import { DeltaPill } from "@/components/DeltaPill";
import { ExampleBadge, ProvenanceBadge } from "@/components/ProvenanceBadge";
import { MetricBlock } from "@/components/MetricBlock";
import { PolicyToggle } from "@/components/PolicyToggle";
import { SectorChipStrip } from "@/components/SectorChipStrip";
import { StructuralGauge } from "@/components/StructuralGauge";
import { sectors as seedSectors } from "@/data/sectors";
import { getSectorLive, listSectors } from "@/lib/adapters";
import { modeClass, urgencyClass } from "@/lib/format";

export const revalidate = 3600;

export function generateStaticParams() {
  return seedSectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = await getSectorLive(slug);
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
  const [sector, allSectors] = await Promise.all([
    getSectorLive(slug),
    listSectors(),
  ]);
  if (!sector) notFound();

  const { metrics } = sector;
  const ns = metrics.northStar.value;

  return (
    <div className="space-y-8">
      <SectorChipStrip sectors={allSectors} activeSlug={sector.slug} />

      <header className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${modeClass(
              sector.mode
            )}`}
          >
            {sector.mode}
          </span>
          {ns.isExample &&
          metrics.infraOrAdoption.value.isExample &&
          metrics.capitalPulse.value.isExample &&
          metrics.talentOrAdoption.value.isExample ? (
            <ExampleBadge />
          ) : (
            <span className="text-[11px] text-slate-400">
              Contains wired metric · others EXAMPLE
            </span>
          )}
          <Link
            href="/"
            className="ml-auto text-[13px] font-medium text-slate-500 hover:text-blue-600"
          >
            ← Overview
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          <span
            className="mr-3 inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ backgroundColor: sector.accent }}
          />
          {sector.name}
        </h1>
        <p className="max-w-2xl text-[15px] text-slate-500">{sector.blurb}</p>
        <p className="text-[14px] text-slate-700">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Why it moved ·{" "}
          </span>
          {sector.whyItMoved}
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <div
          className={`rounded-lg border bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:col-span-2 ${
            ns.isExample ? "border-amber-200" : "border-slate-200"
          }`}
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Anchor metric
            </h2>
            {ns.isExample ? (
              <ExampleBadge />
            ) : (
              <ProvenanceBadge value={ns} />
            )}
          </div>
          <p className="text-[13px] text-slate-500">
            {metrics.northStar.label}
            {ns.isExample && !/\(EXAMPLE\)/i.test(metrics.northStar.label)
              ? " · EXAMPLE"
              : ""}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-light tracking-tight tabular-nums text-slate-900 sm:text-5xl">
              {ns.display}
            </span>
            <DeltaPill delta={metrics.northStar.delta} />
          </div>
          {!ns.isExample && (
            <p className="mt-2 text-[12px] text-slate-400">
              as of {ns.asOf}
              {ns.sourceUrl && (
                <>
                  {" · "}
                  <a
                    href={ns.sourceUrl}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ns.sourceLabel ?? "source"}
                  </a>
                </>
              )}
              {ns.stale ? " · stale fallback" : ""}
            </p>
          )}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              metrics.capitalPulse,
              metrics.infraOrAdoption,
              metrics.talentOrAdoption,
            ].map((m) => (
              <MetricBlock
                key={m.label}
                label={m.label}
                value={m.value}
                delta={m.delta}
                size="lg"
              />
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
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Movers
          </h2>
          <ul className="space-y-2">
            {sector.movers.map((m) => (
              <li
                key={m.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2.5"
              >
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {m.name}
                  </div>
                  <div className="text-[12px] text-slate-500">{m.context}</div>
                </div>
                <DeltaPill delta={m.delta} compact />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Catalysts
            </h2>
            <ul className="flex flex-col gap-2">
              {sector.catalysts.map((c) => (
                <li
                  key={c.id}
                  className={`rounded-lg border px-3 py-2 ${urgencyClass(c.urgency)}`}
                >
                  <div className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    {c.urgency} urgency
                  </div>
                  <div className="text-sm font-medium">{c.label}</div>
                  {c.note && (
                    <div className="text-[12px] opacity-80">{c.note}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <PolicyToggle policy={sector.policy} />
        </div>
      </section>

      <footer className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          Methodology
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
          {sector.methodology}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sector.sources.map((s) =>
            s.url ? (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                  s.kind === "live"
                    ? "border-emerald-200 text-emerald-700"
                    : s.kind === "curated"
                      ? "border-sky-200 text-sky-700"
                      : "border-slate-200 text-slate-500"
                }`}
              >
                {s.label}
              </a>
            ) : (
              <span
                key={s.label}
                className="rounded border border-slate-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500"
              >
                {s.label}
              </span>
            )
          )}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          as of {ns.asOf || sector.metrics.northStar.value.asOf}
        </p>
      </footer>
    </div>
  );
}
