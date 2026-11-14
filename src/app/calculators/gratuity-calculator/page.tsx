import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import GratuityCalculator from "@/features/calculators/finance/gratuity-calculator/GratuityCalculator";
import { content } from "@/features/calculators/finance/gratuity-calculator/content";

const tool = getTool("gratuity-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <GratuityCalculator />
    </ToolPage>
  );
}
