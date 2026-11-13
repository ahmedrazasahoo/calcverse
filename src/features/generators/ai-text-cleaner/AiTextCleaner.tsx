"use client";

import { useMemo, useState } from "react";
import { cleanAiText, DEFAULT_CLEAN_OPTIONS, type CleanOptions } from "./ai-text-cleaner";

const textareaClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function AiTextCleaner() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<CleanOptions>(DEFAULT_CLEAN_OPTIONS);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => cleanAiText(input, options), [input, options]);

  const toggles: { key: keyof CleanOptions; label: string }[] = [
    { key: "fixDashes", label: "Replace em dashes with commas or full stops" },
    { key: "removeInvisible", label: "Remove invisible zero width characters" },
    { key: "stripMarkdown", label: "Strip Markdown symbols (headings, bold, links, code)" },
    { key: "tidyBlankLines", label: "Tidy up runs of blank lines" },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-gray-700">Cleaning steps</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {toggles.map((toggle) => (
            <label key={toggle.key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={options[toggle.key]}
                onChange={(e) => setOptions((prev) => ({ ...prev, [toggle.key]: e.target.checked }))}
                className="h-4 w-4 accent-brand-600"
              />
              {toggle.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="cleaner-input" className="mb-1.5 block text-sm font-medium text-gray-700">
            Paste AI text here
          </label>
          <textarea
            id="cleaner-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            placeholder="Paste text from a chatbot or generator. Cleaning happens on your device, nothing is uploaded."
            className={textareaClass}
          />
        </div>
        <div>
          <label htmlFor="cleaner-output" className="mb-1.5 block text-sm font-medium text-gray-700">
            Cleaned text
          </label>
          <textarea id="cleaner-output" value={result.text} readOnly rows={12} className={textareaClass} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          disabled={result.text === ""}
          className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy cleaned text"}
        </button>
        <p className="text-sm text-gray-600">
          {result.stats.dashesFixed} dashes fixed, {result.stats.invisibleRemoved} invisible characters removed,{" "}
          {result.stats.markdownStripped} Markdown marks stripped
        </p>
      </div>
    </div>
  );
}
