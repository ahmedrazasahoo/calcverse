import { describe, expect, it } from "vitest";
import { webpToJpgName } from "./webp-to-jpg";

describe("webpToJpgName", () => {
  it("swaps a webp extension for jpg", () => {
    expect(webpToJpgName("image.webp")).toBe("image.jpg");
  });

  it("handles an uppercase extension", () => {
    expect(webpToJpgName("banner.WEBP")).toBe("banner.jpg");
  });

  it("keeps a dotted base name intact", () => {
    expect(webpToJpgName("my.photo.webp")).toBe("my.photo.jpg");
  });

  it("appends jpg when there is no extension", () => {
    expect(webpToJpgName("image")).toBe("image.jpg");
  });
});
