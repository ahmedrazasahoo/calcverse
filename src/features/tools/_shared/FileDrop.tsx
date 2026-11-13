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
      className={`min-h-44 cursor-pointer rounded-[2rem] border-2 border-dashed px-6 py-10 text-center backdrop-blur transition duration-200 focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none ${
        dragging
          ? "scale-[1.01] border-brand-400 bg-brand-50/70 shadow-[0_22px_44px_-18px_rgb(112_56_224/0.35)]"
          : "border-white/80 bg-white/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.8),0_16px_32px_-20px_rgb(68_33_127/0.25)] hover:border-brand-300 hover:bg-white/60"
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
        className="glass-chip mx-auto flex h-14 w-14 items-center justify-center rounded-full text-brand-700"
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
      <p className="mt-5 inline-flex min-h-11 items-center rounded-full bg-gradient-to-b from-white to-brand-50 px-6 py-2.5 text-sm font-semibold text-brand-950 shadow-[0_12px_24px_-10px_rgb(68_33_127/0.35),inset_0_1px_0_rgb(255_255_255/0.9)] ring-1 ring-white/80">
        Choose a file
      </p>
    </div>
  );
}
