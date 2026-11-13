"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import { compressPdfToTarget, type CompressPdfResult } from "./compress-pdf";

const PRESET_SIZES = [50, 100, 200, 300, 500];

interface CompressPdfProps {
  /** Target size in KB used when the page is a fixed size preset. */
  defaultTargetKb?: number;
  /** When true the target is locked to defaultTargetKb (preset pages). */
  fixedTargetKb?: boolean;
}

type Status = "idle" | "working" | "done" | "error";

export default function CompressPdf({ defaultTargetKb = 200, fixedTargetKb = false }: CompressPdfProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState<number>(defaultTargetKb);
  const [customKb, setCustomKb] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState<string>("");
  const [result, setResult] = useState<CompressPdfResult | null>(null);
  const [error, setError] = useState<string>("");

  const effectiveTarget = fixedTargetKb ? defaultTargetKb : customKb.trim() !== "" ? Number(customKb) || targetKb : targetKb;

  const run = async () => {
    if (!file) return;
    setStatus("working");
    setError("");
    setResult(null);
    try {
      const outcome = await compressPdfToTarget(file, effectiveTarget, setProgress);
      setResult(outcome);
      setStatus("done");
    } catch {
      setError("Something went wrong while reading this PDF. The file may be damaged or password protected.");
      setStatus("error");
    }
  };

  const resultNote = result
    ? result.noImages
      ? "This PDF is mostly text and drawings, so there were no photos inside to shrink. The file is already close to as small as this format gets, and the original is offered unchanged."
      : !result.reachedTarget
        ? `We got it as small as we honestly could, but not all the way down to ${effectiveTarget} KB. The content of this file sets a floor on its size. The smallest version is ready below.`
        : undefined
    : undefined;

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".pdf,application/pdf"
        label={file ? file.name : "Choose a PDF file"}
        hint={file ? `${formatBytes(file.size)}. Drop a different file or click to replace it.` : "Drop a PDF here or click to browse. It is processed in your browser and never uploaded."}
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
                className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold backdrop-blur transition ${
                  effectiveTarget === size && customKb.trim() === ""
                    ? "border-brand-950/60 bg-brand-950/85 text-white shadow-sm"
                    : "border-white/80 bg-white/60 text-gray-700 hover:bg-white/90 hover:text-brand-900"
                }`}
              >
                {size} KB
              </button>
            ))}
            <input
              type="number"
              min={10}
              max={10240}
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
          This page compresses your PDF to <strong>{defaultTargetKb} KB or under</strong> where the content allows it.
        </p>
      )}

      <button
        type="button"
        disabled={!file || status === "working"}
        onClick={run}
        className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Compressing..." : `Compress to ${effectiveTarget} KB`}
      </button>

      {status === "working" && <p className="text-sm text-gray-600">{progress || "Working on your file..."}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && file && (
        <ResultPanel
          originalSize={file.size}
          resultBlob={result.blob}
          resultFileName={file.name.replace(/\.pdf$/i, "") + "-compressed.pdf"}
          note={resultNote}
        />
      )}
    </div>
  );
}
