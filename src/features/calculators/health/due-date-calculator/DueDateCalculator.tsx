"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, Select } from "@/components/ui";
import { dueDateFromConception, dueDateFromLmp, gestationalAge } from "./dueDate";

function formatIso(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function todayIso(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

export default function DueDateCalculator() {
  const [mode, setMode] = useState("lmp");
  const [date, setDate] = useState(todayIso());

  const result = useMemo(() => {
    if (mode === "lmp") {
      const fromLmp = dueDateFromLmp(date);
      if (!fromLmp) return null;
      const age = gestationalAge(date, todayIso());
      const remainingDays = age === null ? null : 280 - age.totalDays;
      return {
        dueDate: fromLmp.dueDate,
        secondLabel: "Estimated conception date",
        secondDate: fromLmp.estimatedConceptionDate,
        age,
        remainingDays: remainingDays !== null && remainingDays >= 0 ? remainingDays : null,
      };
    }
    const fromConception = dueDateFromConception(date);
    if (!fromConception) return null;
    const age = gestationalAge(fromConception.estimatedLastPeriodDate, todayIso());
    return {
      dueDate: fromConception.dueDate,
      secondLabel: "Estimated last period start",
      secondDate: fromConception.estimatedLastPeriodDate,
      age,
      remainingDays: null,
    };
  }, [mode, date]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Calculate from" htmlFor="dd-mode">
          <Select id="dd-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="lmp">First day of last period</option>
            <option value="conception">Conception date</option>
          </Select>
        </Field>
        <Field label={mode === "lmp" ? "First day of your last period" : "Conception date"} htmlFor="dd-date">
          <input id="dd-date" type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Estimated due date" value={formatIso(result.dueDate)} sub="The 40 week mark" />
            <ResultCard label={result.secondLabel} value={formatIso(result.secondDate)} sub="Based on a typical 28 day cycle" />
            {result.age && (
              <ResultCard
                label="How far along today"
                value={`${result.age.weeks} weeks, ${result.age.days} days`}
                sub="Counted the way doctors and midwives count"
              />
            )}
            {result.remainingDays !== null && (
              <ResultCard label="Days to go" value={String(result.remainingDays)} sub="Until the estimated due date" />
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            A due date is the middle of a window, not an appointment. Only about 1 in 20 babies arrive on the exact day,
            and a healthy birth can happen any time from about 37 to 42 weeks. An ultrasound scan in the first trimester
            gives a more personal estimate than dates alone.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Pick a valid date to see the estimated due date.</p>
      )}
    </div>
  );
}
