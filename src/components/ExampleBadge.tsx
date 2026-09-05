export function ExampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border border-amber-500/50 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300 ${className}`}
      title="Placeholder figures for demonstration — not real citations"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Example data
    </span>
  );
}
