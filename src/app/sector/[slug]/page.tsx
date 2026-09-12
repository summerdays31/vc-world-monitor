import Link from "next/link";
import { notFound } from "next/navigation";
import { DeltaPill } from "@/components/DeltaPill";
import { PolicyToggle } from "@/components/PolicyToggle";
import { SectorChipStrip } from "@/components/SectorChipStrip";
import { ContextBars } from "@/components/charts/ContextBars";
import { seriesByKey } from "@/data/series";
import {
  getSectorLive,
  listSectors,
  wiredSectorParams,
} from "@/lib/adapters";
import { cleanLabel, realMetricSlots } from "@/lib/homeMetrics";
import { urgencyClass } from "@/lib/format";
import { ProvenanceMark } from "@/components/ProvenanceBadge";

export const revalidate = 3600;

export function generateStaticParams() {
  return wiredSectorParams();
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

function seriesForLabel(slug: string, label: string) {
  if (slug === "data-center") {
    if (/Interconnect/i.test(label)) return seriesByKey.interconnect;
    if (/Debt share/i.test(label)) return seriesByKey.dcDebtShare;
  }
  if (slug === "capital-formation" && /deficit/i.test(label)) {
    return seriesByKey.deficit;
  }
  return undefined;
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

  const slots = realMetricSlots(sector.metrics);
  const primary = slots[0];
  const rest = slots.slice(1);
  if (!primary) notFound();

  const primarySeries = seriesForLabel(slug, primary.label);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-8 sm:px-8 sm:py-10">
      <SectorChipStrip sectors={allSectors} activeSlug={sector.slug} />

      <header className="space-y-3 border-b border-[#e5e2db] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
            {sector.mode}
          </span>
          <Link
            href="/"
            className="ml-auto text-[12px] font-medium text-[#8a847a] hover:text-[#0a0a0a]"
          >
            ← Overview
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl">
          {sector.name}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-[#6b6560]">
          {sector.blurb}
        </p>
        <p className="max-w-2xl text-[14px] text-[#3d3a36]">
          <span className="text-[11px] font-medium text-[#8a847a]">
            Why it moved ·{" "}
          </span>
          {sector.whyItMoved}
        </p>
      </header>

      {/* Full-width hero metric — Artemis overview pattern */}
      <section className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium text-[#6b6560]">
              {cleanLabel(primary.label)}
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-semibold tracking-tight tabular-nums text-[#0a0a0a] sm:text-5xl">
                {primary.value.display}
              </span>
              <DeltaPill delta={primary.delta} />
            </div>
            <p className="mt-2 text-[11px] text-[#8a847a]">
              as of {primary.value.asOf}
              {primary.value.sourceUrl ? (
                <>
                  {" · "}
                  <a
                    href={primary.value.sourceUrl}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {primary.value.sourceLabel ?? "source"}
                  </a>
                </>
              ) : null}
              {primary.value.stale ? " · stale fallback" : ""}
            </p>
          </div>
          {primarySeries?.grain ? (
            <span className="text-[11px] tabular-nums text-[#a39e94]">
              {primarySeries.grain}
            </span>
          ) : null}
        </div>
        {primarySeries && primarySeries.points.length >= 2 ? (
          <div className="mt-6 max-w-xl">
            <ContextBars series={primarySeries} height={160} />
            <p className="mt-2 text-[11px] text-[#a39e94]">
              {primarySeries.caption}
            </p>
          </div>
        ) : null}
      </section>

      {/* Paired secondary metrics */}
      {rest.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {rest.map((m) => {
            const series = seriesForLabel(slug, m.label);
            return (
              <div
                key={m.label}
                className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] font-medium text-[#6b6560]">
                    {cleanLabel(m.label)}
                  </p>
                  {series?.grain ? (
                    <span className="text-[10px] text-[#a39e94]">
                      {series.grain}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight tabular-nums text-[#0a0a0a]">
                    {m.value.display}
                  </span>
                  <DeltaPill delta={m.delta} compact />
                  <ProvenanceMark value={m.value} />
                </div>
                <p className="mt-1 text-[11px] text-[#8a847a]">
                  as of {m.value.asOf}
                  {m.value.sourceLabel ? ` · ${m.value.sourceLabel}` : ""}
                </p>
                {series && series.points.length >= 2 ? (
                  <div className="mt-4">
                    <ContextBars series={series} height={120} />
                    <p className="mt-1 text-[10px] text-[#a39e94]">
                      {series.caption}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
      ) : null}

      {(sector.movers.length > 0 || sector.catalysts.length > 0) && (
        <section className="grid gap-5 lg:grid-cols-2">
          {sector.movers.length > 0 ? (
            <div className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5">
              <h2 className="mb-4 text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
                Movers
              </h2>
              <ul className="space-y-2">
                {sector.movers.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-start justify-between gap-3 rounded-lg bg-[#f0eee8]/50 px-3 py-2.5"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#0a0a0a]">
                        {m.name}
                      </div>
                      <div className="text-[12px] text-[#6b6560]">
                        {m.context}
                      </div>
                    </div>
                    <DeltaPill delta={m.delta} compact />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="space-y-5">
            {sector.catalysts.length > 0 ? (
              <div className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5">
                <h2 className="mb-4 text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
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
                      {c.note ? (
                        <div className="text-[12px] opacity-80">{c.note}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <PolicyToggle policy={sector.policy} />
          </div>
        </section>
      )}

      <footer className="rounded-xl border border-[#e5e2db] bg-[#fffcf7] p-5">
        <h2 className="text-[10px] font-medium uppercase tracking-wider text-[#8a847a]">
          Methodology
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#3d3a36]">
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
                className="rounded-md bg-[#f0eee8]/60 px-2 py-0.5 text-[11px] text-[#3d3a36] ring-1 ring-[#e5e2db] hover:text-blue-600"
              >
                {s.label}
              </a>
            ) : (
              <span
                key={s.label}
                className="rounded-md bg-[#f0eee8]/60 px-2 py-0.5 text-[11px] text-[#8a847a] ring-1 ring-[#e5e2db]"
              >
                {s.label}
              </span>
            )
          )}
        </div>
      </footer>
    </div>
  );
}
