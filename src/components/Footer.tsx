import { ExampleBadge, ProvenanceBadge } from "./ProvenanceBadge";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-[#05070a]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Public dashboard · not investment advice
          </p>
          <p className="max-w-xl text-sm text-zinc-400">
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
        <p className="font-mono text-[11px] text-zinc-600">
          Industrial policy is a cross-cut on cards (US / China / EU), not a sector tile.
        </p>
      </div>
    </footer>
  );
}
