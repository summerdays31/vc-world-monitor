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
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin">
        {sectors.map((s) => {
          const active = activeSlug === s.slug;
          return (
            <Link
              key={s.slug}
              href={`/sector/${s.slug}`}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition ${
                active
                  ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
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
