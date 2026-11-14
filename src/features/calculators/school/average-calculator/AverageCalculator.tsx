"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass } from "@/components/ui";
import { computeStats, parseNumbers } from "./average";

function smartFmt(n: number): string {
  return fmt(n, Number.isInteger(n) ? 0 : 4);
}

export default function AverageCalculator() {
  const [text, setText] = useState("72, 85, 90, 68, 85, 77, 95, 85");

  const parsed = useMemo(() => {
    try {
      return { numbers: parseNumbers(text), error: null as string | null };
    } catch (err) {
      return { numbers: null, error: err instanceof Error ? err.message : "Check your numbers and try again." };
    }
  }, [text]);

  const stats = useMemo(() => {
    if (!parsed.numbers) return null;
    try {
      return computeStats(parsed.numbers);
    } catch {
      return null;
    }
  }, [parsed.numbers]);

  return (
    <div>
      <div className="grid gap-5">
        <Field
          label="Your numbers"
          htmlFor="av-numbers"
          hint="Separate numbers with commas, spaces, semicolons or line breaks. Marks, prices, ages and daily totals all work."
        >
          <textarea
            id="av-numbers"
            className={`${inputClass} min-h-28 rounded-3xl`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
        </Field>
      </div>

      {stats ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Mean (average)"
              value={smartFmt(stats.mean)}
              sub="All the numbers added together, then divided by how many there are."
              primary
            />
            <ResultCard
              label="Median"
              value={smartFmt(stats.median)}
              sub="The middle number when the list is sorted, so big outliers pull it far less than the mean."
            />
            <ResultCard
              label="Mode"
              value={stats.modes.length > 0 ? stats.modes.map(smartFmt).join(", ") : "No mode"}
              sub={
                stats.modes.length > 0
                  ? "The value that shows up most often in your list."
                  : "No value repeats, so this list has no mode."
              }
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Sum" value={smartFmt(stats.sum)} sub="Every number in the list added together." />
            <ResultCard label="Count" value={fmt(stats.count)} sub="How many numbers you entered." />
            <ResultCard
              label="Range"
              value={`${smartFmt(stats.min)} to ${smartFmt(stats.max)}`}
              sub={`The spread from smallest to largest is ${smartFmt(stats.range)}.`}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Sorted list: {stats.sorted.map(smartFmt).join(", ")}
          </p>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          {parsed.error ?? "Enter at least one number to see the results."}
        </p>
      )}
    </div>
  );
}
