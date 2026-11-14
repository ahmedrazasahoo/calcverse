"use client";

import { useEffect, useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, inputClass } from "@/components/ui";
import { getPair } from "./pairs";
import {
  convertWallTime,
  differenceText,
  formatZoned,
  parseDateTimeLocal,
  toDateTimeLocalValue,
  wallTimeInZone,
} from "./tz";

export default function TimeZonePairConverter({ pairSlug }: { pairSlug: string }) {
  const pair = getPair(pairSlug);
  const [inputValue, setInputValue] = useState(() => toDateTimeLocalValue(new Date()));
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(timer);
  }, []);

  const conversion = useMemo(() => {
    if (!pair) return null;
    const wall = parseDateTimeLocal(inputValue);
    if (!wall) return null;
    return convertWallTime(wall, pair.fromZone, pair.toZone);
  }, [pair, inputValue]);

  if (!pair) {
    return (
      <EmptyState
        title="This time zone pair is not available"
        body="The converter could not find that pair of time zones. Try one of the listed EST, PST, CST, MST and GMT pairs instead."
      />
    );
  }

  const liveFrom = wallTimeInZone(pair.fromZone, now);
  const liveTo = wallTimeInZone(pair.toZone, now);
  const inputValid = parseDateTimeLocal(inputValue) !== null;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={`Date and time in ${pair.fromName}`}
          htmlFor="tz-input"
          hint={`${pair.fromLabel}: ${pair.fromCities}.`}
        >
          <input
            id="tz-input"
            type="datetime-local"
            className={inputClass}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Field>
        <div className="rounded-[2rem] bg-white/55 px-6 py-5 ring-1 ring-white/70 backdrop-blur">
          <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">The difference</p>
          <p className="mt-1.5 text-lg leading-snug font-bold text-gray-900">
            {conversion
              ? `${pair.toName} is ${differenceText(pair.fromZone, pair.toZone, conversion.instant)} ${pair.fromName}`
              : "Pick a date and time to see the difference."}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">{pair.differenceNote}</p>
        </div>
      </div>

      {!inputValid && (
        <div className="mt-5">
          <ErrorNote>That date and time could not be read. Use the date and time picker to choose a valid moment.</ErrorNote>
        </div>
      )}

      {conversion && (
        <div className="mt-7" aria-live="polite">
          <ResultCard
            label={`In ${pair.toName}`}
            value={formatZoned(conversion.result)}
            sub={`${pair.toLabel}: ${pair.toCities}`}
            primary
          />
        </div>
      )}

      <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <ResultCard
          label={`Right now in ${pair.fromName}`}
          value={formatZoned(liveFrom)}
          sub="Live local time"
        />
        <ResultCard
          label={`Right now in ${pair.toName}`}
          value={formatZoned(liveTo)}
          sub="Live local time"
        />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-gray-600">
        {pair.blurb} Conversions use the IANA zones {pair.fromZone} and {pair.toZone}, so daylight saving is
        applied for the exact date you pick rather than a fixed offset.
      </p>
    </div>
  );
}
