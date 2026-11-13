"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateEmi, LOAN_PRESETS, type LoanType } from "./emi";

const CURRENCIES = [
  { symbol: "₹", label: "INR (₹)" },
  { symbol: "$", label: "USD ($)" },
  { symbol: "£", label: "GBP (£)" },
  { symbol: "Rs", label: "PKR (Rs)" },
  { symbol: "€", label: "EUR (€)" },
];

export default function EmiCalculator() {
  const [loanType, setLoanType] = useState<LoanType>("home");
  const [currency, setCurrency] = useState("₹");
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState(String(LOAN_PRESETS.home.typicalRatePercent));
  const [months, setMonths] = useState(String(LOAN_PRESETS.home.typicalTenureMonths));
  const [showSchedule, setShowSchedule] = useState(false);

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const applyPreset = (type: LoanType) => {
    setLoanType(type);
    setRate(String(LOAN_PRESETS[type].typicalRatePercent));
    setMonths(String(LOAN_PRESETS[type].typicalTenureMonths));
  };

  const result = useMemo(() => {
    const p = parseNum(principal);
    const r = parseNum(rate);
    const m = parseNum(months);
    if (p === null || r === null || m === null) return null;
    try {
      return calculateEmi({ principal: p, annualRatePercent: r, tenureMonths: m });
    } catch {
      return null;
    }
  }, [principal, rate, months]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Loan type" htmlFor="emi-type">
          <select id="emi-type" className={selectClass} value={loanType} onChange={(e) => applyPreset(e.target.value as LoanType)}>
            <option value="home">Home loan</option>
            <option value="car">Car loan</option>
            <option value="personal">Personal loan</option>
          </select>
        </Field>
        <Field label="Currency" htmlFor="emi-currency">
          <select id="emi-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.symbol} value={c.symbol}>{c.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Loan amount" htmlFor="emi-principal">
          <input id="emi-principal" className={inputClass} inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="emi-rate">
          <input id="emi-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Tenure (months)" htmlFor="emi-months" hint={LOAN_PRESETS[loanType].note}>
          <input id="emi-months" className={inputClass} inputMode="numeric" value={months} onChange={(e) => setMonths(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Monthly EMI" sub="The fixed amount you pay the bank every month until the loan ends." value={money(result.emi)} />
            <ResultCard label="Total interest" value={money(result.totalInterest)} sub={`over ${fmt(result.schedule.length)} months`} />
            <ResultCard label="Total repayment" value={money(result.totalPayment)} sub="Principal plus interest" />
          </div>
          <button
            type="button"
            onClick={() => setShowSchedule((v) => !v)}
            className="mt-5 min-h-11 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-sm ring-1 ring-white/80 backdrop-blur transition hover:bg-white"
          >
            {showSchedule ? "Hide amortisation schedule" : "Show amortisation schedule"}
          </button>
          {showSchedule && (
            <div className="mt-4 max-h-96 overflow-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Month</th>
                    <th className="px-4 py-2.5 font-semibold">Payment</th>
                    <th className="px-4 py-2.5 font-semibold">Principal</th>
                    <th className="px-4 py-2.5 font-semibold">Interest</th>
                    <th className="px-4 py-2.5 font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.month} className="border-t border-gray-100">
                      <td className="px-4 py-2">{row.month}</td>
                      <td className="px-4 py-2">{money(row.payment)}</td>
                      <td className="px-4 py-2">{money(row.principalPaid)}</td>
                      <td className="px-4 py-2">{money(row.interestPaid)}</td>
                      <td className="px-4 py-2">{money(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a valid amount, rate and tenure in whole months to see your EMI.
        </p>
      )}
    </div>
  );
}
