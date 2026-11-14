import { describe, expect, it } from "vitest";
import { computeOutputSize, resizedFileName } from "./resize-image";

describe("computeOutputSize percent mode", () => {
  it("scales both dimensions by the percent", () => {
    // Formula: new = round(original * percent / 100), so 50 percent of
    // 2000x1000 is 1000x500.
    expect(
      computeOutputSize(2000, 1000, { mode: "percent", percent: 50 })
    ).toEqual({ width: 1000, height: 500 });
  });

  it("keeps a minimum of 1 pixel per side", () => {
    expect(computeOutputSize(3, 2, { mode: "percent", percent: 10 })).toEqual({
      width: 1,
      height: 1,
    });
  });
});

describe("computeOutputSize pixels mode", () => {
  it("derives height from width alone when the aspect ratio is locked", () => {
    // Formula: height = round(origH * width / origW) = round(1000 * 800 / 2000) = 400.
    expect(
      computeOutputSize(2000, 1000, { mode: "pixels", width: 800, lockAspect: true })
    ).toEqual({ width: 800, height: 400 });
  });

  it("derives width from height alone when the aspect ratio is locked", () => {
    expect(
      computeOutputSize(2000, 1000, { mode: "pixels", height: 250, lockAspect: true })
    ).toEqual({ width: 500, height: 250 });
  });

  it("fits inside a box when both sides are given and the ratio is locked", () => {
    // Formula: scale = min(1000 / 2000, 1000 / 1000) = 0.5, so the
    // 2000x1000 image fits the 1000x1000 box as 1000x500.
    expect(
      computeOutputSize(2000, 1000, {
        mode: "pixels",
        width: 1000,
        height: 1000,
        lockAspect: true,
      })
    ).toEqual({ width: 1000, height: 500 });
  });

  it("uses exact dimensions when the ratio is not locked", () => {
    expect(
      computeOutputSize(2000, 1000, {
        mode: "pixels",
        width: 640,
        height: 640,
        lockAspect: false,
      })
    ).toEqual({ width: 640, height: 640 });
  });

  it("rejects invalid input", () => {
    expect(() =>
      computeOutputSize(2000, 1000, { mode: "pixels", width: 0, lockAspect: true })
    ).toThrow(RangeError);
    expect(() =>
      computeOutputSize(2000, 1000, { mode: "pixels", width: -5, lockAspect: false })
    ).toThrow(RangeError);
    expect(() =>
      computeOutputSize(2000, 1000, { mode: "pixels", width: 10.5, lockAspect: true })
    ).toThrow(RangeError);
    expect(() =>
      computeOutputSize(2000, 1000, { mode: "pixels", lockAspect: true })
    ).toThrow(RangeError);
    expect(() =>
      computeOutputSize(2000, 1000, { mode: "percent", percent: 0 })
    ).toThrow(RangeError);
    expect(() =>
      computeOutputSize(0, 1000, { mode: "percent", percent: 50 })
    ).toThrow(RangeError);
  });
});

describe("resizedFileName", () => {
  it("builds the base name with dimensions and the new extension", () => {
    expect(resizedFileName("photo.png", 800, 400, "jpeg")).toBe("photo-800x400.jpg");
    expect(resizedFileName("photo.jpg", 100, 50, "png")).toBe("photo-100x50.png");
    expect(resizedFileName("holiday.pic.webp", 10, 10, "webp")).toBe(
      "holiday.pic-10x10.webp"
    );
  });
});
