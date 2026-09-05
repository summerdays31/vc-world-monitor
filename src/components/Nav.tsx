import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/emerging", label: "Emerging" },
  { href: "/brief", label: "Brief" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-[11px] font-bold tracking-tight text-white">
            WM
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-blue-700">
            VC World Monitor
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
