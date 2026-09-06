import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/emerging", label: "Emerging" },
  { href: "/brief", label: "Brief" },
];

/** Near-invisible chrome — content owns the page. */
export function Nav() {
  return (
    <header className="border-b border-slate-200/50 bg-[#f8fafc]/90 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-[12px] font-medium tracking-tight text-slate-400 transition hover:text-slate-700"
        >
          VC World Monitor
        </Link>
        <nav className="flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded px-2 py-1 text-[12px] text-slate-400 transition hover:text-slate-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
