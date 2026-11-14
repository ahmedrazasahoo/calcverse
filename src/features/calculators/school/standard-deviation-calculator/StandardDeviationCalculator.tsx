"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt } from "@/components/ui";
import { computeStats, parseNumberList } from "./stats";

export default function StandardDeviationCalculator() {
  const [raw, setRaw] = useState("2, 4, 4, 4, 5, 5, 7, 9");

  const parsed = useMemo(() => parseNumberList(raw), [raw]);
  const stats = useMemo(() => {
    if (parsed.values.length === 0) return null;
    try {
      return computeStats(parsed.values);
    } catch {
      return null;
    }
  }, [parsed]);

  return (
    <div>
      <Field
        label="Your numbers"
        htmlFor="sd-data"
        hint="Separate numbers with commas, spaces or new lines. Two or more numbers are needed for the sample figures."
      >
        <textarea
          id="sd-data"
          className="min-h-28 w-full min-w-0 rounded-[1.75rem] border border-white/80 bg-white/70 px-5 py-3.5 text-base text-gray-900 shadow-sm backdrop-blur outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="e.g. 2, 4, 4, 4, 5, 5, 7, 9"
        />
      </Field>

      {parsed.invalid.length > 0 && (
        <div className="mt-4">
          <ErrorNote>
            These entries are not numbers and were left out: {parsed.invalid.join(", ")}. Fix or remove them to use
            the full dataset.
          </ErrorNote>
        </div>
      )}

      {!stats ? (
        <div className="mt-7">
          <EmptyState title="Add some numbers to begin" body="Type at least one number above and the full statistics summary, both standard deviations and the deviation table appear here." />
        </div>
      ) : (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Mean (average)" value={fmt(stats.mean, 4)} sub={`From ${stats.count} values adding to ${fmt(stats.sum, 4)}`} primary />
            <ResultCard label="Median" value={fmt(stats.median, 4)} sub="The middle value when the data is sorted" />
            <ResultCard label="Range" value={fmt(stats.range, 4)} sub={`Smallest ${fmt(stats.min, 4)} to largest ${fmt(stats.max, 4)}`} />
            <ResultCard label="Count" value={String(stats.count)} sub="How many values are in the dataset" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-[2rem] px-6 py-5">
              <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">Population</p>
              <p className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 tabular-nums sm:text-3xl">
                SD {fmt(stats.populationSd, 4)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Variance {fmt(stats.populationVariance, 4)}. Use this when your numbers are the whole group you care
                about, such as every student in one class.
              </p>
            </div>
            <div className="glass rounded-[2rem] px-6 py-5">
              <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">Sample</p>
              <p className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 tabular-nums sm:text-3xl">
                {stats.sampleSd === null ? "Not available" : `SD ${fmt(stats.sampleSd, 4)}`}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {stats.sampleVariance === null
                  ? "A single value has no sample spread. Add at least one more number."
                  : `Variance ${fmt(stats.sampleVariance, 4)}. Use this when your numbers are a sample drawn from a bigger group, such as a survey of some voters to judge all voters.`}
              </p>
            </div>
          </div>

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Deviation table</h3>
          <p className="mt-1 text-sm text-gray-600">
            Each value minus the mean, then squared. The squared column adds to {fmt(stats.sumOfSquaredDeviations, 4)},
            which is divided by {stats.count} for the population variance or by {Math.max(stats.count - 1, 1)} for the
            sample variance.
          </p>
          <div className="glass mt-3 overflow-x-auto rounded-[1.75rem] p-2">
            <table className="w-full min-w-96 text-left text-sm">
              <thead>
                <tr className="text-xs tracking-widest text-brand-800 uppercase">
                  <th className="px-4 py-2.5 font-semibold">Value</th>
                  <th className="px-4 py-2.5 font-semibold">Deviation from mean</th>
                  <th className="px-4 py-2.5 font-semibold">Squared deviation</th>
                </tr>
              </thead>
              <tbody>
                {stats.rows.map((row, i) => (
                  <tr key={i} className="border-t border-gray-900/5">
                    <td className="px-4 py-2.5 font-semibold text-gray-900 tabular-nums">{fmt(row.value, 4)}</td>
                    <td className="px-4 py-2.5 text-gray-700 tabular-nums">{fmt(row.deviation, 4)}</td>
                    <td className="px-4 py-2.5 text-gray-700 tabular-nums">{fmt(row.squaredDeviation, 4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
