import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CalcVerse handles your data: files are processed locally in your browser and never uploaded, no accounts, and no selling of personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-gray-500">Last updated: 13 November 2026</p>
      <div className="mt-6 space-y-6 leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900">Your files never leave your device</h2>
          <p className="mt-2">
            Every file tool on CalcVerse, including PDF and image compression and format conversion, processes
            your files locally in your own web browser. Your files are never uploaded to our servers or to any
            third party server. We could not look at your documents even if we wanted to, because they never
            reach us.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Your calculator inputs stay local too</h2>
          <p className="mt-2">
            The numbers you type into calculators, such as your weight, salary or grades, are used only by the
            calculator running in your browser tab. They are not sent to us, stored by us, or shared with
            anyone.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">No accounts, no personal profiles</h2>
          <p className="mt-2">
            CalcVerse has no signup and no user accounts. We do not ask for your name, email address or any
            other personal details to use the tools, and we never sell personal information, because we do not
            collect it in the first place.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Basic technical information</h2>
          <p className="mt-2">
            Like almost every website, our hosting may keep standard server logs that include your browser
            type, device type and the pages visited, used only to keep the site running and understand which
            tools are popular. If advertising is shown in future, advertising partners may use cookies to serve
            and measure ads, as described by their own policies.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">Questions</h2>
          <p className="mt-2">
            If anything in this policy is unclear, please get in touch through the contact page and we will be
            happy to explain.
          </p>
        </section>
      </div>
    </main>
  );
}
