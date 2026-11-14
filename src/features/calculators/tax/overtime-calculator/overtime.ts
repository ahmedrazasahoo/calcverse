/**
 * Overtime pay logic for three rule sets.
 *
 * Simple mode: the user supplies regular hours, overtime hours and a
 * multiplier (1.5 for time and a half, 2 for double time, or a custom
 * value agreed in a contract).
 *
 * Weekly FLSA mode: under the federal Fair Labor Standards Act, hours
 * over 40 in a single workweek are overtime at 1.5 times the regular
 * rate. There is no federal daily overtime rule.
 *
 * California daily mode: California pays daily overtime as well as
 * weekly overtime. The rule set implemented here is:
 * 1. Hours over 8 and up to 12 in one day are paid at 1.5 times.
 * 2. Hours over 12 in one day are paid at 2 times.
 * 3. Straight time hours over 40 in the week that were not already
 *    paid as daily overtime are also paid at 1.5 times.
 * 4. On the seventh consecutive day of work in a workweek, the first
 *    8 hours are paid at 1.5 times and hours beyond 8 at 2 times.
 * Daily overtime is never double counted as weekly overtime.
 */

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function assertNonNegative(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be zero or greater.`);
  }
}

function assertRate(value: number): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError("Hourly rate must be zero or greater.");
  }
}

export interface SimpleOvertimeInput {
  hourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  multiplier: number;
}

export interface SimpleOvertimeResult {
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  overtimeRate: number;
  regularPay: number;
  overtimePay: number;
  totalGross: number;
  effectiveHourlyRate: number;
}

export function calculateSimpleOvertime(input: SimpleOvertimeInput): SimpleOvertimeResult {
  assertRate(input.hourlyRate);
  assertNonNegative("Regular hours", input.regularHours);
  assertNonNegative("Overtime hours", input.overtimeHours);
  if (!Number.isFinite(input.multiplier) || input.multiplier <= 0) {
    throw new RangeError("Multiplier must be greater than zero.");
  }
  const regularPay = round2(input.hourlyRate * input.regularHours);
  const overtimeRate = round2(input.hourlyRate * input.multiplier);
  const overtimePay = round2(overtimeRate * input.overtimeHours);
  const totalGross = round2(regularPay + overtimePay);
  const totalHours = round2(input.regularHours + input.overtimeHours);
  return {
    regularHours: input.regularHours,
    overtimeHours: input.overtimeHours,
    totalHours,
    overtimeRate,
    regularPay,
    overtimePay,
    totalGross,
    effectiveHourlyRate: totalHours > 0 ? round2(totalGross / totalHours) : 0,
  };
}

export interface WeeklyOvertimeInput {
  hourlyRate: number;
  totalHours: number;
}

export interface WeeklyOvertimeResult {
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  overtimeRate: number;
  regularPay: number;
  overtimePay: number;
  totalGross: number;
  effectiveHourlyRate: number;
}

export function calculateWeeklyOvertime(input: WeeklyOvertimeInput): WeeklyOvertimeResult {
  assertRate(input.hourlyRate);
  assertNonNegative("Total hours", input.totalHours);
  const regularHours = Math.min(input.totalHours, 40);
  const overtimeHours = round2(Math.max(input.totalHours - 40, 0));
  const inner = calculateSimpleOvertime({
    hourlyRate: input.hourlyRate,
    regularHours,
    overtimeHours,
    multiplier: 1.5,
  });
  return { ...inner, totalHours: input.totalHours };
}

export interface DayBreakdown {
  dayIndex: number;
  hours: number;
  regularHours: number;
  overtime15Hours: number;
  doubleTimeHours: number;
  regularPay: number;
  overtime15Pay: number;
  doubleTimePay: number;
  totalPay: number;
  isSeventhConsecutiveDay: boolean;
}

export interface CaliforniaOvertimeInput {
  hourlyRate: number;
  /** Exactly seven entries, hours worked on each day of the workweek. */
  dailyHours: number[];
}

export interface CaliforniaOvertimeResult {
  days: DayBreakdown[];
  totalHours: number;
  regularHours: number;
  overtime15Hours: number;
  doubleTimeHours: number;
  overtimePay: number;
  regularPay: number;
  overtime15Pay: number;
  doubleTimePay: number;
  totalGross: number;
  effectiveHourlyRate: number;
}

export function calculateCaliforniaOvertime(
  input: CaliforniaOvertimeInput,
): CaliforniaOvertimeResult {
  assertRate(input.hourlyRate);
  if (!Array.isArray(input.dailyHours) || input.dailyHours.length !== 7) {
    throw new RangeError("California mode needs exactly seven daily hour values.");
  }
  for (const h of input.dailyHours) {
    if (!Number.isFinite(h) || h < 0 || h > 24) {
      throw new RangeError("Each day must be between 0 and 24 hours.");
    }
  }

  const workedAllSeven = input.dailyHours.every((h) => h > 0);

  const splits = input.dailyHours.map((h, idx) => {
    const isSeventh = idx === 6 && workedAllSeven;
    if (isSeventh) {
      return {
        regularHours: 0,
        overtime15Hours: Math.min(h, 8),
        doubleTimeHours: round2(Math.max(h - 8, 0)),
        isSeventhConsecutiveDay: true,
      };
    }
    return {
      regularHours: Math.min(h, 8),
      overtime15Hours: round2(Math.min(Math.max(h - 8, 0), 4)),
      doubleTimeHours: round2(Math.max(h - 12, 0)),
      isSeventhConsecutiveDay: false,
    };
  });

  // Weekly overtime: straight time hours over 40 become 1.5x hours.
  // Move them from the latest days first so the breakdown stays honest.
  let regularTotal = splits.reduce((s, d) => s + d.regularHours, 0);
  if (regularTotal > 40) {
    let excess = round2(regularTotal - 40);
    for (let i = splits.length - 1; i >= 0 && excess > 0; i--) {
      const move = Math.min(splits[i].regularHours, excess);
      if (move > 0) {
        splits[i].regularHours = round2(splits[i].regularHours - move);
        splits[i].overtime15Hours = round2(splits[i].overtime15Hours + move);
        excess = round2(excess - move);
      }
    }
    regularTotal = 40;
  }

  const rate = input.hourlyRate;
  const days: DayBreakdown[] = splits.map((s, idx) => {
    const regularPay = round2(s.regularHours * rate);
    const overtime15Pay = round2(s.overtime15Hours * rate * 1.5);
    const doubleTimePay = round2(s.doubleTimeHours * rate * 2);
    return {
      dayIndex: idx,
      hours: input.dailyHours[idx],
      regularHours: s.regularHours,
      overtime15Hours: s.overtime15Hours,
      doubleTimeHours: s.doubleTimeHours,
      regularPay,
      overtime15Pay,
      doubleTimePay,
      totalPay: round2(regularPay + overtime15Pay + doubleTimePay),
      isSeventhConsecutiveDay: s.isSeventhConsecutiveDay,
    };
  });

  const sum = (pick: (d: DayBreakdown) => number) => round2(days.reduce((a, d) => a + pick(d), 0));
  const regularPay = sum((d) => d.regularPay);
  const overtime15Pay = sum((d) => d.overtime15Pay);
  const doubleTimePay = sum((d) => d.doubleTimePay);
  const totalGross = round2(regularPay + overtime15Pay + doubleTimePay);
  const totalHours = round2(input.dailyHours.reduce((a, b) => a + b, 0));

  return {
    days,
    totalHours,
    regularHours: sum((d) => d.regularHours),
    overtime15Hours: sum((d) => d.overtime15Hours),
    doubleTimeHours: sum((d) => d.doubleTimeHours),
    overtimePay: round2(overtime15Pay + doubleTimePay),
    regularPay,
    overtime15Pay,
    doubleTimePay,
    totalGross,
    effectiveHourlyRate: totalHours > 0 ? round2(totalGross / totalHours) : 0,
  };
}
