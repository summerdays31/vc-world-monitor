"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const modes = [
  { href: "/?mode=Mature", mode: "Mature", label: "Mature" },
  { href: "/?mode=Emerging", mode: "Emerging", label: "Emerging" },
  { href: "/?mode=All", mode: "All", label: "All" },
] as const;

function ModeLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = searchParams.get("mode");
  const activeMode =
    pathname === "/" && (raw === "Mature" || raw === "Emerging" || raw === "All")
      ? raw
      : pathname === "/"
        ? "All"
        : null;

  return (
    <nav className="flex items-center gap-0.5" aria-label="Sector mode filter">
      {modes.map((m) => {
        const active = activeMode === m.mode;
        return (
          <Link
            key={m.mode}
            href={m.href}
            className={`px-2 py-0.5 text-[12px] transition ${
              active
                ? "font-medium text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {m.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Minimal chrome — wordmark left, Mature | Emerging | All right. */
export function Nav() {
  return (
    <header className="border-b border-slate-200/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/?mode=All"
          className="text-[14px] font-semibold tracking-tight text-slate-900"
        >
          World Monitor
        </Link>
        <Suspense
          fallback={
            <nav className="flex items-center gap-0.5 text-[12px] text-slate-400">
              <span className="px-2 py-0.5">Mature</span>
              <span className="px-2 py-0.5">Emerging</span>
              <span className="px-2 py-0.5 font-medium text-slate-900">All</span>
            </nav>
          }
        >
          <ModeLinks />
        </Suspense>
      </div>
    </header>
  );
}
