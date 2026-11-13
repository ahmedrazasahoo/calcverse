"use client";

import { useMemo, useState } from "react";
import { analyzeText, formatDuration } from "./word-counter";

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => analyzeText(text), [text]);

  const cards: { label: string; value: string }[] = [
    { label: "Words", value: String(stats.words) },
    { label: "Characters", value: String(stats.characters) },
    { label: "Characters, no spaces", value: String(stats.charactersNoSpaces) },
    { label: "Sentences", value: String(stats.sentences) },
    { label: "Paragraphs", value: String(stats.paragraphs) },
    { label: "Reading time", value: formatDuration(stats.readingSeconds) },
    { label: "Speaking time", value: formatDuration(stats.speakingSeconds) },
    { label: "Longest word", value: stats.longestWord || "None yet" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="word-counter-input" className="mb-1.5 block text-sm font-medium text-gray-700">
          Your text
        </label>
        <textarea
          id="word-counter-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={10}
          placeholder="Paste or type your text here. The counts update as you type, and nothing is sent anywhere."
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl bg-brand-50 px-4 py-3">
            <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">{card.label}</p>
            <p className="mt-1 truncate text-xl font-bold text-gray-900" title={card.value}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {stats.topWords.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Most used words</p>
          <div className="flex flex-wrap gap-2">
            {stats.topWords.map((item) => (
              <span key={item.word} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {item.word} <strong>{item.count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setText("")}
        disabled={text === ""}
        className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition-colors hover:border-brand-400 disabled:opacity-50"
      >
        Clear text
      </button>
    </div>
  );
}
