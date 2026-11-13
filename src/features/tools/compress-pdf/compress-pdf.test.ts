import { describe, expect, it } from "vitest";
import { indexOfSmallest, planAttempts } from "./compress-pdf";

describe("planAttempts", () => {
  it("starts gentle when the file is close to the target", () => {
    const plan = planAttempts(300 * 1024, 200);
    expect(plan[0].quality).toBe(0.85);
    expect(plan.every((a) => a.scale === 1 || a.quality <= 0.4)).toBe(true);
  });

  it("skips gentle steps when the file is far above the target", () => {
    const plan = planAttempts(20 * 1024 * 1024, 100);
    expect(plan[0].quality).toBeLessThanOrEqual(0.55);
  });

  it("keeps qualities descending and scales at 1 until the last resort steps", () => {
    const plan = planAttempts(900 * 1024, 200);
    for (let i = 1; i < plan.length; i++) {
      expect(plan[i].quality).toBeLessThanOrEqual(plan[i - 1].quality + 0.001);
    }
    const scaled = plan.filter((a) => a.scale < 1);
    expect(scaled.length).toBeGreaterThan(0);
    expect(scaled.every((a) => a.scale < 1 && a.scale > 0)).toBe(true);
  });

  it("always ends with aggressive last resort attempts", () => {
    const plan = planAttempts(2 * 1024 * 1024, 500);
    const last = plan[plan.length - 1];
    expect(last.scale).toBeLessThanOrEqual(0.4);
    expect(last.quality).toBeLessThanOrEqual(0.25);
  });
});

describe("indexOfSmallest", () => {
  it("finds the smallest attempt", () => {
    expect(indexOfSmallest([500, 300, 400])).toBe(1);
    expect(indexOfSmallest([100])).toBe(0);
    expect(indexOfSmallest([])).toBe(-1);
  });
});
