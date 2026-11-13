"use client";

import { useMemo, useState } from "react";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

const SUGGESTIONS = ["tax", "pdf", "gpa", "image"];

export default function ToolSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((tool) => {
      const haystack = [tool.name, tool.description, tool.category, ...tool.keywords].join(" ").toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query]);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-white/60 bg-white/55 px-4 py-3 shadow-[0_14px_28px_-18px_rgb(68_33_127/0.35)] backdrop-blur-xl sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-none md:static">
        <div className="relative mx-auto max-w-2xl">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <label htmlFor="tool-search" className="sr-only">
            Search tools and calculators
          </label>
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a tool, for example: tip, age, pdf, gpa..."
            className="min-h-14 w-full min-w-0 rounded-full border border-white/80 bg-white/70 py-3.5 pr-14 pl-12 text-base shadow-[0_16px_32px_-16px_rgb(68_33_127/0.3)] backdrop-blur outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition duration-200 hover:bg-white hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-gray-500" role="status" aria-live="polite">
        {query.trim()
          ? `${results.length} tool${results.length === 1 ? "" : "s"} found for "${query.trim()}"`
          : `All ${tools.length} tools`}
      </p>
      {results.length === 0 ? (
        <div className="glass mx-auto mt-6 max-w-xl rounded-[2rem] px-6 py-10 text-center">
          <p className="text-base font-semibold text-gray-900">Nothing matches that search yet</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Try a shorter, simpler word. One of these popular searches is a good place to start.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {SUGGESTIONS.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => setQuery(word)}
                className="glass-chip min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-brand-800 transition duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
