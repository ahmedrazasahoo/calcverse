"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, Select } from "@/components/ui";
import { formatParts, parseDateInput, toInputValue, todayParts } from "@/lib/dates";
import { calculateConception, type ConceptionMode } from "./conception";

const MODE_LABELS: Record<ConceptionMode, string> = {
  "due-date": "Due date",
  "birth-date": "Birth date",
  lmp: "First day of last period",
};

const MODE_HINTS: Record<ConceptionMode, string> = {
  "due-date":
    "The estimated due date from a scan, a due date calculator or your care team.",
  "birth-date":
    "The day the baby was born. This mode assumes the birth fell close to the due date, so read the result as a rough guide only.",
  lmp: "The first day of bleeding in the cycle the pregnancy began, not the day it ended.",
};

export default function ConceptionCalculator() {
  const [mode, setMode] = useState<ConceptionMode>("due-date");
  const [dateValue, setDateValue] = useState(() => toInputValue(todayParts()));

  const result = useMemo(() => {
    const parts = parseDateInput(dateValue);
    if (!parts) return null;
    try {
      return calculateConception(mode, parts);
    } catch {
      return null;
    }
  }, [mode, dateValue]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="I know the" htmlFor="conc-mode">
          <Select
            id="conc-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as ConceptionMode)}
          >
            <option value="due-date">Due date</option>
            <option value="birth-date">Birth date</option>
            <option value="lmp">First day of last period</option>
          </Select>
        </Field>
        <Field label={MODE_LABELS[mode]} htmlFor="conc-date" hint={MODE_HINTS[mode]}>
          <input
            id="conc-date"
            type="date"
            className={inputClass}
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard
              label="Most likely conception date"
              value={formatParts(result.conceptionDate)}
              sub="The single most likely day, at the centre of the window below. It is an estimate based on a typical 28 day cycle"
              primary
            />
            <ResultCard
              label="Likely conception window"
              value={`${formatParts(result.windowStart)} to ${formatParts(result.windowEnd)}`}
              sub="Conception most likely fell somewhere in this 7 day stretch, because sperm can survive for several days before fertilisation"
            />
            {result.dueDate ? (
              <ResultCard
                label="Due date"
                value={formatParts(result.dueDate)}
                sub={
                  mode === "lmp"
                    ? "Worked out as 280 days from the last period"
                    : "The due date you entered, used as the starting point"
                }
              />
            ) : null}
            {result.lmpEstimate ? (
              <ResultCard
                label="Estimated last period start"
                value={formatParts(result.lmpEstimate)}
                sub="Counted back 280 days, the conventional start of the pregnancy timeline"
              />
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            {mode === "birth-date"
              ? "Birth date mode assumes the baby arrived on or near the due date. Babies born early or late shift the real conception date by the same amount, so treat this result as the roughest of the three modes."
              : "These dates are estimates built on a typical 28 day cycle with ovulation on day 14. Longer or shorter cycles move conception by several days, and no calculator can recover an exact day after the fact. This page is general information, not medical advice."}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Pick a valid date to see the most likely conception date and window.
        </p>
      )}
    </div>
  );
}
