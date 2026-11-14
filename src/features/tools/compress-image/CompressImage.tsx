"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import { compressImageToTarget, type CompressImageResult } from "./compress-image";

const PRESET_SIZES = [20, 50, 100, 200, 300, 500];

interface CompressImageProps {
  defaultTargetKb?: number;
  fixedTargetKb?: boolean;
}

type Status = "idle" | "working" | "done" | "error";

function extensionFor(blob: Blob, fallbackName: string): string {
  if (blob.type === "image/png") return "png";
  if (blob.type === "image/webp") return "webp";
  if (blob.type === "image/jpeg") return "jpg";
  const dot = fallbackName.lastIndexOf(".");
  return dot > 0 ? fallbackName.slice(dot + 1) : "jpg";
}

export default function CompressImage({ defaultTargetKb = 100, fixedTargetKb = false }: CompressImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState<number>(defaultTargetKb);
  const [customKb, setCustomKb] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<CompressImageResult | null>(null);
  const [error, setError] = useState("");

  const effectiveTarget = fixedTargetKb ? defaultTargetKb : customKb.trim() !== "" ? Number(customKb) || targetKb : targetKb;

  const run = async () => {
    if (!file) return;
    setStatus("working");
    setError("");
    setResult(null);
    try {
      setResult(await compressImageToTarget(file, effectiveTarget, setProgress));
      setStatus("done");
    } catch {
      setError("This image could not be processed. Try a standard JPG, PNG or WebP file.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <FileDrop
        accept="image/jpeg,image/png,image/webp"
        label={file ? file.name : "Choose an image"}
        hint={
          file
            ? `${formatBytes(file.size)}. Drop a different image or click to replace it.`
            : "Drop a JPG, PNG or WebP image here. It is compressed in your browser and never uploaded."
        }
        onFiles={(files) => {
          setFile(files[0]);
          setResult(null);
          setStatus("idle");
        }}
      />

      {!fixedTargetKb && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Target size</p>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setTargetKb(size);
                  setCustomKb("");
                }}
                className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  effectiveTarget === size && customKb.trim() === ""
                    ? "border-brand-950/60 bg-brand-950/85 text-white shadow-sm"
                    : "border-slate-200 bg-white text-gray-700 hover:bg-white/90 hover:text-brand-900"
                }`}
              >
                {size} KB
              </button>
            ))}
            <input
              type="number"
              min={5}
              max={5120}
              value={customKb}
              onChange={(event) => setCustomKb(event.target.value)}
              placeholder="Custom KB"
              aria-label="Custom target size in kilobytes"
              className="w-32 rounded-lg border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
      )}

      {fixedTargetKb && (
        <p className="text-sm text-gray-600">
          This page compresses your image to <strong>{defaultTargetKb} KB or under</strong> where the content allows it.
        </p>
      )}

      <button
        type="button"
        disabled={!file || status === "working"}
        onClick={run}
        className="min-h-11 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Compressing..." : `Compress to ${effectiveTarget} KB`}
      </button>

      {status === "working" && <p className="text-sm text-gray-600">{progress || "Working on your image..."}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && file && (
        <ResultPanel
          originalSize={file.size}
          resultBlob={result.blob}
          resultFileName={`${file.name.slice(0, file.name.lastIndexOf(".")) || file.name}-compressed.${extensionFor(result.blob, file.name)}`}
          note={
            result.reachedTarget
              ? undefined
              : `This is the smallest honest version we could make. Very detailed photos have a floor below which they stop looking like themselves, and the tool stops there rather than handing you a blur.`
          }
        />
      )}
    </div>
  );
}
