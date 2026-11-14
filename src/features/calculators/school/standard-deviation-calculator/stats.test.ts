import { describe, expect, it } from "vitest";
import { computeStats, medianOf, parseNumberList } from "./stats";

// Classic textbook dataset: 2, 4, 4, 4, 5, 5, 7, 9.
// Sum 40, mean 5. Deviations: -3, -1, -1, -1, 0, 0, 2, 4.
// Squared: 9, 1, 1, 1, 0, 0, 4, 16, total 32.
// Population variance 32 / 8 = 4, SD 2. Sample variance 32 / 7, SD about 2.138.

describe("parseNumberList", () => {
  it("parses comma, space and newline separated values", () => {
    const r = parseNumberList("2, 4 4\n4,5");
    expect(r.values).toEqual([2, 4, 4, 4, 5]);
    expect(r.invalid).toEqual([]);
  });

  it("reports invalid tokens instead of dropping them silently", () => {
    const r = parseNumberList("3, abc, 5, x9");
    expect(r.values).toEqual([3, 5]);
    expect(r.invalid).toEqual(["abc", "x9"]);
  });

  it("handles negatives and decimals", () => {
    expect(parseNumberList("-2.5, 0, 7.25").values).toEqual([-2.5, 0, 7.25]);
  });
});

describe("medianOf", () => {
  it("picks the middle value for odd counts and averages for even counts", () => {
    expect(medianOf([3, 1, 2])).toBe(2);
    expect(medianOf([1, 2, 3, 4])).toBe(2.5);
  });
});

describe("computeStats on the textbook dataset", () => {
  const stats = computeStats([2, 4, 4, 4, 5, 5, 7, 9]);

  it("computes count, sum, mean, median, min and max", () => {
    expect(stats.count).toBe(8);
    expect(stats.sum).toBe(40);
    expect(stats.mean).toBe(5);
    expect(stats.median).toBe(4.5);
    expect(stats.min).toBe(2);
    expect(stats.max).toBe(9);
    expect(stats.range).toBe(7);
  });

  it("computes population variance 4 and standard deviation 2", () => {
    expect(stats.populationVariance).toBe(4);
    expect(stats.populationSd).toBe(2);
  });

  it("computes sample variance 32/7 and standard deviation about 2.138", () => {
    expect(stats.sampleVariance).toBeCloseTo(32 / 7, 10);
    expect(stats.sampleSd).toBeCloseTo(2.138, 3);
  });

  it("builds the deviation table with squared deviations summing to 32", () => {
    expect(stats.rows).toHaveLength(8);
    expect(stats.rows[0]).toEqual({ value: 2, deviation: -3, squaredDeviation: 9 });
    expect(stats.rows[7]).toEqual({ value: 9, deviation: 4, squaredDeviation: 16 });
    expect(stats.sumOfSquaredDeviations).toBe(32);
  });
});

describe("computeStats edge cases", () => {
  it("gives zero spread when every value is the same", () => {
    const stats = computeStats([6, 6, 6]);
    expect(stats.populationVariance).toBe(0);
    expect(stats.populationSd).toBe(0);
    expect(stats.sampleVariance).toBe(0);
  });

  it("returns null sample figures for a single value", () => {
    const stats = computeStats([42]);
    expect(stats.sampleVariance).toBeNull();
    expect(stats.sampleSd).toBeNull();
    expect(stats.populationSd).toBe(0);
  });

  it("throws on an empty list", () => {
    expect(() => computeStats([])).toThrow(RangeError);
  });
});
