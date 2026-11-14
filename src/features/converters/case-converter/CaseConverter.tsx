"use client";

import { useMemo, useState } from "react";
import { Field, primaryButtonClass, secondaryButtonClass } from "@/components/ui";
import { CASE_STYLES, convertCase, type CaseStyle } from "./case-converter";

const textareaClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function CaseConverter() {
  const [text, setText] = useState("the quick brown fox jumps over the lazy dog");
  const [style, setStyle] = useState<CaseStyle>("title");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => convertCase(text, style), [text, style]);

  const pickStyle = (next: CaseStyle) => {
    setStyle(next);
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted-text.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Field
        label="Your text"
        htmlFor="case-input"
        hint="Type or paste once, then hop between styles. The result updates as you type and as you switch."
      >
        <textarea
          id="case-input"
          rows={5}
          className={textareaClass}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setCopied(false);
          }}
          placeholder="Type or paste the text to convert."
        />
      </Field>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Case styles">
        {CASE_STYLES.map((item) => {
          const active = item.value === style;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => pickStyle(item.value)}
              aria-pressed={active}
              className={
                active
                  ? "min-h-11 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow transition duration-200 hover:bg-brand-800 focus:ring-4 focus:ring-brand-500/25 focus:outline-none active:scale-[0.99]"
                  : "min-h-11 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-900/10 transition duration-200 hover:bg-white hover:shadow focus:ring-4 focus:ring-brand-500/20 focus:outline-none active:scale-[0.99]"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <Field label={`Result: ${CASE_STYLES.find((item) => item.value === style)?.label ?? ""}`} htmlFor="case-output">
          <textarea
            id="case-output"
            rows={5}
            readOnly
            className={`${textareaClass} bg-gray-50`}
            value={output}
            placeholder="The converted text appears here."
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={copy} disabled={output === ""} className={primaryButtonClass}>
          {copied ? "Copied" : "Copy result"}
        </button>
        <button type="button" onClick={download} disabled={output === ""} className={secondaryButtonClass}>
          Download .txt
        </button>
      </div>
    </div>
  );
}
