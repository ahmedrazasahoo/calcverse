import { describe, expect, it } from "vitest";
import { calculateGst } from "./gst";

describe("calculateGst", () => {
  it("adds 18% GST to a base price and splits it into CGST and SGST", () => {
    const result = calculateGst({ amount: 1000, ratePercent: 18, mode: "add" });
    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(180);
    expect(result.totalAmount).toBe(1180);
    expect(result.cgstAmount).toBe(90);
    expect(result.sgstAmount).toBe(90);
    expect(result.igstAmount).toBe(0);
  });

  it("backs GST out of an inclusive price", () => {
    const result = calculateGst({ amount: 1180, ratePercent: 18, mode: "remove" });
    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(180);
    expect(result.totalAmount).toBe(1180);
  });

  it("charges the full amount as IGST for inter-state supply", () => {
    const result = calculateGst({
      amount: 1000,
      ratePercent: 28,
      mode: "add",
      interstate: true,
    });
    expect(result.igstAmount).toBe(280);
    expect(result.cgstAmount).toBe(0);
    expect(result.sgstAmount).toBe(0);
  });

  it("round trips add then remove at the 5% slab", () => {
    const added = calculateGst({ amount: 499, ratePercent: 5, mode: "add" });
    const removed = calculateGst({
      amount: added.totalAmount,
      ratePercent: 5,
      mode: "remove",
    });
    expect(removed.baseAmount).toBe(499);
  });

  it("rejects a non-standard rate and negative amounts", () => {
    expect(() => calculateGst({ amount: 100, ratePercent: 15, mode: "add" })).toThrow(
      RangeError,
    );
    expect(() => calculateGst({ amount: -1, ratePercent: 18, mode: "add" })).toThrow(
      RangeError,
    );
  });
});
