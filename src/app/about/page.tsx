import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CalcVerse",
  description:
    "What CalcVerse is, why every tool runs in your browser, and how the site stays free with no signup and no uploads.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About CalcVerse</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-gray-700">
        <p>
          CalcVerse is a growing collection of free calculators and file tools for everyday problems: how many
          calories you actually need, how to split a dinner bill without an argument, whether a document fits
          under a strict upload limit, and dozens more.
        </p>
        <p>
          The idea is simple. Most of these jobs are small bits of maths or file handling that your own device
          can do perfectly well. So instead of sending your numbers and documents off to a stranger's server,
          every CalcVerse tool runs locally in your web browser. It is faster, it works without an account, and
          your private files stay exactly where they belong: with you.
        </p>
        <p>
          Each tool page explains the formula or method behind the answer in plain language, because a number
          you cannot check is only half useful. We would rather show our working than ask you to trust a black
          box.
        </p>
        <p>
          CalcVerse is free to use, with no signup walls and no watermarks on anything you create or download.
          New tools are added regularly, driven by what people actually search for and ask about.
        </p>
      </div>
    </main>
  );
}
