"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateVat, VAT_PRESETS, type VatMode } from "./vat";

const CURRENCIES = [
  { symbol: "£", label: "GBP (£)" },
  { symbol: "$", label: "USD ($)" },
  { symbol: "€", label: "EUR (€)" },
  { symbol: "₹", label: "INR (₹)" },
  { symbol: "Rs", label: "PKR (Rs)" },
  { symbol: "AED", label: "AED" },
  { symbol: "SAR", label: "SAR" },
  { symbol: "R", label: "ZAR (R)" },
];

const CUSTOM_VALUE = "custom";

export default function VatCalculator() {
  const [amount, setAmount] = useState("100");
  const [preset, setPreset] = useState("United Kingdom");
  const [rate, setRate] = useState("20");
  const [mode, setMode] = useState<VatMode>("add");
  const [currency, setCurrency] = useState("£");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const handlePreset = (value: string) => {
    setPreset(value);
    if (value !== CUSTOM_VALUE) {
      const found = VAT_PRESETS.find((p) => p.country === value);
      if (found) setRate(String(found.rate));
    }
  };

  const result = useMemo(() => {
    const a = parseNum(amount);
    const r = parseNum(rate);
    if (a === null || r === null) return null;
    try {
      return calculateVat({ amount: a, ratePercent: r, mode });
    } catch {
      return null;
    }
  }, [amount, rate, mode]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={mode === "add" ? "Amount before VAT" : "Amount including VAT"} htmlFor="vat-amount">
          <input id="vat-amount" className={inputClass} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="Country preset" htmlFor="vat-country">
          <select id="vat-country" className={selectClass} value={preset} onChange={(e) => handlePreset(e.target.value)}>
            {VAT_PRESETS.map((p) => (
              <option key={p.country} value={p.country}>{p.country} ({p.rate}%)</option>
            ))}
            <option value={CUSTOM_VALUE}>Custom</option>
          </select>
        </Field>
        <Field label="VAT rate (%)" htmlFor="vat-rate">
          <input id="vat-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => { setRate(e.target.value); setPreset(CUSTOM_VALUE); }} />
        </Field>
        <Field label="Calculation type" htmlFor="vat-mode">
          <select id="vat-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as VatMode)}>
            <option value="add">Add VAT</option>
            <option value="remove">Remove VAT</option>
          </select>
        </Field>
        <Field label="Currency" htmlFor="vat-currency">
          <select id="vat-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.symbol} value={c.symbol}>{c.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="Net amount" value={money(result.netAmount)} sub="The price before any VAT is added. This is the amount the seller keeps before tax." />
          <ResultCard label="VAT amount" value={money(result.vatAmount)} sub="The tax portion alone, worked out at the rate you set. This is what gets passed to the tax authority." />
          <ResultCard label="Gross amount" value={money(result.grossAmount)} sub="The full price including VAT. This is what the buyer actually pays." />
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter an amount above zero and a VAT rate between 0 and 100 percent to see the result.
        </p>
      )}
    </div>
  );
}
