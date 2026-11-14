"use client";

import { useMemo, useState } from "react";
import {
  ErrorNote,
  Field,
  ResultCard,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui";
import {
  base64ToBytes,
  bytesToBase64,
  decodeText,
  encodeText,
  fromUrlSafe,
  toUrlSafe,
} from "./base64";

const textareaClass =
  "w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 font-mono text-sm leading-relaxed text-gray-900 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15";

type Mode = "encode" | "decode" | "file" | "tofile";

const MODES: { id: Mode; label: string }[] = [
  { id: "encode", label: "Encode text" },
  { id: "decode", label: "Decode text" },
  { id: "file", label: "File to Base64" },
  { id: "tofile", label: "Base64 to file" },
];

export default function Base64Converter() {
  const [mode, setMode] = useState<Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [textIn, setTextIn] = useState("Hello, World!");
  const [b64In, setB64In] = useState("SGVsbG8sIFdvcmxkIQ==");
  const [fileB64, setFileB64] = useState("");
  const [fileStats, setFileStats] = useState<{ name: string; bytes: number } | null>(null);
  const [fileName, setFileName] = useState("decoded-file.bin");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const textOut = useMemo(() => {
    if (mode === "encode") {
      const encoded = encodeText(textIn);
      return { value: urlSafe ? toUrlSafe(encoded) : encoded, error: null as string | null };
    }
    if (mode === "decode") {
      try {
        const prepared = urlSafe ? fromUrlSafe(b64In.trim()) : b64In;
        return { value: decodeText(prepared), error: null as string | null };
      } catch (err) {
        return { value: "", error: err instanceof Error ? err.message : String(err) };
      }
    }
    return { value: "", error: null as string | null };
  }, [mode, textIn, b64In, urlSafe]);

  const onFile = async (file: File | undefined) => {
    setError(null);
    setCopied(false);
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      setFileB64(bytesToBase64(bytes));
      setFileStats({ name: file.name, bytes: bytes.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const downloadDecoded = () => {
    setError(null);
    try {
      const prepared = urlSafe ? fromUrlSafe(b64In.trim()) : b64In;
      const bytes = base64ToBytes(prepared);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName.trim() || "decoded-file.bin";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const overhead = fileStats && fileB64
    ? (((fileB64.length - fileStats.bytes) / Math.max(1, fileStats.bytes)) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Base64 mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            className={mode === m.id ? primaryButtonClass : secondaryButtonClass}
            onClick={() => {
              setMode(m.id);
              setError(null);
              setCopied(false);
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {(mode === "encode" || mode === "decode") && (
        <label className="flex items-center gap-2.5 px-1 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-5 w-5 accent-brand-600"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
          />
          URL safe alphabet (uses - and _ instead of + and /, no padding)
        </label>
      )}

      {mode === "encode" && (
        <>
          <Field label="Text to encode" htmlFor="b64-text-in">
            <textarea
              id="b64-text-in"
              className={textareaClass}
              rows={5}
              value={textIn}
              onChange={(e) => setTextIn(e.target.value)}
              placeholder="Type or paste any text, including Unicode."
            />
          </Field>
          <Field label="Base64 output" htmlFor="b64-text-out">
            <textarea id="b64-text-out" className={textareaClass} rows={5} value={textOut.value} readOnly />
          </Field>
          <button type="button" className={secondaryButtonClass} onClick={() => copyText(textOut.value)}>
            {copied ? "Copied" : "Copy output"}
          </button>
        </>
      )}

      {mode === "decode" && (
        <>
          <Field label="Base64 to decode" htmlFor="b64-in">
            <textarea
              id="b64-in"
              className={textareaClass}
              rows={5}
              value={b64In}
              onChange={(e) => setB64In(e.target.value)}
              placeholder="Paste Base64 here."
              spellCheck={false}
            />
          </Field>
          {textOut.error ? (
            <ErrorNote>{textOut.error}</ErrorNote>
          ) : (
            <Field label="Decoded text" htmlFor="b64-out">
              <textarea id="b64-out" className={textareaClass} rows={5} value={textOut.value} readOnly />
            </Field>
          )}
          {!textOut.error && (
            <button type="button" className={secondaryButtonClass} onClick={() => copyText(textOut.value)}>
              {copied ? "Copied" : "Copy output"}
            </button>
          )}
        </>
      )}

      {mode === "file" && (
        <>
          <Field label="Choose a file" htmlFor="b64-file" hint="The file is read on your device only. Large files produce very long Base64 text.">
            <input
              id="b64-file"
              type="file"
              className={inputClass}
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </Field>
          {error && <ErrorNote>{error}</ErrorNote>}
          {fileStats && (
            <div className="grid gap-4 sm:grid-cols-3">
              <ResultCard label="Original size" value={`${fileStats.bytes.toLocaleString()} bytes`} sub={fileStats.name} />
              <ResultCard label="Base64 length" value={`${fileB64.length.toLocaleString()} chars`} />
              <ResultCard label="Overhead" value={`${overhead}%`} sub="Base64 grows data by about a third" />
            </div>
          )}
          {fileB64 && (
            <>
              <Field label="Base64 of the file" htmlFor="b64-file-out">
                <textarea id="b64-file-out" className={textareaClass} rows={6} value={fileB64} readOnly spellCheck={false} />
              </Field>
              <button type="button" className={secondaryButtonClass} onClick={() => copyText(fileB64)}>
                {copied ? "Copied" : "Copy Base64"}
              </button>
            </>
          )}
        </>
      )}

      {mode === "tofile" && (
        <>
          <Field label="Base64 to turn back into a file" htmlFor="b64-tofile-in">
            <textarea
              id="b64-tofile-in"
              className={textareaClass}
              rows={6}
              value={b64In}
              onChange={(e) => setB64In(e.target.value)}
              placeholder="Paste the Base64 of a file here."
              spellCheck={false}
            />
          </Field>
          <Field label="File name for the download" htmlFor="b64-filename">
            <input
              id="b64-filename"
              className={inputClass}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Field>
          {error && <ErrorNote>{error}</ErrorNote>}
          <button type="button" className={primaryButtonClass} onClick={downloadDecoded}>
            Download decoded file
          </button>
        </>
      )}
    </div>
  );
}
