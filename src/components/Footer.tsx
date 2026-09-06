export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Public dashboard · not investment advice
          </p>
          <p className="max-w-xl text-[13px] text-slate-500">
            Three key figures use live or curated public feeds; all others are
            marked <span className="text-slate-400">example</span>.
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
