"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, Select } from "@/components/ui";
import { calculateHra } from "./hra";

export default function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState("600000");
  const [daAmount, setDaAmount] = useState("0");
  const [hraReceived, setHraReceived] = useState("240000");
  const [rentPaid, setRentPaid] = useState("300000");
  const [metro, setMetro] = useState(true);

  const money = (n: number) => `₹ ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const basic = parseNum(basicSalary);
    const da = daAmount.trim() === "" ? 0 : parseNum(daAmount);
    const hra = parseNum(hraReceived);
    const rent = parseNum(rentPaid);
    if (basic === null || da === null || hra === null || rent === null) return null;
    try {
      return calculateHra({
        basicSalary: basic,
        daAmount: da,
        hraReceived: hra,
        rentPaid: rent,
        metro,
      });
    } catch {
      return null;
    }
  }, [basicSalary, daAmount, hraReceived, rentPaid, metro]);

  const limits = result
    ? [
        {
          key: "hraReceived",
          label: "Limit 1: HRA actually received",
          value: result.limits.hraReceived,
          note: "The full allowance your employer paid you for the year.",
        },
        {
          key: "rentMinusTenPercent",
          label: "Limit 2: Rent paid minus 10 percent of salary",
          value: result.limits.rentMinusTenPercent,
          note: "Your yearly rent with one tenth of your basic plus DA taken away, as the rules require.",
        },
        {
          key: "salaryPercent",
          label: `Limit 3: ${result.salaryPercentRate} percent of salary`,
          value: result.limits.salaryPercent,
          note: metro
            ? "Half of your basic plus DA, because you picked a metro city."
            : "Forty percent of your basic plus DA, because you picked a non metro city.",
        },
      ]
    : [];

  const smallest = limits.length
    ? limits.reduce((min, item) => (item.value < min.value ? item : min), limits[0])
    : null;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Yearly basic salary (₹)" htmlFor="hra-basic">
          <input id="hra-basic" className={inputClass} inputMode="decimal" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />
        </Field>
        <Field label="Yearly dearness allowance (₹, optional)" htmlFor="hra-da">
          <input id="hra-da" className={inputClass} inputMode="decimal" value={daAmount} onChange={(e) => setDaAmount(e.target.value)} />
        </Field>
        <Field label="Yearly HRA received (₹)" htmlFor="hra-received">
          <input id="hra-received" className={inputClass} inputMode="decimal" value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} />
        </Field>
        <Field label="Yearly rent paid (₹)" htmlFor="hra-rent">
          <input id="hra-rent" className={inputClass} inputMode="decimal" value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} />
        </Field>
        <Field label="City type" htmlFor="hra-city">
          <Select id="hra-city" value={metro ? "metro" : "non-metro"} onChange={(e) => setMetro(e.target.value === "metro")}>
            <option value="metro">Metro: Delhi, Mumbai, Kolkata, Chennai</option>
            <option value="non-metro">Non metro: any other city</option>
          </Select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResultCard label="HRA exemption" value={money(result.exemption)} sub="The tax free part of your HRA. You pay no income tax on this amount." />
            <ResultCard label="Taxable HRA" value={money(result.taxableHra)} sub="The part of your HRA left after the exemption. This part is added to your taxable salary." />
          </div>
          <div className="mt-6 rounded-2xl bg-white/70 p-5 ring-1 ring-white/80 backdrop-blur">
            <h3 className="text-sm font-semibold text-gray-900">How the exemption was picked: the three limits</h3>
            <p className="mt-1 text-sm text-gray-600">
              The rules allow the smallest of these three yearly figures as your exemption. The smallest one is marked below.
            </p>
            <ul className="mt-4 space-y-3">
              {limits.map((item) => {
                const applies = smallest !== null && item.key === smallest.key;
                return (
                  <li key={item.key} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="max-w-md">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      {applies && (
                        <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                          This one applies
                        </span>
                      )}
                      <p className="mt-0.5 text-xs text-gray-500">{item.note}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{money(item.value)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a basic salary above zero, with HRA received and rent paid at zero or more, to see your exemption.
        </p>
      )}
    </div>
  );
}
