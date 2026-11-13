/**
 * Discount logic, pure and framework free.
 *
 * A single discount takes a percentage off a price. Stacked discounts
 * (for example "20 percent off, plus an extra 10 percent today") are
 * applied one after another to the running price, which is why two
 * stacked discounts never add up to their simple sum: 20 percent then
 * 10 percent off is 28 percent off in total, not 30. Money values are
 * rounded to cents on the way out.
 */

export const PERCENT_MIN = 0;
export const PERCENT_MAX = 100;

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function validPrice(price: number): boolean {
  return Number.isFinite(price) && price >= 0;
}

function validPercent(percent: number): boolean {
  return Number.isFinite(percent) && percent >= PERCENT_MIN && percent <= PERCENT_MAX;
}

export interface DiscountResult {
  originalPrice: number;
  finalPrice: number;
  savedAmount: number;
  /** Total percentage taken off, for stacked runs this is the combined figure. */
  effectivePercent: number;
}

/** One percentage discount on a price, or null for invalid input. */
export function applyDiscount(price: number, percentOff: number): DiscountResult | null {
  if (!validPrice(price) || !validPercent(percentOff)) return null;
  const finalPrice = roundMoney(price * (1 - percentOff / 100));
  return {
    originalPrice: price,
    finalPrice,
    savedAmount: roundMoney(price - finalPrice),
    effectivePercent: percentOff,
  };
}

export interface StackedDiscountResult extends DiscountResult {
  /** Price after each discount in turn, in the order given. */
  steps: { percentOff: number; priceAfter: number }[];
}

/**
 * Several discounts applied one after another to the running price.
 * An empty list returns the price unchanged.
 */
export function applyStackedDiscounts(price: number, percentsOff: readonly number[]): StackedDiscountResult | null {
  if (!validPrice(price)) return null;
  let running = price;
  const steps: { percentOff: number; priceAfter: number }[] = [];
  for (const percentOff of percentsOff) {
    if (!validPercent(percentOff)) return null;
    running = roundMoney(running * (1 - percentOff / 100));
    steps.push({ percentOff, priceAfter: running });
  }
  const effectivePercent = price === 0 ? 0 : ((price - running) / price) * 100;
  return {
    originalPrice: price,
    finalPrice: running,
    savedAmount: roundMoney(price - running),
    effectivePercent,
    steps,
  };
}

/**
 * The percentage discount that turns an original price into a final
 * price, for checking whether a sale label is honest.
 */
export function discountPercentBetween(originalPrice: number, finalPrice: number): number | null {
  if (!validPrice(originalPrice) || !validPrice(finalPrice)) return null;
  if (originalPrice === 0) return finalPrice === 0 ? 0 : null;
  if (finalPrice > originalPrice) return null;
  return ((originalPrice - finalPrice) / originalPrice) * 100;
}

export interface TaxResult {
  priceBeforeTax: number;
  taxAmount: number;
  totalPrice: number;
}

/** Adds a sales tax or VAT percentage to a price, or null for invalid input. */
export function addSalesTax(price: number, taxPercent: number): TaxResult | null {
  if (!validPrice(price) || !validPercent(taxPercent)) return null;
  const taxAmount = roundMoney((price * taxPercent) / 100);
  return {
    priceBeforeTax: price,
    taxAmount,
    totalPrice: roundMoney(price + taxAmount),
  };
}
