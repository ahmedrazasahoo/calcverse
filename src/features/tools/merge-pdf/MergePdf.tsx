"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import { mergePdfFiles, moveItem } from "./merge-pdf";

type Status = "idle" | "working" | "done" | "error";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState("");

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  const run = async () => {
    setStatus("working");
    setError("");
    try {
      const outcome = await mergePdfFiles(files);
      setResult(outcome.blob);
      setStatus("done");
    } catch {
      setError("One of the files could not be read. It may be damaged or password protected.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".pdf,application/pdf"
        multiple
        label={files.length === 0 ? "Choose two or more PDF files" : "Add more PDF files"}
        hint="Drop PDFs here or click to browse. They are merged in the order shown below, on your device only."
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

      <button
        type="button"
        disabled={files.length < 2 || status === "working"}
        onClick={run}
        className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Merging..." : `Merge ${files.length > 0 ? files.length : ""} PDFs`}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && (
        <ResultPanel originalSize={totalSize} resultBlob={result} resultFileName="merged.pdf" />
      )}
    </div>
  );
}
