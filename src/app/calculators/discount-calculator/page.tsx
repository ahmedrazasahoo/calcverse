import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import DiscountCalculator from "@/features/calculators/everyday/discount-calculator/DiscountCalculator";
import { content } from "@/features/calculators/everyday/discount-calculator/content";

const tool = getTool("discount-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <DiscountCalculator />
    </ToolPage>
  );
}
