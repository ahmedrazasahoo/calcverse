"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass } from "@/components/ui";
import { formatParts, toInputValue, todayParts, ymdText } from "@/lib/dates";
import { calculateAge } from "./age";

export default function AgeCalculator() {
  const [dob, setDob] = useState("1995-06-15");
  const [target, setTarget] = useState("");

  // Default the target date to today, set after mount so the value is
  // always the visitor's current date rather than a build time date.
  useEffect(() => {
    setTarget((current) => (current === "" ? toInputValue(todayParts()) : current));
  }, []);

  const outcome = useMemo(() => (target === "" ? null : calculateAge(dob, target)), [dob, target]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date of birth" htmlFor="age-dob">
          <input id="age-dob" type="date" className={inputClass} value={dob} onChange={(e) => setDob(e.target.value)} />
        </Field>
        <Field label="Age at this date" htmlFor="age-target" hint="Defaults to today">
          <input id="age-target" type="date" className={inputClass} value={target} onChange={(e) => setTarget(e.target.value)} />
        </Field>
      </div>

      {outcome && !outcome.ok && outcome.error === "target-before-birth" && (
        <p className="mt-6 text-sm text-red-600">
          The target date is before the date of birth. Swap them around to see a valid age.
        </p>
      )}
      {outcome && !outcome.ok && outcome.error === "invalid-date" && (
        <p className="mt-6 text-sm text-red-600">Please enter two valid calendar dates.</p>
      )}
      {outcome?.ok && (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          <ResultCard label="Exact age" sub="Your age in years, months and days, counted from your birth date." value={ymdText(outcome.result.age)} />
          <ResultCard label="Total days lived" value={fmt(outcome.result.totalDays)} sub="Days from birth to the chosen date" />
          <ResultCard
            label="Total weeks"
            value={fmt(outcome.result.totalWeeks)}
            sub={`Plus ${outcome.result.extraDays} extra days`}
          />
          <ResultCard
            label="Next birthday"
            value={formatParts(outcome.result.nextBirthday)}
            sub={
              outcome.result.daysToNextBirthday === 0
                ? "That is today. Happy birthday!"
                : `In ${fmt(outcome.result.daysToNextBirthday)} days`
            }
          />
        </div>
      )}
    </div>
  );
}
