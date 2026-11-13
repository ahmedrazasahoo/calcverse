import { describe, expect, it } from "vitest";
import { addSalesTax, applyDiscount, applyStackedDiscounts, discountPercentBetween } from "./discount";

describe("applyDiscount", () => {
  it("takes a quarter off 100", () => {
    const result = applyDiscount(100, 25);
    expect(result?.finalPrice).toBe(75);
    expect(result?.savedAmount).toBe(25);
    expect(result?.effectivePercent).toBe(25);
  });

  it("rounds to cents", () => {
    // 19.99 less 15 percent is 16.9915, rounded to 16.99.
    const result = applyDiscount(19.99, 15);
    expect(result?.finalPrice).toBe(16.99);
    expect(result?.savedAmount).toBe(3.0);
  });

  it("handles the edge percentages", () => {
    expect(applyDiscount(50, 0)?.finalPrice).toBe(50);
    expect(applyDiscount(50, 100)?.finalPrice).toBe(0);
  });

  it("rejects invalid input", () => {
    expect(applyDiscount(-10, 25)).toBeNull();
    expect(applyDiscount(100, 101)).toBeNull();
    expect(applyDiscount(100, -5)).toBeNull();
    expect(applyDiscount(Number.NaN, 25)).toBeNull();
  });
});

describe("applyStackedDiscounts", () => {
  it("applies each discount to the running price", () => {
    // 100 less 20 percent is 80, then less 10 percent is 72.
    const result = applyStackedDiscounts(100, [20, 10]);
    expect(result?.steps).toEqual([
      { percentOff: 20, priceAfter: 80 },
      { percentOff: 10, priceAfter: 72 },
    ]);
    expect(result?.finalPrice).toBe(72);
    expect(result?.savedAmount).toBe(28);
    // Combined effect is 28 percent, not the naive sum of 30.
    expect(result?.effectivePercent).toBeCloseTo(28, 5);
  });

  it("returns the price unchanged for an empty list", () => {
    const result = applyStackedDiscounts(59.99, []);
    expect(result?.finalPrice).toBe(59.99);
    expect(result?.effectivePercent).toBe(0);
  });

  it("rejects a bad discount in the list", () => {
    expect(applyStackedDiscounts(100, [20, 150])).toBeNull();
    expect(applyStackedDiscounts(-1, [20])).toBeNull();
  });
});

describe("discountPercentBetween", () => {
  it("works out the percent off between two prices", () => {
    expect(discountPercentBetween(100, 75)).toBeCloseTo(25, 5);
    expect(discountPercentBetween(80, 80)).toBe(0);
    expect(discountPercentBetween(0, 0)).toBe(0);
  });

  it("rejects a final price above the original", () => {
    expect(discountPercentBetween(100, 120)).toBeNull();
    expect(discountPercentBetween(0, 5)).toBeNull();
  });
});

describe("addSalesTax", () => {
  it("adds tax on top of the discounted price", () => {
    const result = addSalesTax(75, 20);
    expect(result?.taxAmount).toBe(15);
    expect(result?.totalPrice).toBe(90);
  });

  it("rejects invalid input", () => {
    expect(addSalesTax(-5, 20)).toBeNull();
    expect(addSalesTax(75, 101)).toBeNull();
  });
});
