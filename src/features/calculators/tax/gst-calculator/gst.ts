/**
 * GST (Goods and Services Tax) calculator logic for India.
 *
 * Supports both directions: adding GST to a base price, and removing GST
 * from a GST-inclusive price. For sales within one state the tax splits
 * evenly into CGST and SGST; for sales across state lines the full amount
 * is charged as IGST.
 *
 * Rates are the standard GST Council slabs: 0, 5, 12, 18 and 28 percent.
 */

export const GST_RATES_PERCENT = [0, 5, 12, 18, 28] as const;
export type GstRatePercent = (typeof GST_RATES_PERCENT)[number];

export type GstMode = "add" | "remove";

export interface GstInput {
  /** The amount entered by the user, interpreted according to mode. */
  amount: number;
  /** GST slab in percent. Must be one of GST_RATES_PERCENT. */
  ratePercent: number;
  /**
   * "add": amount is the base price, GST is added on top.
   * "remove": amount already includes GST, the base price is backed out.
   */
  mode: GstMode;
  /** True for inter-state supply, where IGST applies instead of CGST + SGST. */
  interstate?: boolean;
}

export interface GstResult {
  /** Price before GST. */
  baseAmount: number;
  /** Total GST charged. */
  gstAmount: number;
  /** Final price including GST. */
  totalAmount: number;
  /** Central GST share. Zero for inter-state supply. */
  cgstAmount: number;
  /** State GST share. Zero for inter-state supply. */
  sgstAmount: number;
  /** Integrated GST. Zero for intra-state supply. */
  igstAmount: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateGst(input: GstInput): GstResult {
  if (!Number.isFinite(input.amount) || input.amount < 0) {
    throw new RangeError("Amount must be zero or greater.");
  }
  if (!(GST_RATES_PERCENT as readonly number[]).includes(input.ratePercent)) {
    throw new RangeError(
      `GST rate must be one of ${GST_RATES_PERCENT.join(", ")} percent.`,
    );
  }

  const rate = input.ratePercent / 100;
  let baseAmount: number;
  let gstAmount: number;
  let totalAmount: number;

  if (input.mode === "add") {
    baseAmount = round2(input.amount);
    gstAmount = round2(baseAmount * rate);
    totalAmount = round2(baseAmount + gstAmount);
  } else {
    totalAmount = round2(input.amount);
    baseAmount = round2(totalAmount / (1 + rate));
    gstAmount = round2(totalAmount - baseAmount);
  }

  const interstate = input.interstate ?? false;
  return {
    baseAmount,
    gstAmount,
    totalAmount,
    cgstAmount: interstate ? 0 : round2(gstAmount / 2),
    sgstAmount: interstate ? 0 : round2(gstAmount / 2),
    igstAmount: interstate ? gstAmount : 0,
  };
}
