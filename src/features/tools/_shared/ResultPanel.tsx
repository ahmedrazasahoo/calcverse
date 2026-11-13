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
    <div className="rounded-xl bg-brand-50 px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">Original</p>
          <p className="mt-0.5 text-lg font-bold text-gray-900">{formatBytes(originalSize)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">Result</p>
          <p className="mt-0.5 text-lg font-bold text-gray-900">{formatBytes(resultBlob.size)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">Saved</p>
          <p className="mt-0.5 text-lg font-bold text-gray-900">{saved > 0 ? `${saved}%` : "0%"}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadBlob(resultBlob, resultFileName)}
          className="ml-auto rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Download {resultFileName}
        </button>
      </div>
      {note && <p className="mt-3 text-sm text-gray-600">{note}</p>}
    </div>
  );
}
