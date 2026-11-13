import { describe, expect, it } from "vitest";
import { combinedRotation, normalizeAngle } from "./rotate-pdf";

describe("normalizeAngle", () => {
  it("keeps quarter turns and wraps full circles", () => {
    expect(normalizeAngle(0)).toBe(0);
    expect(normalizeAngle(90)).toBe(90);
    expect(normalizeAngle(360)).toBe(0);
    expect(normalizeAngle(450)).toBe(90);
    expect(normalizeAngle(-90)).toBe(270);
  });

  it("rounds odd angles to the nearest quarter turn", () => {
    expect(normalizeAngle(44)).toBe(0);
    expect(normalizeAngle(46)).toBe(90);
    expect(normalizeAngle(Number.NaN)).toBe(0);
  });
});

describe("combinedRotation", () => {
  it("adds the turn to the existing rotation", () => {
    expect(combinedRotation(0, 90)).toBe(90);
    expect(combinedRotation(90, 90)).toBe(180);
    expect(combinedRotation(270, 90)).toBe(0);
    expect(combinedRotation(0, 270)).toBe(270);
  });
});
