import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import MortgageCalculator from "@/features/calculators/finance/mortgage-calculator/MortgageCalculator";
import { content } from "@/features/calculators/finance/mortgage-calculator/content";

const tool = getTool("mortgage-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <MortgageCalculator />
    </ToolPage>
  );
}
