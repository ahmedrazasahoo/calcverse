import { describe, expect, it } from "vitest";
import { calculateEmi, LOAN_PRESETS, monthlyRate } from "./emi";

describe("calculateEmi", () => {
  it("matches the textbook EMI for 100,000 at 12% over 12 months", () => {
    const result = calculateEmi({
      principal: 100_000,
      annualRatePercent: 12,
      tenureMonths: 12,
    });
    expect(result.emi).toBeCloseTo(8884.88, 2);
    expect(result.totalInterest).toBeCloseTo(6618.55, 1);
    expect(result.totalPayment).toBeCloseTo(106618.55, 1);
    expect(result.schedule).toHaveLength(12);
    expect(result.schedule[11].balance).toBe(0);
  });

  it("splits the first payment into interest and principal correctly", () => {
    const result = calculateEmi({
      principal: 100_000,
      annualRatePercent: 12,
      tenureMonths: 12,
    });
    // First month interest is a full month on the whole balance: 1% of 100,000.
    expect(result.schedule[0].interestPaid).toBe(1000);
    expect(result.schedule[0].principalPaid).toBeCloseTo(7884.88, 2);
  });

  it("handles a zero interest rate as a straight split", () => {
    const result = calculateEmi({
      principal: 12_000,
      annualRatePercent: 0,
      tenureMonths: 12,
    });
    expect(result.emi).toBe(1000);
    expect(result.totalInterest).toBe(0);
    expect(result.schedule[11].balance).toBe(0);
  });

  it("handles a single month tenure", () => {
    const result = calculateEmi({
      principal: 10_000,
      annualRatePercent: 12,
      tenureMonths: 1,
    });
    expect(result.schedule).toHaveLength(1);
    expect(result.schedule[0].balance).toBe(0);
    expect(result.totalInterest).toBe(100);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateEmi({ principal: 0, annualRatePercent: 10, tenureMonths: 12 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateEmi({ principal: 1000, annualRatePercent: -1, tenureMonths: 12 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateEmi({ principal: 1000, annualRatePercent: 10, tenureMonths: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateEmi({ principal: 1000, annualRatePercent: 10, tenureMonths: 2.5 }),
    ).toThrow(RangeError);
  });
});

describe("monthlyRate", () => {
  it("converts an annual percent to a monthly fraction", () => {
    expect(monthlyRate(12)).toBeCloseTo(0.01, 10);
    expect(monthlyRate(0)).toBe(0);
  });
});

describe("LOAN_PRESETS", () => {
  it("covers home, car and personal loans with sane defaults", () => {
    expect(LOAN_PRESETS.home.typicalRatePercent).toBeLessThan(
      LOAN_PRESETS.personal.typicalRatePercent,
    );
    expect(LOAN_PRESETS.home.typicalTenureMonths).toBeGreaterThan(
      LOAN_PRESETS.car.typicalTenureMonths,
    );
  });
});
