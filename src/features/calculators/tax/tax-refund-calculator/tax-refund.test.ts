import { describe, expect, it } from "vitest";
import { calculateEitc, calculateTaxRefund, ordinaryTax } from "./tax-refund";

// Hand checks against the 2026 tables (IRS Rev. Proc. 2025-32).
// Single filer, $60,000 wages: standard deduction $16,100, so taxable
// income is $43,900. Bracket tax: 10% of $12,400 = $1,240, plus 12% of
// ($43,900 - $12,400) = $3,780, total $5,020. With $7,000 withheld and
// no credits, the refund is $7,000 - $5,020 = $1,980.

describe("ordinaryTax", () => {
  it("taxes a single filer through the 2026 brackets", () => {
    expect(ordinaryTax(43900, "single")).toBe(5020);
    expect(ordinaryTax(0, "single")).toBe(0);
    expect(ordinaryTax(12400, "single")).toBe(1240);
  });

  it("uses the wider married filing jointly bands", () => {
    // 10% of 24,800 = 2,480, plus 12% of 75,200 = 9,024, total 11,504.
    expect(ordinaryTax(100000, "mfj")).toBe(11504);
  });
});

describe("calculateTaxRefund", () => {
  it("single filer on $60,000 wages with $7,000 withheld gets a $1,980 refund", () => {
    const r = calculateTaxRefund({
      filingStatus: "single",
      wages: 60000,
      otherIncome: 0,
      adjustments: 0,
      federalWithheld: 7000,
      childrenUnder17: 0,
      otherDependents: 0,
      eitcChildren: 0,
    });
    expect(r.agi).toBe(60000);
    expect(r.standardDeduction).toBe(16100);
    expect(r.taxableIncome).toBe(43900);
    expect(r.bracketTax).toBe(5020);
    expect(r.eitc).toBe(0);
    expect(r.taxAfterCredits).toBe(5020);
    expect(r.refund).toBe(1980);
    expect(r.amountOwed).toBe(0);
    expect(r.isRefund).toBe(true);
    expect(r.marginalRatePercent).toBe(12);
    expect(r.effectiveRatePercent).toBe(8.37);
  });

  it("applies the child tax credit against the bracket tax", () => {
    // Single, $50,000 wages, one child under 17. Taxable $33,900, tax
    // $1,240 + 12% of $21,500 = $3,820. CTC $2,200 brings it to $1,620.
    // Withheld $3,000, so the refund is $1,380.
    const r = calculateTaxRefund({
      filingStatus: "single",
      wages: 50000,
      otherIncome: 0,
      adjustments: 0,
      federalWithheld: 3000,
      childrenUnder17: 1,
      otherDependents: 0,
      eitcChildren: 0,
    });
    expect(r.bracketTax).toBe(3820);
    expect(r.childTaxCredit).toBe(2200);
    expect(r.nonrefundableCreditsUsed).toBe(2200);
    expect(r.additionalChildTaxCredit).toBe(0);
    expect(r.taxAfterCredits).toBe(1620);
    expect(r.refund).toBe(1380);
  });

  it("pays the unused child tax credit back as refundable ACTC up to the cap", () => {
    // Single, $20,000 wages, one child. Taxable $3,900, tax $390. The
    // CTC uses $390, leaving $1,810 unused; ACTC is capped at $1,700.
    const r = calculateTaxRefund({
      filingStatus: "single",
      wages: 20000,
      otherIncome: 0,
      adjustments: 0,
      federalWithheld: 0,
      childrenUnder17: 1,
      otherDependents: 0,
      eitcChildren: 0,
    });
    expect(r.bracketTax).toBe(390);
    expect(r.taxAfterCredits).toBe(0);
    expect(r.additionalChildTaxCredit).toBe(1700);
    expect(r.refund).toBe(1700);
  });

  it("shows an amount owed when withholding falls short", () => {
    // Single, $100,000 wages. Taxable $83,900. Tax: $1,240 + $4,560 +
    // 22% of $33,500 = $13,170. Withheld $5,000, so $8,170 is owed.
    const r = calculateTaxRefund({
      filingStatus: "single",
      wages: 100000,
      otherIncome: 0,
      adjustments: 0,
      federalWithheld: 5000,
      childrenUnder17: 0,
      otherDependents: 0,
      eitcChildren: 0,
    });
    expect(r.bracketTax).toBe(13170);
    expect(r.isRefund).toBe(false);
    expect(r.refund).toBe(0);
    expect(r.amountOwed).toBe(8170);
    expect(r.marginalRatePercent).toBe(22);
  });

  it("phases the child tax credit out above $200,000 of AGI for a single filer", () => {
    // AGI $210,000 is $10,000 over, ten $1,000 steps at $50 = $500 off,
    // so the credit falls from $2,200 to $1,700.
    const r = calculateTaxRefund({
      filingStatus: "single",
      wages: 210000,
      otherIncome: 0,
      adjustments: 0,
      federalWithheld: 0,
      childrenUnder17: 1,
      otherDependents: 0,
      eitcChildren: 0,
    });
    expect(r.childTaxCredit).toBe(1700);
  });

  it("subtracts adjustments before working out AGI and tax", () => {
    const r = calculateTaxRefund({
      filingStatus: "hoh",
      wages: 40000,
      otherIncome: 5000,
      adjustments: 5000,
      federalWithheld: 2000,
      childrenUnder17: 0,
      otherDependents: 1,
      eitcChildren: 0,
    });
    expect(r.totalIncome).toBe(45000);
    expect(r.agi).toBe(40000);
    expect(r.standardDeduction).toBe(24150);
    expect(r.otherDependentCredit).toBe(500);
  });

  it("rejects negative amounts and fractional child counts", () => {
    expect(() =>
      calculateTaxRefund({
        filingStatus: "single",
        wages: -1,
        otherIncome: 0,
        adjustments: 0,
        federalWithheld: 0,
        childrenUnder17: 0,
        otherDependents: 0,
        eitcChildren: 0,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateTaxRefund({
        filingStatus: "single",
        wages: 1000,
        otherIncome: 0,
        adjustments: 0,
        federalWithheld: 0,
        childrenUnder17: 1.5,
        otherDependents: 0,
        eitcChildren: 0,
      }),
    ).toThrow(RangeError);
  });
});

describe("calculateEitc", () => {
  it("phases in at 34 percent for one child up to the maximum", () => {
    // 34% of $10,000 earned = $3,400, below the $4,427 maximum, and
    // income is under the $23,890 phase-out threshold.
    expect(calculateEitc(10000, 10000, "single", 1)).toBe(3400);
    // At the $13,020 earned income amount the credit tops out.
    expect(calculateEitc(20000, 20000, "single", 1)).toBe(4427);
  });

  it("phases out at 21.06 percent for two children", () => {
    // Maximum $7,316 minus 21.06% of ($30,000 - $23,890) = $7,316 -
    // $1,286.77 = $6,029.23.
    expect(calculateEitc(30000, 30000, "single", 2)).toBe(6029.23);
  });

  it("uses the higher joint phase-out threshold for MFJ", () => {
    // MFJ threshold is $31,160, so $30,000 of income still gets the max.
    expect(calculateEitc(30000, 30000, "mfj", 2)).toBe(7316);
  });

  it("is zero with no earned income", () => {
    expect(calculateEitc(0, 50000, "single", 2)).toBe(0);
  });
});
