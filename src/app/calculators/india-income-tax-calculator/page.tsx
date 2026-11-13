import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import IndiaIncomeTaxCalculator from "@/features/calculators/tax/india-income-tax-calculator/IndiaIncomeTaxCalculator";
import { content } from "@/features/calculators/tax/india-income-tax-calculator/content";

const tool = getTool("india-income-tax-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <IndiaIncomeTaxCalculator />
    </ToolPage>
  );
}
