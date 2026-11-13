import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import ToolSearch from "@/components/ToolSearch";
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
  "inline-flex min-h-11 items-center rounded-lg px-2 -mx-2 text-sm font-semibold text-brand-700 transition hover:text-brand-900 hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

export default function HomePage() {
  const groups = Object.keys(GROUP_LABELS) as ToolGroup[];
  const live = liveTools();
  return (
    <main>
      <section className="relative overflow-hidden px-4 pt-14 pb-12 sm:px-6 sm:pt-20 lg:px-8">
        <span
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="glass-chip inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold tracking-widest text-brand-800 uppercase">
            Free forever, no signup
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance text-gray-900 sm:text-5xl sm:leading-[1.1]">
            Every calculator and file tool you need, <span className="text-brand-700">in one place</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-gray-600">
            Work out calories, tips, taxes, percentages, ages and grades, or shrink a PDF for an application
            form. Everything runs right here in your browser, so your numbers and files never leave your
            device.
          </p>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5 text-sm font-medium text-gray-800">
            <li className="glass-chip flex min-h-11 items-center rounded-full px-4 py-2">100% free, always</li>
            <li className="glass-chip flex min-h-11 items-center rounded-full px-4 py-2">No signup or account</li>
            <li className="glass-chip flex min-h-11 items-center rounded-full px-4 py-2">
              Files never leave your device
            </li>
            <li className="glass-chip flex min-h-11 items-center rounded-full px-4 py-2">No watermarks</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 lg:px-8" aria-label="Search and browse all tools">
        <ToolSearch />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8" aria-label="Live tools">
        <p className="text-sm font-semibold tracking-widest text-brand-700 uppercase">Start now</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ready to use right now</h2>
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
        <p className="text-sm font-semibold tracking-widest text-brand-700 uppercase">Categories</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Browse by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {groups.map((g) => {
            const groupTools = toolsInGroup(g);
            const liveCount = groupTools.filter((tool) => tool.status === "live").length;
            return (
              <Link
                key={g}
                href={GROUP_PATHS[g]}
                className="glass group flex min-h-11 flex-col rounded-[2rem] p-7 transition duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-800">{GROUP_LABELS[g]}</h3>
                  <span
                    className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition duration-200 group-hover:bg-brand-700 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </span>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{categoryBlurb[g]}</p>
                <p className="mt-auto pt-4 text-xs font-semibold tracking-widest text-brand-700 uppercase">
                  {groupTools.length} tools, {liveCount} live
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8" aria-label="Why CalcVerse">
        <p className="text-sm font-semibold tracking-widest text-brand-700 uppercase">Why CalcVerse</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Why people use CalcVerse</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-3">
          <div className="glass relative overflow-hidden rounded-[2rem] p-7">
            <span className="absolute inset-x-8 top-0 h-1 rounded-full bg-brand-500/70" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">Private by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Most tool sites make you upload your files to their servers. Ours do the work locally in your
              browser, so your documents, photos and numbers never travel anywhere.
            </p>
          </div>
          <div className="glass relative overflow-hidden rounded-[2rem] p-7">
            <span className="absolute inset-x-8 top-0 h-1 rounded-full bg-amber-400/80" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">Instant answers</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Every calculator updates as you type. No calculate button, no waiting, no page reloads. Change a
              number and the answer is already there.
            </p>
          </div>
          <div className="glass relative overflow-hidden rounded-[2rem] p-7">
            <span className="absolute inset-x-8 top-0 h-1 rounded-full bg-rose-400/80" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">Explained, not just answered</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Each page shows the formula and walks through how the result is reached, so you can check the
              maths yourself and reuse it anywhere.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
