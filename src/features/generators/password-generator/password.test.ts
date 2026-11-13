import { describe, expect, it } from "vitest";
import {
  characterPool,
  clampLength,
  estimateStrength,
  generatePassword,
  uniformIndex,
  type RandomSource,
} from "./password";

/** Deterministic random source for tests: cycles through the given values. */
function sequenceRandom(values: number[]): RandomSource {
  let i = 0;
  return (array: Uint32Array) => {
    array[0] = values[i % values.length];
    i++;
    return array;
  };
}

describe("characterPool and clampLength", () => {
  it("combines the enabled sets only", () => {
    const pool = characterPool({ length: 12, lowercase: true, uppercase: false, digits: true, symbols: false });
    expect(pool).toContain("a");
    expect(pool).toContain("7");
    expect(pool).not.toContain("A");
    expect(pool).not.toContain("!");
  });

  it("clamps length into range", () => {
    expect(clampLength(2)).toBe(4);
    expect(clampLength(999)).toBe(128);
    expect(clampLength(20)).toBe(20);
  });
});

describe("uniformIndex", () => {
  it("rejects values in the biased tail", () => {
    // For max 3, the limit is 4294967295; a draw of 0xFFFFFFFF must be resampled.
    const random = sequenceRandom([0xffffffff, 5]);
    expect(uniformIndex(3, random)).toBe(2);
  });

  it("throws for an empty set", () => {
    expect(() => uniformIndex(0)).toThrow();
  });
});

describe("generatePassword", () => {
  it("respects length and guarantees every enabled family appears", () => {
    const password = generatePassword(
      { length: 16, lowercase: true, uppercase: true, digits: true, symbols: true },
      sequenceRandom([1234567, 987654321, 55555, 42, 777777, 31337])
    );
    expect(password).toHaveLength(16);
    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/[0-9]/);
    expect(password).toMatch(/[^a-zA-Z0-9]/);
  });

  it("returns an empty string with no families enabled, and uses real randomness by default", () => {
    expect(generatePassword({ length: 12, lowercase: false, uppercase: false, digits: false, symbols: false })).toBe("");
    const a = generatePassword({ length: 24, lowercase: true, uppercase: true, digits: true, symbols: false });
    const b = generatePassword({ length: 24, lowercase: true, uppercase: true, digits: true, symbols: false });
    expect(a).toHaveLength(24);
    expect(a).not.toBe(b);
  });
});

describe("estimateStrength", () => {
  it("rates short simple passwords weak and long mixed ones excellent", () => {
    expect(estimateStrength("abc").label).toBe("Weak");
    expect(estimateStrength("").label).toBe("Weak");
    const strong = estimateStrength("X9#kQ2$mZ8&vL4pR7w");
    expect(strong.bits).toBeGreaterThan(100);
    expect(strong.label).toBe("Excellent");
  });

  it("grows bits with length and pool size", () => {
    const digitsOnly = estimateStrength("12345678");
    const mixed = estimateStrength("1234567a");
    expect(mixed.bits).toBeGreaterThan(digitsOnly.bits);
  });
});
