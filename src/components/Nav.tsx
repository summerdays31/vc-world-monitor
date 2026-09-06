"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Site chrome for non-home routes. Home owns its own masthead
 * (wordmark + as-of + mode) tight to the ledger.
 */
export function Nav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="border-b border-slate-200/60">
      <div className="mx-auto flex max-w-[680px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link
          href="/?mode=All"
          className="text-[13px] font-medium tracking-tight text-slate-600 hover:text-slate-900"
        >
          World Monitor
        </Link>
        <Link
          href="/brief"
          className="text-[11px] text-slate-500 hover:text-slate-800"
        >
          Brief
        </Link>
      </div>
    </header>
  );
}
