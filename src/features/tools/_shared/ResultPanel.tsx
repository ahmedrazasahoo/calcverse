"use client";

import { downloadBlob, formatBytes, reductionPercent } from "./file-utils";

interface ResultPanelProps {
  originalSize: number;
  resultBlob: Blob;
  resultFileName: string;
  /** Optional honest note, for example when a target size could not be reached. */
  note?: string;
}

/** Before and after size summary with a download button, shared by the file tools. */
export default function ResultPanel({ originalSize, resultBlob, resultFileName, note }: ResultPanelProps) {
  const saved = reductionPercent(originalSize, resultBlob.size);
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-6 sm:px-7"
      aria-live="polite"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-emerald-500" aria-hidden="true" />
      <p className="relative flex items-center gap-2.5 text-sm font-semibold text-gray-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        Your file is ready
      </p>
      <div className="relative mt-5 flex flex-wrap items-end gap-x-8 gap-y-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Original</p>
          <p className="mt-1 text-xl font-bold text-gray-900 tabular-nums">{formatBytes(originalSize)}</p>
        </div>
        <span className="hidden h-10 w-px bg-gray-900/10 sm:block" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">Result</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900 tabular-nums">{formatBytes(resultBlob.size)}</p>
        </div>
        <span className="hidden h-10 w-px bg-gray-900/10 sm:block" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Saved</p>
          <p className="mt-1 text-xl font-bold text-gray-900 tabular-nums">{saved > 0 ? `${saved}%` : "0%"}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadBlob(resultBlob, resultFileName)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 font-medium break-all text-white shadow-sm transition duration-150 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] sm:ml-auto sm:w-auto"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Download {resultFileName}
        </button>
      </div>
      {note && (
        <p className="relative mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
          {note}
        </p>
      )}
    </div>
  );
}
