import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SalaryCalculator from "@/features/calculators/tax/salary-calculator/SalaryCalculator";
import { content } from "@/features/calculators/tax/salary-calculator/content";

const tool = getTool("salary-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <SalaryCalculator />
    </ToolPage>
  );
}
