import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import NoTaxOnTipsCalculator from "@/features/calculators/tax/no-tax-on-tips-calculator/NoTaxOnTipsCalculator";
import { content } from "@/features/calculators/tax/no-tax-on-tips-calculator/content";

const tool = getTool("no-tax-on-tips-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <NoTaxOnTipsCalculator />
    </ToolPage>
  );
}
