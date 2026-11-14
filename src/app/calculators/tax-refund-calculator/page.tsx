import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TaxRefundCalculator from "@/features/calculators/tax/tax-refund-calculator/TaxRefundCalculator";
import { content } from "@/features/calculators/tax/tax-refund-calculator/content";

const tool = getTool("tax-refund-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <TaxRefundCalculator />
    </ToolPage>
  );
}
