import { describe, expect, it } from "vitest";
import { calculateTip } from "./tip";

describe("calculateTip", () => {
  it("calculates a simple single person tip", () => {
    const result = calculateTip({ bill: 100, tipPercent: 20, people: 1 });
    expect(result).not.toBeNull();
    expect(result!.tipAmount).toBeCloseTo(20, 5);
    expect(result!.total).toBeCloseTo(120, 5);
    expect(result!.perPerson).toBeCloseTo(120, 5);
  });

  it("splits the total including the tip", () => {
    const result = calculateTip({ bill: 60, tipPercent: 18, people: 2 });
    expect(result!.tipAmount).toBeCloseTo(10.8, 5);
    expect(result!.total).toBeCloseTo(70.8, 5);
    expect(result!.perPerson).toBeCloseTo(35.4, 5);
    expect(result!.tipPerPerson).toBeCloseTo(5.4, 5);
  });

  it("handles a zero tip and a zero bill", () => {
    expect(calculateTip({ bill: 50, tipPercent: 0, people: 4 })!.perPerson).toBeCloseTo(12.5, 5);
    expect(calculateTip({ bill: 0, tipPercent: 15, people: 2 })!.total).toBe(0);
  });

  it("rejects invalid input", () => {
    expect(calculateTip({ bill: -10, tipPercent: 15, people: 2 })).toBeNull();
    expect(calculateTip({ bill: 50, tipPercent: 150, people: 2 })).toBeNull();
    expect(calculateTip({ bill: 50, tipPercent: 15, people: 0 })).toBeNull();
    expect(calculateTip({ bill: 50, tipPercent: 15, people: 2.5 })).toBeNull();
    expect(calculateTip({ bill: Number.NaN, tipPercent: 15, people: 2 })).toBeNull();
  });
});
