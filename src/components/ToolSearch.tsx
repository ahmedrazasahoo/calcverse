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
      <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200 bg-white px-4 py-3 sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 md:static">
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
            className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white py-3 pr-12 pl-11 text-[15px] shadow-[0_1px_2px_rgb(15_23_42/0.05)] outline-none transition duration-150 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-1.5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition duration-150 hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
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
        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
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
                className="min-h-11 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-150 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
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
