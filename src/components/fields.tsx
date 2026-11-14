import type { ReactNode } from "react";

/**
 * Form primitives shared by every tool: the labelled field wrapper and the
 * input/select class strings. Kept in their own module (no heavier
 * components in the graph) so lightweight surfaces, like the home page's
 * embedded demo tool, can use them without pulling in the full UI kit.
 * components/ui.tsx re-exports everything here for existing call sites.
 */
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
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "min-h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 outline-none transition duration-150 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

export const selectClass =
  "min-h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 outline-none transition duration-150 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";
