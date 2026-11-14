import { describe, expect, it } from "vitest";
import { computeFromCorrect, computeTestGrade, testGradeTable } from "./testGrade";

describe("computeTestGrade", () => {
  it("scores a 20 question test with 2 wrong as 90 percent", () => {
    const r = computeTestGrade(20, 2);
    expect(r.correct).toBe(18);
    expect(r.percent).toBeCloseTo(90, 10);
    expect(r.letter).toBe("A-");
    expect(r.pointsPerQuestion).toBeCloseTo(5, 10);
  });
  it("handles a perfect score and a zero score", () => {
    expect(computeTestGrade(25, 0).percent).toBe(100);
    expect(computeTestGrade(25, 0).letter).toBe("A+");
    expect(computeTestGrade(25, 25).percent).toBe(0);
    expect(computeTestGrade(25, 25).letter).toBe("F");
  });
  it("works from correct count as well", () => {
    const r = computeFromCorrect(20, 18);
    expect(r.wrong).toBe(2);
    expect(r.percent).toBeCloseTo(90, 10);
  });
});

describe("testGradeTable", () => {
  it("builds rows for 0 to 10 wrong, capped at the test size", () => {
    const rows = testGradeTable(20);
    expect(rows).toHaveLength(11);
    expect(rows[0]).toEqual({ wrong: 0, correct: 20, percent: 100, letter: "A+" });
    expect(rows[10].percent).toBeCloseTo(50, 10);
    expect(testGradeTable(5)).toHaveLength(6);
  });
});
