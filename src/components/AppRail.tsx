"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/?mode=All", label: "Overview", match: (p: string) => p === "/" },
  {
    href: "/emerging",
    label: "Emerging",
    match: (p: string) => p.startsWith("/emerging"),
  },
  {
    href: "/brief",
    label: "Brief",
    match: (p: string) => p.startsWith("/brief"),
  },
] as const;

/**
 * Fixed left instrument rail — wordmark, primary nav, as-of + legal at foot.
 */
export function AppRail({ asOf }: { asOf?: string }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[200px] shrink-0 flex-col border-r border-slate-200 bg-[#f1f5f9]">
      <div className="px-4 pt-5 pb-4">
        <Link
          href="/?mode=All"
          className="block text-[15px] font-semibold tracking-tight text-slate-900"
        >
          World Monitor
        </Link>
      </div>

      <nav className="flex flex-col gap-0.5 px-2" aria-label="Primary">
        {LINKS.map((link) => {
          const active = link.match(pathname);
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded px-2.5 py-1.5 text-[13px] transition ${
                active
                  ? "bg-white font-medium text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1.5 border-t border-slate-200/80 px-4 py-3">
        {asOf ? (
          <p className="text-[10px] leading-snug text-slate-500">as of {asOf}</p>
        ) : null}
        <p className="text-[10px] leading-snug text-slate-400">
          Not investment advice.
        </p>
      </div>
    </aside>
  );
}
