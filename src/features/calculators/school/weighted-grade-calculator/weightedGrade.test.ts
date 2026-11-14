import { describe, expect, it } from "vitest";
import { computeWeightedGrade } from "./weightedGrade";

describe("computeWeightedGrade", () => {
  it("computes a complete weighted grade", () => {
    const r = computeWeightedGrade([{ score: 90, weight: 40 }, { score: 80, weight: 60 }]);
    expect(r.percent).toBeCloseTo(84, 10);
    expect(r.letter).toBe("B");
    expect(r.points).toBe(3.0);
    expect(r.totalWeight).toBe(100);
    expect(r.isComplete).toBe(true);
  });
  it("normalises and flags incomplete weight", () => {
    const r = computeWeightedGrade([{ score: 90, weight: 30 }, { score: 80, weight: 30 }]);
    expect(r.percent).toBeCloseTo(85, 10);
    expect(r.totalWeight).toBe(60);
    expect(r.isComplete).toBe(false);
  });
});
