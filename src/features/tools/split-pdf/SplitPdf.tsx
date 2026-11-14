"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes } from "../_shared/file-utils";
import { countPdfPages, parsePageRanges, splitPdf } from "./split-pdf";

type Status = "idle" | "working" | "done" | "error";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [ranges, setRanges] = useState("1-3");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onFile = async (files: File[]) => {
    const picked = files[0];
    setFile(picked);
    setPageCount(null);
    setStatus("idle");
    setError("");
    try {
      setPageCount(await countPdfPages(picked));
    } catch {
      setError("This PDF could not be read. It may be damaged or password protected.");
      setStatus("error");
    }
  };

  const run = async () => {
    if (!file || pageCount === null) return;
    const parsed = parsePageRanges(ranges, pageCount);
    if (!parsed.ok) {
      setError(parsed.error);
      setStatus("error");
      return;
    }
    setStatus("working");
    setError("");
    try {
      const zip = await splitPdf(file, parsed.groups);
      downloadBlob(zip, file.name.replace(/\.pdf$/i, "") + "-split.zip");
      setStatus("done");
    } catch {
      setError("Splitting failed. The file may be damaged or password protected.");
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
            ? `${formatBytes(file.size)}${pageCount !== null ? `, ${pageCount} pages` : ", reading page count..."}. Drop a different file or click to replace it.`
            : "Drop a PDF here or click to browse. It is split on your device and never uploaded."
        }
        onFiles={onFile}
      />

      <div>
        <label htmlFor="split-ranges" className="mb-1.5 block text-sm font-medium text-gray-700">
          Page ranges
        </label>
        <input
          id="split-ranges"
          type="text"
          value={ranges}
          onChange={(event) => setRanges(event.target.value)}
          placeholder="For example 1-3, 5, 8-10"
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <p className="mt-1 text-xs text-gray-500">
          Each comma separated part becomes its own PDF inside one zip file.
        </p>
      </div>

      <button
        type="button"
        disabled={!file || pageCount === null || status === "working"}
        onClick={run}
        className="min-h-11 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Splitting..." : "Split PDF"}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}
      {status === "done" && (
        <p className="text-sm font-medium text-emerald-700">Done. Your zip file has been downloaded.</p>
      )}
    </div>
  );
}
