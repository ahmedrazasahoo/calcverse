"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import { moveItem } from "../merge-pdf/merge-pdf";
import { imagesToPdf, type PageMode } from "./jpg-to-pdf";

type Status = "idle" | "working" | "done" | "error";

const MODES: { value: PageMode; label: string; hint: string }[] = [
  { value: "image", label: "Page matches image", hint: "Each page is exactly the size of its photo." },
  { value: "a4", label: "Fit on A4", hint: "Images are centred on A4 sheets, ready to print." },
  { value: "letter", label: "Fit on Letter", hint: "Images are centred on US Letter sheets." },
];

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<PageMode>("a4");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState("");

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  const run = async () => {
    setStatus("working");
    setError("");
    try {
      setResult(await imagesToPdf(files, mode));
      setStatus("done");
    } catch {
      setError("One of the images could not be read. JPG and PNG files are supported.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <FileDrop
        accept="image/jpeg,image/png"
        multiple
        label={files.length === 0 ? "Choose JPG or PNG images" : "Add more images"}
        hint="Drop images here or click to browse. Page order follows the list below, and everything stays on your device."
        onFiles={(incoming) => {
          setFiles((prev) => [...prev, ...incoming]);
          setResult(null);
          setStatus("idle");
        }}
      />

      {files.length > 0 && (
        <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center gap-3 px-4 py-3">
              <span className="w-6 text-sm font-semibold text-gray-400">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-gray-800">{file.name}</span>
                <span className="text-xs text-gray-500">{formatBytes(file.size)}</span>
              </span>
              <button
                type="button"
                aria-label={`Move ${file.name} up`}
                disabled={i === 0}
                onClick={() => setFiles((prev) => moveItem(prev, i, -1))}
                className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-600 hover:border-brand-400 disabled:opacity-40"
              >
                Up
              </button>
              <button
                type="button"
                aria-label={`Move ${file.name} down`}
                disabled={i === files.length - 1}
                onClick={() => setFiles((prev) => moveItem(prev, i, 1))}
                className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-600 hover:border-brand-400 disabled:opacity-40"
              >
                Down
              </button>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => setFiles((prev) => prev.filter((_, x) => x !== i))}
                className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-red-600 hover:border-red-300"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Page style</p>
        <div className="flex flex-wrap gap-2">
          {MODES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMode(option.value)}
              title={option.hint}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                mode === option.value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-brand-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500">{MODES.find((m) => m.value === mode)?.hint}</p>
      </div>

      <button
        type="button"
        disabled={files.length === 0 || status === "working"}
        onClick={run}
        className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Building PDF..." : "Create PDF"}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && (
        <ResultPanel originalSize={totalSize} resultBlob={result} resultFileName="images.pdf" />
      )}
    </div>
  );
}
