import { describe, expect, it } from "vitest";
import { estimateOneRepMax, percentageTable } from "./oneRepMax";

describe("estimateOneRepMax", () => {
  it("Epley for 100 kg x 10 reps is 133.33", () => {
    const r = estimateOneRepMax(100, 10);
    const epley = r?.estimates.find((e) => e.name === "Epley");
    expect(epley?.value).toBeCloseTo(133.33, 2);
  });
  it("returns seven formula estimates", () => {
    expect(estimateOneRepMax(100, 10)?.estimates).toHaveLength(7);
  });
  it("reps of 1 returns the weight itself for every formula", () => {
    const r = estimateOneRepMax(140, 1);
    expect(r?.average).toBe(140);
    expect(r?.estimates.every((e) => e.value === 140)).toBe(true);
  });
  it("average sits between the lowest and highest estimates", () => {
    const r = estimateOneRepMax(100, 10)!;
    const values = r.estimates.map((e) => e.value);
    expect(r.average).toBeGreaterThan(Math.min(...values));
    expect(r.average).toBeLessThan(Math.max(...values));
  });
  it("Brzycki for 100 kg x 10 reps is 133.33", () => {
    const b = estimateOneRepMax(100, 10)?.estimates.find((e) => e.name === "Brzycki");
    expect(b?.value).toBeCloseTo(133.33, 2);
  });
  it("rejects reps outside 1 to 15 and bad weights", () => {
    expect(estimateOneRepMax(100, 0)).toBeNull();
    expect(estimateOneRepMax(100, 16)).toBeNull();
    expect(estimateOneRepMax(0, 5)).toBeNull();
    expect(estimateOneRepMax(100, 5.5)).toBeNull();
  });
});

describe("percentageTable", () => {
  it("runs from 100 percent down to 50 in 5 percent steps", () => {
    const rows = percentageTable(200);
    expect(rows.map((r) => r.pct)).toEqual([100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50]);
  });
  it("computes weights and typical reps", () => {
    const rows = percentageTable(200);
    expect(rows[0]).toEqual({ pct: 100, weight: 200, typicalReps: 1 });
    expect(rows.find((r) => r.pct === 80)).toEqual({ pct: 80, weight: 160, typicalReps: 8 });
    expect(rows.find((r) => r.pct === 50)?.typicalReps).toBe(30);
  });
});
