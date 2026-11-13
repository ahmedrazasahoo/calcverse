import { describe, expect, it } from "vitest";
import { calculateGpa, gradePoints } from "./gpa";

describe("gradePoints", () => {
  it("maps letters to the 4.0 scale", () => {
    expect(gradePoints("A")).toBe(4.0);
    expect(gradePoints("A+")).toBe(4.0);
    expect(gradePoints("B+")).toBeCloseTo(3.3, 5);
    expect(gradePoints("F")).toBe(0);
  });

  it("returns null for unknown grades", () => {
    expect(gradePoints("E")).toBeNull();
    expect(gradePoints("")).toBeNull();
  });
});

describe("calculateGpa", () => {
  it("weights grades by credit hours", () => {
    // A in a 4 credit course and B in a 1 credit course: (16 + 3) / 5 = 3.8
    const result = calculateGpa([
      { gradeLabel: "A", credits: 4 },
      { gradeLabel: "B", credits: 1 },
    ]);
    expect(result!.gpa).toBeCloseTo(3.8, 5);
    expect(result!.totalCredits).toBe(5);
  });

  it("computes a mixed semester correctly", () => {
    const result = calculateGpa([
      { gradeLabel: "A", credits: 3 },
      { gradeLabel: "B+", credits: 4 },
      { gradeLabel: "A-", credits: 3 },
      { gradeLabel: "B", credits: 3 },
    ]);
    // (12 + 13.2 + 11.1 + 9) / 13 = 45.3 / 13 = 3.4846...
    expect(result!.gpa).toBeCloseTo(3.4846, 3);
    expect(result!.totalCredits).toBe(13);
  });

  it("counts an F as zero points but keeps its credits", () => {
    const result = calculateGpa([
      { gradeLabel: "A", credits: 3 },
      { gradeLabel: "F", credits: 3 },
    ]);
    expect(result!.gpa).toBeCloseTo(2.0, 5);
  });

  it("ignores invalid rows and returns null when nothing valid remains", () => {
    expect(
      calculateGpa([
        { gradeLabel: "A", credits: 0 },
        { gradeLabel: "X", credits: 3 },
        { gradeLabel: "B", credits: -2 },
      ])
    ).toBeNull();
    expect(calculateGpa([])).toBeNull();
  });
});
