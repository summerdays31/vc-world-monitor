import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
        404
      </p>
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <Link
        href="/"
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to overview
      </Link>
    </div>
  );
}
