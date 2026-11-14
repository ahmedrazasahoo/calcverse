import { describe, expect, it } from "vitest";
import { calculateNoTaxOnOvertime, qualifiedPremiumFromHours } from "./noTaxOnOvertime";

describe("qualifiedPremiumFromHours", () => {
  it("counts only the premium half of time and a half", () => {
    expect(qualifiedPremiumFromHours({ hourlyRate: 30, overtimeHoursPerWeek: 10, weeksPerYear: 50 })).toBe(7500);
    expect(qualifiedPremiumFromHours({ hourlyRate: 20, overtimeHoursPerWeek: 5, weeksPerYear: 52 })).toBe(2600);
  });
});

describe("calculateNoTaxOnOvertime", () => {
  it("deducts the full premium when it is under the cap and under the threshold", () => {
    const r = calculateNoTaxOnOvertime({ filingStatus: "single", magi: 80000, qualifiedPremium: 7500, marginalRatePercent: 22 });
    expect(r.cappedAmount).toBe(7500);
    expect(r.phaseOutReduction).toBe(0);
    expect(r.finalDeduction).toBe(7500);
    expect(r.estimatedTaxSaved).toBe(1650);
  });

  it("caps a single filer at 12500", () => {
    const r = calculateNoTaxOnOvertime({ filingStatus: "single", magi: 90000, qualifiedPremium: 20000, marginalRatePercent: 22 });
    expect(r.cap).toBe(12500);
    expect(r.cappedAmount).toBe(12500);
    expect(r.finalDeduction).toBe(12500);
  });

  it("caps a joint return at 25000", () => {
    const r = calculateNoTaxOnOvertime({ filingStatus: "marriedFilingJointly", magi: 120000, qualifiedPremium: 40000, marginalRatePercent: 22 });
    expect(r.cap).toBe(25000);
    expect(r.finalDeduction).toBe(25000);
  });

  it("reduces the deduction by 2500 at MAGI 175000 single", () => {
    const r = calculateNoTaxOnOvertime({ filingStatus: "single", magi: 175000, qualifiedPremium: 12500, marginalRatePercent: 24 });
    expect(r.phaseOutReduction).toBe(2500);
    expect(r.finalDeduction).toBe(10000);
    expect(r.estimatedTaxSaved).toBe(2400);
  });

  it("rounds a fraction of 1000 of excess MAGI up to a full 100 reduction step", () => {
    const r = calculateNoTaxOnOvertime({ filingStatus: "single", magi: 150500, qualifiedPremium: 5000, marginalRatePercent: 22 });
    expect(r.phaseOutReduction).toBe(100);
    expect(r.finalDeduction).toBe(4900);
  });

  it("reaches zero at MAGI 275000 single and 550000 joint", () => {
    const single = calculateNoTaxOnOvertime({ filingStatus: "single", magi: 275000, qualifiedPremium: 12500, marginalRatePercent: 32 });
    expect(single.finalDeduction).toBe(0);
    expect(single.isFullyPhasedOut).toBe(true);
    const joint = calculateNoTaxOnOvertime({ filingStatus: "marriedFilingJointly", magi: 550000, qualifiedPremium: 25000, marginalRatePercent: 32 });
    expect(joint.finalDeduction).toBe(0);
  });
});
