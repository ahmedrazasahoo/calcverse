import { describe, expect, it } from "vitest";
import { countCorrectChars, isComplete, scoreTyping, speedVerdict } from "./typing";

describe("countCorrectChars", () => {
  it("counts position by position matches", () => {
    expect(countCorrectChars("hello world", "hello world")).toBe(11);
    expect(countCorrectChars("hello world", "hello worle")).toBe(10);
    expect(countCorrectChars("hello", "bye")).toBe(0);
  });

  it("ignores characters typed past the end of the target", () => {
    expect(countCorrectChars("hi", "hi there")).toBe(2);
  });
});

describe("scoreTyping", () => {
  it("scores a perfect 30 second attempt", () => {
    // 11 correct characters in 30 seconds: (11 / 5) / 0.5 = 4.4 WPM.
    const score = scoreTyping("hello world", "hello world", 30);
    expect(score?.grossWpm).toBeCloseTo(4.4, 5);
    expect(score?.netWpm).toBeCloseTo(4.4, 5);
    expect(score?.accuracyPercent).toBeCloseTo(100, 5);
    expect(score?.incorrectChars).toBe(0);
  });

  it("separates gross and net speed when there are mistakes", () => {
    // "hello worle": 10 correct of 11 typed in 30 seconds.
    const score = scoreTyping("hello world", "hello worle", 30);
    expect(score?.grossWpm).toBeCloseTo(4.4, 5);
    expect(score?.netWpm).toBeCloseTo(4.0, 5);
    expect(score?.accuracyPercent).toBeCloseTo(90.91, 1);
    expect(score?.incorrectChars).toBe(1);
  });

  it("scores a realistic one minute passage", () => {
    // 250 correct characters in 60 seconds is exactly 50 net WPM.
    const target = "a".repeat(250);
    const score = scoreTyping(target, target, 60);
    expect(score?.netWpm).toBeCloseTo(50, 5);
  });

  it("handles nothing typed yet", () => {
    const score = scoreTyping("hello", "", 10);
    expect(score?.typedChars).toBe(0);
    expect(score?.accuracyPercent).toBe(0);
    expect(score?.netWpm).toBe(0);
  });

  it("rejects zero or negative elapsed time", () => {
    expect(scoreTyping("hello", "hello", 0)).toBeNull();
    expect(scoreTyping("hello", "hello", -5)).toBeNull();
  });
});

describe("isComplete and speedVerdict", () => {
  it("detects a finished passage", () => {
    expect(isComplete("short", "short")).toBe(true);
    expect(isComplete("short", "shor")).toBe(false);
    expect(isComplete("", "")).toBe(false);
  });

  it("gives a verdict for each band", () => {
    expect(speedVerdict(10)).toContain("Keep practicing");
    expect(speedVerdict(30)).toContain("average");
    expect(speedVerdict(50)).toContain("solid office");
    expect(speedVerdict(70)).toContain("Fast");
    expect(speedVerdict(95)).toContain("Exceptional");
  });
});
