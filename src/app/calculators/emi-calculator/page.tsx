import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import EmiCalculator from "@/features/calculators/finance/emi-calculator/EmiCalculator";
import { content } from "@/features/calculators/finance/emi-calculator/content";

const tool = getTool("emi-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <EmiCalculator />
    </ToolPage>
  );
}
