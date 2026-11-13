import type { Metadata } from "next";
import HubPage from "@/components/HubPage";

export const metadata: Metadata = {
  title: "Generators: QR Codes, Strong Passwords and Typing Test",
  description:
    "Free QR code generator for links, WiFi and contact cards, a strong password generator, and a one minute typing speed test. Everything happens locally on your device.",
};

export default function Page() {
  return (
    <HubPage
      group="generators"
      title="Generators"
      intro="Create QR codes that never expire, passwords that are genuinely hard to guess, and check your typing speed while you are here. Generation happens on your own device, so nothing you create is stored or sent anywhere."
      categoryOrder={["Generators", "Tests"]}
    />
  );
}
