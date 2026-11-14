import Link from "next/link";
import type { ReactNode } from "react";
import GuideCard from "@/components/GuideCard";
import GuideBanner from "@/components/visuals/GuideBanner";
import { primaryButtonClass } from "@/components/ui";
import {
  guidePath,
  guideReadingTime,
  guideTool,
  guideToolPath,
  relatedGuides,
  type GuidePost,
  type GuideSection,
} from "@/lib/guides";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Render copy strings, turning markdown style links into real links. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const className =
      "font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 transition hover:text-brand-900 hover:decoration-brand-500";
    parts.push(
      href.startsWith("/") ? (
        <Link key={key++} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={key++} href={href} className={className}>
          {label}
        </a>
      )
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

const crumbLink =
  "inline-flex min-h-11 items-center rounded-lg px-1.5 -mx-1.5 font-medium transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-1 h-4 w-4 shrink-0 text-gray-300"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Section({ section }: { section: GuideSection }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-balance text-gray-900">{section.heading}</h2>
      {section.paragraphs.map((para, i) => (
        <p key={i} className="mt-4 leading-relaxed text-pretty text-gray-700">
          <RichText text={para} />
        </p>
      ))}
      {section.bullets && (
        <ul className="mt-5 space-y-2.5">
          {section.bullets.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-gray-700">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {section.steps && (
        <ol className="mt-5 space-y-3">
          {section.steps.map((step, i) => (
            <li key={i} className="glass flex gap-3.5 rounded-[1.75rem] p-4.5">
              <span
                className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="pt-1 leading-relaxed text-gray-700">
                <RichText text={step} />
              </span>
            </li>
          ))}
        </ol>
      )}
      {section.table && (
        <figure className="mt-6">
          <div className="glass overflow-x-auto rounded-[1.75rem]">
            <table className="w-full min-w-135 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/70">
                  {section.table.headers.map((h, i) => (
                    <th key={i} scope="col" className="px-5 py-3.5 font-semibold whitespace-nowrap text-gray-900">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/50">
                {section.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-5 py-3 whitespace-nowrap tabular-nums ${
                          j === 0 ? "font-semibold text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.table.caption && (
            <figcaption className="mt-2.5 px-2 text-sm text-gray-500">{section.table.caption}</figcaption>
          )}
        </figure>
      )}
      {section.subsections?.map((sub, i) => (
        <div key={i} className="mt-8">
          <h3 className="text-xl font-bold tracking-tight text-gray-900">{sub.heading}</h3>
          {sub.paragraphs.map((para, j) => (
            <p key={j} className="mt-3.5 leading-relaxed text-pretty text-gray-700">
              <RichText text={para} />
            </p>
          ))}
          {sub.bullets && (
            <ul className="mt-4 space-y-2.5">
              {sub.bullets.map((item, j) => (
                <li key={j} className="flex gap-3 leading-relaxed text-gray-700">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

export default function GuideArticle({ post }: { post: GuidePost }) {
  const tool = guideTool(post);
  const toolHref = guideToolPath(post);
  const related = relatedGuides(post);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center pt-4 text-sm text-gray-500">
        <Link href="/" className={crumbLink}>
          Home
        </Link>
        <Chevron />
        <Link href="/guides" className={crumbLink}>
          Guides
        </Link>
        <Chevron />
        <span className="inline-flex min-h-11 items-center font-medium text-gray-800" aria-current="page">
          {post.category}
        </span>
      </nav>

      <div className="max-w-3xl pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-800 uppercase ring-1 ring-brand-100">
            {post.category}
          </span>
          <span className="glass-chip flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700">
            Guide
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <span>
            Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
          </span>
          <span aria-hidden="true">·</span>
          <span>{guideReadingTime(post)} min read</span>
          <span aria-hidden="true">·</span>
          <span>By the CalcVerse team</span>
        </p>
        {post.intro.map((para, i) => (
          <p key={i} className="mt-5 text-lg leading-relaxed text-pretty text-gray-700">
            <RichText text={para} />
          </p>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] shadow-[0_22px_44px_-18px_rgb(68_33_127/0.3)] ring-1 ring-white/60">
        <GuideBanner category={post.category} variant="article" className="block aspect-[800/250] w-full" />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-3 lg:gap-10">
        <div className="min-w-0 lg:col-span-2">
          <section aria-labelledby="key-points" className="glass rounded-[2rem] p-6 sm:p-8">
            <h2 id="key-points" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 ring-1 ring-amber-200/70">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                  aria-hidden="true"
                >
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
                </svg>
              </span>
              Key points
            </h2>
            <ul className="mt-5 space-y-3">
              {post.keyPoints.map((point, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-gray-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 h-4.5 w-4.5 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    <RichText text={point} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {post.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}

          <section aria-labelledby="guide-faq" className="mt-12">
            <h2 id="guide-faq" className="text-2xl font-bold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <div className="glass mt-5 divide-y divide-white/60 overflow-hidden rounded-[2rem]">
              {post.faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 font-semibold text-gray-900 transition duration-200 marker:hidden hover:bg-white/50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset focus-visible:outline-none">
                    <span>{faq.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-brand-600"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 leading-relaxed text-gray-600">
                    <RichText text={faq.a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside aria-label="Tool and related guides" className="min-w-0 lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <section className="glass anim-border relative overflow-hidden rounded-[2rem] p-6 sm:p-7">
              <span
                className="absolute inset-x-10 top-0 h-1 rounded-full bg-gradient-to-r from-brand-500 to-amber-400 opacity-70"
                aria-hidden="true"
              />
              <h2 className="text-xl font-bold tracking-tight text-gray-900">Skip the maths, use the tool</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{tool.description}</p>
              <Link href={toolHref} className={`${primaryButtonClass} mt-5 w-full`}>
                Open the free {tool.name}
              </Link>
              <p className="mt-3 text-center text-xs text-gray-500">Free, no signup, runs in your browser.</p>
            </section>

            {related.length > 0 && (
              <section className="mt-10" aria-label="Related guides">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Keep reading</h2>
                <div className="mt-4 grid gap-4">
                  {related.map((rel) => (
                    <GuideCard key={rel.slug} post={rel} />
                  ))}
                </div>
                <p className="mt-5 text-sm text-gray-500">
                  Browse the full library in the{" "}
                  <Link
                    href="/guides"
                    className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-900"
                  >
                    guides hub
                  </Link>
                  .
                </p>
              </section>
            )}
          </div>
        </aside>
      </div>

      <section className="glass anim-border relative mt-14 overflow-hidden rounded-[2.5rem] p-6 sm:p-9" aria-label="Try the tool">
        <span
          className="absolute inset-x-10 top-0 h-1 rounded-full bg-gradient-to-r from-brand-500 to-amber-400 opacity-70"
          aria-hidden="true"
        />
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Put it into practice</h2>
            <p className="mt-2 leading-relaxed text-gray-600">
              You have read how {tool.name} works. Now run your own numbers with the free tool. It takes seconds, needs
              no signup, and nothing you type leaves your device. Start from this guide at{" "}
              <Link href={guidePath(post)} className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-900">
                {post.title}
              </Link>{" "}
              or jump straight in.
            </p>
          </div>
          <Link href={toolHref} className={`${primaryButtonClass} shrink-0`}>
            Try the {tool.name}
          </Link>
        </div>
      </section>
    </main>
  );
}
