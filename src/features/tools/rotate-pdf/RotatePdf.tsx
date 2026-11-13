"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import { rotatePdf, type RotationAngle } from "./rotate-pdf";

type Status = "idle" | "working" | "done" | "error";

const ANGLES: { value: RotationAngle; label: string }[] = [
  { value: 90, label: "90 degrees right" },
  { value: 180, label: "180 degrees (upside down fix)" },
  { value: 270, label: "90 degrees left" },
];

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    if (!file) return;
    setStatus("working");
    setError("");
    try {
      setResult(await rotatePdf(file, angle));
      setStatus("done");
    } catch {
      setError("This PDF could not be read. It may be damaged or password protected.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".pdf,application/pdf"
        label={file ? file.name : "Choose a PDF file"}
        hint={
          file
            ? `${formatBytes(file.size)}. Drop a different file or click to replace it.`
            : "Drop a PDF here or click to browse. Rotation is applied on your device only."
        }
        onFiles={(files) => {
          setFile(files[0]);
          setResult(null);
          setStatus("idle");
        }}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Turn every page by</p>
        <div className="flex flex-wrap gap-2">
          {ANGLES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAngle(option.value)}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold backdrop-blur transition ${
                angle === option.value
                  ? "border-brand-950/60 bg-brand-950/85 text-white shadow-sm"
                  : "border-white/80 bg-white/60 text-gray-700 hover:bg-white/90 hover:text-brand-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!file || status === "working"}
        onClick={run}
        className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Rotating..." : "Rotate PDF"}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && file && (
        <ResultPanel
          originalSize={file.size}
          resultBlob={result}
          resultFileName={file.name.replace(/\.pdf$/i, "") + "-rotated.pdf"}
        />
      )}
    </div>
  );
}
