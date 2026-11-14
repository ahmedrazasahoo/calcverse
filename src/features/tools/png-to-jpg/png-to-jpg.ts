/**
 * PNG to JPG conversion, built on the shared canvas engine in this
 * folder. JPG is smaller and accepted everywhere, but it has no
 * transparency, so transparent pixels are painted over a background
 * colour chosen by the visitor (white by default). Runs entirely in
 * the browser; files are never uploaded.
 */

import { replaceExtension } from "../_shared/file-utils";
import { convertImage, type ConvertedImage } from "./engine";

/** Output file name for a converted image. Pure helper. */
export function pngToJpgName(fileName: string): string {
  return replaceExtension(fileName, "jpg");
}

/**
 * Convert one image file (a PNG, or any image the browser can open)
 * into a JPG blob at the given quality percentage, flattened onto the
 * given background colour.
 */
export async function convertPngToJpg(
  file: File,
  qualityPercent: number,
  background: string
): Promise<ConvertedImage> {
  return convertImage(file, {
    mimeType: "image/jpeg",
    quality: qualityPercent / 100,
    background,
  });
}
