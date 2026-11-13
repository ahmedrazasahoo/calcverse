import { describe, expect, it } from "vitest";
import { buildImageAttempts, kbToMb } from "./compress-image";

describe("kbToMb", () => {
  it("converts kilobytes to megabytes", () => {
    expect(kbToMb(1024)).toBe(1);
    expect(kbToMb(50)).toBeCloseTo(0.0488, 3);
  });
});

describe("buildImageAttempts", () => {
  it("passes the exact target to every attempt", () => {
    const attempts = buildImageAttempts(100);
    expect(attempts.every((a) => a.maxSizeMB === kbToMb(100))).toBe(true);
  });

  it("walks quality down, then caps dimensions as a last resort", () => {
    const attempts = buildImageAttempts(50);
    for (let i = 1; i < attempts.length; i++) {
      expect(attempts[i].initialQuality).toBeLessThan(attempts[i - 1].initialQuality);
    }
    const withCaps = attempts.filter((a) => a.maxDimension !== undefined);
    expect(withCaps.length).toBeGreaterThan(0);
    expect(withCaps[withCaps.length - 1].maxDimension).toBeLessThanOrEqual(960);
  });
});
