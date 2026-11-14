"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import {
  getImageDimensions,
  resizeImageFile,
  type ImageFormat,
  type OutputSize,
  type ResizeResult,
} from "./resize-image";

type Status = "idle" | "working" | "done" | "error";

const PERCENTS = [25, 50, 75, 100];

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<OutputSize | null>(null);
  const [widthInput, setWidthInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState<ImageFormat>("jpeg");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResizeResult | null>(null);

  const onFile = async (files: File[]) => {
    const picked = files[0];
    setFile(picked);
    setOriginalSize(null);
    setResult(null);
    setStatus("idle");
    setError("");
    try {
      const dims = await getImageDimensions(picked);
      setOriginalSize(dims);
      setWidthInput(String(dims.width));
      setHeightInput(String(dims.height));
    } catch {
      setError("This file could not be read as an image.");
      setStatus("error");
    }
  };

  const onWidthChange = (value: string) => {
    setWidthInput(value);
    const width = Number(value);
    if (lockAspect && originalSize && Number.isInteger(width) && width > 0) {
      setHeightInput(String(Math.max(1, Math.round((originalSize.height * width) / originalSize.width))));
    }
  };

  const onHeightChange = (value: string) => {
    setHeightInput(value);
    const height = Number(value);
    if (lockAspect && originalSize && Number.isInteger(height) && height > 0) {
      setWidthInput(String(Math.max(1, Math.round((originalSize.width * height) / originalSize.height))));
    }
  };

  const applyPercent = (percent: number) => {
    if (!originalSize) return;
    setWidthInput(String(Math.max(1, Math.round((originalSize.width * percent) / 100))));
    setHeightInput(String(Math.max(1, Math.round((originalSize.height * percent) / 100))));
  };

  const run = async () => {
    if (!file) return;
    const width = widthInput.trim() === "" ? undefined : Number(widthInput);
    const height = heightInput.trim() === "" ? undefined : Number(heightInput);
    setStatus("working");
    setError("");
    setResult(null);
    try {
      const done = await resizeImageFile(
        file,
        { mode: "pixels", width, height, lockAspect },
        format
      );
      setResult(done);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof RangeError
          ? err.message
          : "Resizing failed. The file may not be a readable image."
      );
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="space-y-5">
      <FileDrop
        accept="image/*"
        label={file ? file.name : "Choose an image"}
        hint={
          file
            ? `${formatBytes(file.size)}${originalSize ? `, ${originalSize.width} x ${originalSize.height} pixels` : ", reading dimensions..."}. Drop a different image or click to replace it.`
            : "Drop an image here or click to browse. It is resized on your device and never uploaded."
        }
        onFiles={onFile}
      />

      {originalSize && (
        <p className="text-sm text-gray-600">
          Original dimensions: {originalSize.width} x {originalSize.height} pixels.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="resize-width" className="mb-1.5 block text-sm font-medium text-gray-700">
            Width in pixels
          </label>
          <input
            id="resize-width"
            type="number"
            min={1}
            step={1}
            value={widthInput}
            onChange={(event) => onWidthChange(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="resize-height" className="mb-1.5 block text-sm font-medium text-gray-700">
            Height in pixels
          </label>
          <input
            id="resize-height"
            type="number"
            min={1}
            step={1}
            value={heightInput}
            onChange={(event) => onHeightChange(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={lockAspect}
          onChange={(event) => setLockAspect(event.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Lock aspect ratio, so the picture is never stretched
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Quick scale:</span>
        {PERCENTS.map((percent) => (
          <button
            key={percent}
            type="button"
            disabled={!originalSize}
            onClick={() => applyPercent(percent)}
            className="min-h-9 rounded-full bg-white/85 px-4 py-1.5 text-sm font-semibold text-brand-900 shadow-sm ring-1 ring-white/80 backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {percent}%
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="resize-format" className="mb-1.5 block text-sm font-medium text-gray-700">
          Output format
        </label>
        <select
          id="resize-format"
          value={format}
          onChange={(event) => setFormat(event.target.value as ImageFormat)}
          className={inputClass}
        >
          <option value="jpeg">JPG, best for photos and forms</option>
          <option value="png">PNG, keeps transparency and sharp edges</option>
          <option value="webp">WebP, smallest files for websites</option>
        </select>
      </div>

      <button
        type="button"
        disabled={!file || !originalSize || status === "working"}
        onClick={run}
        className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Resizing..." : "Resize image"}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && file && (
        <ResultPanel
          originalSize={file.size}
          resultBlob={result.blob}
          resultFileName={result.fileName}
          note={`New size: ${result.width} x ${result.height} pixels, ${formatBytes(result.blob.size)}. The dimensions in the file name match the resized picture exactly.`}
        />
      )}
    </div>
  );
}
