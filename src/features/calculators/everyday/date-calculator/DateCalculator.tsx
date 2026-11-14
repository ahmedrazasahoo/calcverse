"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, parseNum, Select } from "@/components/ui";
import { addToDate, dateDifference } from "./dateCalculator";

function formatIso(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function todayIso(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

export default function DateCalculator() {
  const [mode, setMode] = useState("between");
  const [start, setStart] = useState(todayIso());
  const [end, setEnd] = useState(todayIso());
  const [base, setBase] = useState(todayIso());
  const [direction, setDirection] = useState("1");
  const [years, setYears] = useState("0");
  const [months, setMonths] = useState("0");
  const [weeks, setWeeks] = useState("0");
  const [days, setDays] = useState("30");

  const difference = useMemo(() => (mode === "between" ? dateDifference(start, end) : null), [mode, start, end]);

  const shifted = useMemo(() => {
    if (mode !== "add") return null;
    const duration = {
      years: parseNum(years) ?? -1,
      months: parseNum(months) ?? -1,
      weeks: parseNum(weeks) ?? -1,
      days: parseNum(days) ?? -1,
    };
    return addToDate(base, duration, direction === "1" ? 1 : -1);
  }, [mode, base, direction, years, months, weeks, days]);

  const breakdown = difference
    ? [
        difference.years > 0 ? `${difference.years} year${difference.years === 1 ? "" : "s"}` : null,
        difference.months > 0 ? `${difference.months} month${difference.months === 1 ? "" : "s"}` : null,
        `${difference.days} day${difference.days === 1 ? "" : "s"}`,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you want to do?" htmlFor="dc-mode">
          <Select id="dc-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="between">Count days between two dates</option>
            <option value="add">Add or subtract days from a date</option>
          </Select>
        </Field>
      </div>

      {mode === "between" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Start date" htmlFor="dc-start">
              <input id="dc-start" type="date" className={inputClass} value={start} onChange={(e) => setStart(e.target.value)} />
            </Field>
            <Field label="End date" htmlFor="dc-end">
              <input id="dc-end" type="date" className={inputClass} value={end} onChange={(e) => setEnd(e.target.value)} />
            </Field>
          </div>
          {difference ? (
            <div className="mt-7" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard label="Total days" value={String(difference.totalDays)} sub={`${formatIso(difference.startDate)} to ${formatIso(difference.endDate)}`} />
                <ResultCard label="In years, months and days" value={breakdown} sub="The calendar style breakdown" />
                <ResultCard
                  label="In weeks"
                  value={`${difference.fullWeeks} weeks${difference.leftoverDays > 0 ? ` and ${difference.leftoverDays} days` : ""}`}
                  sub="Whole weeks plus the leftover days"
                />
                <ResultCard label="Weekdays / weekend days" value={`${difference.weekdays} / ${difference.weekendDays}`} sub="Monday to Friday versus Saturday and Sunday" />
              </div>
              {difference.reversed && (
                <p className="mt-4 text-sm text-gray-600">You entered the later date first, so the dates were swapped to keep the count positive.</p>
              )}
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">Pick two valid dates to see the count.</p>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Start from" htmlFor="dc-base">
              <input id="dc-base" type="date" className={inputClass} value={base} onChange={(e) => setBase(e.target.value)} />
            </Field>
            <Field label="Direction" htmlFor="dc-direction">
              <Select id="dc-direction" value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="1">Add (move forward)</option>
                <option value="-1">Subtract (move backward)</option>
              </Select>
            </Field>
            <Field label="Years" htmlFor="dc-years">
              <input id="dc-years" type="number" min="0" className={inputClass} value={years} onChange={(e) => setYears(e.target.value)} />
            </Field>
            <Field label="Months" htmlFor="dc-months">
              <input id="dc-months" type="number" min="0" className={inputClass} value={months} onChange={(e) => setMonths(e.target.value)} />
            </Field>
            <Field label="Weeks" htmlFor="dc-weeks">
              <input id="dc-weeks" type="number" min="0" className={inputClass} value={weeks} onChange={(e) => setWeeks(e.target.value)} />
            </Field>
            <Field label="Days" htmlFor="dc-days">
              <input id="dc-days" type="number" min="0" className={inputClass} value={days} onChange={(e) => setDays(e.target.value)} />
            </Field>
          </div>
          {shifted ? (
            <div className="mt-7" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="Resulting date" value={formatIso(shifted)} sub={`${direction === "1" ? "After" : "Before"} ${formatIso(base)}`} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Months are added before days. When a month lands on a date that does not exist, such as 31 February, the
                result is pulled back to the last day of that month instead of spilling into the next one.
              </p>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">Enter a valid date and non negative amounts to see the result.</p>
          )}
        </>
      )}
    </div>
  );
}
