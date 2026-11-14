import { describe, expect, it } from "vitest";
import { applyIncrease, increaseBetween } from "./percentage-increase";

// Formula: percentChange = (new - old) / |old| * 100
// Formula: increasedValue = value * (1 + percent / 100)

describe("increaseBetween", () => {
  it("measures a rise from 80 to 100 as 25 percent", () => {
    const result = increaseBetween(80, 100);
    expect(result.difference).toBe(20);
    expect(result.percentChange).toBeCloseTo(25, 5);
    expect(result.isIncrease).toBe(true);
  });

  it("reports a fall from 200 to 150 as a negative change", () => {
    const result = increaseBetween(200, 150);
    expect(result.difference).toBe(-50);
    expect(result.percentChange).toBeCloseTo(-25, 5);
    expect(result.isIncrease).toBe(false);
  });

  it("reports no movement when the values match", () => {
    const result = increaseBetween(60, 60);
    expect(result.difference).toBe(0);
    expect(result.percentChange).toBe(0);
    expect(result.isIncrease).toBe(true);
  });

  it("throws when the old value is zero", () => {
    expect(() => increaseBetween(0, 50)).toThrow(RangeError);
  });

  it("throws on non finite input", () => {
    expect(() => increaseBetween(Number.NaN, 50)).toThrow(RangeError);
  });
});

describe("applyIncrease", () => {
  it("grows 150 by 20 percent to 180", () => {
    const result = applyIncrease(150, 20);
    expect(result.increasedValue).toBeCloseTo(180, 5);
    expect(result.addedAmount).toBeCloseTo(30, 5);
  });

  it("leaves a value unchanged at zero percent", () => {
    const result = applyIncrease(90, 0);
    expect(result.increasedValue).toBe(90);
    expect(result.addedAmount).toBe(0);
  });

  it("throws on a negative percent", () => {
    expect(() => applyIncrease(100, -5)).toThrow(RangeError);
  });
});
