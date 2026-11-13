"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, parseNum } from "@/components/ui";
import { DEFAULT_CYCLE_LENGTH, estimateOvulation } from "./ovulation";

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

export default function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState(todayIso());
  const [cycleLength, setCycleLength] = useState(String(DEFAULT_CYCLE_LENGTH));

  const result = useMemo(() => {
    const cycle = parseNum(cycleLength);
    if (cycle === null) return null;
    return estimateOvulation(lastPeriod, cycle);
  }, [lastPeriod, cycleLength]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First day of your last period" htmlFor="ov-lmp">
          <input id="ov-lmp" type="date" className={inputClass} value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
        </Field>
        <Field label="Usual cycle length (days)" htmlFor="ov-cycle" hint="Count from the first day of one period to the first day of the next. Most cycles run 23 to 35 days; this tool supports 21 to 45.">
          <input id="ov-cycle" type="number" min="21" max="45" className={inputClass} value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Estimated ovulation day" value={formatIso(result.ovulationDate)} sub="The day an egg is most likely released" />
            <ResultCard
              label="Fertile window"
              value={`${formatIso(result.fertileWindowStart)} to ${formatIso(result.fertileWindowEnd)}`}
              sub="The days pregnancy is possible in this cycle"
            />
            <ResultCard
              label="Most fertile days"
              value={`${formatIso(result.peakFertileStart)} and ${formatIso(result.peakFertileEnd)}`}
              sub="The two days with the highest chance"
            />
            <ResultCard label="Next period expected" value={formatIso(result.nextPeriodDate)} sub="If this cycle follows your usual pattern" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Following cycle: ovulation is estimated around {formatIso(result.followingOvulationDate)}. These dates are
            estimates built on an average cycle. Stress, illness, travel and many other things can shift ovulation by
            several days, so never treat this calendar as a guarantee in either direction.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Pick the first day of your last period and a cycle length between 21 and 45 days to see your fertile window.
        </p>
      )}
    </div>
  );
}
