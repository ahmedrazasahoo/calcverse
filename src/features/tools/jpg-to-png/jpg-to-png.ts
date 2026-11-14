/**
 * JPG to PNG conversion, built on the shared canvas engine in the
 * png-to-jpg folder. PNG stores pixels losslessly, so the PNG holds
 * exactly the pixels the JPG had, no better and no worse, and it can
 * be edited and re-saved without losing more quality each time.
 * There is deliberately no quality setting: PNG export is lossless,
 * so a quality slider would do nothing. Runs entirely in the
 * browser; files are never uploaded.
 */

import { replaceExtension } from "../_shared/file-utils";
import { convertImage, type ConvertedImage } from "../png-to-jpg/engine";

/** Output file name for a converted image. Pure helper. */
export function jpgToPngName(fileName: string): string {
  return replaceExtension(fileName, "png");
}

/** Convert one JPG file (or any image the browser can open) into a PNG blob. */
export async function convertJpgToPng(file: File): Promise<ConvertedImage> {
  return convertImage(file, { mimeType: "image/png" });
}
