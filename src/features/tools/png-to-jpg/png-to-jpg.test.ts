import { describe, expect, it } from "vitest";
import { pngToJpgName } from "./png-to-jpg";

describe("pngToJpgName", () => {
  it("swaps a png extension for jpg", () => {
    expect(pngToJpgName("photo.png")).toBe("photo.jpg");
  });

  it("handles an uppercase extension", () => {
    expect(pngToJpgName("SCREENSHOT.PNG")).toBe("SCREENSHOT.jpg");
  });

  it("replaces any other extension", () => {
    expect(pngToJpgName("picture.webp")).toBe("picture.jpg");
  });

  it("appends jpg when there is no extension", () => {
    expect(pngToJpgName("picture")).toBe("picture.jpg");
  });
});
