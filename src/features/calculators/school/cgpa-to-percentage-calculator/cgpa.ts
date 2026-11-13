/**
 * CGPA and percentage conversion logic, pure and framework free.
 *
 * Three scales are supported:
 *  - cbse10: the Indian CBSE 10 point CGPA. Percentage is CGPA times
 *    9.5, the board's own published conversion. The same 9.5
 *    multiplier is the widely used default at Indian universities on
 *    a 10 point scale, though individual universities can differ.
 *  - gpa4: the US style 4.0 scale, mapped linearly to percentage
 *    (GPA times 25). This is an approximation: real US conversions
 *    work from letter grades, not from a straight line.
 *  - percent: a plain 0 to 100 percentage.
 * Conversions between cbse10 and gpa4 pass through percentage.
 */

export type GradeSystem = "cbse10" | "percent" | "gpa4";

export const CBSE_MULTIPLIER = 9.5;
export const CGPA_MAX = 10;
export const GPA4_MAX = 4;
export const PERCENT_MAX = 100;
/** Linear bridge between the 4.0 scale and percentage. */
export const PERCENT_PER_GPA_POINT = 25;

function inRange(value: number, max: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= max;
}

/** CBSE style CGPA to percentage: CGPA times 9.5. */
export function cgpaToPercentage(cgpa: number): number | null {
  if (!inRange(cgpa, CGPA_MAX)) return null;
  return cgpa * CBSE_MULTIPLIER;
}

/** Percentage back to a CBSE style CGPA. */
export function percentageToCgpa(percent: number): number | null {
  if (!inRange(percent, PERCENT_MAX)) return null;
  return percent / CBSE_MULTIPLIER;
}

/** US 4.0 GPA to percentage, linear approximation. */
export function gpa4ToPercentage(gpa: number): number | null {
  if (!inRange(gpa, GPA4_MAX)) return null;
  return gpa * PERCENT_PER_GPA_POINT;
}

/** Percentage to a US 4.0 GPA, linear approximation. */
export function percentageToGpa4(percent: number): number | null {
  if (!inRange(percent, PERCENT_MAX)) return null;
  return percent / PERCENT_PER_GPA_POINT;
}

const SYSTEM_MAX: Record<GradeSystem, number> = {
  cbse10: CGPA_MAX,
  percent: PERCENT_MAX,
  gpa4: GPA4_MAX,
};

function toPercent(value: number, from: GradeSystem): number | null {
  if (from === "percent") return inRange(value, PERCENT_MAX) ? value : null;
  if (from === "cbse10") return cgpaToPercentage(value);
  return gpa4ToPercentage(value);
}

function fromPercent(percent: number, to: GradeSystem): number | null {
  if (to === "percent") return percent;
  if (to === "cbse10") return percentageToCgpa(percent);
  return percentageToGpa4(percent);
}

/**
 * Converts a grade between any two supported systems.
 * Returns null when the value is outside its own scale; a same system
 * conversion returns the value unchanged.
 */
export function convertGrade(value: number, from: GradeSystem, to: GradeSystem): number | null {
  if (!inRange(value, SYSTEM_MAX[from])) return null;
  if (from === to) return value;
  const percent = toPercent(value, from);
  if (percent === null) return null;
  return fromPercent(percent, to);
}

export interface Semester {
  sgpa: number;
  credits: number;
}

/**
 * Combines semester SGPAs into one CGPA, weighted by credits.
 * Every semester needs an SGPA on the 10 point scale and a positive
 * credit count.
 */
export function sgpaToCgpa(semesters: readonly Semester[]): number | null {
  if (semesters.length === 0) return null;
  let weightedSum = 0;
  let totalCredits = 0;
  for (const semester of semesters) {
    if (!inRange(semester.sgpa, CGPA_MAX)) return null;
    if (!Number.isFinite(semester.credits) || semester.credits <= 0) return null;
    weightedSum += semester.sgpa * semester.credits;
    totalCredits += semester.credits;
  }
  return weightedSum / totalCredits;
}

/** Plain average of a list of SGPAs, for equal credit semesters. */
export function averageSgpa(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  for (const value of values) {
    if (!inRange(value, CGPA_MAX)) return null;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
