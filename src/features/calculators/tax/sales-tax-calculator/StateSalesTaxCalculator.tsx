"use client";

import { ResultCard } from "@/components/ui";
import SalesTaxCalculator, { rateLabel } from "./SalesTaxCalculator";
import type { StateSalesTax } from "./states";

/**
 * The calculator block for one state's own page: the state's two headline
 * rates first, then the shared calculator pre-set to that state.
 */
export default function StateSalesTaxCalculator({ state }: { state: StateSalesTax }) {
  const localAddOn = state.avgCombined - state.baseRate;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard
          label={`${state.name} statewide rate`}
          value={`${rateLabel(state.baseRate)}%`}
          sub={
            state.baseRate === 0
              ? `${state.name} charges no statewide sales tax`
              : `The state level rate set by ${state.name} law, before any local taxes`
          }
        />
        <ResultCard
          label="Average combined rate"
          value={`${rateLabel(state.avgCombined)}%`}
          sub={
            state.baseRate === 0 && state.avgCombined === 0
              ? "No state or average local sales tax to add"
              : localAddOn > 0.005
                ? `State plus local taxes averaged across ${state.name}. Local taxes add about ${rateLabel(localAddOn)} points on average. This is an approximate average, not the rate at any one address`
                : `About the same as the state rate, because ${state.name} local governments add little or no sales tax on average. This is an approximate average`
          }
          primary
        />
      </div>
      <div className="mt-9">
        <SalesTaxCalculator initialStateSlug={state.slug} showIndex={false} />
      </div>
    </div>
  );
}
