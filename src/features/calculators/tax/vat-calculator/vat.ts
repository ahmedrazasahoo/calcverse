/**
 * VAT (Value Added Tax) calculator logic.
 *
 * Works in both directions: adding VAT to a net price, and removing VAT
 * from a gross price that already includes the tax. Unlike GST in India,
 * VAT rates differ by country, so any rate from 0 to 100 percent is
 * accepted and country presets are offered in the component.
 */

export type VatMode = "add" | "remove";

export interface VatPreset {
  country: string;
  rate: number;
}

export const VAT_PRESETS: VatPreset[] = [
  { country: "United Kingdom", rate: 20 },
  { country: "United Arab Emirates", rate: 5 },
  { country: "Saudi Arabia", rate: 15 },
  { country: "South Africa", rate: 15 },
  { country: "Ireland", rate: 23 },
  { country: "Germany", rate: 19 },
  { country: "France", rate: 20 },
  { country: "Spain", rate: 21 },
  { country: "Italy", rate: 22 },
  { country: "Netherlands", rate: 21 },
  { country: "Pakistan (GST)", rate: 18 },
];

export interface VatInput {
  /** The amount entered by the user, interpreted according to mode. */
  amount: number;
  /** VAT rate in percent, from 0 to 100. */
  ratePercent: number;
  /**
   * "add": amount is the net price, VAT is added on top.
   * "remove": amount already includes VAT, the net price is backed out.
   */
  mode: VatMode;
}

export interface VatResult {
  /** Price before VAT. */
  netAmount: number;
  /** Total VAT charged. */
  vatAmount: number;
  /** Final price including VAT. */
  grossAmount: number;
  /** VAT rate in percent used for the calculation. */
  ratePercent: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateVat(input: VatInput): VatResult {
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    throw new RangeError("Amount must be greater than zero.");
  }
  if (
    !Number.isFinite(input.ratePercent) ||
    input.ratePercent < 0 ||
    input.ratePercent > 100
  ) {
    throw new RangeError("VAT rate must be between 0 and 100 percent.");
  }
  if (input.mode !== "add" && input.mode !== "remove") {
    throw new RangeError("Mode must be add or remove.");
  }

  const rate = input.ratePercent / 100;
  let netAmount: number;
  let vatAmount: number;
  let grossAmount: number;

  if (input.mode === "add") {
    netAmount = round2(input.amount);
    vatAmount = round2(netAmount * rate);
    grossAmount = round2(netAmount + vatAmount);
  } else {
    grossAmount = round2(input.amount);
    netAmount = round2(grossAmount / (1 + rate));
    vatAmount = round2(grossAmount - netAmount);
  }

  return {
    netAmount,
    vatAmount,
    grossAmount,
    ratePercent: input.ratePercent,
  };
}
