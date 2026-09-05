import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        404
      </p>
      <h1 className="text-2xl font-semibold text-zinc-50">Page not found</h1>
      <Link
        href="/"
        className="font-mono text-sm text-emerald-400 hover:text-emerald-300"
      >
        ← Back to monitor
      </Link>
    </div>
  );
}
