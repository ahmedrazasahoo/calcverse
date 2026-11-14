"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, inputClass, parseNum } from "@/components/ui";
import { formatParts, parseDateInput, todayParts, toInputValue } from "@/lib/dates";
import { calculatePeriod } from "./period";

export default function PeriodCalculator() {
  const [last, setLast] = useState(toInputValue(todayParts()));
  const [cycle, setCycle] = useState("28");
  const [length, setLength] = useState("5");

  const parsedDate = parseDateInput(last);
  const cycleN = parseNum(cycle);
  const lengthN = parseNum(length);

  const result = useMemo(() => {
    if (!parsedDate || cycleN === null || lengthN === null) return null;
    return calculatePeriod({
      lastPeriod: parsedDate,
      cycleLength: cycleN,
      periodLength: lengthN,
      today: todayParts(),
    });
  }, [parsedDate, cycleN, lengthN]);

  const invalid = last !== "" && (!parsedDate || !result);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="First day of last period" htmlFor="period-last">
          <input id="period-last" type="date" className={inputClass} value={last} onChange={(e) => setLast(e.target.value)} />
        </Field>
        <Field label="Average cycle length (days)" htmlFor="period-cycle" hint="Between 21 and 45 days. 28 is the common average.">
          <input id="period-cycle" type="number" min={21} max={45} className={inputClass} value={cycle} onChange={(e) => setCycle(e.target.value)} />
        </Field>
        <Field label="Period length (days)" htmlFor="period-length">
          <input id="period-length" type="number" min={1} max={14} className={inputClass} value={length} onChange={(e) => setLength(e.target.value)} />
        </Field>
      </div>

      {invalid ? (
        <div className="mt-6">
          <ErrorNote>Check your entries: pick a valid date, a cycle length between 21 and 45 days, and a period length between 1 and 14 days.</ErrorNote>
        </div>
      ) : result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Next period" value={formatParts(result.nextPeriods[0])} sub={`Expected to run to ${formatParts(result.nextPeriodEnd)}`} primary />
            <ResultCard
              label="Days until next period"
              value={result.daysUntilNextPeriod >= 0 ? fmt(result.daysUntilNextPeriod) : "Overdue estimate"}
              sub={result.daysUntilNextPeriod >= 0 ? "Counting from today" : "The estimate has passed, cycles vary"}
            />
            <ResultCard label="Estimated ovulation" value={formatParts(result.ovulation)} sub="For the coming cycle, about 14 days before the next period" />
            <ResultCard label="Fertile window" value={`${formatParts(result.fertileStart)} to ${formatParts(result.fertileEnd)}`} sub="The days around ovulation when conception is most likely" />
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Your next three periods</h3>
          <ol className="mt-3 space-y-2.5">
            {result.nextPeriods.map((p, i) => (
              <li key={i} className="glass flex gap-3.5 rounded-xl p-4">
                <span className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800" aria-hidden="true">{i + 1}</span>
                <span className="pt-1 leading-relaxed text-gray-700">Period {i + 1} is estimated to start on {formatParts(p)}.</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            These dates are cycle estimates only. Real cycles vary, sometimes by a week or more, so this tool is not a
            medical or contraception tool. See a clinician if you have concerns about your cycle, pain, bleeding or
            fertility.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Enter your dates" body="Add the first day of your last period, your average cycle length and your period length to see your estimated dates." />
        </div>
      )}
    </div>
  );
}
