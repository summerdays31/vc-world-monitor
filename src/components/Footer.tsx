import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Public dashboard · not investment advice
          </p>
          <p className="max-w-xl text-[13px] text-slate-500">
            Typed metrics schema. Three key figures use{" "}
            <ProvenanceBadge
              value={{
                isExample: false,
                provenance: "live",
                asOf: "",
                sourceLabel: "public feeds",
              }}
            />{" "}
            / curated reports; all others ship as <ExampleBadge />.
          </p>
        </div>
        <p className="text-[12px] text-slate-400">
          Industrial policy is a cross-cut on sector detail (US / China / EU), not
          a sector tile.
        </p>
      </div>
    </footer>
  );
}
