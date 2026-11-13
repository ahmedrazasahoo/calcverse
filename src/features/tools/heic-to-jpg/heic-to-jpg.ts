/**
 * HEIC to JPG conversion. iPhone photos arrive in HEIC format, which
 * many Windows apps, portals and older devices refuse to open. The
 * heic2any decoder (loaded lazily, it is heavy) turns each file into a
 * JPEG in the browser, and a canvas pass sets the final quality.
 * Nothing is uploaded; conversion happens on the user's device.
 */

export interface HeicConversion {
  blob: Blob;
  fileName: string;
}

/** Output file name for a converted HEIC photo. Pure helper. */
export function heicOutputName(fileName: string): string {
  return fileName.replace(/\.heic$/i, ".jpg").replace(/\.heif$/i, ".jpg");
}

/** Convert one HEIC or HEIF file into a JPEG blob at the given quality (0 to 1). */
export async function convertHeicToJpg(file: File, quality = 0.92): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality });
  const first = Array.isArray(converted) ? converted[0] : converted;
  if (!first) throw new Error("This HEIC file could not be decoded.");
  return first;
}

/** Convert a batch of HEIC files, reporting progress as each one finishes. */
export async function convertHeicBatch(
  files: File[],
  quality: number,
  onProgress?: (done: number, total: number) => void
): Promise<HeicConversion[]> {
  const results: HeicConversion[] = [];
  for (let i = 0; i < files.length; i++) {
    const blob = await convertHeicToJpg(files[i], quality);
    results.push({ blob, fileName: heicOutputName(files[i].name) });
    onProgress?.(i + 1, files.length);
  }
  return results;
}
