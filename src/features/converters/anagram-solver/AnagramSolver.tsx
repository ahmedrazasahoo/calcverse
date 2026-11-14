"use client";

import { useEffect, useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, inputClass, ResultCard, secondaryButtonClass } from "@/components/ui";
import { buildIndex, findAnagrams, lettersOnly, parseDictionary, type WordIndex } from "./wordfind";

type LoadState = "loading" | "ready" | "error";

export default function AnagramSolver() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [index, setIndex] = useState<WordIndex | null>(null);
  const [retryRound, setRetryRound] = useState(0);
  const [letters, setLetters] = useState("");
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

  const clean = lettersOnly(letters);
  const hasInvalidChars = letters.trim() !== "" && clean.length !== letters.trim().length;
  const tooShort = clean.length > 0 && clean.length < 2;
  const tooLong = clean.length > 12;

  const results = useMemo(() => {
    if (loadState !== "ready" || !index || clean.length < 2 || clean.length > 12) return [];
    return findAnagrams(clean, index);
  }, [loadState, index, clean]);

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
      <Field
        label="Your letters"
        htmlFor="anagram-letters"
        hint="Two to twelve letters. The solver finds dictionary words that use every letter exactly once."
      >
        <input
          id="anagram-letters"
          type="text"
          value={letters}
          maxLength={16}
          disabled={loadState !== "ready"}
          onChange={(e) => setLetters(e.target.value)}
          placeholder={loadState === "loading" ? "Loading the dictionary, about a second" : "e.g. listen"}
          className={inputClass}
        />
      </Field>

      {loadState === "loading" && (
        <p className="rounded-3xl bg-brand-50/70 px-5 py-3.5 text-sm leading-relaxed font-medium text-brand-900 ring-1 ring-brand-100 backdrop-blur">
          Loading the dictionary, about a second. It downloads once and every search after that is instant.
        </p>
      )}

      {loadState === "error" && (
        <div className="space-y-3">
          <ErrorNote>
            The dictionary could not be loaded, so the solver cannot search yet. Check your connection and try again.
          </ErrorNote>
          <button type="button" onClick={() => setRetryRound((r) => r + 1)} className={secondaryButtonClass}>
            Retry loading the dictionary
          </button>
        </div>
      )}

      {loadState === "ready" && hasInvalidChars && (
        <ErrorNote>Only letters count here. Numbers, spaces and punctuation are ignored.</ErrorNote>
      )}
      {loadState === "ready" && tooShort && <ErrorNote>Enter at least two letters to find anagrams.</ErrorNote>}
      {loadState === "ready" && tooLong && <ErrorNote>Twelve letters is the maximum for an exact anagram search.</ErrorNote>}

      {loadState === "ready" && clean.length >= 2 && clean.length <= 12 && (
        <>
          <ResultCard
            primary
            label="Exact anagrams found"
            value={String(results.length)}
            sub={
              results.length > 0
                ? `Every word below uses all ${clean.length} of your letters exactly once.`
                : "No dictionary word uses exactly those letters. Try the Word Unscrambler for shorter words hiding inside them."
            }
          />
          {results.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {results.map((word) => (
                <li key={word}>
                  <button
                    type="button"
                    onClick={() => copy(word)}
                    title="Copy this word"
                    className="min-h-11 rounded-full bg-white/70 px-4 py-2 font-mono text-base text-gray-900 shadow-sm ring-1 ring-gray-900/5 backdrop-blur transition duration-200 hover:bg-white focus:ring-4 focus:ring-brand-500/20 focus:outline-none active:scale-[0.99]"
                  >
                    {copiedWord === word ? "Copied" : word}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}

      {loadState === "ready" && clean.length === 0 && (
        <EmptyState
          title="Type some letters to start"
          body="Enter the letters of a word or a rack, like listen, triangle or the letters a friend swears cannot be rearranged, and every exact anagram in the dictionary will appear here."
        />
      )}
    </div>
  );
}
