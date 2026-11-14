import { describe, expect, it } from "vitest";
import { calculateVat, VAT_PRESETS } from "./vat";

describe("calculateVat", () => {
  it("adds VAT to a net price: 100 at 20 percent gives vat 20 and gross 120", () => {
    // Formula: vat = net * rate / 100 = 100 * 0.20 = 20; gross = 100 + 20 = 120.
    const result = calculateVat({ amount: 100, ratePercent: 20, mode: "add" });
    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(20);
    expect(result.grossAmount).toBe(120);
    expect(result.ratePercent).toBe(20);
  });

  it("removes VAT from a gross price: 120 at 20 percent gives net 100 and vat 20", () => {
    // Formula: net = gross / (1 + rate / 100) = 120 / 1.20 = 100; vat = 120 - 100 = 20.
    const result = calculateVat({ amount: 120, ratePercent: 20, mode: "remove" });
    expect(result.grossAmount).toBe(120);
    expect(result.netAmount).toBe(100);
    expect(result.vatAmount).toBe(20);
  });

  it("gives zero VAT when the rate is zero in both modes", () => {
    // Formula: vat = amount * 0 = 0, so net and gross stay equal.
    const added = calculateVat({ amount: 250, ratePercent: 0, mode: "add" });
    expect(added.vatAmount).toBe(0);
    expect(added.grossAmount).toBe(250);
    const removed = calculateVat({ amount: 250, ratePercent: 0, mode: "remove" });
    expect(removed.vatAmount).toBe(0);
    expect(removed.netAmount).toBe(250);
  });

  it("round trips add then remove at a different rate", () => {
    // Formula: 499 at 19 percent: vat = 499 * 0.19 = 94.81; gross = 593.81; removing returns 499.
    const added = calculateVat({ amount: 499, ratePercent: 19, mode: "add" });
    expect(added.vatAmount).toBe(94.81);
    expect(added.grossAmount).toBe(593.81);
    const removed = calculateVat({
      amount: added.grossAmount,
      ratePercent: 19,
      mode: "remove",
    });
    expect(removed.netAmount).toBe(499);
  });

  it("exposes typed country presets including the United Kingdom at 20 percent", () => {
    const uk = VAT_PRESETS.find((p) => p.country === "United Kingdom");
    expect(uk?.rate).toBe(20);
    expect(VAT_PRESETS.length).toBeGreaterThanOrEqual(11);
  });

  it("rejects invalid input", () => {
    expect(() => calculateVat({ amount: 0, ratePercent: 20, mode: "add" })).toThrow(RangeError);
    expect(() => calculateVat({ amount: -5, ratePercent: 20, mode: "add" })).toThrow(RangeError);
    expect(() => calculateVat({ amount: 100, ratePercent: -1, mode: "add" })).toThrow(RangeError);
    expect(() => calculateVat({ amount: 100, ratePercent: 101, mode: "add" })).toThrow(RangeError);
  });
});
