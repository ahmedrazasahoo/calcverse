import { describe, expect, it } from "vitest";
import { heicOutputName } from "./heic-to-jpg";

describe("heicOutputName", () => {
  it("renames HEIC and HEIF files to JPG", () => {
    expect(heicOutputName("IMG_4021.HEIC")).toBe("IMG_4021.jpg");
    expect(heicOutputName("photo.heif")).toBe("photo.jpg");
    expect(heicOutputName("my.photo.heic")).toBe("my.photo.jpg");
  });
});
