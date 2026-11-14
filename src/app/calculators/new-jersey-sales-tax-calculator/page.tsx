import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import StateSalesTaxCalculator from "@/features/calculators/tax/sales-tax-calculator/StateSalesTaxCalculator";
import { getStateBySlug } from "@/features/calculators/tax/sales-tax-calculator/states";
import { contentForState } from "@/features/calculators/tax/sales-tax-calculator/content";

const state = getStateBySlug("new-jersey")!;
const tool = getTool("new-jersey-sales-tax-calculator")!;
const content = contentForState(state);

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <StateSalesTaxCalculator state={state} />
    </ToolPage>
  );
}
