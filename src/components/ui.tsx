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
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-2 block px-1 text-sm font-semibold text-gray-800">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 px-1 text-xs leading-relaxed text-gray-500">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "min-h-12 w-full min-w-0 rounded-full border border-white/80 bg-white/70 px-5 py-3 text-base text-gray-900 shadow-sm backdrop-blur outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-white/40 disabled:text-gray-500";

export const selectClass =
  "min-h-12 w-full min-w-0 rounded-full border border-white/80 bg-white/70 px-5 py-3 text-base text-gray-900 shadow-sm backdrop-blur outline-none transition duration-200 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-white/40 disabled:text-gray-500";

/** Main call to action: a big glass pill with dark text, as in the reference card. */
export const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 text-base font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35),inset_0_1px_0_rgb(255_255_255/0.9)] ring-1 ring-white/80 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-12px_rgb(68_33_127/0.4),inset_0_1px_0_rgb(255_255_255/0.9)] focus:ring-4 focus:ring-brand-500/25 focus:outline-none active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

/** Secondary action: a plain white glass pill with a soft outline. */
export const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/70 px-7 py-3 text-base font-semibold text-gray-800 shadow-sm ring-1 ring-gray-900/5 backdrop-blur transition duration-200 hover:bg-white hover:shadow focus:ring-4 focus:ring-brand-500/20 focus:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

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
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-6 shadow-[0_24px_48px_-20px_rgb(68_33_127/0.35)]">
        <span
          className="pointer-events-none absolute -top-16 right-0 h-36 w-36 rounded-full bg-amber-300/25 blur-3xl"
          aria-hidden="true"
        />
        <p className="relative flex items-center gap-2 text-xs font-semibold tracking-widest text-brand-800 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
          {label}
        </p>
        <p className="relative mt-2 text-3xl font-bold tracking-tight break-words text-gray-900 tabular-nums sm:text-4xl">
          {value}
        </p>
        {sub && <p className="relative mt-1.5 text-sm leading-relaxed text-gray-600">{sub}</p>}
      </div>
    );
  }
  return (
    <div className="glass group relative overflow-hidden rounded-[2rem] px-6 py-5 transition duration-200 hover:-translate-y-0.5">
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 to-amber-400" aria-hidden="true" />
      <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight break-words text-gray-900 tabular-nums sm:text-3xl">
        {value}
      </p>
      {sub && <p className="mt-1 text-sm leading-relaxed text-gray-600">{sub}</p>}
    </div>
  );
}

/** Calm, clear empty state used where a tool has nothing to show yet. */
export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass rounded-[2rem] px-6 py-10 text-center">
      <p className="text-base font-semibold text-gray-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">{body}</p>
    </div>
  );
}

/** Inline error note with enough contrast and padding to be easy to spot. */
export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-3xl bg-rose-50/70 px-5 py-3.5 text-sm leading-relaxed font-medium text-rose-800 ring-1 ring-rose-200/80 backdrop-blur"
    >
      {children}
    </p>
  );
}
