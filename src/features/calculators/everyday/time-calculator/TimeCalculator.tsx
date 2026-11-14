"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  addDurations,
  durationBetweenTimes,
  formatDuration,
  subtractDurations,
  toSeconds,
  type Duration,
} from "./time";

type Mode = "add" | "subtract" | "between";

interface DurationFields {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const EMPTY: DurationFields = { days: "0", hours: "0", minutes: "0", seconds: "0" };

function parseDurationFields(fields: DurationFields): Duration | null {
  const days = parseNum(fields.days);
  const hours = parseNum(fields.hours);
  const minutes = parseNum(fields.minutes);
  const seconds = parseNum(fields.seconds);
  if (days === null || hours === null || minutes === null || seconds === null) return null;
  return { days, hours, minutes, seconds };
}

function DurationInputs({
  prefix,
  legend,
  fields,
  onChange,
}: {
  prefix: string;
  legend: string;
  fields: DurationFields;
  onChange: (next: DurationFields) => void;
}) {
  const items: Array<{ key: keyof DurationFields; label: string }> = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
  ];
  return (
    <div>
      <p className="mb-2 px-1 text-sm font-semibold text-gray-800">{legend}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <Field key={item.key} label={item.label} htmlFor={`${prefix}-${item.key}`}>
            <input
              id={`${prefix}-${item.key}`}
              type="number"
              min="0"
              className={inputClass}
              value={fields[item.key]}
              onChange={(e) => onChange({ ...fields, [item.key]: e.target.value })}
            />
          </Field>
        ))}
      </div>
    </div>
  );
}

export default function TimeCalculator() {
  const [mode, setMode] = useState<Mode>("add");
  const [first, setFirst] = useState<DurationFields>({ ...EMPTY, hours: "1", minutes: "30" });
  const [second, setSecond] = useState<DurationFields>({ ...EMPTY, minutes: "45" });
  const [start, setStart] = useState("09:15");
  const [end, setEnd] = useState("17:45");

  const durationResult = useMemo(() => {
    if (mode === "between") return null;
    const a = parseDurationFields(first);
    const b = parseDurationFields(second);
    if (a === null || b === null) return null;
    try {
      const duration = mode === "add" ? addDurations(a, b) : subtractDurations(a, b);
      return { duration, totalSeconds: toSeconds(duration), overnight: false };
    } catch {
      return null;
    }
  }, [mode, first, second]);

  const clockResult = useMemo(() => {
    if (mode !== "between") return null;
    if (!start || !end) return null;
    try {
      const result = durationBetweenTimes(start, end);
      return { duration: result.duration, totalSeconds: result.totalSeconds, overnight: result.overnight };
    } catch {
      return null;
    }
  }, [mode, start, end]);

  const result = mode === "between" ? clockResult : durationResult;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you want to do?" htmlFor="tc-mode">
          <select id="tc-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="add">Add two durations</option>
            <option value="subtract">Subtract two durations</option>
            <option value="between">Time between two clock times</option>
          </select>
        </Field>
      </div>

      {mode === "between" ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Start time" htmlFor="tc-start">
            <input id="tc-start" type="time" step={1} className={inputClass} value={start} onChange={(e) => setStart(e.target.value)} />
          </Field>
          <Field label="End time" htmlFor="tc-end" hint="An end time earlier than the start is read as the next day.">
            <input id="tc-end" type="time" step={1} className={inputClass} value={end} onChange={(e) => setEnd(e.target.value)} />
          </Field>
        </div>
      ) : (
        <div className="mt-5 space-y-6">
          <DurationInputs prefix="tc-a" legend={mode === "add" ? "First duration" : "Start duration"} fields={first} onChange={setFirst} />
          <DurationInputs prefix="tc-b" legend={mode === "add" ? "Second duration" : "Duration to take away"} fields={second} onChange={setSecond} />
        </div>
      )}

      {result ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <ResultCard
            label="Total duration"
            value={formatDuration(result.duration)}
            sub={result.overnight ? "The end time fell on the next day, so a full day was counted in." : "The full length of time, broken into days, hours, minutes and seconds."}
          />
          <ResultCard
            label="Total in seconds"
            value={fmt(result.totalSeconds)}
            sub="The same duration counted as one flat number of seconds."
          />
          <ResultCard
            label="Total in hours"
            value={fmt(result.totalSeconds / 3600, 2)}
            sub="The same duration as decimal hours, the format timesheets and invoices often use."
          />
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          {mode === "subtract"
            ? "Enter both durations, and make sure the second one is not longer than the first."
            : "Enter valid times or durations, with no negative numbers, to see the result."}
        </p>
      )}
    </div>
  );
}
