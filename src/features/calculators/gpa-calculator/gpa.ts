/** GPA logic on the standard US 4.0 scale, pure and framework free. */

export interface GradeOption {
  label: string;
  points: number;
}

/** Letter grade points on the US 4.0 scale. An A+ earns the same 4.0 as an A. */
export const GRADE_SCALE: readonly GradeOption[] = [
  { label: "A+", points: 4.0 },
  { label: "A", points: 4.0 },
  { label: "A-", points: 3.7 },
  { label: "B+", points: 3.3 },
  { label: "B", points: 3.0 },
  { label: "B-", points: 2.7 },
  { label: "C+", points: 2.3 },
  { label: "C", points: 2.0 },
  { label: "C-", points: 1.7 },
  { label: "D+", points: 1.3 },
  { label: "D", points: 1.0 },
  { label: "D-", points: 0.7 },
  { label: "F", points: 0.0 },
];

export const MAX_GRADE_POINTS = 4.0;
/** Sanity cap for a single course, far above any real credit load. */
export const MAX_CREDITS_PER_COURSE = 30;

export interface CourseInput {
  gradeLabel: string;
  credits: number;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
}

export function gradePoints(label: string): number | null {
  return GRADE_SCALE.find((g) => g.label === label)?.points ?? null;
}

/**
 * Weighted GPA across courses. Rows with an unknown grade or with credits
 * outside (0, MAX_CREDITS_PER_COURSE] are ignored. Returns null when no
 * valid credits remain.
 */
export function calculateGpa(courses: readonly CourseInput[]): GpaResult | null {
  let totalPoints = 0;
  let totalCredits = 0;
  for (const course of courses) {
    const points = gradePoints(course.gradeLabel);
    if (points === null) continue;
    if (!Number.isFinite(course.credits) || course.credits <= 0 || course.credits > MAX_CREDITS_PER_COURSE) continue;
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  }
  if (totalCredits === 0) return null;
  return { gpa: totalPoints / totalCredits, totalCredits, totalPoints };
}
