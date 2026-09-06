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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#f8fafc] to-transparent sm:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#f8fafc] to-transparent sm:hidden" />
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-thin">
        {sectors.map((s) => {
          const active = activeSlug === s.slug;
          return (
            <Link
              key={s.slug}
              href={`/sector/${s.slug}`}
              className={`shrink-0 rounded-md px-2.5 py-1 text-[12px] font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200/80 hover:text-slate-900"
              }`}
            >
              {s.shortName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
