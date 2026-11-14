/**
 * AVIF to JPG conversion with the canvas API. AVIF gives very small
 * files on modern websites, but many editors, office tools, printers
 * and upload forms still refuse it. JPG is the format everything
 * accepts. The browser decodes the AVIF picture and writes the same
 * pixels out as a JPEG. JPG has no transparency, so the canvas is
 * filled white before drawing and transparent areas become white.
 * Runs entirely in the browser; files are never uploaded.
 */

export interface AvifConversion {
  name: string;
  blob: Blob;
  originalSize: number;
  convertedSize: number;
}

/** JPEG quality used for every converted image. */
export const JPG_QUALITY = 0.92;

/** Output file name for a converted AVIF image. Pure helper. */
export function avifOutputName(fileName: string): string {
  if (/\.avif$/i.test(fileName)) {
    return fileName.replace(/\.avif$/i, ".jpg");
  }
  const dot = fileName.lastIndexOf(".");
  if (dot <= 0) {
    return `${fileName}.jpg`;
  }
  return `${fileName.slice(0, dot)}.jpg`;
}

/** Convert one AVIF file into a JPG blob. */
export async function convertAvifToJpg(file: File): Promise<Blob> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("This browser could not decode the AVIF file.");
  }
  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPG_QUALITY)
    );
    if (!blob) throw new Error("This AVIF file could not be converted.");
    return blob;
  } finally {
    bitmap.close();
  }
}

/** Convert a batch of AVIF files. */
export async function convertAvifBatch(files: File[]): Promise<AvifConversion[]> {
  const results: AvifConversion[] = [];
  for (const file of files) {
    const blob = await convertAvifToJpg(file);
    results.push({
      name: avifOutputName(file.name),
      blob,
      originalSize: file.size,
      convertedSize: blob.size,
    });
  }
  return results;
}
