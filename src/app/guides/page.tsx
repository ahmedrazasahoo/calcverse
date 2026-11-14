import type { Metadata } from "next";
import GuideCard from "@/components/GuideCard";
import { pageMetadata } from "@/lib/seo";
import { GUIDE_CATEGORIES, guides, guidesInCategory } from "@/lib/guides";

export const metadata: Metadata = pageMetadata(
  "Guides: Calculators and File Tools Explained",
  "Plain language guides to every CalcVerse calculator and file tool: formulas, worked examples, common mistakes and answers, each linked to the free tool.",
  "/guides"
);

export default function GuidesHubPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl pt-10">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-800 uppercase ring-1 ring-brand-100">
          CalcVerse Guides
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-4xl">
          The thinking behind the numbers
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-gray-600">
          Every CalcVerse tool has a guide like these: the formula or method explained in plain language, worked
          examples with real numbers, the mistakes that quietly produce wrong answers, and straight answers to the
          questions people actually ask. Read the guide to understand the topic, then jump into the free tool to run
          your own figures.
        </p>
        <p className="mt-3 leading-relaxed text-gray-600">
          There are {guides.length} guides, organised by topic below. They are written for the same reason the tools
          exist: a number you cannot check is only half useful, so we show our working.
        </p>
      </div>

      {GUIDE_CATEGORIES.map((category) => {
        const posts = guidesInCategory(category);
        if (posts.length === 0) return null;
        return (
          <section key={category} aria-labelledby={`guides-${category}`} className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={`guides-${category}`} className="text-2xl font-bold tracking-tight text-gray-900">
                {category}
              </h2>
              <span className="text-sm text-gray-500">
                {posts.length} {posts.length === 1 ? "guide" : "guides"}
              </span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <GuideCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
