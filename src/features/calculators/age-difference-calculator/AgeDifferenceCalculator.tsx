"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass } from "@/components/ui";
import { formatParts, ymdText } from "@/lib/dates";
import { calculateAgeDifference } from "./age-difference";

export default function AgeDifferenceCalculator() {
  const [first, setFirst] = useState("1990-03-10");
  const [second, setSecond] = useState("1994-09-25");

  const result = useMemo(() => calculateAgeDifference(first, second), [first, second]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First date of birth" htmlFor="diff-first">
          <input id="diff-first" type="date" className={inputClass} value={first} onChange={(e) => setFirst(e.target.value)} />
        </Field>
        <Field label="Second date of birth" htmlFor="diff-second">
          <input id="diff-second" type="date" className={inputClass} value={second} onChange={(e) => setSecond(e.target.value)} />
        </Field>
      </div>
      {result ? (
        <div className="mt-7" aria-live="polite">
          {result.sameDay ? (
            <p className="rounded-2xl bg-brand-50 px-4 py-4 text-lg font-semibold text-gray-900 ring-1 ring-brand-100">
              Both dates are the same day, so the age difference is zero.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <ResultCard label="Age difference" sub="The exact gap between the two dates, in years, months and days." value={ymdText(result.diff)} />
              <ResultCard label="Difference in days" value={fmt(result.totalDays)} sub="Total days between the two dates" />
              <ResultCard
                label="Born first"
                value={formatParts(result.earlier)}
                sub={`The other date is ${formatParts(result.later)}`}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Pick two valid dates of birth to see the gap between them.</p>
      )}
    </div>
  );
}
