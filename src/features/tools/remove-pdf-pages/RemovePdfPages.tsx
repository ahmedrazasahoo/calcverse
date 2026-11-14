"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import ResultPanel from "../_shared/ResultPanel";
import { formatBytes } from "../_shared/file-utils";
import {
  countPdfPages,
  parsePagesToRemove,
  removePages,
  type RemovePagesResult,
} from "./remove-pdf-pages";

type Status = "idle" | "working" | "done" | "error";

export default function RemovePdfPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pagesInput, setPagesInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<RemovePagesResult | null>(null);

  const onFile = async (files: File[]) => {
    const picked = files[0];
    setFile(picked);
    setPageCount(null);
    setResult(null);
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
    const parsed = parsePagesToRemove(pagesInput, pageCount);
    if (!parsed.ok) {
      setError(parsed.error);
      setStatus("error");
      return;
    }
    setStatus("working");
    setError("");
    setResult(null);
    try {
      const done = await removePages(file, parsed.pages);
      setResult(done);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof RangeError
          ? err.message
          : "Removing pages failed. The file may be damaged or password protected."
      );
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
            : "Drop a PDF here or click to browse. Pages are removed on your device and the file is never uploaded."
        }
        onFiles={onFile}
      />

      {pageCount !== null && (
        <p className="text-sm text-gray-600">This PDF has {pageCount} pages.</p>
      )}

      <div>
        <label
          htmlFor="remove-pages-input"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Pages to remove
        </label>
        <input
          id="remove-pages-input"
          type="text"
          value={pagesInput}
          onChange={(event) => setPagesInput(event.target.value)}
          placeholder="For example 1-3, 5, 8-10"
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <p className="mt-1 text-xs text-gray-500">
          Type single pages and ranges separated by commas. Every other page stays, in the
          original order. At least one page must stay.
        </p>
      </div>

      <button
        type="button"
        disabled={!file || pageCount === null || status === "working"}
        onClick={run}
        className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Removing..." : "Remove pages"}
      </button>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && file && (
        <ResultPanel
          originalSize={file.size}
          resultBlob={result.blob}
          resultFileName={file.name.replace(/\.pdf$/i, "") + "-pages-removed.pdf"}
          note={`${result.removedCount} page${result.removedCount === 1 ? "" : "s"} removed, ${result.keptCount} page${result.keptCount === 1 ? "" : "s"} kept in the original order.`}
        />
      )}
    </div>
  );
}
