"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const MODES = ["Mature", "Emerging", "All"] as const;

const NAV = [
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
 * Full-bleed top masthead — tracked wordmark, underline mode instruments,
 * quiet secondary nav. Escapes left-rail Linear cosplay.
 */
export function Masthead() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const mode =
    modeParam === "Mature" || modeParam === "Emerging" || modeParam === "All"
      ? modeParam
      : "All";
  const onHome = pathname === "/";

  return (
    <header className="border-b border-[#e5e2db]">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-5 pt-6 pb-4 sm:px-8">
        <Link
          href="/?mode=All"
          className="shrink-0 text-[13px] font-semibold tracking-[0.28em] text-[#0a0a0a]"
        >
          WORLD MONITOR
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-5 sm:flex"
          aria-label="Sector mode"
        >
          {MODES.map((m) => {
            const active = onHome && mode === m;
            return (
              <Link
                key={m}
                href={`/?mode=${m}`}
                className={`border-b pb-0.5 text-[12px] transition ${
                  active
                    ? "border-[#0a0a0a] font-medium text-[#0a0a0a]"
                    : "border-transparent text-[#6b6560] hover:text-[#0a0a0a]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {m}
              </Link>
            );
          })}
        </nav>

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

      {/* Mobile mode row */}
      <nav
        className="flex items-center gap-4 overflow-x-auto px-5 pb-3 sm:hidden"
        aria-label="Sector mode"
      >
        {MODES.map((m) => {
          const active = onHome && mode === m;
          return (
            <Link
              key={m}
              href={`/?mode=${m}`}
              className={`shrink-0 border-b pb-0.5 text-[12px] transition ${
                active
                  ? "border-[#0a0a0a] font-medium text-[#0a0a0a]"
                  : "border-transparent text-[#6b6560]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {m}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
