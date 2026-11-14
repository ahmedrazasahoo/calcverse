"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, ResultCard, inputClass, parseNum, Select } from "@/components/ui";
import { buildChart, describe12, describe24, type AmPm } from "./military";

function two(n: number): string {
  return String(n).padStart(2, "0");
}

export default function MilitaryTimeConverter() {
  const [hour24, setHour24] = useState("14");
  const [minute24, setMinute24] = useState("30");
  const [hour12, setHour12] = useState("2");
  const [minute12, setMinute12] = useState("30");
  const [ampm, setAmpm] = useState<AmPm>("PM");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const from24 = useMemo(() => {
    const h = parseNum(hour24);
    const m = parseNum(minute24);
    if (h === null || m === null) return null;
    try {
      return describe24(h, m);
    } catch {
      return null;
    }
  }, [hour24, minute24]);

  const from12 = useMemo(() => {
    const h = parseNum(hour12);
    const m = parseNum(minute12);
    if (h === null || m === null) return null;
    try {
      return describe12(h, m, ampm);
    } catch {
      return null;
    }
  }, [hour12, minute12, ampm]);

  const chart = useMemo(() => buildChart(), []);

  const liveLocal = now ? describe24(now.getHours(), now.getMinutes()) : null;
  const liveZulu = now ? describe24(now.getUTCHours(), now.getUTCMinutes()) : null;

  return (
    <div>
      <div className="glass mb-7 rounded-2xl px-6 py-5" aria-live="off">
        <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">Right now</p>
        {now && liveLocal && liveZulu ? (
          <p className="mt-1.5 text-base leading-relaxed text-gray-700">
            Your local military time is{" "}
            <strong className="text-gray-900 tabular-nums">
              {liveLocal.military.replace(" hours", "")}
            </strong>{" "}
            ({liveLocal.spoken}), and Zulu time (UTC) is{" "}
            <strong className="text-gray-900 tabular-nums">{liveZulu.military.replace(" hours", "")}</strong> (
            {liveZulu.spoken}). Seconds now {two(now.getSeconds())}.
          </p>
        ) : (
          <p className="mt-1.5 text-base text-gray-600">Reading your clock...</p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-label="Convert from 24 hour time">
          <h3 className="text-lg font-bold tracking-tight text-gray-900">24 hour to 12 hour</h3>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <Field label="Hour (0 to 23)" htmlFor="mt-h24">
              <input id="mt-h24" type="number" step="1" min="0" max="23" className={inputClass} value={hour24} onChange={(e) => setHour24(e.target.value)} />
            </Field>
            <Field label="Minutes (0 to 59)" htmlFor="mt-m24">
              <input id="mt-m24" type="number" step="1" min="0" max="59" className={inputClass} value={minute24} onChange={(e) => setMinute24(e.target.value)} />
            </Field>
          </div>
          {from24 ? (
            <div className="mt-4 grid gap-4">
              <ResultCard label="12 hour time" value={from24.display12} sub={`Military form: ${from24.military}`} primary />
              <ResultCard label="Say it as" value={from24.spoken} sub="How the time is read aloud" />
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">Enter an hour from 0 to 23 and minutes from 0 to 59.</p>
          )}
        </section>

        <section aria-label="Convert from 12 hour time">
          <h3 className="text-lg font-bold tracking-tight text-gray-900">12 hour to 24 hour</h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <Field label="Hour (1 to 12)" htmlFor="mt-h12">
              <input id="mt-h12" type="number" step="1" min="1" max="12" className={inputClass} value={hour12} onChange={(e) => setHour12(e.target.value)} />
            </Field>
            <Field label="Minutes" htmlFor="mt-m12">
              <input id="mt-m12" type="number" step="1" min="0" max="59" className={inputClass} value={minute12} onChange={(e) => setMinute12(e.target.value)} />
            </Field>
            <Field label="AM or PM" htmlFor="mt-ampm">
              <Select id="mt-ampm" value={ampm} onChange={(e) => setAmpm(e.target.value as AmPm)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </Select>
            </Field>
          </div>
          {from12 ? (
            <div className="mt-4 grid gap-4">
              <ResultCard label="Military time" value={from12.military} sub={`From ${from12.display12} on the 12 hour clock`} primary />
              <ResultCard label="Say it as" value={from12.spoken} sub="How the time is read aloud" />
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">Enter an hour from 1 to 12, minutes from 0 to 59, and pick AM or PM.</p>
          )}
        </section>
      </div>

      <h3 className="mt-10 text-lg font-bold tracking-tight text-gray-900">Full 24 hour reference chart</h3>
      <p className="mt-1 text-sm text-gray-600">
        Every hour on the hour. Midnight is 0000, noon is 1200, and the count simply keeps going through the
        afternoon and evening.
      </p>
      <div className="glass mt-3 overflow-x-auto rounded-xl p-2">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead>
            <tr className="text-xs tracking-widest text-brand-800 uppercase">
              <th className="px-4 py-2.5 font-semibold">12 hour clock</th>
              <th className="px-4 py-2.5 font-semibold">Military time</th>
              <th className="px-4 py-2.5 font-semibold">Spoken form</th>
            </tr>
          </thead>
          <tbody>
            {chart.map((row) => (
              <tr key={row.hour24} className="border-t border-gray-900/5">
                <td className="px-4 py-2.5 text-gray-700 tabular-nums">{row.display12}</td>
                <td className="px-4 py-2.5 font-semibold text-gray-900 tabular-nums">{row.military}</td>
                <td className="px-4 py-2.5 text-gray-700">{row.spoken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
