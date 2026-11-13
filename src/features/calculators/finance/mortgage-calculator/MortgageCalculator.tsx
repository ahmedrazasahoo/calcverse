"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateMortgage } from "./mortgage";

const TERMS = [30, 20, 15, 10];

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [rate, setRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");
  const [tax, setTax] = useState("6000");
  const [insurance, setInsurance] = useState("1800");
  const [hoa, setHoa] = useState("0");
  const [pmiRate, setPmiRate] = useState("0.5");

  const money = (n: number) => `$ ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const hp = parseNum(homePrice);
    const dp = parseNum(downPayment);
    const r = parseNum(rate);
    const t = parseNum(termYears);
    const tx = parseNum(tax);
    const ins = parseNum(insurance);
    const h = parseNum(hoa);
    const pmi = parseNum(pmiRate);
    if ([hp, dp, r, t, tx, ins, h, pmi].some((v) => v === null)) return null;
    try {
      return calculateMortgage({
        homePrice: hp!,
        downPayment: dp!,
        annualRatePercent: r!,
        termYears: t!,
        annualPropertyTax: tx!,
        annualHomeInsurance: ins!,
        monthlyHoa: h!,
        pmiAnnualRatePercent: pmi!,
      });
    } catch {
      return null;
    }
  }, [homePrice, downPayment, rate, termYears, tax, insurance, hoa, pmiRate]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Home price ($)" htmlFor="mtg-price">
          <input id="mtg-price" className={inputClass} inputMode="decimal" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
        </Field>
        <Field label="Down payment ($)" htmlFor="mtg-down">
          <input id="mtg-down" className={inputClass} inputMode="decimal" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="mtg-rate">
          <input id="mtg-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Loan term" htmlFor="mtg-term">
          <select id="mtg-term" className={selectClass} value={termYears} onChange={(e) => setTermYears(e.target.value)}>
            {TERMS.map((t) => (
              <option key={t} value={t}>{t} years</option>
            ))}
          </select>
        </Field>
        <Field label="Property tax ($ per year)" htmlFor="mtg-tax">
          <input id="mtg-tax" className={inputClass} inputMode="decimal" value={tax} onChange={(e) => setTax(e.target.value)} />
        </Field>
        <Field label="Home insurance ($ per year)" htmlFor="mtg-insurance">
          <input id="mtg-insurance" className={inputClass} inputMode="decimal" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
        </Field>
        <Field label="HOA dues ($ per month)" htmlFor="mtg-hoa">
          <input id="mtg-hoa" className={inputClass} inputMode="decimal" value={hoa} onChange={(e) => setHoa(e.target.value)} />
        </Field>
        <Field label="PMI rate (% per year)" htmlFor="mtg-pmi" hint="Only charged when the down payment is under 20%. 0.5% is a common estimate.">
          <input id="mtg-pmi" className={inputClass} inputMode="decimal" value={pmiRate} onChange={(e) => setPmiRate(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Total monthly payment" value={money(result.totalMonthlyPayment)} sub={result.monthlyPmi > 0 ? "Including PMI for now" : "Principal, interest, tax and insurance"} />
            <ResultCard label="Principal and interest" value={money(result.monthlyPrincipalAndInterest)} sub={`Loan of ${money(result.loanAmount)}`} />
            <ResultCard label="Total interest over the loan" value={money(result.totalInterest)} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Property tax (monthly)" value={money(result.monthlyPropertyTax)} />
            <ResultCard label="Insurance (monthly)" value={money(result.monthlyHomeInsurance)} />
            <ResultCard label="Down payment" value={`${result.downPaymentPercent}%`} sub={money(parseNum(downPayment) ?? 0)} />
            {result.monthlyPmi > 0 ? (
              <ResultCard label="PMI (monthly)" value={money(result.monthlyPmi)} sub={`Drops off after month ${fmt(result.pmiMonths)}, payment becomes ${money(result.totalMonthlyAfterPmi)}`} />
            ) : (
              <ResultCard label="PMI" value="$ 0.00" sub="Not charged at this down payment" />
            )}
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Check the figures: the down payment must be smaller than the home price, and every amount must be valid.
        </p>
      )}
    </div>
  );
}
