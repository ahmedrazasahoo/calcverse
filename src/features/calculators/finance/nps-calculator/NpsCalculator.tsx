"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateNps } from "./nps";

const CURRENCIES = ["₹", "$", "£", "Rs", "€"];

export default function NpsCalculator() {
  const [currency, setCurrency] = useState("₹");
  const [contribution, setContribution] = useState("10000");
  const [age, setAge] = useState("30");
  const [returnRate, setReturnRate] = useState("10");
  const [annuityPercent, setAnnuityPercent] = useState("40");
  const [annuityRate, setAnnuityRate] = useState("6");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const p = parseNum(contribution);
    const a = parseNum(age);
    const r = parseNum(returnRate);
    const ap = parseNum(annuityPercent);
    const ar = parseNum(annuityRate);
    if (p === null || a === null || r === null || ap === null || ar === null) return null;
    try {
      return calculateNps({
        monthlyContribution: p,
        currentAge: a,
        expectedReturnPercent: r,
        annuityPurchasePercent: ap,
        annuityRatePercent: ar,
      });
    } catch {
      return null;
    }
  }, [contribution, age, returnRate, annuityPercent, annuityRate]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Monthly contribution" htmlFor="nps-contribution">
          <input id="nps-contribution" className={inputClass} inputMode="decimal" value={contribution} onChange={(e) => setContribution(e.target.value)} />
        </Field>
        <Field label="Your current age" htmlFor="nps-age">
          <input id="nps-age" className={inputClass} inputMode="decimal" value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field label="Expected return (% per year)" htmlFor="nps-return">
          <input id="nps-return" className={inputClass} inputMode="decimal" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} />
        </Field>
        <Field label="Corpus used to buy annuity (%)" htmlFor="nps-annuity-percent">
          <input id="nps-annuity-percent" className={inputClass} inputMode="decimal" value={annuityPercent} onChange={(e) => setAnnuityPercent(e.target.value)} />
        </Field>
        <Field label="Annuity rate (% per year)" htmlFor="nps-annuity-rate">
          <input id="nps-annuity-rate" className={inputClass} inputMode="decimal" value={annuityRate} onChange={(e) => setAnnuityRate(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="nps-currency">
          <select id="nps-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Estimated corpus at 60" value={money(result.corpus)} sub="The total value your monthly contributions could grow to by age 60." />
          <ResultCard label="Lump sum you can withdraw" value={money(result.lumpSum)} sub="The part of the corpus you can take out in cash at 60 after the annuity is bought." />
          <ResultCard label="Monthly pension" value={money(result.monthlyPension)} sub="The estimated pension paid every month from the annuity you buy at 60." />
          <ResultCard label="Total you invest" value={money(result.totalInvested)} sub="All the monthly contributions you pay in from now until age 60." />
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a monthly contribution, an age between 18 and 59, and an annuity share of at least 40 percent.
        </p>
      )}
    </div>
  );
}
