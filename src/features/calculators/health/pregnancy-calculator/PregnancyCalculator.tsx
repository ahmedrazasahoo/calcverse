"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass } from "@/components/ui";
import { formatParts, parseDateInput, toInputValue, todayParts } from "@/lib/dates";
import { addDaysToParts, calculatePregnancy } from "./pregnancy";

export default function PregnancyCalculator() {
  const [today] = useState(() => todayParts());
  // Default to 10 weeks ago so a full set of results shows straight away.
  const [lmpValue, setLmpValue] = useState(() =>
    toInputValue(addDaysToParts(todayParts(), -70)),
  );

  const result = useMemo(() => {
    const lmp = parseDateInput(lmpValue);
    if (!lmp) return null;
    try {
      return calculatePregnancy(lmp, today);
    } catch {
      return null;
    }
  }, [lmpValue, today]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First day of your last period"
          htmlFor="preg-lmp"
          hint="The first day of bleeding, not the day the period ended. Everything else is counted from this date."
        >
          <input
            id="preg-lmp"
            type="date"
            className={inputClass}
            value={lmpValue}
            onChange={(e) => setLmpValue(e.target.value)}
          />
        </Field>
      </div>

      {result && result.notStarted ? (
        <div className="mt-7" aria-live="polite">
          <p className="rounded-3xl bg-amber-50/70 px-5 py-4 text-sm leading-relaxed font-medium text-amber-900 ring-1 ring-amber-200/80">
            That date is still in the future, so the pregnancy count has not started yet on paper. If the date is
            right, check back once it arrives. If you are already pregnant, the date wanted here is the first day of
            your most recent period, which will be a date in the past.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ResultCard
              label="Estimated due date"
              value={formatParts(result.dueDate)}
              sub="The 40 week mark, counted 280 days from that period date"
            />
            <ResultCard
              label="Estimated conception date"
              value={formatParts(result.conceptionEstimate)}
              sub="About 14 days after the period starts, on a typical 28 day cycle"
            />
          </div>
        </div>
      ) : result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              label="Current week"
              value={`Week ${result.gestationalWeeks}, day ${result.gestationalDays}`}
              sub="How far along you are today, counted the way midwives and doctors count"
              primary
            />
            <ResultCard
              label="Due date"
              value={formatParts(result.dueDate)}
              sub="The estimated 40 week mark, 280 days from your last period"
            />
            <ResultCard
              label="Days to go"
              value={
                result.overdue
                  ? `${Math.abs(result.daysRemaining)} past`
                  : String(result.daysRemaining)
              }
              sub={
                result.overdue
                  ? "Days past the estimated due date. Many healthy babies arrive in this stretch"
                  : "Days left until the estimated due date"
              }
            />
            <ResultCard
              label="Trimester"
              value={
                result.trimester === 1
                  ? "First"
                  : result.trimester === 2
                    ? "Second"
                    : "Third"
              }
              sub={`About ${result.progressPercent}% of the 280 days are complete`}
            />
          </div>

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">
            Milestones by week
          </h3>
          <ul className="mt-3 divide-y divide-gray-900/5 overflow-hidden rounded-[1.75rem] bg-white/60 ring-1 ring-white/70 backdrop-blur">
            {result.milestones.map((m) => (
              <li
                key={m.week}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3.5"
              >
                <span className="w-20 shrink-0 text-sm font-bold text-brand-800">
                  Week {m.week}
                </span>
                <span className="min-w-0 flex-1 text-sm leading-relaxed text-gray-700">
                  {m.label}
                </span>
                <span className="text-sm font-medium whitespace-nowrap text-gray-500 tabular-nums">
                  {formatParts(m.date)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    m.done
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {m.done ? "Reached" : "Ahead"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Every date here is an estimate based on a typical 28 day cycle. Only a small share of babies arrive on
            the exact due date, and a first trimester scan gives a more personal date. This page is general
            information, not medical advice, so follow the dates and guidance from your own care team.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Pick the first day of your last period to see your week, due date and milestones.
        </p>
      )}
    </div>
  );
}
