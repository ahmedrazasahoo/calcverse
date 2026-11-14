import type { ReactNode } from "react";

export { fmt, fmtMoney, parseNum } from "@/lib/format";
export { Select } from "./Select";
export type { SelectProps } from "./Select";
export { Field, inputClass, selectClass } from "./fields";

/** Main call to action: solid dark slate, white text, small radius. */
export const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-[15px] font-medium text-white shadow-sm transition duration-150 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50";

/** Secondary action: white with a hairline border. */
export const secondaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-[15px] font-medium text-slate-700 transition duration-150 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50";

export function ResultCard({
  label,
  value,
  sub,
  primary = false,
}: {
  label: string;
  value: string;
  sub?: string;
  primary?: boolean;
}) {
  if (primary) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-slate-900 px-5 py-5">
        <p className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] text-brand-300 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
          {label}
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight break-words text-white tabular-nums sm:text-4xl">
          {value}
        </p>
        {sub && <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{sub}</p>}
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white px-5 py-4">
      <span className="absolute inset-y-0 left-0 w-0.5 bg-brand-600" aria-hidden="true" />
      <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight break-words text-slate-900 tabular-nums sm:text-3xl">
        {value}
      </p>
      {sub && <p className="mt-1 text-sm leading-relaxed text-slate-500">{sub}</p>}
    </div>
  );
}

/** Calm, clear empty state used where a tool has nothing to show yet. */
export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">{body}</p>
    </div>
  );
}

/** Inline error note with enough contrast and padding to be easy to spot. */
export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-relaxed font-medium text-rose-800"
    >
      {children}
    </p>
  );
}
