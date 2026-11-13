import { describe, expect, it } from "vitest";
import { calculateMortgage } from "./mortgage";

describe("calculateMortgage", () => {
  it("matches the known payment for a 320,000 loan at 6.5% over 30 years", () => {
    const result = calculateMortgage({
      homePrice: 400_000,
      downPayment: 80_000,
      annualRatePercent: 6.5,
      termYears: 30,
    });
    expect(result.loanAmount).toBe(320_000);
    expect(result.downPaymentPercent).toBe(20);
    // Standard reference figure for this loan is $2,022.62 a month.
    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(2022.62, 2);
    expect(result.schedule).toHaveLength(360);
    expect(result.schedule[359].balance).toBe(0);
    // Exactly 20 percent down means no PMI.
    expect(result.monthlyPmi).toBe(0);
    expect(result.pmiMonths).toBe(0);
  });

  it("adds tax, insurance and HOA into the monthly total", () => {
    const result = calculateMortgage({
      homePrice: 400_000,
      downPayment: 80_000,
      annualRatePercent: 6.5,
      termYears: 30,
      annualPropertyTax: 6_000,
      annualHomeInsurance: 1_800,
      monthlyHoa: 150,
    });
    expect(result.monthlyPropertyTax).toBe(500);
    expect(result.monthlyHomeInsurance).toBe(150);
    expect(result.totalMonthlyPayment).toBeCloseTo(2022.62 + 500 + 150 + 150, 2);
  });

  it("charges PMI under 20 percent down and drops it at 80 percent LTV", () => {
    const result = calculateMortgage({
      homePrice: 400_000,
      downPayment: 40_000,
      annualRatePercent: 6.5,
      termYears: 30,
      pmiAnnualRatePercent: 0.5,
    });
    expect(result.monthlyPmi).toBeCloseTo(150, 2);
    expect(result.pmiMonths).toBeGreaterThan(0);
    expect(result.pmiMonths).toBeLessThan(360);
    expect(result.totalMonthlyAfterPmi).toBeLessThan(result.totalMonthlyPayment);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateMortgage({
        homePrice: 400_000,
        downPayment: 400_000,
        annualRatePercent: 6.5,
        termYears: 30,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateMortgage({
        homePrice: 0,
        downPayment: 0,
        annualRatePercent: 6.5,
        termYears: 30,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateMortgage({
        homePrice: 400_000,
        downPayment: 80_000,
        annualRatePercent: 6.5,
        termYears: 30,
        annualPropertyTax: -5,
      }),
    ).toThrow(RangeError);
  });
});
