import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PakistanSalaryTaxCalculator from "@/features/calculators/tax/pakistan-salary-tax-calculator/PakistanSalaryTaxCalculator";
import { content } from "@/features/calculators/tax/pakistan-salary-tax-calculator/content";

const tool = getTool("pakistan-salary-tax-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PakistanSalaryTaxCalculator />
    </ToolPage>
  );
}
