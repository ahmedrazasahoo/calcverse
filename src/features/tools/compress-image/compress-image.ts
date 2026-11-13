/**
 * Image compression to an exact size target, powered by
 * browser-image-compression and a short ladder of our own attempts.
 *
 * The library approaches a maximum size on its own; the ladder walks
 * quality down (and, as a last resort, caps the pixel dimensions) until
 * the result fits the target in KB or nothing more can honestly be
 * squeezed out. Runs in a web worker where the library supports it, and
 * always on the user's own device. The image is never uploaded.
 */

export interface ImageAttempt {
  /** Target ceiling handed to the library, in megabytes. */
  maxSizeMB: number;
  /** Starting JPEG/WebP quality for this attempt, 0 to 1. */
  initialQuality: number;
  /** Optional cap on the longest edge, in pixels. Undefined means keep size. */
  maxDimension?: number;
}

/** Convert kilobytes to the megabytes the library expects. */
export function kbToMb(kb: number): number {
  return kb / 1024;
}

/**
 * Build the attempt ladder for a target size. Early attempts protect
 * quality; later attempts trade quality, then dimensions, for size.
 */
export function buildImageAttempts(targetKb: number): ImageAttempt[] {
  const maxSizeMB = kbToMb(targetKb);
  const qualities = [0.92, 0.82, 0.72, 0.6, 0.47, 0.35];
  const attempts: ImageAttempt[] = qualities.map((initialQuality) => ({ maxSizeMB, initialQuality }));
  attempts.push({ maxSizeMB, initialQuality: 0.33, maxDimension: 1920 });
  attempts.push({ maxSizeMB, initialQuality: 0.3, maxDimension: 1280 });
  attempts.push({ maxSizeMB, initialQuality: 0.26, maxDimension: 960 });
  return attempts;
}

export interface CompressImageResult {
  blob: Blob;
  reachedTarget: boolean;
}

/** Compress one image towards a target size in kilobytes. */
export async function compressImageToTarget(
  file: File,
  targetKb: number,
  onProgress?: (message: string) => void
): Promise<CompressImageResult> {
  const targetBytes = targetKb * 1024;
  if (file.size <= targetBytes) return { blob: file, reachedTarget: true };

  const imageCompression = (await import("browser-image-compression")).default;
  const attempts = buildImageAttempts(targetKb);
  let best: Blob | null = null;

  for (let i = 0; i < attempts.length; i++) {
    const attempt = attempts[i];
    onProgress?.(`Attempt ${i + 1} of ${attempts.length}, quality ${Math.round(attempt.initialQuality * 100)} percent`);
    try {
      const output = await imageCompression(file, {
        maxSizeMB: attempt.maxSizeMB,
        initialQuality: attempt.initialQuality,
        maxWidthOrHeight: attempt.maxDimension,
        useWebWorker: true,
        maxIteration: 12,
      });
      if (!best || output.size < best.size) best = output;
      if (output.size <= targetBytes) break;
    } catch {
      // One failed attempt should not end the job.
      continue;
    }
  }

  if (!best) throw new Error("Image compression failed.");
  return { blob: best, reachedTarget: best.size <= targetBytes };
}
