"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateGratuity, type GratuityCountry } from "./gratuity";

const CURRENCIES = ["₹", "$", "£", "Rs", "€", "AED", "QAR"];

const SALARY_HINTS: Record<GratuityCountry, string> = {
  india: "For India, enter your last drawn monthly basic pay plus dearness allowance.",
  uae: "For the UAE, enter your last basic monthly salary, without allowances.",
  qatar: "For Qatar, enter your last basic monthly salary, without allowances.",
};

export default function GratuityCalculator() {
  const [currency, setCurrency] = useState("₹");
  const [country, setCountry] = useState<GratuityCountry>("india");
  const [salary, setSalary] = useState("60000");
  const [years, setYears] = useState("10");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const s = parseNum(salary);
    const y = parseNum(years);
    if (s === null || y === null) return null;
    try {
      return calculateGratuity({ country, monthlySalary: s, yearsOfService: y });
    } catch {
      return null;
    }
  }, [country, salary, years]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Country" htmlFor="grat-country">
          <select id="grat-country" className={selectClass} value={country} onChange={(e) => setCountry(e.target.value as GratuityCountry)}>
            <option value="india">India</option>
            <option value="uae">UAE</option>
            <option value="qatar">Qatar</option>
          </select>
        </Field>
        <Field label="Monthly salary" htmlFor="grat-salary">
          <input id="grat-salary" className={inputClass} inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </Field>
        <Field label="Years of service" htmlFor="grat-years">
          <input id="grat-years" className={inputClass} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="grat-currency">
          <select id="grat-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>
      <p className="mt-3 text-sm text-gray-600">{SALARY_HINTS[country]}</p>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResultCard label="Estimated gratuity" value={money(result.amount)} sub="The end of service amount estimated from your salary and years of service." />
            <ResultCard
              label="Years counted"
              value={fmt(result.yearsCounted)}
              sub={
                country === "india"
                  ? "Full years of service, with a part year above six months counted as a full year."
                  : country === "uae" && result.daysAccrued !== null
                    ? `That service builds up ${fmt(result.daysAccrued)} days of basic salary.`
                    : "The years of service used in this estimate."
              }
            />
          </div>
          <p className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 ring-1 ring-gray-100">
            {result.eligible
              ? "Eligibility: your service length meets the minimum for a gratuity payment in the selected country."
              : "Eligibility: your service length is below the minimum for a gratuity payment in the selected country, so the amount above is only an estimate of what the formula gives."}
            {result.capped ? " The amount has been limited by the legal cap for the selected country." : ""}
          </p>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a monthly salary above zero and years of service of zero or more.
        </p>
      )}
    </div>
  );
}
