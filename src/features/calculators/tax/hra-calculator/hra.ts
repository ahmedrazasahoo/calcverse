/**
 * HRA (House Rent Allowance) exemption calculator logic for India.
 *
 * Under the standard Income Tax Act rules for salaried employees, the
 * exempt part of HRA is the least of three yearly limits:
 * 1. The actual HRA received from the employer.
 * 2. Rent paid minus 10 percent of salary (basic plus dearness allowance).
 * 3. 50 percent of salary for a metro city, or 40 percent for non metro.
 * Whatever HRA is left after the exemption is taxable.
 */

export interface HraInput {
  /** Yearly basic salary. Must be greater than zero. */
  basicSalary: number;
  /** Yearly dearness allowance. Defaults to zero. Must be zero or greater. */
  daAmount?: number;
  /** Yearly HRA received from the employer. Must be zero or greater. */
  hraReceived: number;
  /** Yearly rent paid. Must be zero or greater. */
  rentPaid: number;
  /** True for metro cities (Delhi, Mumbai, Kolkata, Chennai). */
  metro: boolean;
}

export interface HraLimits {
  /** Limit 1: the actual HRA received. */
  hraReceived: number;
  /** Limit 2: rent paid minus 10 percent of salary, raw figure, can be negative. */
  rentMinusTenPercent: number;
  /** Limit 3: 50 or 40 percent of salary depending on city type. */
  salaryPercent: number;
}

export interface HraResult {
  /** Tax free part of the HRA: the least of the three limits, never below zero. */
  exemption: number;
  /** Part of the HRA that stays taxable. */
  taxableHra: number;
  limits: HraLimits;
  /** 50 for metro, 40 for non metro. */
  salaryPercentRate: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateHra(input: HraInput): HraResult {
  const daAmount = input.daAmount ?? 0;
  if (!Number.isFinite(input.basicSalary) || input.basicSalary <= 0) {
    throw new RangeError("Basic salary must be greater than zero.");
  }
  if (!Number.isFinite(daAmount) || daAmount < 0) {
    throw new RangeError("Dearness allowance must be zero or greater.");
  }
  if (!Number.isFinite(input.hraReceived) || input.hraReceived < 0) {
    throw new RangeError("HRA received must be zero or greater.");
  }
  if (!Number.isFinite(input.rentPaid) || input.rentPaid < 0) {
    throw new RangeError("Rent paid must be zero or greater.");
  }

  const basicPlusDa = input.basicSalary + daAmount;
  const salaryPercentRate = input.metro ? 50 : 40;

  const hraReceived = round2(input.hraReceived);
  const rentMinusTenPercent = round2(input.rentPaid - 0.1 * basicPlusDa);
  const salaryPercent = round2((salaryPercentRate / 100) * basicPlusDa);

  const exemption = round2(
    Math.max(0, Math.min(hraReceived, rentMinusTenPercent, salaryPercent)),
  );
  const taxableHra = round2(input.hraReceived - exemption);

  return {
    exemption,
    taxableHra,
    limits: {
      hraReceived,
      rentMinusTenPercent,
      salaryPercent,
    },
    salaryPercentRate,
  };
}
