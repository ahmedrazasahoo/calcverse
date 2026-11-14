"use client";

import { useState } from "react";
import { EmptyState, Field, inputClass } from "@/components/ui";
import { FANCY_STYLES, transformText } from "./fancy";

export default function FancyTextGenerator() {
  const [text, setText] = useState("Your name here");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Your text" htmlFor="fancy-input" hint="Type anything: a display name, a bio line, a heading. Every style below updates as you type.">
        <input
          id="fancy-input"
          type="text"
          value={text}
          maxLength={80}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text"
          className={inputClass}
        />
      </Field>

      {text.trim() === "" ? (
        <EmptyState
          title="Nothing to style yet"
          body="Type a word or a short line above and it will appear here in fifteen Unicode styles, each with its own copy button."
        />
      ) : (
        <ul className="space-y-3">
          {FANCY_STYLES.map((style) => {
            const value = transformText(text, style.id);
            return (
              <li
                key={style.id}
                className="glass flex flex-wrap items-center gap-3 rounded-[1.5rem] px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">{style.label}</p>
                  <p className="mt-1 text-lg break-all text-gray-900">{value}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(style.id, value)}
                  className="min-h-11 shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-900/5 transition duration-200 hover:bg-white focus:ring-4 focus:ring-brand-500/20 focus:outline-none active:scale-[0.99]"
                >
                  {copiedId === style.id ? "Copied" : "Copy"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-sm leading-relaxed text-gray-500">
        These styles are real Unicode characters, not a font, so they paste into bios, display names and posts almost
        anywhere. A few letters have no styled version in Unicode (the small caps x, the superscript q) and stay plain,
        and screen readers may read styled text letter by letter, so keep important information in plain text too.
      </p>
    </div>
  );
}
