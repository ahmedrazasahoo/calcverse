import { describe, expect, it } from "vitest";
import { calculateZakat, NISAB_SILVER_GRAMS } from "./zakat";

describe("calculateZakat", () => {
  it("charges 2.5 percent on cash wealth above the silver nisab", () => {
    const result = calculateZakat({ cash: 1_000_000, silverPricePerGram: 250 });
    // Silver nisab at 250 per gram: 612.36 * 250 = 153,090.
    expect(result.nisabValue).toBeCloseTo(NISAB_SILVER_GRAMS * 250, 2);
    expect(result.zakatDue).toBe(true);
    expect(result.zakatAmount).toBe(25_000);
  });

  it("charges nothing when wealth sits below the nisab", () => {
    const result = calculateZakat({ cash: 100_000, silverPricePerGram: 250 });
    expect(result.zakatDue).toBe(false);
    expect(result.zakatAmount).toBe(0);
  });

  it("values gold by weight and deducts liabilities", () => {
    const result = calculateZakat({
      goldGrams: 100,
      goldPricePerGram: 20_000,
      cash: 500_000,
      liabilitiesDue: 300_000,
      silverPricePerGram: 250,
    });
    expect(result.goldValue).toBe(2_000_000);
    expect(result.netZakatableWealth).toBe(2_200_000);
    expect(result.zakatAmount).toBe(55_000);
  });

  it("uses the gold nisab when that basis is chosen", () => {
    const result = calculateZakat({
      cash: 1_000_000,
      goldPricePerGram: 20_000,
      silverPricePerGram: 250,
      nisabBasis: "gold",
    });
    // Gold nisab: 87.48 * 20,000 = 1,749,600, above the cash held.
    expect(result.nisabValue).toBeCloseTo(1_749_600, 2);
    expect(result.zakatDue).toBe(false);
  });

  it("rejects missing metal prices and negative values", () => {
    expect(() => calculateZakat({ goldGrams: 50 })).toThrow(RangeError);
    expect(() => calculateZakat({ cash: -5, silverPricePerGram: 250 })).toThrow(
      RangeError,
    );
    expect(() => calculateZakat({ cash: 1000 })).toThrow(RangeError);
  });
});
