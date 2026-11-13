import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { CALCULATOR_CATEGORIES } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Calculators: Finance, Health, School, Everyday and Tax",
  description:
    "Browse every CalcVerse calculator in one place: finance, health, school, everyday and tax calculators, all free and all running in your browser.",
};

export default function Page() {
  return (
    <HubPage
      group="calculators"
      title="Calculators"
      intro="From loan payments to daily calories and grade point averages, every calculator here is free, works instantly as you type, and keeps your numbers on your own device. New calculators are added regularly, and the ones marked coming soon are already in the works."
      categoryOrder={[...CALCULATOR_CATEGORIES]}
    />
  );
}
