import { describe, expect, it } from "vitest";
import {
  averageSgpa,
  cgpaToPercentage,
  convertGrade,
  gpa4ToPercentage,
  percentageToCgpa,
  percentageToGpa4,
  sgpaToCgpa,
} from "./cgpa";

describe("CBSE conversions", () => {
  it("multiplies CGPA by 9.5", () => {
    expect(cgpaToPercentage(8.5)).toBeCloseTo(80.75, 5);
    expect(cgpaToPercentage(10)).toBeCloseTo(95, 5);
    expect(cgpaToPercentage(0)).toBe(0);
  });

  it("divides percentage by 9.5 on the way back", () => {
    expect(percentageToCgpa(80.75)).toBeCloseTo(8.5, 5);
    expect(percentageToCgpa(95)).toBeCloseTo(10, 5);
  });

  it("rejects values off the scale", () => {
    expect(cgpaToPercentage(10.5)).toBeNull();
    expect(cgpaToPercentage(-1)).toBeNull();
    expect(percentageToCgpa(101)).toBeNull();
  });
});

describe("4.0 scale conversions", () => {
  it("uses the linear 25 points per GPA point bridge", () => {
    expect(gpa4ToPercentage(3.5)).toBeCloseTo(87.5, 5);
    expect(percentageToGpa4(87.5)).toBeCloseTo(3.5, 5);
    expect(gpa4ToPercentage(4)).toBeCloseTo(100, 5);
  });

  it("rejects values off the scale", () => {
    expect(gpa4ToPercentage(4.2)).toBeNull();
    expect(percentageToGpa4(-5)).toBeNull();
  });
});

describe("convertGrade across systems", () => {
  it("converts CGPA to the 4.0 scale through percentage", () => {
    // 8.5 CGPA is 80.75 percent, which is 3.23 on the linear 4.0 bridge.
    expect(convertGrade(8.5, "cbse10", "gpa4")).toBeCloseTo(3.23, 5);
  });

  it("converts the 4.0 scale back to CGPA", () => {
    expect(convertGrade(3.23, "gpa4", "cbse10")).toBeCloseTo(8.5, 5);
  });

  it("returns the value unchanged within one system", () => {
    expect(convertGrade(72, "percent", "percent")).toBe(72);
  });

  it("rejects off scale values", () => {
    expect(convertGrade(11, "cbse10", "percent")).toBeNull();
  });
});

describe("sgpaToCgpa", () => {
  it("weights semesters by credits", () => {
    // (9 * 10 + 7 * 30) / 40 = 7.5
    expect(
      sgpaToCgpa([
        { sgpa: 9, credits: 10 },
        { sgpa: 7, credits: 30 },
      ])
    ).toBeCloseTo(7.5, 5);
  });

  it("matches a plain average when credits are equal", () => {
    expect(
      sgpaToCgpa([
        { sgpa: 9, credits: 20 },
        { sgpa: 8, credits: 20 },
      ])
    ).toBeCloseTo(8.5, 5);
  });

  it("rejects empty lists and bad entries", () => {
    expect(sgpaToCgpa([])).toBeNull();
    expect(sgpaToCgpa([{ sgpa: 9, credits: 0 }])).toBeNull();
    expect(sgpaToCgpa([{ sgpa: 11, credits: 20 }])).toBeNull();
  });
});

describe("averageSgpa", () => {
  it("averages a list of SGPAs", () => {
    expect(averageSgpa([8, 9, 8.5])).toBeCloseTo(8.5, 5);
  });

  it("rejects empty lists and off scale values", () => {
    expect(averageSgpa([])).toBeNull();
    expect(averageSgpa([8, 12])).toBeNull();
  });
});
