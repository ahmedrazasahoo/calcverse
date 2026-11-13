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
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                angle === option.value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-brand-400"
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
        className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
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
