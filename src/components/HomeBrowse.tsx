import type { LiveMetricPayload } from "@/data/curated/fallbacks";
import { InstrumentBand } from "./InstrumentBand";

export type ModeFilter = "Mature" | "Emerging" | "All";

/**
 * Homepage = three instrument signals only.
 * No ledger, no duplicate metrics, no methodology essay, no vacant canvas.
 */
export function HomeBrowse({
  asOf,
  instruments,
}: {
  mature?: unknown;
  emerging?: unknown;
  mode?: ModeFilter;
  asOf?: string;
  instruments: {
    gpu: LiveMetricPayload;
    interconnect: LiveMetricPayload;
    vc: LiveMetricPayload;
  };
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <InstrumentBand
        gpu={instruments.gpu}
        interconnect={instruments.interconnect}
        vc={instruments.vc}
      />

      <footer className="mt-5 border-t border-[#e5e2db] pt-3">
        <p className="text-[11px] text-[#8a847a]">
          Refreshes daily
          {asOf ? ` · as of ${asOf}` : ""}
        </p>
      </footer>
    </div>
  );
}
