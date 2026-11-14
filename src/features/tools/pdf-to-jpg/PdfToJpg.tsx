"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes } from "../_shared/file-utils";
import { pdfToJpgZip, type PdfJpgQuality } from "./pdf-to-jpg";

type Status = "idle" | "working" | "done" | "error";

const QUALITIES: { value: PdfJpgQuality; label: string; hint: string }[] = [
  { value: "standard", label: "Standard", hint: "Good for screens and sharing, smallest files." },
  { value: "high", label: "High", hint: "Sharp enough for documents and presentations." },
  { value: "print", label: "Print", hint: "Largest and sharpest, suited to printing." },
];

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<PdfJpgQuality>("high");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const run = async () => {
    if (!file) return;
    setStatus("working");
    setError("");
    setProgress("Loading the PDF engine...");
    try {
      const zip = await pdfToJpgZip(file, quality, (page, total) =>
        setProgress(`Rendering page ${page} of ${total}`)
      );
      downloadBlob(zip, file.name.replace(/\.pdf$/i, "") + "-jpg.zip");
      setStatus("done");
    } catch {
      setError("This PDF could not be rendered. It may be damaged or password protected.");
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
            : "Drop a PDF here or click to browse. Pages are rendered on your device and never uploaded."
        }
        onFiles={(files) => {
          setFile(files[0]);
          setStatus("idle");
          setError("");
        }}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Image quality</p>
        <div className="flex flex-wrap gap-2">
          {QUALITIES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQuality(option.value)}
              title={option.hint}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                quality === option.value
                  ? "border-brand-950/60 bg-brand-950/85 text-white shadow-sm"
                  : "border-slate-200 bg-white text-gray-700 hover:bg-white/90 hover:text-brand-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500">{QUALITIES.find((q) => q.value === quality)?.hint}</p>
      </div>

      <button
        type="button"
        disabled={!file || status === "working"}
        onClick={run}
        className="min-h-11 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Converting..." : "Convert to JPG"}
      </button>

      {status === "working" && <p className="text-sm text-gray-600">{progress}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}
      {status === "done" && (
        <p className="text-sm font-medium text-emerald-700">
          Done. Your zip file, with one JPG per page, has been downloaded.
        </p>
      )}
    </div>
  );
}
