import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CreditCardPayoffCalculator from "@/features/calculators/finance/credit-card-payoff-calculator/CreditCardPayoffCalculator";
import { content } from "@/features/calculators/finance/credit-card-payoff-calculator/content";

const tool = getTool("credit-card-payoff-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <CreditCardPayoffCalculator />
      </Suspense>
    </ToolPage>
  );
}
