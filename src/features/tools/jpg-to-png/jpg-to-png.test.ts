import { describe, expect, it } from "vitest";
import { jpgToPngName } from "./jpg-to-png";

describe("jpgToPngName", () => {
  it("swaps a jpg extension for png", () => {
    expect(jpgToPngName("photo.jpg")).toBe("photo.png");
  });

  it("swaps a jpeg extension for png", () => {
    expect(jpgToPngName("photo.jpeg")).toBe("photo.png");
  });

  it("handles an uppercase extension", () => {
    expect(jpgToPngName("IMG_2041.JPG")).toBe("IMG_2041.png");
  });

  it("appends png when there is no extension", () => {
    expect(jpgToPngName("picture")).toBe("picture.png");
  });
});
