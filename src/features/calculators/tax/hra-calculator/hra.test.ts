import { describe, expect, it } from "vitest";
import { calculateHra } from "./hra";

describe("calculateHra", () => {
  it("metro case: exemption is the least of the three limits and taxable is zero", () => {
    // Salary = 600000. L1 = 240000. L2 = 300000 - 10% of 600000 = 300000 - 60000 = 240000.
    // L3 metro = 50% of 600000 = 300000. Least = 240000, so taxable = 240000 - 240000 = 0.
    const result = calculateHra({
      basicSalary: 600000,
      daAmount: 0,
      hraReceived: 240000,
      rentPaid: 300000,
      metro: true,
    });
    expect(result.limits.hraReceived).toBe(240000);
    expect(result.limits.rentMinusTenPercent).toBe(240000);
    expect(result.limits.salaryPercent).toBe(300000);
    expect(result.salaryPercentRate).toBe(50);
    expect(result.exemption).toBe(240000);
    expect(result.taxableHra).toBe(0);
  });

  it("non metro case: the salary limit drops to 40 percent and exemption stays 240000", () => {
    // Salary = 600000. L3 non metro = 40% of 600000 = 240000. Least of 240000, 240000, 240000 = 240000.
    const result = calculateHra({
      basicSalary: 600000,
      hraReceived: 240000,
      rentPaid: 300000,
      metro: false,
    });
    expect(result.limits.salaryPercent).toBe(240000);
    expect(result.salaryPercentRate).toBe(40);
    expect(result.exemption).toBe(240000);
    expect(result.taxableHra).toBe(0);
  });

  it("low rent case: rent minus 10 percent of salary becomes the binding limit", () => {
    // L2 = 150000 - 60000 = 90000. Least = 90000, taxable = 240000 - 90000 = 150000.
    const result = calculateHra({
      basicSalary: 600000,
      hraReceived: 240000,
      rentPaid: 150000,
      metro: true,
    });
    expect(result.limits.rentMinusTenPercent).toBe(90000);
    expect(result.exemption).toBe(90000);
    expect(result.taxableHra).toBe(150000);
  });

  it("rent below 10 percent of salary gives zero exemption", () => {
    // L2 raw = 50000 - 60000 = -10000, so the least limit is negative and exemption floors at 0.
    const result = calculateHra({
      basicSalary: 600000,
      hraReceived: 240000,
      rentPaid: 50000,
      metro: true,
    });
    expect(result.limits.rentMinusTenPercent).toBe(-10000);
    expect(result.exemption).toBe(0);
    expect(result.taxableHra).toBe(240000);
  });

  it("counts dearness allowance as part of salary for the limits", () => {
    // Salary = 500000 basic + 100000 DA = 600000, so the metro limits match the first case.
    const result = calculateHra({
      basicSalary: 500000,
      daAmount: 100000,
      hraReceived: 240000,
      rentPaid: 300000,
      metro: true,
    });
    expect(result.limits.rentMinusTenPercent).toBe(240000);
    expect(result.limits.salaryPercent).toBe(300000);
    expect(result.exemption).toBe(240000);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateHra({ basicSalary: 0, hraReceived: 240000, rentPaid: 300000, metro: true }),
    ).toThrow(RangeError);
    expect(() =>
      calculateHra({ basicSalary: 600000, hraReceived: 240000, rentPaid: -1, metro: true }),
    ).toThrow(RangeError);
    expect(() =>
      calculateHra({ basicSalary: 600000, hraReceived: -100, rentPaid: 300000, metro: false }),
    ).toThrow(RangeError);
  });
});
