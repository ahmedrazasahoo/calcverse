import { describe, expect, it } from "vitest";
import { fitWithin, outputSize } from "./engine";

describe("fitWithin", () => {
  it("returns the natural size when no bounds are given", () => {
    expect(fitWithin(800, 600)).toEqual({ width: 800, height: 600 });
  });

  it("scales down to a maximum width and keeps the aspect ratio", () => {
    expect(fitWithin(800, 600, 400)).toEqual({ width: 400, height: 300 });
  });

  it("scales down to a maximum height and keeps the aspect ratio", () => {
    expect(fitWithin(800, 600, undefined, 150)).toEqual({ width: 200, height: 150 });
  });

  it("uses the tighter of the two bounds", () => {
    expect(fitWithin(1000, 500, 400, 400)).toEqual({ width: 400, height: 200 });
  });

  it("never upscales a smaller image", () => {
    expect(fitWithin(200, 100, 800, 800)).toEqual({ width: 200, height: 100 });
  });

  it("returns zero size for a degenerate image", () => {
    expect(fitWithin(0, 100)).toEqual({ width: 0, height: 0 });
  });
});

describe("outputSize", () => {
  it("defaults to the natural size", () => {
    expect(outputSize(1024, 768)).toEqual({ width: 1024, height: 768 });
  });

  it("uses an exact width and height when both are given", () => {
    expect(outputSize(1024, 768, 500, 500)).toEqual({ width: 500, height: 500 });
  });

  it("derives the height from an exact width", () => {
    expect(outputSize(1024, 768, 512)).toEqual({ width: 512, height: 384 });
  });

  it("derives the width from an exact height", () => {
    expect(outputSize(1024, 768, undefined, 384)).toEqual({ width: 512, height: 384 });
  });

  it("rounds fractional results to whole pixels", () => {
    expect(outputSize(1000, 333, 500)).toEqual({ width: 500, height: 167 });
  });
});
