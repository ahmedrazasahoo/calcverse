"use client";

import { useEffect, useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, inputClass, ResultCard, secondaryButtonClass, Select } from "@/components/ui";
import {
  buildIndex,
  findFormable,
  groupWordsByLength,
  parseDictionary,
  type WordIndex,
} from "../anagram-solver/wordfind";

type LoadState = "loading" | "ready" | "error";

const MAX_LETTERS = 12;

export default function WordUnscrambler() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [index, setIndex] = useState<WordIndex | null>(null);
  const [retryRound, setRetryRound] = useState(0);
  const [letters, setLetters] = useState("");
  const [minLength, setMinLength] = useState(3);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    fetch("/wordlist.txt")
      .then((res) => {
        if (!res.ok) throw new Error(`Dictionary request failed: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        setIndex(buildIndex(parseDictionary(text)));
        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [retryRound]);

  const raw = letters.toLowerCase();
  const blankCount = (raw.match(/\?/g) ?? []).length;
  const cleanLetters = raw.replace(/[^a-z]/g, "");
  const totalTiles = cleanLetters.length + blankCount;
  const hasInvalidChars = letters.trim() !== "" && /[^a-z?\s]/.test(raw);
  const tooManyBlanks = blankCount > 2;
  const tooLong = totalTiles > MAX_LETTERS;
  const tooShort = totalTiles > 0 && totalTiles < 2;

  const groups = useMemo(() => {
    if (loadState !== "ready" || !index) return [];
    if (totalTiles < 2 || totalTiles > MAX_LETTERS || blankCount > 2) return [];
    return groupWordsByLength(findFormable(letters, index, { minLength }));
  }, [loadState, index, letters, minLength, totalTiles, blankCount]);

  const totalWords = groups.reduce((sum, group) => sum + group.words.length, 0);

  const copy = async (word: string) => {
    try {
      await navigator.clipboard.writeText(word);
      setCopiedWord(word);
    } catch {
      setCopiedWord(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
        <Field
          label="Scrambled letters"
          htmlFor="unscrambler-letters"
          hint="Type your rack or jumbled letters. Add ? for a blank tile, up to two, and it can stand for any letter."
        >
          <input
            id="unscrambler-letters"
            type="text"
            value={letters}
            maxLength={16}
            disabled={loadState !== "ready"}
            onChange={(e) => setLetters(e.target.value)}
            placeholder={loadState === "loading" ? "Loading the dictionary, about a second" : "e.g. retales or ca?"}
            className={inputClass}
          />
        </Field>
        <Field label="Minimum word length" htmlFor="unscrambler-min-length">
          <Select
            id="unscrambler-min-length"
            value={minLength}
            disabled={loadState !== "ready"}
            onChange={(e) => setMinLength(Number(e.target.value))}
          >
            {[2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} letters or more
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {loadState === "loading" && (
        <p className="rounded-3xl bg-brand-50/70 px-5 py-3.5 text-sm leading-relaxed font-medium text-brand-900 ring-1 ring-brand-100">
          Loading the dictionary, about a second. It downloads once and every search after that is instant.
        </p>
      )}

      {loadState === "error" && (
        <div className="space-y-3">
          <ErrorNote>
            The dictionary could not be loaded, so the unscrambler cannot search yet. Check your connection and try again.
          </ErrorNote>
          <button type="button" onClick={() => setRetryRound((r) => r + 1)} className={secondaryButtonClass}>
            Retry loading the dictionary
          </button>
        </div>
      )}

      {loadState === "ready" && hasInvalidChars && (
        <ErrorNote>Only letters and ? blank tiles count here. Other characters are ignored.</ErrorNote>
      )}
      {loadState === "ready" && tooManyBlanks && (
        <ErrorNote>Two blank tiles is the maximum. Replace the extra ? marks with real letters.</ErrorNote>
      )}
      {loadState === "ready" && tooLong && <ErrorNote>Twelve tiles is the maximum, blanks included.</ErrorNote>}
      {loadState === "ready" && tooShort && <ErrorNote>Enter at least two letters or tiles to unscramble.</ErrorNote>}

      {loadState === "ready" && totalTiles >= 2 && !tooLong && !tooManyBlanks && (
        <>
          <ResultCard
            primary
            label="Words you can build"
            value={String(totalWords)}
            sub={
              totalWords > 0
                ? `Grouped by length, longest first. Click any word to copy it.${blankCount > 0 ? " Words using a blank tile are included." : ""}`
                : "No dictionary words can be built from those tiles at this minimum length. Try lowering the minimum or checking the letters."
            }
          />
          {groups.map((group) => (
            <div key={group.length} className="space-y-2">
              <p className="px-1 text-sm font-semibold text-gray-800">
                {group.length} letter words{" "}
                <span className="font-medium text-gray-500">({group.words.length})</span>
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.words.map((word) => (
                  <li key={word}>
                    <button
                      type="button"
                      onClick={() => copy(word)}
                      title="Copy this word"
                      className="min-h-11 rounded-full bg-white px-4 py-2 font-mono text-base text-gray-900 shadow-sm ring-1 ring-gray-900/5 transition duration-200 hover:bg-white focus:ring-4 focus:ring-brand-500/20 focus:outline-none active:scale-[0.99]"
                    >
                      {copiedWord === word ? "Copied" : word}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {loadState === "ready" && totalTiles === 0 && (
        <EmptyState
          title="Type your letters to unscramble"
          body="Enter a jumbled word or a full game rack, add a ? for each blank tile, and every word hiding in those letters appears here, longest first."
        />
      )}
    </div>
  );
}
