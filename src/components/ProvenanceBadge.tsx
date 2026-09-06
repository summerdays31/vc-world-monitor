import type { MetricValue, ProvenanceKind } from "@/data/types";

/**
 * Quiet provenance mark — never a shouty chip.
 * EXAMPLE is tiny muted text; live/curated only when useful.
 */
export function ProvenanceMark({
  value,
  className = "",
  showSource = false,
}: {
  value: Pick<
    MetricValue,
    "provenance" | "stale" | "sourceLabel" | "sourceUrl" | "asOf" | "isExample"
  >;
  className?: string;
  /** Include source label (detail pages only). */
  showSource?: boolean;
}) {
  const kind: ProvenanceKind = value.isExample
    ? "example"
    : value.provenance ?? "example";

  const title = [
    value.sourceLabel,
    value.asOf ? `as of ${value.asOf}` : null,
    value.stale ? "stale fallback" : null,
    value.sourceUrl,
  ]
    .filter(Boolean)
    .join(" · ");

  let text: string;
  if (kind === "example") {
    text = "example";
  } else if (kind === "live") {
    text = value.stale ? "live · stale" : "live";
  } else {
    text = value.stale ? "curated · stale" : "curated";
  }

  const tone =
    kind === "example"
      ? "text-slate-400"
      : kind === "live"
        ? "text-slate-500"
        : "text-slate-500";

  const inner = (
    <span
      className={`text-[10px] font-normal tracking-wide ${tone} ${className}`}
      title={title || undefined}
    >
      {text}
      {showSource && value.sourceLabel && kind !== "example" ? (
        <span className="text-slate-400"> · {value.sourceLabel}</span>
      ) : null}
    </span>
  );

  if (value.sourceUrl && kind !== "example") {
    return (
      <a
        href={value.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex hover:text-blue-600"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

/** @deprecated Prefer ProvenanceMark — kept for call sites. */
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
  return <ProvenanceMark value={value} className={className} />;
}

/** Quiet EXAMPLE label — never an orange badge. */
export function ExampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[10px] font-normal tracking-wide text-slate-400 ${className}`}
    >
      example
    </span>
  );
}
