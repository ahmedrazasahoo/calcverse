"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { applianceCost, billFromTiers, billFromUnits, type Tier, type TierBreakdownRow, type TieredBillResult } from "./electricity-bill";

const CURRENCIES = ["$", "₹", "£", "Rs", "€"];

type Mode = "units" | "appliance";

export default function ElectricityBillCalculator() {
  const [currency, setCurrency] = useState("$");
  const [mode, setMode] = useState<Mode>("units");
  const [units, setUnits] = useState("350");
  const [rate, setRate] = useState("0.30");
  const [fixed, setFixed] = useState("5");
  const [tax, setTax] = useState("0");
  const [tiered, setTiered] = useState(false);
  const [tierLimits, setTierLimits] = useState(["100", "300", ""]);
  const [tierRates, setTierRates] = useState(["0.20", "0.30", "0.40"]);

  const [watts, setWatts] = useState("100");
  const [hours, setHours] = useState("10");
  const [days, setDays] = useState("30");
  const [applianceRate, setApplianceRate] = useState("0.30");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const setTierLimit = (index: number, value: string) =>
    setTierLimits((prev) => prev.map((v, i) => (i === index ? value : v)));
  const setTierRate = (index: number, value: string) =>
    setTierRates((prev) => prev.map((v, i) => (i === index ? value : v)));

  const bill = useMemo(() => {
    const u = parseNum(units);
    const f = fixed.trim() === "" ? 0 : parseNum(fixed);
    const t = tax.trim() === "" ? 0 : parseNum(tax);
    if (u === null || f === null || t === null) return null;
    try {
      if (tiered) {
        const tiers: Tier[] = [];
        for (let i = 0; i < tierLimits.length; i += 1) {
          const tierRate = parseNum(tierRates[i]);
          if (tierRate === null) return null;
          const isLast = i === tierLimits.length - 1;
          if (isLast || tierLimits[i].trim() === "") {
            tiers.push({ upTo: null, rate: tierRate });
            break;
          }
          const limit = parseNum(tierLimits[i]);
          if (limit === null) return null;
          tiers.push({ upTo: limit, rate: tierRate });
        }
        return billFromTiers(u, tiers, f, t);
      }
      const r = parseNum(rate);
      if (r === null) return null;
      return billFromUnits({ unitsKwh: u, ratePerUnit: r, fixedCharge: f, taxPercent: t });
    } catch {
      return null;
    }
  }, [units, rate, fixed, tax, tiered, tierLimits, tierRates]);

  const tierBreakdown: TierBreakdownRow[] =
    bill !== null && tiered ? ((bill as TieredBillResult).breakdown ?? []) : [];

  const appliance = useMemo(() => {
    const w = parseNum(watts);
    const h = parseNum(hours);
    const d = parseNum(days);
    const r = parseNum(applianceRate);
    if (w === null || h === null || d === null || r === null) return null;
    try {
      return applianceCost({ watts: w, hoursPerDay: h, daysPerMonth: d, ratePerUnit: r });
    } catch {
      return null;
    }
  }, [watts, hours, days, applianceRate]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="What do you want to work out?" htmlFor="eb-mode">
          <select id="eb-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="units">Bill from total units</option>
            <option value="appliance">Cost of one appliance</option>
          </select>
        </Field>
        <Field label="Currency" htmlFor="eb-currency">
          <select id="eb-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {mode === "units" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Units used (kWh)" htmlFor="eb-units" hint="The kWh figure from your meter reading or last bill.">
              <input id="eb-units" className={inputClass} inputMode="decimal" value={units} onChange={(e) => setUnits(e.target.value)} />
            </Field>
            {!tiered && (
              <Field label="Rate per unit" htmlFor="eb-rate">
                <input id="eb-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
              </Field>
            )}
            <Field label="Fixed charge (optional)" htmlFor="eb-fixed">
              <input id="eb-fixed" className={inputClass} inputMode="decimal" value={fixed} onChange={(e) => setFixed(e.target.value)} placeholder="0" />
            </Field>
            <Field label="Tax (percent, optional)" htmlFor="eb-tax">
              <input id="eb-tax" className={inputClass} inputMode="decimal" value={tax} onChange={(e) => setTax(e.target.value)} placeholder="0" />
            </Field>
            <Field label="Tiered pricing" htmlFor="eb-tiered" hint="Use this when your supplier charges different rates for different blocks of units.">
              <span className="flex min-h-12 items-center gap-2 px-1">
                <input id="eb-tiered" type="checkbox" checked={tiered} onChange={(e) => setTiered(e.target.checked)} />
                <span className="text-sm text-gray-700">My tariff has tiers</span>
              </span>
            </Field>
          </div>

          {tiered && (
            <div className="mt-5 space-y-3">
              {tierLimits.map((limit, i) => (
                <div key={i} className="grid gap-5 sm:grid-cols-2">
                  <Field label={`Tier ${i + 1} limit (units)`} htmlFor={`eb-tier-limit-${i}`} hint={i === tierLimits.length - 1 ? "Leave the last tier blank: it covers every unit above the previous limit." : undefined}>
                    <input id={`eb-tier-limit-${i}`} className={inputClass} inputMode="decimal" value={limit} onChange={(e) => setTierLimit(i, e.target.value)} placeholder={i === tierLimits.length - 1 ? "Rest" : ""} />
                  </Field>
                  <Field label={`Tier ${i + 1} rate per unit`} htmlFor={`eb-tier-rate-${i}`}>
                    <input id={`eb-tier-rate-${i}`} className={inputClass} inputMode="decimal" value={tierRates[i]} onChange={(e) => setTierRate(i, e.target.value)} />
                  </Field>
                </div>
              ))}
            </div>
          )}

          {bill ? (
            <div className="mt-6" aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard primary label="Estimated bill total" value={money(bill.total)} sub="Energy charge plus the fixed charge, with tax added on top." />
                <ResultCard label="Energy charge" value={money(bill.energyCharge)} sub="What the units themselves cost, before the fixed charge and tax." />
                <ResultCard label="Units used" value={`${fmt(bill.unitsKwh)} kWh`} sub={`Fixed charge ${money(bill.fixedCharge)} and tax ${money(bill.taxAmount)} are included in the total.`} />
              </div>
              {tierBreakdown.length > 0 && (
                <div className="mt-4 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">How the tiers land</p>
                  <ul className="mt-2 space-y-1">
                    {tierBreakdown.map((row, i) => (
                      <li key={i}>
                        {fmt(row.units)} units at {money(row.rate)} per unit: <strong className="text-gray-900">{money(row.amount)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter your units and rates, all zero or greater, with tier limits in rising order.
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Appliance power (watts)" htmlFor="eb-watts" hint="Printed on the appliance label, plug or manual.">
              <input id="eb-watts" className={inputClass} inputMode="decimal" value={watts} onChange={(e) => setWatts(e.target.value)} />
            </Field>
            <Field label="Hours per day" htmlFor="eb-hours">
              <input id="eb-hours" className={inputClass} inputMode="decimal" value={hours} onChange={(e) => setHours(e.target.value)} />
            </Field>
            <Field label="Days per month" htmlFor="eb-days">
              <input id="eb-days" className={inputClass} inputMode="decimal" value={days} onChange={(e) => setDays(e.target.value)} />
            </Field>
            <Field label="Rate per unit" htmlFor="eb-appliance-rate">
              <input id="eb-appliance-rate" className={inputClass} inputMode="decimal" value={applianceRate} onChange={(e) => setApplianceRate(e.target.value)} />
            </Field>
          </div>

          {appliance ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-live="polite">
              <ResultCard primary label="Monthly cost" value={money(appliance.monthlyCost)} sub="What this one appliance adds to your bill each month at the rate you entered." />
              <ResultCard label="Monthly energy" value={`${fmt(appliance.monthlyKwh, 2)} kWh`} sub="The electricity this appliance uses in a month, in the same units your bill counts." />
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter watts above zero, hours between 0 and 24, and days between 1 and 31.
            </p>
          )}
        </>
      )}
    </div>
  );
}
