"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EmptyState,
  ErrorNote,
  Field,
  ResultCard,
  inputClass,
  secondaryButtonClass,
  selectClass,
} from "@/components/ui";
import { detectUnit, fromEpochMs, toEpochMs, type EpochUnit } from "./epoch";

type UnitChoice = EpochUnit | "auto";

function relativeText(ms: number): string {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const steps: [number, string][] = [
    [1000, "second"],
    [60, "minute"],
    [60, "hour"],
    [24, "day"],
    [30.44, "month"],
    [12, "year"],
  ];
  let value = abs;
  let unit = "millisecond";
  for (const [factor, name] of steps) {
    if (value < factor) break;
    value = value / factor;
    unit = name;
  }
  const rounded = Math.max(1, Math.round(value));
  const label = `${rounded} ${unit}${rounded === 1 ? "" : "s"}`;
  return diff < 0 ? `${label} ago` : `in ${label}`;
}

export default function EpochConverter() {
  const [stamp, setStamp] = useState("1700000000");
  const [unit, setUnit] = useState<UnitChoice>("auto");
  const [dateTime, setDateTime] = useState("2023-11-14T22:13:20");
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, [paused]);

  const parsed = useMemo(() => {
    const text = stamp.trim();
    if (!text) return { kind: "empty" as const };
    if (!/^-?\d+(\.\d+)?$/.test(text)) return { kind: "error" as const };
    const effective = unit === "auto" ? detectUnit(text) : unit;
    const ms = toEpochMs(text, effective);
    if (!Number.isFinite(ms) || Number.isNaN(new Date(ms).getTime())) return { kind: "error" as const };
    return { kind: "ok" as const, ms, effective };
  }, [stamp, unit]);

  const fromDate = useMemo(() => {
    if (!dateTime) return null;
    const ms = new Date(dateTime).getTime();
    if (Number.isNaN(ms)) return null;
    return fromEpochMs(ms);
  }, [dateTime]);

  const nowParts = fromEpochMs(nowMs);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="px-1 text-lg font-bold text-gray-900">Timestamp to date</h2>
        <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
          <Field label="Unix timestamp" htmlFor="epoch-stamp">
            <input
              id="epoch-stamp"
              className={inputClass}
              value={stamp}
              onChange={(e) => setStamp(e.target.value)}
              inputMode="numeric"
              placeholder="1700000000"
            />
          </Field>
          <Field label="Unit" htmlFor="epoch-unit">
            <select
              id="epoch-unit"
              className={selectClass}
              value={unit}
              onChange={(e) => setUnit(e.target.value as UnitChoice)}
            >
              <option value="auto">Auto detect</option>
              <option value="seconds">Seconds</option>
              <option value="milliseconds">Milliseconds</option>
              <option value="microseconds">Microseconds</option>
              <option value="nanoseconds">Nanoseconds</option>
            </select>
          </Field>
        </div>
        {parsed.kind === "empty" && (
          <EmptyState title="Enter a timestamp" body="Type or paste a Unix timestamp and pick its unit, or let auto detect guess from the number of digits." />
        )}
        {parsed.kind === "error" && (
          <ErrorNote>That does not look like a valid timestamp. Use digits only, for example 1700000000 for seconds.</ErrorNote>
        )}
        {parsed.kind === "ok" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="UTC" value={new Date(parsed.ms).toUTCString()} primary />
            <ResultCard label="Relative" value={relativeText(parsed.ms)} sub={`Detected unit: ${parsed.effective}`} />
            <ResultCard label="Your local time" value={new Date(parsed.ms).toLocaleString()} />
            <ResultCard label="ISO 8601" value={new Date(parsed.ms).toISOString()} />
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="px-1 text-lg font-bold text-gray-900">Date to timestamp</h2>
        <Field label="Date and time (your local time)" htmlFor="epoch-datetime">
          <input
            id="epoch-datetime"
            type="datetime-local"
            step="1"
            className={inputClass}
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </Field>
        {fromDate ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Seconds" value={String(fromDate.seconds)} />
            <ResultCard label="Milliseconds" value={String(fromDate.milliseconds)} />
            <ResultCard label="Microseconds" value={fromDate.microseconds} />
            <ResultCard label="Nanoseconds" value={fromDate.nanoseconds} />
          </div>
        ) : (
          <EmptyState title="Pick a date and time" body="Choose a date and time above to see it as an epoch timestamp in every unit." />
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <h2 className="text-lg font-bold text-gray-900">Current epoch time</h2>
          <button type="button" className={secondaryButtonClass} onClick={() => setPaused((p) => !p)}>
            {paused ? "Resume live clock" : "Pause live clock"}
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label="Seconds now" value={String(nowParts.seconds)} primary />
          <ResultCard label="Milliseconds now" value={String(nowParts.milliseconds)} />
        </div>
      </section>
    </div>
  );
}
