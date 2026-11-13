"use client";

import { useMemo, useState } from "react";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

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
      <div className="sticky top-16 z-30 -mx-4 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none md:static">
        <div className="mx-auto max-w-2xl">
          <label htmlFor="tool-search" className="sr-only">
            Search tools and calculators
          </label>
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a tool, for example: tip, age, pdf, gpa..."
            className="min-h-12 w-full rounded-2xl border border-gray-300 bg-white px-5 py-3.5 text-base shadow-sm outline-none placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-gray-500" role="status">
        {query.trim()
          ? `${results.length} tool${results.length === 1 ? "" : "s"} found for "${query.trim()}"`
          : `All ${tools.length} tools`}
      </p>
      {results.length === 0 ? (
        <p className="mt-8 text-center text-gray-600">
          Nothing matches that search yet. Try a shorter word, like "tax", "image" or "interest".
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
