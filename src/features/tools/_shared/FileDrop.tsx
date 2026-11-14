"use client";

import { useRef, useState } from "react";

interface FileDropProps {
  /** Value for the file input accept attribute, for example ".pdf,application/pdf". */
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label: string;
  hint?: string;
}

/**
 * Drag and drop file picker shared by every file tool. Files stay in the
 * browser; selecting a file never uploads anything anywhere.
 */
export default function FileDrop({ accept, multiple = false, onFiles, label, hint }: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={`min-h-44 cursor-pointer rounded-2xl border border-dashed px-6 py-10 text-center transition duration-150 focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none ${
        dragging
          ? "border-brand-500 bg-brand-50"
          : "border-slate-300 bg-slate-50/60 hover:border-slate-400 hover:bg-slate-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <span
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      </span>
      <p className="mt-4 text-base font-semibold text-gray-900">{label}</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-gray-500">
        {hint ?? "Drop files here or click to browse. Files never leave your device."}
      </p>
      <p className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm">
        Choose a file
      </p>
    </div>
  );
}
