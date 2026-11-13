import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The simple terms for using CalcVerse: free tools provided as is, results for guidance only, and your files always stay on your own device.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-gray-500">Last updated: 14 November 2026</p>
      <div className="mt-6 space-y-6 leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900">Using CalcVerse</h2>
          <p className="mt-2">
            CalcVerse is a free collection of calculators, file tools, converters and generators. By using the
            site you accept these terms. Every tool is free to use for personal and business purposes, with no
            account, no signup and no usage limits placed by us.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">How the tools work</h2>
          <p className="mt-2">
            All calculations and file processing happen locally in your own web browser. Your files and the
            numbers you enter are never uploaded to our servers. Because everything runs on your device, the
            site may behave slightly differently across browsers, and very large files can be limited by your
            device memory rather than by us.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Results are guidance, not advice</h2>
          <p className="mt-2">
            We work hard to keep every formula, tax slab and conversion table correct and current, and each
            page explains its method so you can check the working. Even so, results are provided for general
            information only. They are not financial, tax, legal, medical or other professional advice. For
            decisions that matter, such as a loan contract, a tax filing or a health choice, please confirm the
            figures with a qualified professional or an official source.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Fair use</h2>
          <p className="mt-2">
            Please do not misuse the site: no attempts to break, overload or probe the hosting, no automated
            scraping that harms availability for others, and no presenting CalcVerse results as your own
            professional certification. Ordinary linking to any tool page is welcome and encouraged.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Availability and changes</h2>
          <p className="mt-2">
            The site is provided as is, without warranties of any kind. Tools may be added, improved or removed
            at any time, and figures such as tax rates are updated when official changes are published. We may
            update these terms occasionally; the date at the top shows the latest version, and continued use of
            the site means you accept the updated terms.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Questions</h2>
          <p className="mt-2">
            If anything here is unclear, reach us through the contact page and we will explain in plain
            language.
          </p>
        </section>
      </div>
    </main>
  );
}
