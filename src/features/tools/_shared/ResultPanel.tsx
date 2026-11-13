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
      className="glass relative overflow-hidden rounded-[2rem] px-6 py-7 shadow-[0_24px_48px_-20px_rgb(16_185_129/0.35)] sm:px-8"
      aria-live="polite"
    >
      <span
        className="pointer-events-none absolute -top-16 right-6 h-36 w-36 rounded-full bg-emerald-300/25 blur-3xl"
        aria-hidden="true"
      />
      <p className="relative flex items-center gap-2.5 text-sm font-semibold text-gray-900">
        <span className="glass-chip flex h-7 w-7 items-center justify-center rounded-full text-emerald-600" aria-hidden="true">
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
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-amber-50 px-7 py-3 font-semibold break-all text-gray-900 shadow-[0_16px_32px_-12px_rgb(245_158_11/0.55),inset_0_1px_0_rgb(255_255_255/0.9)] ring-1 ring-white/80 transition duration-200 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-amber-500/30 focus-visible:outline-none active:translate-y-0 active:scale-[0.99] sm:ml-auto sm:w-auto"
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
        <p className="relative mt-5 rounded-3xl bg-white/55 px-5 py-3.5 text-sm leading-relaxed text-gray-700 ring-1 ring-white/70">
          {note}
        </p>
      )}
    </div>
  );
}
