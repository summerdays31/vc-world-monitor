"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/",
    label: "Overview",
    match: (p: string) => p === "/",
  },
  {
    href: "/brief",
    label: "Brief",
    match: (p: string) => p.startsWith("/brief"),
  },
  {
    href: "/emerging",
    label: "Method",
    match: (p: string) => p.startsWith("/emerging"),
  },
] as const;

/**
 * Top masthead — sourced-data product. Mode filters removed (only wired
 * mature sectors remain on home).
 */
export function Masthead() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#e5e2db]">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-5 pt-6 pb-4 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-[13px] font-semibold tracking-[0.28em] text-[#0a0a0a]"
        >
          WORLD MONITOR
        </Link>

        <nav className="flex shrink-0 items-center gap-4" aria-label="Primary">
          {NAV.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[12px] transition ${
                  active
                    ? "font-medium text-[#0a0a0a]"
                    : "text-[#6b6560] hover:text-[#0a0a0a]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
