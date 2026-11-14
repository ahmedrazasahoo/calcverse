"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateRetirement } from "./retirement";

const CURRENCIES = ["$", "₹", "£", "Rs", "€"];

export default function RetirementCalculator() {
  const [currency, setCurrency] = useState("$");
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("60");
  const [savings, setSavings] = useState("50000");
  const [contribution, setContribution] = useState("500");
  const [returnRate, setReturnRate] = useState("8");
  const [goal, setGoal] = useState("1000000");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const parsedGoal = parseNum(goal);
  const hasGoal = parsedGoal !== null && parsedGoal > 0;

  const result = useMemo(() => {
    const ca = parseNum(currentAge);
    const ra = parseNum(retirementAge);
    const s = parseNum(savings);
    const c = parseNum(contribution);
    const r = parseNum(returnRate);
    const g = parseNum(goal);
    if (ca === null || ra === null || s === null || c === null || r === null || g === null) return null;
    try {
      return calculateRetirement({
        currentAge: ca,
        retirementAge: ra,
        currentSavings: s,
        monthlyContribution: c,
        expectedReturnPercent: r,
        goalAmount: g,
      });
    } catch {
      return null;
    }
  }, [currentAge, retirementAge, savings, contribution, returnRate, goal]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Your current age" htmlFor="ret-age">
          <input id="ret-age" className={inputClass} inputMode="decimal" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
        </Field>
        <Field label="Age you want to retire" htmlFor="ret-retire-age">
          <input id="ret-retire-age" className={inputClass} inputMode="decimal" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
        </Field>
        <Field label="Savings you have now" htmlFor="ret-savings">
          <input id="ret-savings" className={inputClass} inputMode="decimal" value={savings} onChange={(e) => setSavings(e.target.value)} />
        </Field>
        <Field label="Monthly contribution" htmlFor="ret-contribution">
          <input id="ret-contribution" className={inputClass} inputMode="decimal" value={contribution} onChange={(e) => setContribution(e.target.value)} />
        </Field>
        <Field label="Expected return (% per year)" htmlFor="ret-return">
          <input id="ret-return" className={inputClass} inputMode="decimal" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} />
        </Field>
        <Field label="Retirement goal (optional)" htmlFor="ret-goal">
          <input id="ret-goal" className={inputClass} inputMode="decimal" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="ret-currency">
          <select id="ret-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Projected savings at retirement" value={money(result.projectedCorpus)} sub={`What your savings and monthly contributions could grow to by age ${retirementAge}.`} />
            <ResultCard label="You will have put in" value={money(result.totalContributions)} sub="Your starting savings plus every monthly contribution you add along the way." />
            <ResultCard label="Growth from returns" value={money(result.growth)} sub="The extra amount added by investment returns, on top of everything you put in." />
          </div>
          {hasGoal && result.monthlyNeeded !== null && result.shortfall !== null && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {result.shortfall > 0 ? (
                <ResultCard label="Shortfall" value={money(result.shortfall)} sub="How far your projected savings fall short of the goal you entered." />
              ) : (
                <ResultCard label="Goal reached" value={money(parsedGoal ?? 0)} sub="Your projected savings meet or pass the goal you entered." />
              )}
              <ResultCard label="Monthly needed" value={money(result.monthlyNeeded)} sub="The monthly contribution that would hit your goal exactly, given your current savings and return." />
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter your ages, some savings or a monthly contribution, and an expected return. Retirement age must be after your current age.
        </p>
      )}
    </div>
  );
}
