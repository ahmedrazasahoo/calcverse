/**
 * WebP to PNG conversion with the canvas API. WebP images saved from
 * websites often need to become PNG for editors, documents and upload
 * forms that do not accept WebP. PNG keeps full quality and, most
 * importantly, keeps transparency. Runs entirely in the browser.
 */

export interface WebpConversion {
  blob: Blob;
  fileName: string;
}

/** Output file name for a converted WebP image. Pure helper. */
export function webpOutputName(fileName: string): string {
  return fileName.replace(/\.webp$/i, ".png");
}

/** Convert one WebP file into a PNG blob. */
export async function convertWebpToPng(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    ctx.drawImage(bitmap, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("This WebP file could not be converted.");
    return blob;
  } finally {
    bitmap.close();
  }
}

/** Convert a batch of WebP files. */
export async function convertWebpBatch(files: File[]): Promise<WebpConversion[]> {
  const results: WebpConversion[] = [];
  for (const file of files) {
    const blob = await convertWebpToPng(file);
    results.push({ blob, fileName: webpOutputName(file.name) });
  }
  return results;
}
