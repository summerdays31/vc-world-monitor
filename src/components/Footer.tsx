export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-[11px] text-slate-400">
          Public dashboard · not investment advice · placeholders off by default
        </p>
        <p className="text-[11px] text-slate-400">
          Three wired figures (GPU / interconnect / VC); rest are example seed
        </p>
      </div>
    </footer>
  );
}
