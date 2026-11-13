"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  SHOE_GROUP_LABELS,
  SHOE_TABLES,
  convertShoeSize,
  formatShoeSize,
  type ShoeGroup,
  type ShoeSystem,
} from "./shoeSize";

export default function ShoeSizeConverter() {
  const [group, setGroup] = useState<ShoeGroup>("men");
  const [system, setSystem] = useState<ShoeSystem>("us");
  const [value, setValue] = useState("9");

  const row = useMemo(() => {
    const parsed = parseNum(value);
    if (parsed === null) return null;
    return convertShoeSize(group, system, parsed);
  }, [group, system, value]);

  const table = SHOE_TABLES[group];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Sizes for" htmlFor="ss-group">
          <select
            id="ss-group"
            className={selectClass}
            value={group}
            onChange={(e) => {
              setGroup(e.target.value as ShoeGroup);
              setValue(e.target.value === "kids" ? "4" : "9");
            }}
          >
            {(Object.keys(SHOE_GROUP_LABELS) as ShoeGroup[]).map((key) => (
              <option key={key} value={key}>
                {SHOE_GROUP_LABELS[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="I know my size in" htmlFor="ss-system">
          <select id="ss-system" className={selectClass} value={system} onChange={(e) => setSystem(e.target.value as ShoeSystem)}>
            <option value="us">US size</option>
            <option value="uk">UK size</option>
            <option value="eu">EU size</option>
            <option value="cm">Foot length (cm)</option>
          </select>
        </Field>
        <Field label={system === "cm" ? "Foot length (cm)" : "Your size"} htmlFor="ss-value" hint={system === "cm" ? "Measure heel to longest toe, standing, in the evening." : "Half sizes count: 8.5 is written as 8.5."}>
          <input id="ss-value" type="number" min="0" step="0.1" className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
      </div>

      {row ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          <ResultCard label="US size" value={formatShoeSize(row.us)} sub={`${SHOE_GROUP_LABELS[group]} chart`} />
          <ResultCard label="UK size" value={formatShoeSize(row.uk)} sub={`${SHOE_GROUP_LABELS[group]} chart`} />
          <ResultCard label="EU size" value={formatShoeSize(row.eu)} sub={`${SHOE_GROUP_LABELS[group]} chart`} />
          <ResultCard label="Foot length" value={`${fmt(row.footCm, 1)} cm`} sub="Heel to longest toe" />
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          That size is not on the standard {SHOE_GROUP_LABELS[group].toLowerCase()} chart. Sizes convert exactly only at
          the steps brands actually make, so quarter sizes and extremes are not listed.
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs tracking-wide text-gray-500 uppercase">
              <th className="px-4 py-3 font-semibold">Foot (cm)</th>
              <th className="px-4 py-3 font-semibold">US</th>
              <th className="px-4 py-3 font-semibold">UK</th>
              <th className="px-4 py-3 font-semibold">EU</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.map((entry) => (
              <tr key={entry.us} className={row && entry.us === row.us ? "bg-brand-50 font-semibold text-gray-900" : "text-gray-700"}>
                <td className="px-4 py-2">{fmt(entry.footCm, 1)}</td>
                <td className="px-4 py-2">{formatShoeSize(entry.us)}</td>
                <td className="px-4 py-2">{formatShoeSize(entry.uk)}</td>
                <td className="px-4 py-2">{formatShoeSize(entry.eu)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        Charts get you to the right neighbourhood, not the perfect shoe. Brands cut their lasts differently, running
        shoes often fit half a size small, and feet swell through the day. When a shop offers free returns, ordering
        your size and the half size next to it is the practical move.
      </p>
    </div>
  );
}
