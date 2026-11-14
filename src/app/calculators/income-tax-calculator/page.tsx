import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import IncomeTaxCalculator from "@/features/calculators/tax/income-tax-calculator/IncomeTaxCalculator";
import { content } from "@/features/calculators/tax/income-tax-calculator/content";

const tool = getTool("income-tax-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <IncomeTaxCalculator />
    </ToolPage>
  );
}
