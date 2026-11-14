/** Pure sales tax maths: add tax to a net price, or strip it back out of a gross total. */

export interface SalesTaxBreakdown {
  /** Price before tax. */
  net: number;
  /** Tax amount. */
  tax: number;
  /** Price including tax. */
  gross: number;
}

/**
 * Add sales tax to a pre-tax price.
 * tax = net * ratePct / 100, gross = net + tax.
 */
export function addTax(net: number, ratePct: number): SalesTaxBreakdown {
  const tax = (net * ratePct) / 100;
  return { net, tax, gross: net + tax };
}

/**
 * Find the pre-tax price inside a tax inclusive total.
 * The tax was charged on the net price, not on the total, so the correct
 * reversal is division: net = gross / (1 + ratePct / 100).
 */
export function removeTax(gross: number, ratePct: number): SalesTaxBreakdown {
  const net = gross / (1 + ratePct / 100);
  return { net, tax: gross - net, gross };
}
