"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, inputClass, parseNum, Select } from "@/components/ui";
import { longDivide, longDivideDecimal } from "./longdivision";

export default function LongDivisionCalculator() {
  const [dividend, setDividend] = useState("945");
  const [divisor, setDivisor] = useState("7");
  const [mode, setMode] = useState<"integer" | "decimal">("integer");
  const [places, setPlaces] = useState("4");

  const a = parseNum(dividend);
  const b = parseNum(divisor);
  const placesNum = parseNum(places);

  const integerResult = useMemo(() => {
    if (mode !== "integer" || a === null || b === null) return null;
    try {
      return longDivide(a, b);
    } catch {
      return null;
    }
  }, [mode, a, b]);

  const decimalResult = useMemo(() => {
    if (mode !== "decimal" || a === null || b === null || placesNum === null) return null;
    try {
      return longDivideDecimal(a, b, placesNum);
    } catch {
      return null;
    }
  }, [mode, a, b, placesNum]);

  const hasInput = dividend.trim() !== "" && divisor.trim() !== "";
  const failed = hasInput && ((mode === "integer" && !integerResult) || (mode === "decimal" && !decimalResult));

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Number being divided (dividend)" htmlFor="ld-dividend" hint="Whole numbers only. A minus sign is fine here.">
          <input id="ld-dividend" type="number" step="1" className={inputClass} value={dividend} onChange={(e) => setDividend(e.target.value)} />
        </Field>
        <Field label="Divided by (divisor)" htmlFor="ld-divisor" hint="Must be a positive whole number, never zero.">
          <input id="ld-divisor" type="number" step="1" className={inputClass} value={divisor} onChange={(e) => setDivisor(e.target.value)} />
        </Field>
        <Field label="Answer style" htmlFor="ld-mode">
          <Select id="ld-mode" value={mode} onChange={(e) => setMode(e.target.value as "integer" | "decimal")}>
            <option value="integer">Quotient and remainder</option>
            <option value="decimal">Decimal answer</option>
          </Select>
        </Field>
        <Field label="Decimal places" htmlFor="ld-places" hint="Used by the decimal answer style, from 0 to 10.">
          <input
            id="ld-places"
            type="number"
            step="1"
            min="0"
            max="10"
            className={inputClass}
            value={places}
            onChange={(e) => setPlaces(e.target.value)}
            disabled={mode !== "decimal"}
          />
        </Field>
      </div>

      {!hasInput ? (
        <div className="mt-7">
          <EmptyState title="Enter both numbers to begin" body="Fill in the number being divided and the number you are dividing by, and the full long division working appears here." />
        </div>
      ) : failed ? (
        <div className="mt-7">
          <ErrorNote>
            Check the numbers: the divisor must be a positive whole number (dividing by zero is not allowed), the
            number being divided must be a whole number, and decimal places run from 0 to 10. Put any minus sign on
            the first number.
          </ErrorNote>
        </div>
      ) : integerResult ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Quotient" value={integerResult.quotientText} sub="How many whole groups fit" primary />
            <ResultCard label="Remainder" value={String(integerResult.remainder)} sub="What is left over after the last full group" />
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Long division steps</h3>
          <ol className="mt-3 space-y-2.5">
            {integerResult.steps.map((step, i) => (
              <li key={i} className="glass flex gap-3.5 rounded-[1.75rem] p-4">
                <span className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-gray-700">{step.description}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Check: {integerResult.divisor} x {integerResult.quotientText} plus remainder {integerResult.remainder}{" "}
            gives back {integerResult.dividend}.
          </p>
        </div>
      ) : decimalResult ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Decimal answer" value={decimalResult.quotientText} sub={`To ${decimalResult.places} decimal places`} primary />
            <ResultCard
              label="Exact or rounded"
              value={decimalResult.exact ? "Exact" : "Still going"}
              sub={decimalResult.exact ? "The division finishes cleanly inside the places you asked for" : `Remainder ${decimalResult.finalRemainder} is left, so more places would keep adding digits`}
            />
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">How the decimal is built</h3>
          <ol className="mt-3 space-y-2.5">
            {decimalResult.steps.map((step, i) => (
              <li key={i} className="glass flex gap-3.5 rounded-[1.75rem] p-4">
                <span className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
