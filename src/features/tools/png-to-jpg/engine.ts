/**
 * Shared canvas engine for the image format converters in this cluster
 * (PNG to JPG, JPG to PNG, WebP to JPG and SVG to PNG).
 *
 * The engine loads an image from a File, a Blob or a URL string, draws
 * it onto a canvas at its natural size or at an exact target size, and
 * exports the canvas as a blob in the requested format. Everything runs
 * in the visitor's browser; files are never uploaded anywhere.
 *
 * The sizing maths (fitWithin) is pure and unit tested. The canvas
 * functions themselves only run in a browser.
 */

import { clampQuality } from "../_shared/file-utils";

export interface ImageSize {
  width: number;
  height: number;
}

export interface ConvertImageOptions {
  /** Output MIME type, for example "image/jpeg" or "image/png". */
  mimeType: string;
  /** Quality for lossy formats such as JPEG and WebP, 0 to 1. Ignored
   *  by lossless formats. Clamped into the usable range. */
  quality?: number;
  /** CSS colour painted onto the canvas before the image is drawn.
   *  Needed for JPEG output, which has no transparency: without a fill,
   *  transparent pixels would come out black. Omit it to keep
   *  transparency in formats that support it, such as PNG. */
  background?: string;
  /** Exact output width in pixels. When only one of width and height
   *  is given, the other follows the image's aspect ratio. */
  width?: number;
  /** Exact output height in pixels. See width. */
  height?: number;
}

/**
 * Fit a natural size inside optional maximum bounds, preserving the
 * aspect ratio and never upscaling. Returns the natural size unchanged
 * when no bounds are given. Pure helper.
 */
export function fitWithin(
  naturalWidth: number,
  naturalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): ImageSize {
  if (naturalWidth <= 0 || naturalHeight <= 0) return { width: 0, height: 0 };
  let scale = 1;
  if (maxWidth !== undefined && maxWidth > 0) {
    scale = Math.min(scale, maxWidth / naturalWidth);
  }
  if (maxHeight !== undefined && maxHeight > 0) {
    scale = Math.min(scale, maxHeight / naturalHeight);
  }
  return {
    width: Math.max(1, Math.round(naturalWidth * scale)),
    height: Math.max(1, Math.round(naturalHeight * scale)),
  };
}

/**
 * Work out the exact canvas size for a conversion: the natural size by
 * default, an exact width and height when both are given, or one exact
 * side with the other scaled to keep the aspect ratio. Pure helper.
 */
export function outputSize(
  naturalWidth: number,
  naturalHeight: number,
  width?: number,
  height?: number
): ImageSize {
  if (naturalWidth <= 0 || naturalHeight <= 0) return { width: 0, height: 0 };
  if (width !== undefined && width > 0 && height !== undefined && height > 0) {
    return { width: Math.round(width), height: Math.round(height) };
  }
  if (width !== undefined && width > 0) {
    return {
      width: Math.round(width),
      height: Math.max(1, Math.round((width * naturalHeight) / naturalWidth)),
    };
  }
  if (height !== undefined && height > 0) {
    return {
      width: Math.max(1, Math.round((height * naturalWidth) / naturalHeight)),
      height: Math.round(height),
    };
  }
  return { width: Math.round(naturalWidth), height: Math.round(naturalHeight) };
}

/** Load an image element from a File, a Blob or a URL string. */
export function loadImage(source: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = typeof source === "string" ? source : URL.createObjectURL(source);
    const img = new Image();
    img.onload = () => {
      if (typeof source !== "string") URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      if (typeof source !== "string") URL.revokeObjectURL(url);
      reject(new Error("This file could not be read as an image."));
    };
    img.src = url;
  });
}

export interface ConvertedImage {
  blob: Blob;
  width: number;
  height: number;
}

/**
 * Convert an image by drawing it to a canvas and exporting a blob.
 * Fills the canvas with the background colour first when one is given.
 */
export async function convertImage(
  source: File | Blob | string,
  options: ConvertImageOptions
): Promise<ConvertedImage> {
  const img = await loadImage(source);
  const size = outputSize(img.naturalWidth, img.naturalHeight, options.width, options.height);
  if (size.width === 0 || size.height === 0) {
    throw new Error("This image has no readable dimensions.");
  }
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  if (options.background !== undefined) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, size.width, size.height);
  }
  ctx.drawImage(img, 0, 0, size.width, size.height);
  const quality = options.quality === undefined ? undefined : clampQuality(options.quality);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, options.mimeType, quality)
  );
  if (!blob) throw new Error("This image could not be converted.");
  return { blob, width: size.width, height: size.height };
}
