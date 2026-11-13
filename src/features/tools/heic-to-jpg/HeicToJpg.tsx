"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes } from "../_shared/file-utils";
import { convertHeicBatch, type HeicConversion } from "./heic-to-jpg";

type Status = "idle" | "working" | "done" | "error";

export default function HeicToJpg() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState("");
  const [results, setResults] = useState<HeicConversion[]>([]);
  const [error, setError] = useState("");

  const run = async () => {
    setStatus("working");
    setError("");
    setResults([]);
    try {
      const converted = await convertHeicBatch(files, 0.92, (done, total) =>
        setProgress(`Converted ${done} of ${total}`)
      );
      setResults(converted);
      setStatus("done");
    } catch {
      setError("One of the files could not be decoded. Make sure the files are genuine HEIC photos from an iPhone or camera.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".heic,.heif,image/heic,image/heif"
        multiple
        label={files.length === 0 ? "Choose HEIC photos" : `${files.length} photo${files.length > 1 ? "s" : ""} selected`}
        hint="Drop iPhone HEIC photos here or click to browse. They are converted on your device and never uploaded."
        onFiles={(incoming) => {
          setFiles(incoming);
          setResults([]);
          setStatus("idle");
        }}
      />

      {files.length > 0 && (
        <p className="text-sm text-gray-600">
          Total size {formatBytes(files.reduce((sum, f) => sum + f.size, 0))}. Each photo becomes a standard JPG that opens
          everywhere.
        </p>
      )}

      <button
        type="button"
        disabled={files.length === 0 || status === "working"}
        onClick={run}
        className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Converting..." : "Convert to JPG"}
      </button>

      {status === "working" && <p className="text-sm text-gray-600">{progress || "Decoding photos..."}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && results.length > 0 && (
        <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
          {results.map((item, i) => (
            <li key={`${item.fileName}-${i}`} className="flex items-center gap-3 px-4 py-3">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-gray-800">{item.fileName}</span>
                <span className="text-xs text-gray-500">{formatBytes(item.blob.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => downloadBlob(item.blob, item.fileName)}
                className="min-h-9 rounded-full bg-white/85 px-4 py-1.5 text-sm font-semibold text-brand-900 shadow-sm ring-1 ring-white/80 backdrop-blur transition hover:bg-white"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
