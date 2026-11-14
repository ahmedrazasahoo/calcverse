import { describe, expect, it } from "vitest";
import { calculatePpf } from "./ppf";

describe("calculatePpf", () => {
  it("returns exactly the deposits at a zero rate", () => {
    const result = calculatePpf({ yearlyDeposit: 100000, annualRatePercent: 0, years: 15 });
    expect(result.totalDeposited).toBe(1500000);
    expect(result.totalInterest).toBe(0);
    expect(result.maturityValue).toBe(1500000);
  });

  it("credits a full first year of interest when the deposit is made at the start of the year", () => {
    // First year: interest = (0 + 150000) * 7.1 / 100 = 10650.
    // Checked on the first yearly row of a standard 15 year account,
    // because the account itself runs for at least 5 years in this logic.
    const result = calculatePpf({ yearlyDeposit: 150000, annualRatePercent: 7.1, years: 15 });
    expect(result.yearlyBreakdown[0].opening).toBe(0);
    expect(result.yearlyBreakdown[0].deposit).toBe(150000);
    expect(result.yearlyBreakdown[0].interest).toBe(10650);
    expect(result.yearlyBreakdown[0].closing).toBe(160650);
  });

  it("keeps the 15 year totals internally consistent", () => {
    const result = calculatePpf({ yearlyDeposit: 150000, annualRatePercent: 7.1, years: 15 });
    expect(result.yearlyBreakdown).toHaveLength(15);
    expect(result.totalDeposited).toBe(150000 * 15);
    expect(result.maturityValue).toBeCloseTo(result.totalDeposited + result.totalInterest, 2);
    const lastRow = result.yearlyBreakdown[result.yearlyBreakdown.length - 1];
    expect(lastRow.closing).toBe(result.maturityValue);
    const summedInterest = result.yearlyBreakdown.reduce((sum, row) => sum + row.interest, 0);
    expect(result.totalInterest).toBeCloseTo(summedInterest, 2);
    expect(result.maturityValue).toBeGreaterThan(result.totalDeposited);
  });

  it("grows more at a positive rate than at a zero rate over the same period", () => {
    const withRate = calculatePpf({ yearlyDeposit: 50000, annualRatePercent: 7.1, years: 15 });
    const zeroRate = calculatePpf({ yearlyDeposit: 50000, annualRatePercent: 0, years: 15 });
    expect(withRate.maturityValue).toBeGreaterThan(zeroRate.maturityValue);
  });

  it("rejects invalid input", () => {
    expect(() => calculatePpf({ yearlyDeposit: 0, annualRatePercent: 7.1, years: 15 })).toThrow(
      RangeError,
    );
    expect(
      () => calculatePpf({ yearlyDeposit: 150001, annualRatePercent: 7.1, years: 15 }),
    ).toThrow(RangeError);
    expect(() => calculatePpf({ yearlyDeposit: 100000, annualRatePercent: 7.1, years: 4 })).toThrow(
      RangeError,
    );
    expect(() => calculatePpf({ yearlyDeposit: 100000, annualRatePercent: 7.1, years: 51 })).toThrow(
      RangeError,
    );
    expect(
      () => calculatePpf({ yearlyDeposit: 100000, annualRatePercent: -1, years: 15 }),
    ).toThrow(RangeError);
  });
});
