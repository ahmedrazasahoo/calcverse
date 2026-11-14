"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateFuelCost, type DistanceUnit, type EfficiencyUnit, type PriceUnit } from "./fuel-cost";

const CURRENCIES = ["$", "₹", "£", "Rs", "€"];

export default function FuelCostCalculator() {
  const [currency, setCurrency] = useState("$");
  const [distance, setDistance] = useState("250");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [roundTrip, setRoundTrip] = useState(false);
  const [efficiency, setEfficiency] = useState("15");
  const [efficiencyUnit, setEfficiencyUnit] = useState<EfficiencyUnit>("kmPerLitre");
  const [price, setPrice] = useState("1.60");
  const [priceUnit, setPriceUnit] = useState<PriceUnit>("perLitre");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;
  const distanceLabel = distanceUnit === "miles" ? "mile" : "km";

  const result = useMemo(() => {
    const d = parseNum(distance);
    const e = parseNum(efficiency);
    const p = parseNum(price);
    if (d === null || e === null || p === null) return null;
    try {
      return calculateFuelCost({
        distance: roundTrip ? d * 2 : d,
        distanceUnit,
        efficiency: e,
        efficiencyUnit,
        fuelPrice: p,
        priceUnit,
      });
    } catch {
      return null;
    }
  }, [distance, distanceUnit, roundTrip, efficiency, efficiencyUnit, price, priceUnit]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Trip distance" htmlFor="fc-distance">
          <input id="fc-distance" className={inputClass} inputMode="decimal" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </Field>
        <Field label="Distance unit" htmlFor="fc-distance-unit">
          <select id="fc-distance-unit" className={selectClass} value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}>
            <option value="km">Kilometres</option>
            <option value="miles">Miles</option>
          </select>
        </Field>
        <Field label="Round trip" htmlFor="fc-round-trip" hint="Tick this and the distance is doubled, there and back.">
          <span className="flex min-h-12 items-center gap-2 px-1">
            <input id="fc-round-trip" type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />
            <span className="text-sm text-gray-700">Double the distance</span>
          </span>
        </Field>
        <Field label="Fuel efficiency" htmlFor="fc-efficiency">
          <input id="fc-efficiency" className={inputClass} inputMode="decimal" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
        </Field>
        <Field label="Efficiency unit" htmlFor="fc-efficiency-unit">
          <select id="fc-efficiency-unit" className={selectClass} value={efficiencyUnit} onChange={(e) => setEfficiencyUnit(e.target.value as EfficiencyUnit)}>
            <option value="kmPerLitre">km per litre</option>
            <option value="litresPer100Km">Litres per 100 km</option>
            <option value="mpgUS">Miles per gallon (US)</option>
            <option value="mpgUK">Miles per gallon (UK)</option>
          </select>
        </Field>
        <Field label="Fuel price" htmlFor="fc-price">
          <input id="fc-price" className={inputClass} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
        <Field label="Price unit" htmlFor="fc-price-unit">
          <select id="fc-price-unit" className={selectClass} value={priceUnit} onChange={(e) => setPriceUnit(e.target.value as PriceUnit)}>
            <option value="perLitre">Per litre</option>
            <option value="perGallonUS">Per gallon (US)</option>
            <option value="perGallonUK">Per gallon (UK)</option>
          </select>
        </Field>
        <Field label="Currency" htmlFor="fc-currency">
          <select id="fc-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          <ResultCard primary label="Total cost" value={money(result.totalCost)} sub={`The full fuel bill for this trip${roundTrip ? ", there and back" : ""}.`} />
          <ResultCard label="Fuel needed" value={`${fmt(result.fuelNeededLitres, 2)} L`} sub="How much fuel the trip will use, so you know what to put in the tank." />
          <ResultCard label={`Cost per ${distanceLabel}`} value={money(result.costPerDistanceUnit)} sub={`Every ${distanceLabel} of this trip costs this much in fuel.`} />
          <ResultCard label="Efficiency in L/100 km" value={fmt(result.litresPer100Km, 2)} sub="Your efficiency restated in litres per 100 km, the figure most countries compare cars with." />
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a distance, an efficiency and a fuel price, all greater than zero.
        </p>
      )}
    </div>
  );
}
