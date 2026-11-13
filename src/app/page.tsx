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

export default function HomePage() {
  const groups = Object.keys(GROUP_LABELS) as ToolGroup[];
  const live = liveTools();
  return (
    <main>
      <section className="bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 px-4 pt-16 pb-14 text-white sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase">
            Free forever, no signup
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Every calculator and file tool you need, <span className="text-amber-400">in one place</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-100">
            Work out calories, tips, taxes, percentages, ages and grades, or shrink a PDF for an application
            form. Everything runs right here in your browser, so your numbers and files never leave your
            device.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
            <li className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/25">100% free, always</li>
            <li className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/25">No signup or account</li>
            <li className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/25">
              Files never leave your device
            </li>
            <li className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/25">No watermarks</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6" aria-label="Search and browse all tools">
        <ToolSearch />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6" aria-label="Live tools">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Ready to use right now</h2>
          <Link href="/calculators" className="text-sm font-semibold text-brand-700 hover:underline">
            Browse all calculators
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6" aria-label="Browse by category">
        <h2 className="text-2xl font-bold text-gray-900">Browse by category</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => {
            const groupTools = toolsInGroup(g);
            const liveCount = groupTools.filter((tool) => tool.status === "live").length;
            return (
              <Link
                key={g}
                href={GROUP_PATHS[g]}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-800">{GROUP_LABELS[g]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{categoryBlurb[g]}</p>
                <p className="mt-3 text-xs font-semibold tracking-wide text-brand-700 uppercase">
                  {groupTools.length} tools, {liveCount} live
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6" aria-label="Why CalcVerse">
        <h2 className="text-2xl font-bold text-gray-900">Why people use CalcVerse</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
            <h3 className="font-semibold text-gray-900">Private by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Most tool sites make you upload your files to their servers. Ours do the work locally in your
              browser, so your documents, photos and numbers never travel anywhere.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100">
            <h3 className="font-semibold text-gray-900">Instant answers</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Every calculator updates as you type. No calculate button, no waiting, no page reloads. Change a
              number and the answer is already there.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-6 ring-1 ring-rose-100">
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
