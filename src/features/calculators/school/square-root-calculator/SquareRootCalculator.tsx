"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum } from "@/components/ui";
import { calculateSquareRoot, type SquareRootResult } from "./square-root";

function simplifiedText(result: SquareRootResult): string {
  const { coefficient, radicand } = result.simplified;
  if (result.value === 0) return "0";
  if (radicand === 1) return fmt(coefficient);
  if (coefficient === 1) return `√${fmt(radicand, Number.isInteger(radicand) ? 0 : 4)}`;
  return `${fmt(coefficient)}√${fmt(radicand)}`;
}

export default function SquareRootCalculator() {
  const [value, setValue] = useState("72");

  const result = useMemo(() => {
    const parsed = parseNum(value);
    if (parsed === null) return null;
    try {
      return calculateSquareRoot(parsed);
    } catch {
      return null;
    }
  }, [value]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Number" htmlFor="sr-value" hint="Whole numbers also get a simplified form and full working steps.">
          <input id="sr-value" className={inputClass} inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Square root"
              value={fmt(result.root, 6)}
              sub={`The number that multiplied by itself gives ${fmt(result.value, Number.isInteger(result.value) ? 0 : 4)}.`}
              primary
            />
            <ResultCard
              label="Simplified form"
              value={simplifiedText(result)}
              sub="Pairs of prime factors come out of the root, single factors stay inside."
            />
            <ResultCard
              label="Perfect square"
              value={result.isPerfectSquare ? "Yes" : "No"}
              sub={
                result.isPerfectSquare
                  ? "Its root is a whole number with nothing left over."
                  : result.nearestBelow && result.nearestAbove
                    ? `It sits between ${fmt(result.nearestBelow.value)} (${fmt(result.nearestBelow.root)} squared) and ${fmt(result.nearestAbove.value)} (${fmt(result.nearestAbove.root)} squared).`
                    : "Its root falls between two whole numbers."
              }
            />
          </div>
          <div className="mt-6 rounded-2xl bg-white/60 px-5 py-4 ring-1 ring-gray-200">
            <h3 className="text-sm font-semibold tracking-wide text-gray-800 uppercase">Working steps</h3>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
              {result.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a number that is zero or greater. Negative numbers do not have a real square root.
        </p>
      )}
    </div>
  );
}
