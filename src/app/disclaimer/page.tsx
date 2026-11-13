import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "CalcVerse results are estimates for general information only. Read how accuracy, tax figures, health numbers and file tools should be used.",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Disclaimer</h1>
      <p className="mt-3 text-sm text-gray-500">Last updated: 14 November 2026</p>
      <div className="mt-6 space-y-6 leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900">General information only</h2>
          <p className="mt-2">
            Every calculator, converter, generator and file tool on CalcVerse is provided for general
            information and everyday convenience. Nothing on this site is professional advice of any kind, and
            using a tool does not create any professional relationship between you and CalcVerse.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Money and tax figures</h2>
          <p className="mt-2">
            Loan, investment and tax calculators use standard formulas and published rates, slabs and thresholds
            at the time each page was written or last reviewed. Banks may apply different rounding, fees or
            charges, and governments change tax rules through budgets and notifications. Always treat the
            output as a close estimate and confirm the final figure on your official statement, offer letter or
            tax portal before acting on it.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Health numbers</h2>
          <p className="mt-2">
            Health calculators such as BMI, calorie and body fat tools use widely published estimation formulas.
            They describe population averages, not your individual body, and they are not a diagnosis or a
            medical recommendation. If a result worries you, or before starting a diet or training plan, please
            speak to a doctor or a qualified health professional.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">File tools</h2>
          <p className="mt-2">
            File tools run entirely in your browser and your files are never uploaded. Compression and
            conversion can change a file in ways that matter for official submissions, print or legal records,
            so always keep your original file and open the result once to confirm it looks right before you
            rely on it or delete the original.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">External accuracy and liability</h2>
          <p className="mt-2">
            We aim for accuracy and correct mistakes as soon as we find them, but we cannot guarantee that every
            figure is complete or current at the moment you use it. To the fullest extent allowed by law,
            CalcVerse is not liable for losses that follow from relying on a result without independent
            confirmation.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Spotted an error?</h2>
          <p className="mt-2">
            If a formula, rate or explanation looks wrong, please tell us through the contact page. Reader
            corrections are one of the main ways these tools stay trustworthy.
          </p>
        </section>
      </div>
    </main>
  );
}
