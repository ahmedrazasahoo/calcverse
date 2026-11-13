import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CalcVerse",
  description: "Get in touch with the CalcVerse team: suggest a tool, report a wrong result, or ask a question.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact us</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-gray-700">
        <p>
          Found a result that looks wrong, or a tool you wish existed? We genuinely want to hear about it.
          CalcVerse grows based on what visitors ask for, and a clear bug report usually gets fixed fast.
        </p>
        <p>
          You can reach the team by email at{" "}
          <a href="mailto:hello@calcverse.com" className="font-medium text-brand-700 hover:underline">
            hello@calcverse.com
          </a>
          .
        </p>
        <p>
          When reporting a wrong result, it helps to include the name of the tool, the numbers you entered, and
          the answer you expected. Please do not send personal documents or files by email: our tools are
          designed so that your files never need to leave your device, and we would like to keep it that way.
        </p>
        <p>
          For suggestions, tell us the problem you are trying to solve rather than just a tool name. Knowing the
          job behind the request helps us build the right thing.
        </p>
      </div>
    </main>
  );
}
