import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CapitalGainsCalculator from "@/features/calculators/tax/capital-gains-tax-calculator/CapitalGainsCalculator";
import { content } from "@/features/calculators/tax/capital-gains-tax-calculator/content";

const tool = getTool("capital-gains-tax-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <CapitalGainsCalculator />
    </ToolPage>
  );
}
