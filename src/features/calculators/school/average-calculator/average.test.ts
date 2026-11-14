import { describe, expect, it } from "vitest";
import { computeStats, parseNumbers, weightedAverage } from "./average";

describe("computeStats", () => {
  it("finds mean and median of an even count list", () => {
    // Formula: mean = (1 + 2 + 3 + 4) / 4 = 2.5, median = (2 + 3) / 2 = 2.5.
    const stats = computeStats([1, 2, 3, 4]);
    expect(stats.mean).toBe(2.5);
    expect(stats.median).toBe(2.5);
    expect(stats.sum).toBe(10);
    expect(stats.count).toBe(4);
    expect(stats.modes).toEqual([]);
    expect(stats.min).toBe(1);
    expect(stats.max).toBe(4);
    expect(stats.range).toBe(3);
  });

  it("finds the mode when one value repeats", () => {
    // 5 appears twice and 2 once, so the mode is 5 and the mean is 12 / 3 = 4.
    const stats = computeStats([5, 5, 2]);
    expect(stats.modes).toEqual([5]);
    expect(stats.mean).toBe(4);
    expect(stats.median).toBe(5);
  });

  it("sorts a copy without touching the input order", () => {
    const input = [9, 1, 4];
    const stats = computeStats(input);
    expect(stats.sorted).toEqual([1, 4, 9]);
    expect(input).toEqual([9, 1, 4]);
  });

  it("handles a single value as an edge case", () => {
    const stats = computeStats([7]);
    expect(stats.mean).toBe(7);
    expect(stats.median).toBe(7);
    expect(stats.range).toBe(0);
    expect(stats.modes).toEqual([]);
  });

  it("rejects an empty list", () => {
    expect(() => computeStats([])).toThrow(RangeError);
  });
});

describe("parseNumbers", () => {
  it("splits on commas, semicolons, spaces and new lines", () => {
    expect(parseNumbers("1, 2; 3\n4")).toEqual([1, 2, 3, 4]);
  });

  it("names the bad token when text is not a number", () => {
    expect(() => parseNumbers("4, five, 6")).toThrow(RangeError);
    expect(() => parseNumbers("4, five, 6")).toThrow(/five/);
  });

  it("rejects empty input", () => {
    expect(() => parseNumbers("")).toThrow(RangeError);
    expect(() => parseNumbers("   , ; ")).toThrow(RangeError);
  });
});

describe("weightedAverage", () => {
  it("weights each value before averaging", () => {
    // Formula: (80 x 1 + 90 x 3) / (1 + 3) = 350 / 4 = 87.5.
    expect(weightedAverage([80, 90], [1, 3])).toBe(87.5);
  });

  it("rejects mismatched list lengths", () => {
    expect(() => weightedAverage([80, 90], [1])).toThrow(RangeError);
  });
});
