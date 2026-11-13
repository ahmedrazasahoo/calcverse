import { describe, expect, it } from "vitest";
import { placementForImage, SHEET_SIZES } from "./jpg-to-pdf";

describe("placementForImage", () => {
  it("matches the page to the image in image mode", () => {
    const result = placementForImage(1200, 800, "image");
    expect(result.page).toEqual({ width: 1200, height: 800 });
    expect(result.draw).toEqual({ x: 0, y: 0, width: 1200, height: 800 });
  });

  it("fits a wide image inside A4 with margins, centred", () => {
    const result = placementForImage(2000, 1000, "a4");
    expect(result.page).toEqual(SHEET_SIZES.a4);
    expect(result.draw.width).toBeLessThanOrEqual(SHEET_SIZES.a4.width - 72 + 0.01);
    expect(result.draw.height / result.draw.width).toBeCloseTo(0.5, 3);
    expect(result.draw.x).toBeCloseTo((SHEET_SIZES.a4.width - result.draw.width) / 2, 3);
    expect(result.draw.y).toBeCloseTo((SHEET_SIZES.a4.height - result.draw.height) / 2, 3);
  });

  it("fits a tall image inside Letter without distortion", () => {
    const result = placementForImage(800, 2400, "letter");
    expect(result.draw.height).toBeLessThanOrEqual(SHEET_SIZES.letter.height - 72 + 0.01);
    expect(result.draw.width / result.draw.height).toBeCloseTo(800 / 2400, 3);
  });

  it("survives a zero sized image", () => {
    const result = placementForImage(0, 0, "a4");
    expect(result.page.width).toBeGreaterThan(0);
  });
});
