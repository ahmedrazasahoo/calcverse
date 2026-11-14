"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, parseNum, selectClass } from "@/components/ui";
import { addBusinessDays, businessDaysBetween, type HolidayCalendar } from "./businessDays";

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

const CALENDAR_LABELS: Record<HolidayCalendar, string> = {
  none: "No holidays (weekends only)",
  us: "US federal holidays",
  uk: "UK bank holidays (England and Wales)",
};

export default function BusinessDaysCalculator() {
  const [mode, setMode] = useState("between");
  const [calendar, setCalendar] = useState<HolidayCalendar>("none");
  const [start, setStart] = useState(todayIso());
  const [end, setEnd] = useState(todayIso());
  const [base, setBase] = useState(todayIso());
  const [direction, setDirection] = useState("1");
  const [count, setCount] = useState("10");

  const counted = useMemo(
    () => (mode === "between" ? businessDaysBetween(start, end, calendar) : null),
    [mode, start, end, calendar]
  );

  const shifted = useMemo(() => {
    if (mode !== "add") return null;
    const amount = parseNum(count);
    if (amount === null) return null;
    return addBusinessDays(base, direction === "1" ? amount : -amount, calendar);
  }, [mode, base, direction, count, calendar]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you want to do?" htmlFor="bd-mode">
          <select id="bd-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="between">Count business days between two dates</option>
            <option value="add">Add or subtract business days from a date</option>
          </select>
        </Field>
        <Field label="Public holidays" htmlFor="bd-calendar">
          <select
            id="bd-calendar"
            className={selectClass}
            value={calendar}
            onChange={(e) => setCalendar(e.target.value as HolidayCalendar)}
          >
            <option value="none">{CALENDAR_LABELS.none}</option>
            <option value="us">{CALENDAR_LABELS.us}</option>
            <option value="uk">{CALENDAR_LABELS.uk}</option>
          </select>
        </Field>
      </div>

      {mode === "between" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Start date" htmlFor="bd-start">
              <input id="bd-start" type="date" className={inputClass} value={start} onChange={(e) => setStart(e.target.value)} />
            </Field>
            <Field label="End date" htmlFor="bd-end">
              <input id="bd-end" type="date" className={inputClass} value={end} onChange={(e) => setEnd(e.target.value)} />
            </Field>
          </div>
          {counted ? (
            <div className="mt-7" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard
                  label="Business days"
                  value={String(counted.businessDays)}
                  sub={`Monday to Friday, not counting the start date, ${formatIso(counted.startDate)} to ${formatIso(counted.endDate)}`}
                />
                <ResultCard label="Total days" value={String(counted.totalDays)} sub="Every calendar day in the same span" />
                <ResultCard label="Weekend days" value={String(counted.weekendDays)} sub="Saturdays and Sundays in the span" />
                <ResultCard
                  label="Holidays skipped"
                  value={String(counted.holidayDays)}
                  sub={calendar === "none" ? "No holiday calendar selected" : CALENDAR_LABELS[calendar]}
                />
              </div>
              {counted.holidays.length > 0 && (
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Holidays in this span:{" "}
                  {counted.holidays.map((h) => `${h.name} (${formatIso(h.date)})`).join(", ")}.
                </p>
              )}
              {counted.reversed && (
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
            <Field label="Start from" htmlFor="bd-base">
              <input id="bd-base" type="date" className={inputClass} value={base} onChange={(e) => setBase(e.target.value)} />
            </Field>
            <Field label="Direction" htmlFor="bd-direction">
              <select id="bd-direction" className={selectClass} value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="1">Add (move forward)</option>
                <option value="-1">Subtract (move backward)</option>
              </select>
            </Field>
            <Field label="Business days" htmlFor="bd-count">
              <input id="bd-count" type="number" min="0" step="1" className={inputClass} value={count} onChange={(e) => setCount(e.target.value)} />
            </Field>
          </div>
          {shifted ? (
            <div className="mt-7" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Resulting date"
                  value={formatIso(shifted)}
                  sub={`${count || "0"} business days ${direction === "1" ? "after" : "before"} ${formatIso(base)}`}
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Saturdays and Sundays are skipped automatically
                {calendar === "none" ? ", and no public holidays are taken out. Pick a holiday calendar above if your deadline should skip those too." : `, and so are ${CALENDAR_LABELS[calendar].toLowerCase()}.`}
              </p>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">Enter a valid date and a whole number of business days to see the result.</p>
          )}
        </>
      )}
    </div>
  );
}
