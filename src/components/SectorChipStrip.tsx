import Link from "next/link";
import type { Sector } from "@/data/types";

export function SectorChipStrip({
  sectors,
  activeSlug,
}: {
  sectors: Sector[];
  activeSlug?: string;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#07090c] to-transparent sm:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#07090c] to-transparent sm:hidden" />
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin">
        {sectors.map((s) => {
          const active = activeSlug === s.slug;
          return (
            <Link
              key={s.slug}
              href={`/sector/${s.slug}`}
              className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition ${
                active
                  ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                  : "border-zinc-700/80 bg-zinc-900/60 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
              style={
                active
                  ? undefined
                  : { boxShadow: `inset 0 0 0 1px ${s.accent}18` }
              }
            >
              <span
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: s.accent }}
              />
              {s.shortName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
