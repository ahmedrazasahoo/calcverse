import { gradePoints, letterGrade } from "../grade-calculator/grades";

export interface TestGradeResult {
  total: number;
  wrong: number;
  correct: number;
  percent: number;
  letter: string;
  points: number;
  pointsPerQuestion: number;
}

export function computeTestGrade(total: number, wrong: number): TestGradeResult {
  const safeTotal = Math.max(0, Math.floor(total));
  const safeWrong = Math.min(Math.max(0, Math.floor(wrong)), safeTotal);
  const correct = safeTotal - safeWrong;
  const percent = safeTotal > 0 ? (correct / safeTotal) * 100 : 0;
  return {
    total: safeTotal,
    wrong: safeWrong,
    correct,
    percent,
    letter: letterGrade(percent),
    points: gradePoints(percent),
    pointsPerQuestion: safeTotal > 0 ? 100 / safeTotal : 0,
  };
}

export function computeFromCorrect(total: number, correct: number): TestGradeResult {
  const safeTotal = Math.max(0, Math.floor(total));
  const safeCorrect = Math.min(Math.max(0, Math.floor(correct)), safeTotal);
  return computeTestGrade(safeTotal, safeTotal - safeCorrect);
}

export interface TestGradeRow {
  wrong: number;
  correct: number;
  percent: number;
  letter: string;
}

export function testGradeTable(total: number, maxWrong = 10): TestGradeRow[] {
  const safeTotal = Math.max(0, Math.floor(total));
  const limit = Math.min(maxWrong, safeTotal);
  const rows: TestGradeRow[] = [];
  for (let wrong = 0; wrong <= limit; wrong += 1) {
    const r = computeTestGrade(safeTotal, wrong);
    rows.push({ wrong, correct: r.correct, percent: r.percent, letter: r.letter });
  }
  return rows;
}
