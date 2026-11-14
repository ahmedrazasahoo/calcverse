import { describe, expect, it } from "vitest";
import { calculateNoTaxOnTips } from "./noTaxOnTips";

describe("calculateNoTaxOnTips", () => {
  it("deducts tips in full when under the cap and threshold", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "single", magi: 60000, annualTips: 12000, marginalRatePercent: 12 });
    expect(r.eligible).toBe(true);
    expect(r.finalDeduction).toBe(12000);
    expect(r.estimatedTaxSaved).toBe(1440);
  });

  it("caps tips at 25000 for a single filer", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "single", magi: 80000, annualTips: 40000, marginalRatePercent: 22 });
    expect(r.cappedAmount).toBe(25000);
    expect(r.finalDeduction).toBe(25000);
  });

  it("uses the same flat 25000 cap for joint filers, not double", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "marriedFilingJointly", magi: 120000, annualTips: 60000, marginalRatePercent: 22 });
    expect(r.cap).toBe(25000);
    expect(r.finalDeduction).toBe(25000);
  });

  it("reduces the deduction by 2500 at MAGI 175000 single", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "single", magi: 175000, annualTips: 25000, marginalRatePercent: 24 });
    expect(r.phaseOutReduction).toBe(2500);
    expect(r.finalDeduction).toBe(22500);
  });

  it("reaches zero at MAGI 400000 single and 550000 joint", () => {
    const single = calculateNoTaxOnTips({ filingStatus: "single", magi: 400000, annualTips: 25000, marginalRatePercent: 32 });
    expect(single.finalDeduction).toBe(0);
    expect(single.isFullyPhasedOut).toBe(true);
    const joint = calculateNoTaxOnTips({ filingStatus: "marriedFilingJointly", magi: 550000, annualTips: 25000, marginalRatePercent: 32 });
    expect(joint.finalDeduction).toBe(0);
  });

  it("returns an ineligible result for married filing separately", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "marriedFilingSeparately", magi: 60000, annualTips: 15000, marginalRatePercent: 22 });
    expect(r.eligible).toBe(false);
    expect(r.finalDeduction).toBe(0);
    expect(r.estimatedTaxSaved).toBe(0);
    expect(r.ineligibleReason).toContain("not eligible");
  });

  it("caps a self employed filer at net income from the tipped work", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "single", magi: 50000, annualTips: 20000, marginalRatePercent: 12, selfEmployed: true, netIncome: 12000 });
    expect(r.cappedAmount).toBe(12000);
    expect(r.finalDeduction).toBe(12000);
  });

  it("uses the 150000 threshold for head of household", () => {
    const r = calculateNoTaxOnTips({ filingStatus: "headOfHousehold", magi: 175000, annualTips: 10000, marginalRatePercent: 22 });
    expect(r.phaseOutReduction).toBe(2500);
    expect(r.finalDeduction).toBe(7500);
  });
});
