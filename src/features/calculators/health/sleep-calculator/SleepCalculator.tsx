"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, selectClass } from "@/components/ui";
import { bedtimesForWakeUp, formatTime12h, wakeTimesForBedtime, type SleepTimeOption } from "./sleep";

function nowTimeString(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function OptionCard({ option }: { option: SleepTimeOption }) {
  return (
    <div className="rounded-xl bg-brand-50 px-4 py-4">
      <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">
        {option.cycles} cycles{option.recommended ? " · recommended" : ""}
      </p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{formatTime12h(option.time) ?? option.time}</p>
      <p className="mt-0.5 text-sm text-gray-600">{option.sleepLabel} of sleep</p>
    </div>
  );
}

export default function SleepCalculator() {
  const [mode, setMode] = useState("wake");
  const [time, setTime] = useState("07:00");
  const [nowStamp, setNowStamp] = useState("");

  const options = useMemo(() => {
    if (mode === "now") {
      if (!nowStamp) return null;
      return wakeTimesForBedtime(nowStamp);
    }
    return mode === "wake" ? bedtimesForWakeUp(time) : wakeTimesForBedtime(time);
  }, [mode, time, nowStamp]);

  const heading =
    mode === "wake" ? "Go to bed at one of these times" : mode === "bed" ? "Set your alarm for one of these times" : "If you sleep now, wake up at";

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="I want to" htmlFor="sl-mode">
          <select
            id="sl-mode"
            className={selectClass}
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              if (e.target.value === "now") setNowStamp(nowTimeString());
            }}
          >
            <option value="wake">Wake up at a set time</option>
            <option value="bed">Go to bed at a set time</option>
            <option value="now">Go to sleep right now</option>
          </select>
        </Field>
        {mode !== "now" ? (
          <Field label={mode === "wake" ? "Wake up time" : "Bedtime"} htmlFor="sl-time">
            <input id="sl-time" type="time" className={inputClass} value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>
        ) : (
          <Field label="Right now it is" htmlFor="sl-now">
            <div className="flex items-center gap-3">
              <p id="sl-now" className="text-lg font-semibold text-gray-900">
                {nowStamp ? (formatTime12h(nowStamp) ?? nowStamp) : ""}
              </p>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-700"
                onClick={() => setNowStamp(nowTimeString())}
              >
                Refresh
              </button>
            </div>
          </Field>
        )}
      </div>

      {options ? (
        <div className="mt-7" aria-live="polite">
          <p className="text-sm font-semibold text-gray-900">{heading}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((option) => (
              <OptionCard key={option.cycles} option={option} />
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Times include about 15 minutes to fall asleep. Most adults feel best on five or six full cycles, which is
            seven and a half to nine hours of sleep. One short night is harmless; a regular pattern of four cycles or
            fewer is not.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Pick a valid time to see your sleep cycle options.</p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard label="One sleep cycle" value="90 minutes" sub="Light, deep and dreaming sleep in one round" />
        <ResultCard label="Falling asleep takes" value="About 15 minutes" sub="Already included in every time above" />
      </div>
    </div>
  );
}
