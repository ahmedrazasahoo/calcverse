"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateGst, GST_RATES_PERCENT, type GstMode } from "./gst";

export default function GstCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<GstMode>("add");
  const [interstate, setInterstate] = useState(false);

  const money = (n: number) => `₹ ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const a = parseNum(amount);
    const r = parseNum(rate);
    if (a === null || r === null) return null;
    try {
      return calculateGst({ amount: a, ratePercent: r, mode, interstate });
    } catch {
      return null;
    }
  }, [amount, rate, mode, interstate]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label={mode === "add" ? "Amount before GST (₹)" : "Amount including GST (₹)"} htmlFor="gst-amount">
          <input id="gst-amount" className={inputClass} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="GST rate" htmlFor="gst-rate">
          <select id="gst-rate" className={selectClass} value={rate} onChange={(e) => setRate(e.target.value)}>
            {GST_RATES_PERCENT.map((r) => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>
        </Field>
        <Field label="Calculation type" htmlFor="gst-mode">
          <select id="gst-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as GstMode)}>
            <option value="add">Add GST to price</option>
            <option value="remove">Remove GST from price</option>
          </select>
        </Field>
        <Field label="Type of supply" htmlFor="gst-supply">
          <select id="gst-supply" className={selectClass} value={interstate ? "inter" : "intra"} onChange={(e) => setInterstate(e.target.value === "inter")}>
            <option value="intra">Within state (CGST + SGST)</option>
            <option value="inter">Inter state (IGST)</option>
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="Base amount" value={money(result.baseAmount)} sub="Price before GST" />
          <ResultCard label="GST amount" value={money(result.gstAmount)} sub={interstate ? "Charged fully as IGST" : "Split equally into CGST and SGST"} />
          <ResultCard label="Total amount" value={money(result.totalAmount)} sub="Price including GST" />
          {interstate ? (
            <ResultCard label="IGST" sub="The whole tax charged as IGST when the sale crosses a state border." value={money(result.igstAmount)} />
          ) : (
            <>
              <ResultCard label="CGST" sub="The central government half of the tax when the sale stays inside one state." value={money(result.cgstAmount)} />
              <ResultCard label="SGST" sub="The state government half of the tax when the sale stays inside one state." value={money(result.sgstAmount)} />
            </>
          )}
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a valid amount to calculate GST.
        </p>
      )}
    </div>
  );
}
