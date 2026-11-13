import type { ReactNode } from "react";

export { fmt, fmtMoney, parseNum } from "@/lib/format";

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export const selectClass =
  "min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function ResultCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-white px-4 py-4 ring-1 ring-brand-100">
      <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-0.5 text-sm text-gray-600">{sub}</p>}
    </div>
  );
}
