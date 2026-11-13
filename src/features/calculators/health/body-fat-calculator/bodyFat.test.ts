import { describe, expect, it } from "vitest";
import { bodyComposition, bodyFatPercent, classifyBodyFat } from "./bodyFat";

describe("bodyFatPercent (US Navy method)", () => {
  it("computes the male reference value", () => {
    // 178 cm tall, waist 85 cm, neck 38 cm gives about 16.5 percent.
    const result = bodyFatPercent("male", { heightCm: 178, neckCm: 38, waistCm: 85 });
    expect(result).not.toBeNull();
    expect(result as number).toBeCloseTo(16.5, 0);
  });

  it("computes the female reference value", () => {
    // 165 cm tall, waist 75 cm, hip 95 cm, neck 32 cm gives about 27.7 percent.
    const result = bodyFatPercent("female", { heightCm: 165, neckCm: 32, waistCm: 75, hipCm: 95 });
    expect(result).not.toBeNull();
    expect(result as number).toBeCloseTo(27.7, 0);
  });

  it("requires a hip measurement for women", () => {
    expect(bodyFatPercent("female", { heightCm: 165, neckCm: 32, waistCm: 75 })).toBeNull();
  });

  it("rejects impossible measurements", () => {
    // Neck wider than the waist makes the logarithm argument negative for men.
    expect(bodyFatPercent("male", { heightCm: 178, neckCm: 90, waistCm: 85 })).toBeNull();
    expect(bodyFatPercent("male", { heightCm: 178, neckCm: 38, waistCm: 0 })).toBeNull();
    expect(bodyFatPercent("male", { heightCm: Number.NaN, neckCm: 38, waistCm: 85 })).toBeNull();
  });
});

describe("classifyBodyFat (ACE bands)", () => {
  it("classifies men", () => {
    expect(classifyBodyFat("male", 4)?.key).toBe("essential");
    expect(classifyBodyFat("male", 10)?.key).toBe("athletes");
    expect(classifyBodyFat("male", 16.5)?.key).toBe("fitness");
    expect(classifyBodyFat("male", 20)?.key).toBe("average");
    expect(classifyBodyFat("male", 30)?.key).toBe("obese");
  });

  it("classifies women on the female bands", () => {
    expect(classifyBodyFat("female", 12)?.key).toBe("essential");
    expect(classifyBodyFat("female", 18)?.key).toBe("athletes");
    expect(classifyBodyFat("female", 27.7)?.key).toBe("average");
    expect(classifyBodyFat("female", 35)?.key).toBe("obese");
    expect(classifyBodyFat("female", 8)?.key).toBe("below-essential");
  });
});

describe("bodyComposition", () => {
  it("splits weight into fat and lean mass", () => {
    const result = bodyComposition(80, 20);
    expect(result?.fatMassKg).toBeCloseTo(16, 5);
    expect(result?.leanMassKg).toBeCloseTo(64, 5);
  });

  it("rejects bad input", () => {
    expect(bodyComposition(0, 20)).toBeNull();
    expect(bodyComposition(80, 0)).toBeNull();
  });
});
