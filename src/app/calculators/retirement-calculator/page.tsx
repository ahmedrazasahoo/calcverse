import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import RetirementCalculator from "@/features/calculators/finance/retirement-calculator/RetirementCalculator";
import { content } from "@/features/calculators/finance/retirement-calculator/content";

const tool = getTool("retirement-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <RetirementCalculator />
    </ToolPage>
  );
}
