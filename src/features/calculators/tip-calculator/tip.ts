/** Tip and bill splitting logic, pure and framework free. */

export const TIP_PRESETS: readonly number[] = [10, 15, 18, 20, 25];

export const MAX_TIP_PERCENT = 100;

export interface TipInput {
  bill: number;
  tipPercent: number;
  people: number;
}

export interface TipResult {
  tipAmount: number;
  total: number;
  perPerson: number;
  tipPerPerson: number;
}

/** Returns null when any input falls outside its sensible range. */
export function calculateTip(input: TipInput): TipResult | null {
  const { bill, tipPercent, people } = input;
  if (!Number.isFinite(bill) || bill < 0) return null;
  if (!Number.isFinite(tipPercent) || tipPercent < 0 || tipPercent > MAX_TIP_PERCENT) return null;
  if (!Number.isInteger(people) || people < 1) return null;
  const tipAmount = (bill * tipPercent) / 100;
  const total = bill + tipAmount;
  return {
    tipAmount,
    total,
    perPerson: total / people,
    tipPerPerson: tipAmount / people,
  };
}
