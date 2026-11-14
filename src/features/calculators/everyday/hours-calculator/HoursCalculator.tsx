"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { formatTime12h, shiftClockTime, workShift } from "./hoursCalculator";

export default function HoursCalculator() {
  const [mode, setMode] = useState("shift");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:30");
  const [breakMinutes, setBreakMinutes] = useState("30");
  const [baseTime, setBaseTime] = useState("09:00");
  const [shiftHours, setShiftHours] = useState("2");
  const [shiftMinutes, setShiftMinutes] = useState("30");
  const [direction, setDirection] = useState("1");

  const shift = useMemo(() => {
    if (mode !== "shift") return null;
    const breaks = parseNum(breakMinutes);
    if (breaks === null) return null;
    return workShift(start, end, breaks);
  }, [mode, start, end, breakMinutes]);

  const moved = useMemo(() => {
    if (mode !== "add") return null;
    const h = parseNum(shiftHours);
    const m = parseNum(shiftMinutes);
    if (h === null || m === null || h < 0 || m < 0) return null;
    const delta = (h * 60 + m) * (direction === "1" ? 1 : -1);
    return shiftClockTime(baseTime, delta);
  }, [mode, baseTime, shiftHours, shiftMinutes, direction]);

  const dayNote =
    moved === null || moved.dayOffset === 0
      ? "Same day"
      : moved.dayOffset === 1
        ? "The next day"
        : moved.dayOffset === -1
          ? "The previous day"
          : `${Math.abs(moved.dayOffset)} days ${moved.dayOffset > 0 ? "later" : "earlier"}`;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you want to do?" htmlFor="hc-mode">
          <Select id="hc-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="shift">Work hours between start and end</option>
            <option value="add">Add or subtract time from a clock time</option>
          </Select>
        </Field>
      </div>

      {mode === "shift" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <Field label="Start time" htmlFor="hc-start">
              <input id="hc-start" type="time" className={inputClass} value={start} onChange={(e) => setStart(e.target.value)} />
            </Field>
            <Field label="End time" htmlFor="hc-end" hint="An end time earlier than the start is read as the next morning.">
              <input id="hc-end" type="time" className={inputClass} value={end} onChange={(e) => setEnd(e.target.value)} />
            </Field>
            <Field label="Unpaid break (minutes)" htmlFor="hc-break">
              <input id="hc-break" type="number" min="0" className={inputClass} value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} />
            </Field>
          </div>
          {shift ? (
            <div className="mt-7" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Time you worked" value={shift.durationLabel} sub="After the unpaid break" />
                <ResultCard label="In decimal hours" value={fmt(shift.decimalHours, 2)} sub="The format most payroll systems use" />
                <ResultCard label="Total span" value={`${Math.floor(shift.grossMinutes / 60)} h ${shift.grossMinutes % 60} min`} sub={`Including the ${shift.breakMinutes} minute break`} />
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">Enter valid times, and a break that is shorter than the shift itself.</p>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Clock time" htmlFor="hc-base">
              <input id="hc-base" type="time" className={inputClass} value={baseTime} onChange={(e) => setBaseTime(e.target.value)} />
            </Field>
            <Field label="Direction" htmlFor="hc-direction">
              <Select id="hc-direction" value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="1">Add</option>
                <option value="-1">Subtract</option>
              </Select>
            </Field>
            <Field label="Hours" htmlFor="hc-hours">
              <input id="hc-hours" type="number" min="0" className={inputClass} value={shiftHours} onChange={(e) => setShiftHours(e.target.value)} />
            </Field>
            <Field label="Minutes" htmlFor="hc-minutes">
              <input id="hc-minutes" type="number" min="0" className={inputClass} value={shiftMinutes} onChange={(e) => setShiftMinutes(e.target.value)} />
            </Field>
          </div>
          {moved ? (
            <div className="mt-7" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="New time" value={formatTime12h(moved.time) ?? moved.time} sub={dayNote} />
                <ResultCard label="In 24 hour format" value={moved.time} sub="The way timetables usually print it" />
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">Enter a valid time and amounts to move it by.</p>
          )}
        </>
      )}
    </div>
  );
}
