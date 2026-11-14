import { describe, expect, it } from "vitest";
import {
  computeOutputSize,
  parseSvgIntrinsicSize,
  parseSvgLength,
  parseSvgViewBox,
  svgToPngName,
} from "./svg";

describe("parseSvgLength", () => {
  it("parses a bare number", () => {
    expect(parseSvgLength("240")).toBe(240);
  });

  it("parses a px length", () => {
    expect(parseSvgLength("240px")).toBe(240);
  });

  it("rejects percentages", () => {
    expect(parseSvgLength("100%")).toBeNull();
  });

  it("rejects other units and missing values", () => {
    expect(parseSvgLength("10em")).toBeNull();
    expect(parseSvgLength(undefined)).toBeNull();
  });
});

describe("parseSvgViewBox", () => {
  it("reads the width and height out of a viewBox", () => {
    expect(parseSvgViewBox('<svg viewBox="0 0 100 50"></svg>')).toEqual({ width: 100, height: 50 });
  });

  it("handles comma separators and a nonzero origin", () => {
    expect(parseSvgViewBox('<svg viewBox="-10, -10, 200, 80"></svg>')).toEqual({ width: 200, height: 80 });
  });

  it("returns null without a viewBox", () => {
    expect(parseSvgViewBox('<svg width="10" height="10"></svg>')).toBeNull();
  });
});

describe("parseSvgIntrinsicSize", () => {
  it("prefers explicit width and height attributes", () => {
    expect(parseSvgIntrinsicSize('<svg width="300" height="150" viewBox="0 0 100 100"></svg>')).toEqual({
      width: 300,
      height: 150,
    });
  });

  it("falls back to the viewBox when there are no size attributes", () => {
    expect(parseSvgIntrinsicSize('<svg viewBox="0 0 64 32"></svg>')).toEqual({ width: 64, height: 32 });
  });

  it("combines one attribute with the viewBox aspect ratio", () => {
    expect(parseSvgIntrinsicSize('<svg width="200" viewBox="0 0 100 50"></svg>')).toEqual({
      width: 200,
      height: 100,
    });
  });

  it("reads single quoted attributes", () => {
    expect(parseSvgIntrinsicSize("<svg width='48' height='48'></svg>")).toEqual({ width: 48, height: 48 });
  });

  it("ignores percentage sizes and uses the viewBox", () => {
    expect(parseSvgIntrinsicSize('<svg width="100%" height="100%" viewBox="0 0 24 24"></svg>')).toEqual({
      width: 24,
      height: 24,
    });
  });

  it("returns null when the markup has no usable size", () => {
    expect(parseSvgIntrinsicSize('<svg><rect width="10" height="10"/></svg>')).toBeNull();
    expect(parseSvgIntrinsicSize("not an svg at all")).toBeNull();
  });
});

describe("computeOutputSize", () => {
  const intrinsic = { width: 100, height: 50 };

  it("uses an exact width and height together", () => {
    expect(computeOutputSize(intrinsic, { width: 640, height: 480 })).toEqual({ width: 640, height: 480 });
  });

  it("derives the height from an exact width", () => {
    expect(computeOutputSize(intrinsic, { width: 400 })).toEqual({ width: 400, height: 200 });
  });

  it("derives the width from an exact height", () => {
    expect(computeOutputSize(intrinsic, { height: 25 })).toEqual({ width: 50, height: 25 });
  });

  it("scales the intrinsic size by the scale factor", () => {
    expect(computeOutputSize(intrinsic, { scale: 3 })).toEqual({ width: 300, height: 150 });
    expect(computeOutputSize(intrinsic, { scale: 0.5 })).toEqual({ width: 50, height: 25 });
  });

  it("defaults to the intrinsic size at scale 1", () => {
    expect(computeOutputSize(intrinsic, {})).toEqual({ width: 100, height: 50 });
  });

  it("works without an intrinsic size when both sides are exact", () => {
    expect(computeOutputSize(null, { width: 120, height: 90 })).toEqual({ width: 120, height: 90 });
  });

  it("returns null without an intrinsic size and only one exact side", () => {
    expect(computeOutputSize(null, { width: 120 })).toBeNull();
    expect(computeOutputSize(null, {})).toBeNull();
  });
});

describe("svgToPngName", () => {
  it("swaps an svg extension for png", () => {
    expect(svgToPngName("logo.svg")).toBe("logo.png");
  });
});
