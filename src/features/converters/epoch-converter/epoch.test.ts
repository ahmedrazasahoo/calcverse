import { describe, expect, it } from "vitest";
import { detectUnit, fromEpochMs, toEpochMs } from "./epoch";

describe("toEpochMs", () => {
  it("converts seconds to milliseconds", () => {
    expect(toEpochMs("1700000000", "seconds")).toBe(1700000000000);
    expect(toEpochMs(1700000000, "seconds")).toBe(1700000000000);
  });

  it("passes milliseconds through", () => {
    expect(toEpochMs("1700000000000", "milliseconds")).toBe(1700000000000);
  });

  it("converts microseconds with string safe division", () => {
    expect(toEpochMs("1700000000123456", "microseconds")).toBe(1700000000123.456);
  });

  it("converts nanoseconds with string safe division", () => {
    expect(toEpochMs("1700000000000000000", "nanoseconds")).toBe(1700000000000);
    expect(toEpochMs("1700000000123456789", "nanoseconds")).toBe(1700000000123.456789);
  });

  it("handles zero and negatives", () => {
    expect(toEpochMs("0", "seconds")).toBe(0);
    expect(toEpochMs("-1000", "milliseconds")).toBe(-1000);
  });
});

describe("fromEpochMs", () => {
  it("maps 0 to the epoch start", () => {
    const parts = fromEpochMs(0);
    expect(parts.iso).toBe("1970-01-01T00:00:00.000Z");
    expect(parts.seconds).toBe(0);
    expect(parts.microseconds).toBe("0");
    expect(parts.nanoseconds).toBe("0");
  });

  it("maps 1700000000 seconds correctly", () => {
    const parts = fromEpochMs(toEpochMs("1700000000", "seconds"));
    expect(parts.iso).toBe("2023-11-14T22:13:20.000Z");
    expect(parts.seconds).toBe(1700000000);
    expect(parts.milliseconds).toBe(1700000000000);
    expect(parts.microseconds).toBe("1700000000000000");
    expect(parts.nanoseconds).toBe("1700000000000000000");
  });
});

describe("detectUnit", () => {
  it("detects units by digit length", () => {
    expect(detectUnit("1700000000")).toBe("seconds");
    expect(detectUnit("1700000000000")).toBe("milliseconds");
    expect(detectUnit("1700000000000000")).toBe("microseconds");
    expect(detectUnit("1700000000000000000")).toBe("nanoseconds");
    expect(detectUnit("0")).toBe("seconds");
  });
});
