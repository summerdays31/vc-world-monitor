import Link from "next/link";
import { ExampleBadge } from "./ExampleBadge";

const links = [
  { href: "/", label: "Monitor" },
  { href: "/emerging", label: "Emerging" },
  { href: "/brief", label: "Brief" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#07090c]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs font-bold text-emerald-300">
            WM
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white">
              VC World Monitor
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Sector pulse · value accrual
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 font-mono text-xs uppercase tracking-wide text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100"
            >
              {l.label}
            </Link>
          ))}
          <ExampleBadge className="ml-1 hidden sm:inline-flex" />
        </nav>
      </div>
    </header>
  );
}
