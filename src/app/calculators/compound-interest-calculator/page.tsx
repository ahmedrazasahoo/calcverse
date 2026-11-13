import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CompoundInterestCalculator from "@/features/calculators/finance/compound-interest-calculator/CompoundInterestCalculator";
import { content } from "@/features/calculators/finance/compound-interest-calculator/content";

const tool = getTool("compound-interest-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <CompoundInterestCalculator />
    </ToolPage>
  );
}
