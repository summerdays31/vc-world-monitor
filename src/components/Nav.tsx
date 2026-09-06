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
    <nav
      className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5"
      aria-label="Sector mode filter"
    >
      {modes.map((m) => {
        const active = activeMode === m.mode;
        return (
          <Link
            key={m.mode}
            href={m.href}
            className={`rounded-full px-2.5 py-1 text-[11px] transition ${
              active
                ? "bg-slate-900 font-medium text-white"
                : "text-slate-500 hover:text-slate-800"
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

/** Minimal chrome — quiet wordmark left, segmented mode control right. */
export function Nav() {
  return (
    <header className="border-b border-slate-200/60">
      <div className="mx-auto flex max-w-[760px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link
          href="/?mode=All"
          className="text-[13px] font-medium tracking-tight text-slate-600 hover:text-slate-900"
        >
          World Monitor
        </Link>
        <Suspense
          fallback={
            <nav
              className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5"
              aria-hidden
            >
              <span className="rounded-full px-2.5 py-1 text-[11px] text-slate-500">
                Mature
              </span>
              <span className="rounded-full px-2.5 py-1 text-[11px] text-slate-500">
                Emerging
              </span>
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white">
                All
              </span>
            </nav>
          }
        >
          <ModeLinks />
        </Suspense>
      </div>
    </header>
  );
}
