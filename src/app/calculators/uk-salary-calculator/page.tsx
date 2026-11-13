import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import UkSalaryCalculator from "@/features/calculators/tax/uk-salary-calculator/UkSalaryCalculator";
import { content } from "@/features/calculators/tax/uk-salary-calculator/content";

const tool = getTool("uk-salary-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <UkSalaryCalculator />
    </ToolPage>
  );
}
