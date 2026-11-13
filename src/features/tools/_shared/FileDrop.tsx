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
      className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        dragging ? "border-brand-500 bg-brand-50" : "border-gray-300 bg-gray-50 hover:border-brand-400 hover:bg-brand-50"
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
      <p className="text-base font-semibold text-gray-800">{label}</p>
      <p className="mt-1 text-sm text-gray-500">{hint ?? "Drop files here or click to browse. Files never leave your device."}</p>
    </div>
  );
}
