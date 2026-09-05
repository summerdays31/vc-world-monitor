import type { MetricValue, ProvenanceKind } from "@/data/types";

const styles: Record<ProvenanceKind, string> = {
  example:
    "border-amber-400/70 bg-amber-500/20 text-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.15)]",
  live: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
  curated: "border-sky-500/50 bg-sky-500/10 text-sky-300",
};

const labels: Record<ProvenanceKind, string> = {
  example: "EXAMPLE DATA",
  live: "Live",
  curated: "Curated",
};

export function ProvenanceBadge({
  value,
  className = "",
}: {
  value: Pick<MetricValue, "provenance" | "stale" | "sourceLabel" | "sourceUrl" | "asOf" | "isExample">;
  className?: string;
}) {
  const kind: ProvenanceKind = value.isExample
    ? "example"
    : value.provenance ?? "example";
  const title = [
    value.sourceLabel,
    value.asOf ? `as of ${value.asOf}` : null,
    value.stale ? "STALE fallback" : null,
    value.sourceUrl,
  ]
    .filter(Boolean)
    .join(" · ");

  const inner = (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${styles[kind]} ${className}`}
      title={title || undefined}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          kind === "example"
            ? "bg-amber-400 animate-pulse"
            : kind === "live"
              ? "bg-emerald-400"
              : "bg-sky-400"
        }`}
      />
      {labels[kind]}
      {value.stale ? " · stale" : ""}
      {value.sourceLabel && kind !== "example" ? (
        <span className="normal-case tracking-normal opacity-80">
          · {value.sourceLabel}
        </span>
      ) : null}
    </span>
  );

  if (value.sourceUrl && kind !== "example") {
    return (
      <a
        href={value.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex hover:opacity-90"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export function ExampleBadge({ className = "" }: { className?: string }) {
  return (
    <ProvenanceBadge
      className={className}
      value={{
        isExample: true,
        provenance: "example",
        asOf: "",
      }}
    />
  );
}
