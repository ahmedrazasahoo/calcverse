/**
 * WebP to JPG conversion, built on the shared canvas engine in the
 * png-to-jpg folder. WebP images saved from websites often refuse to
 * open in editors, office tools and upload forms. JPG opens almost
 * everywhere. JPG has no transparency, so transparent pixels are
 * painted over a background colour chosen by the visitor (white by
 * default). Runs entirely in the browser; files are never uploaded.
 */

import { replaceExtension } from "../_shared/file-utils";
import { convertImage, type ConvertedImage } from "../png-to-jpg/engine";

/** Output file name for a converted image. Pure helper. */
export function webpToJpgName(fileName: string): string {
  return replaceExtension(fileName, "jpg");
}

/**
 * Convert one WebP file into a JPG blob at the given quality
 * percentage, flattened onto the given background colour.
 */
export async function convertWebpToJpg(
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
