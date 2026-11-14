"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, inputClass, selectClass } from "@/components/ui";
import { convertDecimal, inchFractionTable, parseDecimalString } from "./decimalfraction";

export default function DecimalToFractionCalculator() {
  const [decimal, setDecimal] = useState("1.375");
  const [maxDenominator, setMaxDenominator] = useState("100");

  const parsed = useMemo(() => parseDecimalString(decimal), [decimal]);
  const maxDen = useMemo(() => {
    const n = Number(maxDenominator);
    return Number.isInteger(n) && n >= 1 ? n : 100;
  }, [maxDenominator]);

  const result = useMemo(() => {
    if (!parsed) return null;
    try {
      return convertDecimal(decimal, maxDen);
    } catch {
      return null;
    }
  }, [decimal, maxDen, parsed]);

  const inchRows = useMemo(() => {
    if (!parsed || parsed.value < 0) return null;
    try {
      return inchFractionTable(parsed.value);
    } catch {
      return null;
    }
  }, [parsed]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Decimal number" htmlFor="dtf-decimal" hint="Terminating decimals convert exactly. Long or repeating decimals also get the closest fraction inside your denominator limit.">
          <input
            id="dtf-decimal"
            type="text"
            inputMode="decimal"
            className={inputClass}
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            placeholder="e.g. 0.75"
          />
        </Field>
        <Field label="Approximation limit (max denominator)" htmlFor="dtf-maxden" hint="Only used when the exact fraction needs a bigger denominator than this.">
          <select
            id="dtf-maxden"
            className={selectClass}
            value={maxDenominator}
            onChange={(e) => setMaxDenominator(e.target.value)}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1,000</option>
          </select>
        </Field>
      </div>

      {decimal.trim() === "" ? (
        <div className="mt-7">
          <EmptyState title="Enter a decimal to begin" body="Type any decimal, such as 0.75, 1.375 or 0.3333, and the fraction, mixed number and working appear here." />
        </div>
      ) : !result ? (
        <div className="mt-7">
          <ErrorNote>That does not look like a plain decimal number. Use digits with at most one decimal point, for example 2.4375.</ErrorNote>
        </div>
      ) : (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="Fraction" value={result.fractionText} sub="Simplified to its lowest terms" primary />
            <ResultCard label="Mixed number" value={result.mixedText} sub="The same value with the whole part split out" />
            <ResultCard label="Decimal" value={fmt(result.value, 6)} sub="Your number echoed back in decimal form" />
          </div>

          {!result.isExactWithinLimit && (
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Closest fraction with a denominator of at most {maxDen}:{" "}
              <strong className="text-gray-900">{result.approximationText}</strong>. The exact fraction above is
              still the true conversion of the decimal you typed.
            </p>
          )}

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Steps</h3>
          <ol className="mt-3 space-y-2.5">
            {result.steps.map((step, i) => (
              <li key={i} className="glass flex gap-3.5 rounded-[1.75rem] p-4">
                <span className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-gray-700">{step}</span>
              </li>
            ))}
          </ol>

          {inchRows && (
            <div className="mt-8">
              <h3 className="text-lg font-bold tracking-tight text-gray-900">On a tape measure (inches)</h3>
              <p className="mt-1 text-sm text-gray-600">
                The same length rounded the way a carpenter reads it, at the three standard tape precisions.
              </p>
              <div className="glass mt-3 overflow-x-auto rounded-[1.75rem] p-2">
                <table className="w-full min-w-80 text-left text-sm">
                  <thead>
                    <tr className="text-xs tracking-widest text-brand-800 uppercase">
                      <th className="px-4 py-2.5 font-semibold">Precision</th>
                      <th className="px-4 py-2.5 font-semibold">Nearest fraction</th>
                      <th className="px-4 py-2.5 font-semibold">Rounding error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inchRows.map((row) => (
                      <tr key={row.precision} className="border-t border-gray-900/5">
                        <td className="px-4 py-2.5 text-gray-700">1/{row.precision} inch</td>
                        <td className="px-4 py-2.5 font-semibold text-gray-900 tabular-nums">{row.text}</td>
                        <td className="px-4 py-2.5 text-gray-700 tabular-nums">{fmt(row.error, 4)} in</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
