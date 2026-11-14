"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard } from "@/components/ui";
import { analyseText } from "./character-counter";

const textareaClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

const LIMITS: { label: string; limit: number }[] = [
  { label: "short social post", limit: 280 },
  { label: "single SMS segment", limit: 160 },
  { label: "search result description", limit: 160 },
];

function limitLine(label: string, limit: number, used: number): string {
  const remaining = limit - used;
  if (remaining > 0) return `${remaining} characters left for a ${label} (limit ${limit}).`;
  if (remaining === 0) return `Exactly at the ${limit} character limit for a ${label}.`;
  return `${-remaining} characters over the ${limit} limit for a ${label}.`;
}

export default function CharacterCounter() {
  const [text, setText] = useState("Good tools count quietly in the background, so you can keep writing.");
  const stats = useMemo(() => analyseText(text), [text]);

  return (
    <div>
      <Field
        label="Your text"
        htmlFor="cc-text"
        hint="Every count updates as you type. The text stays in your browser and is never uploaded."
      >
        <textarea
          id="cc-text"
          rows={8}
          className={textareaClass}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste the text you need to measure."
        />
      </Field>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <ResultCard
          label="Characters"
          value={String(stats.characters)}
          sub="Every character including spaces and line breaks, the figure most limits enforce"
          primary
        />
        <ResultCard
          label="Characters without spaces"
          value={String(stats.charactersNoSpaces)}
          sub="Letters, digits and punctuation only, with all whitespace removed"
        />
        <ResultCard label="Words" value={String(stats.words)} sub="Tokens separated by spaces, tabs or line breaks" />
        <ResultCard
          label="Sentences"
          value={String(stats.sentences)}
          sub="Closed by a full stop, question mark or exclamation mark"
        />
        <ResultCard label="Paragraphs" value={String(stats.paragraphs)} sub="Blocks of text separated by a blank line" />
        <ResultCard label="Lines" value={String(stats.lines)} sub="One per line break, handy for addresses, lists and code" />
      </div>

      <div className="mt-5 space-y-1 text-sm text-gray-600" aria-live="polite">
        {LIMITS.map((item) => (
          <p key={item.label}>{limitLine(item.label, item.limit, stats.characters)}</p>
        ))}
        {stats.longestWord !== "" && (
          <p>
            Longest word: <strong className="text-gray-800">{stats.longestWord}</strong> ({[...stats.longestWord].length}{" "}
            characters).
          </p>
        )}
      </div>
    </div>
  );
}
