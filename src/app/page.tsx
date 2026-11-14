import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import ToolSearch from "@/components/ToolSearch";
import CategoryEmblem, { groupMotif } from "@/components/visuals/CategoryEmblem";
import PercentageCalculator from "@/features/calculators/percentage-calculator/PercentageCalculator";
import { GROUP_LABELS, GROUP_PATHS, liveTools, toolsInGroup, type ToolGroup } from "@/lib/tools";

export const metadata: Metadata = {
  title: "CalcVerse: Free Calculators and File Tools That Respect Your Privacy",
  description:
    "Free online calculators and file tools that run entirely in your browser. TDEE, tip, percentage, age and GPA calculators, PDF and image compressors, converters and generators. No signup, no uploads.",
};

const categoryBlurb: Record<ToolGroup, string> = {
  calculators: "Money, health, school and everyday math, answered instantly.",
  tools: "Compress PDFs and images to the exact size your form demands.",
  converters: "Turn iPhone photos and web images into formats that work everywhere.",
  generators: "QR codes, strong passwords and a typing test, created on your device.",
};

const sectionLink =
  "inline-flex min-h-11 items-center rounded-lg px-2 -mx-2 text-sm font-medium text-brand-700 transition hover:text-brand-900 hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

const eyebrowClass = "font-mono text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase";

export default function HomePage() {
  const groups = Object.keys(GROUP_LABELS) as ToolGroup[];
  const live = liveTools();
  return (
    <main>
      <section className="relative overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8" aria-label="Introduction">
        {/* Engineered backdrop: grid lines and dot field under a soft mask,
            plus the drifting accent particle layers. Pure CSS, no assets. */}
        <div className="backdrop-mask absolute inset-0" aria-hidden="true">
          <div className="bg-grid absolute inset-0" />
          <div className="bg-dots absolute inset-0 opacity-60" />
        </div>
        <div className="particles" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.14em] text-slate-600 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Free forever, no signup
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-balance text-slate-900 sm:text-6xl">
            Every calculator and file tool you need, <span className="text-brand-600">in one place</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-slate-600">
            Work out calories, tips, taxes, percentages, ages and grades, or shrink a PDF for an application
            form. Everything runs right here in your browser, so your numbers and files never leave your
            device.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] font-medium text-slate-700">
            <li className="flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5">100% free, always</li>
            <li className="flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5">No signup or account</li>
            <li className="flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5">
              Files never leave your device
            </li>
            <li className="flex min-h-9 items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5">No watermarks</li>
          </ul>
        </div>

        {/* A real, working tool in the hero: the live percentage calculator,
            exactly as it runs on its own page. */}
        <div className="relative mx-auto mt-12 max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-20px_rgb(15_23_42/0.15)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3 sm:px-6">
              <p className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Live demo: Percentage Calculator
              </p>
              <Link
                href="/calculators/percentage-calculator"
                className="rounded-md text-[13px] font-medium text-brand-700 transition hover:text-brand-900 hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
              >
                Open the full tool {"\u2192"}
              </Link>
            </div>
            <div className="p-5 sm:p-6">
              <PercentageCalculator />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 lg:px-8" aria-label="Search and browse all tools">
        <ToolSearch />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8" aria-label="Live tools">
        <p className={eyebrowClass}>Start now</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Ready to use right now</h2>
          <Link href="/calculators" className={sectionLink}>
            Browse all calculators
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {live.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8" aria-label="Browse by category">
        <p className={eyebrowClass}>Categories</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Browse by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {groups.map((g) => {
            const groupTools = toolsInGroup(g);
            const liveCount = groupTools.filter((tool) => tool.status === "live").length;
            return (
              <Link
                key={g}
                href={GROUP_PATHS[g]}
                className="group flex min-h-11 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-150 hover:border-slate-300 hover:shadow-[0_10px_30px_-14px_rgb(15_23_42/0.18)] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <CategoryEmblem name={groupMotif(g)} className="mb-5 h-12 w-12 rounded-xl p-2.5" />
                <span className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold tracking-tight text-slate-900 group-hover:text-brand-700">{GROUP_LABELS[g]}</h3>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition duration-150 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </span>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{categoryBlurb[g]}</p>
                <p className="mt-auto pt-4 font-mono text-[11px] font-medium tracking-[0.14em] text-slate-500 uppercase">
                  {groupTools.length} tools, {liveCount} live
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8" aria-label="Why CalcVerse">
        <p className={eyebrowClass}>Why CalcVerse</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Why people use CalcVerse</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
            <span className="absolute inset-x-0 top-0 h-0.5 bg-brand-600" aria-hidden="true" />
            <h3 className="font-semibold tracking-tight text-slate-900">Private by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Most tool sites make you upload your files to their servers. Ours do the work locally in your
              browser, so your documents, photos and numbers never travel anywhere.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
            <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-900" aria-hidden="true" />
            <h3 className="font-semibold tracking-tight text-slate-900">Instant answers</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Every calculator updates as you type. No calculate button, no waiting, no page reloads. Change a
              number and the answer is already there.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
            <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-300" aria-hidden="true" />
            <h3 className="font-semibold tracking-tight text-slate-900">Explained, not just answered</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Each page shows the formula and walks through how the result is reached, so you can check the
              maths yourself and reuse it anywhere.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
