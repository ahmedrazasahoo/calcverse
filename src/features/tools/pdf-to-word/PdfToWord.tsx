"use client";

import { useState } from "react";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes } from "../_shared/file-utils";
import { convertPdfToWord } from "./pdf-to-word";

type Status = "idle" | "working" | "done" | "error";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<{ blob: Blob; fileName: string } | null>(null);

  const onFile = (files: File[]) => {
    setFile(files[0]);
    setStatus("idle");
    setError("");
    setProgress("");
    setResult(null);
  };

  const run = async () => {
    if (!file) return;
    setStatus("working");
    setError("");
    setResult(null);
    setProgress("");
    try {
      const blob = await convertPdfToWord(file, (page, total) => {
        setProgress(`Reading page ${page} of ${total}`);
      });
      const fileName = file.name.replace(/\.pdf$/i, "") + "-converted.docx";
      setResult({ blob, fileName });
      setStatus("done");
    } catch {
      setError(
        "This PDF could not be read. It may be damaged, password protected, or it may be a scan with no text layer."
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
            ? `${formatBytes(file.size)}. Drop a different file or click to replace it.`
            : "Drop a PDF here or click to browse. It is converted on your device and never uploaded."
        }
        onFiles={onFile}
      />

      <button
        type="button"
        disabled={!file || status === "working"}
        onClick={run}
        className="min-h-11 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "working" ? "Converting..." : "Convert to Word"}
      </button>

      {status === "working" && progress && (
        <p className="text-sm font-medium text-gray-600">{progress}</p>
      )}
      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      {status === "done" && result && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-emerald-700">
            Done. Your Word document has the text of the PDF as editable paragraphs, one
            line at a time, with a page break between pages.
          </p>
          <button
            type="button"
            onClick={() => downloadBlob(result.blob, result.fileName)}
            className="min-h-11 rounded-lg bg-slate-900 px-6 py-2.5 font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99]"
          >
            Download {result.fileName} ({formatBytes(result.blob.size)})
          </button>
        </div>
      )}
    </div>
  );
}
