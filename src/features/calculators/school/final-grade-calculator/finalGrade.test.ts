import { describe, expect, it } from "vitest";
import { finalNeeded, resolveCurrentWeight } from "./finalGrade";

describe("resolveCurrentWeight", () => {
  it("uses the entered value in current mode", () => {
    expect(resolveCurrentWeight("current", 70)).toBe(70);
  });
  it("derives current weight from final weight", () => {
    expect(resolveCurrentWeight("final", 30)).toBe(70);
    expect(resolveCurrentWeight("final", 20)).toBe(80);
  });
});

describe("finalNeeded", () => {
  it("matches in both modes for the same course", () => {
    const a = finalNeeded(92, "current", 70, 90);
    const b = finalNeeded(92, "final", 30, 90);
    expect(a.required).toBeCloseTo(b.required, 10);
    expect(a.currentWeight).toBe(70);
    expect(b.currentWeight).toBe(70);
  });
});
