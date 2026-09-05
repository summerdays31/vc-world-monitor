import type { MetricValue, ProvenanceKind } from "@/data/types";

const styles: Record<ProvenanceKind, string> = {
  example: "text-amber-700/90",
  live: "text-emerald-700/90",
  curated: "text-sky-700/90",
};

const labels: Record<ProvenanceKind, string> = {
  example: "EXAMPLE",
  live: "Live",
  curated: "Curated",
};

export function ProvenanceBadge({
  value,
  className = "",
}: {
  value: Pick<
    MetricValue,
    "provenance" | "stale" | "sourceLabel" | "sourceUrl" | "asOf" | "isExample"
  >;
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
      className={`inline-flex items-center gap-1 text-[10px] font-medium tracking-wide ${styles[kind]} ${className}`}
      title={title || undefined}
    >
      <span
        className={`h-1 w-1 rounded-full ${
          kind === "example"
            ? "bg-amber-500"
            : kind === "live"
              ? "bg-emerald-500"
              : "bg-sky-500"
        }`}
      />
      {labels[kind]}
      {value.stale ? " · stale" : ""}
      {value.sourceLabel && kind !== "example" ? (
        <span className="font-normal text-slate-400">· {value.sourceLabel}</span>
      ) : null}
    </span>
  );

  if (value.sourceUrl && kind !== "example") {
    return (
      <a
        href={value.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex hover:opacity-80"
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
