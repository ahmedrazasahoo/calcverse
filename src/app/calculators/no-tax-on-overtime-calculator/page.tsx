import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import NoTaxOnOvertimeCalculator from "@/features/calculators/tax/no-tax-on-overtime-calculator/NoTaxOnOvertimeCalculator";
import { content } from "@/features/calculators/tax/no-tax-on-overtime-calculator/content";

const tool = getTool("no-tax-on-overtime-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <NoTaxOnOvertimeCalculator />
    </ToolPage>
  );
}
