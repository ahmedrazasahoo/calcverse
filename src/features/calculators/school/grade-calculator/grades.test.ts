import { describe, expect, it } from "vitest";
import { gradePoints, letterGrade, neededFinalScore, pointsPercent, totalWeight, weightedAverage } from "./grades";

describe("letterGrade", () => {
  it("maps boundary percents to the standard scale", () => {
    expect(letterGrade(97)).toBe("A+");
    expect(letterGrade(93)).toBe("A");
    expect(letterGrade(92.9)).toBe("A-");
    expect(letterGrade(90)).toBe("A-");
    expect(letterGrade(87)).toBe("B+");
    expect(letterGrade(83)).toBe("B");
    expect(letterGrade(80)).toBe("B-");
    expect(letterGrade(77)).toBe("C+");
    expect(letterGrade(73)).toBe("C");
    expect(letterGrade(70)).toBe("C-");
    expect(letterGrade(67)).toBe("D+");
    expect(letterGrade(63)).toBe("D");
    expect(letterGrade(60)).toBe("D-");
    expect(letterGrade(59.9)).toBe("F");
    expect(letterGrade(0)).toBe("F");
    expect(letterGrade(100)).toBe("A+");
  });
});

describe("gradePoints", () => {
  it("maps to the 4.0 scale", () => {
    expect(gradePoints(98)).toBe(4.0);
    expect(gradePoints(93)).toBe(4.0);
    expect(gradePoints(90)).toBe(3.7);
    expect(gradePoints(87)).toBe(3.3);
    expect(gradePoints(83)).toBe(3.0);
    expect(gradePoints(80)).toBe(2.7);
    expect(gradePoints(77)).toBe(2.3);
    expect(gradePoints(73)).toBe(2.0);
    expect(gradePoints(70)).toBe(1.7);
    expect(gradePoints(67)).toBe(1.3);
    expect(gradePoints(63)).toBe(1.0);
    expect(gradePoints(60)).toBe(0.7);
    expect(gradePoints(50)).toBe(0);
  });
});

describe("weightedAverage", () => {
  it("weights scores by category weight", () => {
    // 90 at 40 percent and 80 at 60 percent: (3600 + 4800) / 100 = 84
    expect(weightedAverage([{ score: 90, weight: 40 }, { score: 80, weight: 60 }])).toBeCloseTo(84, 10);
  });
  it("normalises weights that do not add to 100", () => {
    // 90 at weight 1 and 80 at weight 1: plain average 85
    expect(weightedAverage([{ score: 90, weight: 1 }, { score: 80, weight: 1 }])).toBeCloseTo(85, 10);
    // 100 at weight 2 and 50 at weight 1: (200 + 50) / 3 = 83.33
    expect(weightedAverage([{ score: 100, weight: 2 }, { score: 50, weight: 1 }])).toBeCloseTo(250 / 3, 10);
  });
  it("returns 0 for empty or zero weight input", () => {
    expect(weightedAverage([])).toBe(0);
    expect(weightedAverage([{ score: 90, weight: 0 }])).toBe(0);
  });
  it("reports total weight", () => {
    expect(totalWeight([{ score: 90, weight: 30 }, { score: 80, weight: 45 }])).toBe(75);
  });
});

describe("pointsPercent", () => {
  it("sums earned over possible", () => {
    expect(pointsPercent([{ earned: 45, possible: 50 }, { earned: 90, possible: 100 }])).toBeCloseTo(90, 10);
    expect(pointsPercent([{ earned: 0, possible: 100 }])).toBe(0);
    expect(pointsPercent([])).toBe(0);
  });
});

describe("neededFinalScore", () => {
  it("calculates a reachable target", () => {
    // Current 85 on 70 percent of course, target 90, final is 30 percent.
    // (9000 - 5950) / 30 = 101.67, so this is actually impossible.
    const hard = neededFinalScore(85, 70, 90);
    expect(hard.required).toBeCloseTo(3050 / 30, 6);
    expect(hard.impossible).toBe(true);
    // Current 92 on 70 percent, target 90: (9000 - 6440) / 30 = 85.33
    const ok = neededFinalScore(92, 70, 90);
    expect(ok.required).toBeCloseTo(2560 / 30, 6);
    expect(ok.impossible).toBe(false);
    expect(ok.alreadySecured).toBe(false);
    expect(ok.finalWeight).toBe(30);
  });
  it("flags already secured when required is zero or below", () => {
    const r = neededFinalScore(100, 90, 85);
    expect(r.required).toBeLessThanOrEqual(0);
    expect(r.alreadySecured).toBe(true);
  });
  it("flags impossible when required is above 100", () => {
    const r = neededFinalScore(60, 80, 95);
    expect(r.required).toBeGreaterThan(100);
    expect(r.impossible).toBe(true);
  });
});
