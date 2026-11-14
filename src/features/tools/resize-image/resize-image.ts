/**
 * Image resizing with the canvas API.
 *
 * The pure helper computeOutputSize decides the target dimensions for
 * either an exact pixel request or a percentage scale. The conversion
 * itself draws the image onto a canvas at those dimensions and exports
 * it in the chosen format. Everything runs in the browser; the image
 * is never uploaded.
 */

export type ImageFormat = "jpeg" | "png" | "webp";

export type ResizeOptions =
  | { mode: "pixels"; width?: number; height?: number; lockAspect: boolean }
  | { mode: "percent"; percent: number };

export interface OutputSize {
  width: number;
  height: number;
}

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive whole number.`);
  }
}

function atLeastOne(value: number): number {
  return Math.max(1, Math.round(value));
}

/**
 * Decide the output dimensions for a resize.
 * Percent mode: both dimensions scale by percent / 100, rounded, with
 * a minimum of 1 pixel per side.
 * Pixels mode with the aspect ratio locked: a single given side scales
 * the other side by the same ratio, and a given box fits the image
 * inside it using scale = min(boxW / origW, boxH / origH).
 * Pixels mode without the lock: given sides are used exactly, and a
 * side that is not given keeps its original size.
 * Throws RangeError on any invalid input.
 */
export function computeOutputSize(
  origW: number,
  origH: number,
  options: ResizeOptions
): OutputSize {
  assertPositiveInteger(origW, "Original width");
  assertPositiveInteger(origH, "Original height");

  if (options.mode === "percent") {
    if (!Number.isFinite(options.percent) || options.percent <= 0) {
      throw new RangeError("Percent must be a positive number.");
    }
    const scale = options.percent / 100;
    return {
      width: atLeastOne(origW * scale),
      height: atLeastOne(origH * scale),
    };
  }

  const { width, height, lockAspect } = options;
  if (width === undefined && height === undefined) {
    throw new RangeError("Give a width, a height, or both.");
  }
  if (width !== undefined) assertPositiveInteger(width, "Width");
  if (height !== undefined) assertPositiveInteger(height, "Height");

  if (!lockAspect) {
    return {
      width: width ?? origW,
      height: height ?? origH,
    };
  }

  if (width !== undefined && height !== undefined) {
    const scale = Math.min(width / origW, height / origH);
    return {
      width: atLeastOne(origW * scale),
      height: atLeastOne(origH * scale),
    };
  }
  if (width !== undefined) {
    return { width, height: atLeastOne(origH * (width / origW)) };
  }
  const targetHeight = height as number;
  return { width: atLeastOne(origW * (targetHeight / origH)), height: targetHeight };
}

/** MIME type for an output format. */
export function mimeForFormat(format: ImageFormat): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
  }
}

/** File extension for an output format. */
export function extensionForFormat(format: ImageFormat): string {
  return format === "jpeg" ? "jpg" : format;
}

/**
 * Output file name for a resized image, for example
 * "photo-800x400.jpg" from "photo.png" at 800 by 400 as JPEG.
 * Pure helper.
 */
export function resizedFileName(
  fileName: string,
  width: number,
  height: number,
  format: ImageFormat
): string {
  assertPositiveInteger(width, "Width");
  assertPositiveInteger(height, "Height");
  const dot = fileName.lastIndexOf(".");
  const base = dot > 0 ? fileName.slice(0, dot) : fileName;
  return `${base}-${width}x${height}.${extensionForFormat(format)}`;
}

/** Read the pixel dimensions of an image file. */
export async function getImageDimensions(file: File): Promise<OutputSize> {
  const bitmap = await createImageBitmap(file);
  try {
    return { width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}

export interface ResizeResult {
  blob: Blob;
  fileName: string;
  width: number;
  height: number;
}

/** Resize one image file to the dimensions chosen by computeOutputSize. */
export async function resizeImageFile(
  file: File,
  options: ResizeOptions,
  format: ImageFormat
): Promise<ResizeResult> {
  const bitmap = await createImageBitmap(file);
  try {
    const size = computeOutputSize(bitmap.width, bitmap.height, options);
    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    if (format === "jpeg") {
      // JPEG has no transparency, so paint white first or clear areas
      // from a PNG or WebP source would come out black.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const mime = mimeForFormat(format);
    const quality = format === "png" ? undefined : 0.92;
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mime, quality)
    );
    if (!blob) throw new Error("This image could not be resized.");
    return {
      blob,
      fileName: resizedFileName(file.name, size.width, size.height, format),
      width: size.width,
      height: size.height,
    };
  } finally {
    bitmap.close();
  }
}
