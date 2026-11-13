/**
 * PDF compression engine.
 *
 * Strategy, the same one most in-browser compressors use: the bulk of a
 * typical PDF is embedded photos and scans. We decode those images,
 * re-encode them as JPEGs at a lower quality (and, if needed, a smaller
 * size) with a canvas, and rebuild the file with pdf-lib. A ladder of
 * attempts runs from gentle to aggressive until the target size is met
 * or the ladder runs out, and the smallest result wins.
 *
 * Honest limits: a PDF that is mostly text and vector drawings has
 * almost nothing to re-encode, so it will not shrink much. The result
 * reports that case instead of pretending otherwise.
 *
 * Everything runs locally in the browser. The file is never uploaded.
 */

import { QUALITY_LADDER, targetBytesForKb } from "../_shared/file-utils";

export interface CompressionAttempt {
  quality: number;
  scale: number;
}

/**
 * Build the ordered list of attempts for a job. When the original file
 * is far above the target, gentle early steps are skipped so the user
 * does not wait through attempts that cannot possibly reach the target.
 * Qualities always descend and scales never grow within the plan.
 */
export function planAttempts(originalBytes: number, targetKb: number): CompressionAttempt[] {
  const target = targetBytesForKb(targetKb);
  const ratio = target > 0 ? originalBytes / target : 1;
  const qualities =
    ratio > 8 ? [0.55, 0.4, 0.28, 0.18] : ratio > 3 ? [0.7, 0.55, 0.4, 0.28, 0.18] : [...QUALITY_LADDER];
  const attempts: CompressionAttempt[] = qualities.map((quality) => ({ quality, scale: 1 }));
  // Last resort attempts: shrink the pixel dimensions of the images too.
  // Qualities keep descending so the plan stays ordered by aggressiveness.
  attempts.push({ quality: 0.16, scale: 0.7 });
  attempts.push({ quality: 0.14, scale: 0.55 });
  attempts.push({ quality: 0.12, scale: 0.4 });
  return attempts;
}

/** Index of the smallest value in a list of attempt sizes, or -1 when empty. */
export function indexOfSmallest(sizes: number[]): number {
  let best = -1;
  sizes.forEach((size, i) => {
    if (best === -1 || size < sizes[best]) best = i;
  });
  return best;
}

export interface CompressPdfResult {
  blob: Blob;
  /** True when the result fits inside the requested target. */
  reachedTarget: boolean;
  /** True when the PDF held no re-encodable images (text heavy file). */
  noImages: boolean;
  /** How many embedded images were re-encoded in the winning attempt. */
  imagesProcessed: number;
}

interface EmbeddedImageInfo {
  width: number;
  height: number;
  /** Bytes of the stored image stream, used to skip tiny images. */
  byteLength: number;
}

const MIN_IMAGE_BYTES = 8 * 1024;

/** Read a numeric entry from a stream dictionary, or undefined. */
function dictNumber(dict: { get(key: unknown): unknown }, key: unknown): number | undefined {
  const value = dict.get(key) as { asNumber?: () => number } | undefined;
  const n = typeof value?.asNumber === "function" ? value.asNumber() : undefined;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
}

/** Inflate zlib (PDF FlateDecode) bytes with the browser's built in decoder. */
async function inflate(bytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const stream = new Blob([bytes.buffer as ArrayBuffer])
      .stream()
      .pipeThrough(new DecompressionStream("deflate"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    return null;
  }
}

/** Decode one embedded image to a bitmap, or return null when unsupported. */
async function decodeEmbeddedImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stream: any,
  filterName: string,
  info: EmbeddedImageInfo,
  colorSpace: string
): Promise<ImageBitmap | null> {
  try {
    const stored: Uint8Array = stream.getContents();
    if (filterName === "DCTDecode") {
      const blob = new Blob([stored.buffer as ArrayBuffer], { type: "image/jpeg" });
      return await createImageBitmap(blob);
    }
    if (filterName === "FlateDecode") {
      const components = colorSpace === "DeviceGray" ? 1 : colorSpace === "DeviceRGB" ? 3 : 0;
      if (components === 0) return null;
      const expected = info.width * info.height * components;
      // Stored flate bytes are still compressed; inflate when the raw
      // length does not already match the expected sample count.
      const contents = stored.length === expected ? stored : await inflate(stored);
      if (!contents || contents.length !== expected) return null;
      const rgba = new Uint8ClampedArray(info.width * info.height * 4);
      for (let px = 0, src = 0; px < info.width * info.height; px++, src += components) {
        const out = px * 4;
        if (components === 1) {
          rgba[out] = rgba[out + 1] = rgba[out + 2] = contents[src];
        } else {
          rgba[out] = contents[src];
          rgba[out + 1] = contents[src + 1];
          rgba[out + 2] = contents[src + 2];
        }
        rgba[out + 3] = 255;
      }
      const imageData = new ImageData(rgba, info.width, info.height);
      return await createImageBitmap(imageData);
    }
  } catch {
    return null;
  }
  return null;
}

/** Re-encode a bitmap as JPEG bytes at the given quality and scale. */
async function encodeJpeg(bitmap: ImageBitmap, quality: number, scale: number): Promise<Uint8Array | null> {
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0, width, height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (!blob) return null;
  return new Uint8Array(await blob.arrayBuffer());
}

/** Run one compression attempt and return the saved bytes. */
async function runAttempt(
  originalBytes: ArrayBuffer,
  attempt: CompressionAttempt
): Promise<{ bytes: Uint8Array; imagesProcessed: number }> {
  const { PDFDocument, PDFName, PDFRawStream } = await import("pdf-lib");
  const doc = await PDFDocument.load(originalBytes.slice(0), { ignoreEncryption: true });
  let imagesProcessed = 0;

  for (const [ref, object] of doc.context.enumerateIndirectObjects()) {
    if (!(object instanceof PDFRawStream)) continue;
    const dict = object.dict;
    const subtype = dict.get(PDFName.of("Subtype"));
    if (!subtype || subtype.toString() !== "/Image") continue;
    // Skip images with a transparency mask; re-encoding them would damage them.
    if (dict.get(PDFName.of("SMask"))) continue;
    const w = dictNumber(dict, PDFName.of("Width"));
    const h = dictNumber(dict, PDFName.of("Height"));
    if (!w || !h) continue;
    const contents: Uint8Array = object.getContents();
    if (contents.length < MIN_IMAGE_BYTES) continue;

    const filterEntry = dict.get(PDFName.of("Filter"));
    const filterName = filterEntry ? filterEntry.toString().replace("/", "") : "FlateDecode";
    if (!filterName.includes("DCTDecode") && !filterName.includes("FlateDecode")) continue;
    const colorSpaceEntry = dict.get(PDFName.of("ColorSpace"));
    const colorSpace = colorSpaceEntry ? colorSpaceEntry.toString().replace("/", "") : "DeviceRGB";

    const bitmap = await decodeEmbeddedImage(
      object,
      filterName.includes("DCTDecode") ? "DCTDecode" : "FlateDecode",
      { width: w, height: h, byteLength: contents.length },
      colorSpace
    );
    if (!bitmap) continue;
    const jpeg = await encodeJpeg(bitmap, attempt.quality, attempt.scale);
    bitmap.close();
    if (!jpeg || jpeg.length >= contents.length) continue;

    const newWidth = Math.max(1, Math.round(w * attempt.scale));
    const newHeight = Math.max(1, Math.round(h * attempt.scale));
    const replacement = doc.context.stream(jpeg, {
      Type: "XObject",
      Subtype: "Image",
      Width: newWidth,
      Height: newHeight,
      ColorSpace: "DeviceRGB",
      BitsPerComponent: 8,
      Filter: "DCTDecode",
      Length: jpeg.length,
    });
    doc.context.assign(ref, replacement);
    imagesProcessed++;
  }

  const saved = await doc.save({ useObjectStreams: true });
  return { bytes: saved, imagesProcessed };
}

/**
 * Compress a PDF towards a target size in kilobytes.
 * Calls onProgress with a short status line for each attempt.
 */
export async function compressPdfToTarget(
  file: File,
  targetKb: number,
  onProgress?: (message: string) => void
): Promise<CompressPdfResult> {
  const targetBytes = targetBytesForKb(targetKb);
  const originalBytes = await file.arrayBuffer();
  if (file.size <= targetBytes) {
    return {
      blob: new Blob([originalBytes], { type: "application/pdf" }),
      reachedTarget: true,
      noImages: false,
      imagesProcessed: 0,
    };
  }

  const attempts = planAttempts(file.size, targetKb);
  let best: { bytes: Uint8Array; imagesProcessed: number } | null = null;

  for (let i = 0; i < attempts.length; i++) {
    onProgress?.(`Trying quality ${Math.round(attempts[i].quality * 100)} percent, attempt ${i + 1} of ${attempts.length}`);
    try {
      const outcome = await runAttempt(originalBytes, attempts[i]);
      if (!best || outcome.bytes.length < best.bytes.length) best = outcome;
      if (outcome.bytes.length <= targetBytes) break;
      if (outcome.imagesProcessed === 0) break;
    } catch {
      // A failed attempt should not kill the job; later attempts may work.
      if (!best) continue;
    }
  }

  if (!best || best.imagesProcessed === 0) {
    return {
      blob: new Blob([originalBytes], { type: "application/pdf" }),
      reachedTarget: false,
      noImages: true,
      imagesProcessed: 0,
    };
  }

  const blobBytes = best.bytes.slice(0);
  return {
    blob: new Blob([blobBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
    reachedTarget: best.bytes.length <= targetBytes,
    noImages: false,
    imagesProcessed: best.imagesProcessed,
  };
}
