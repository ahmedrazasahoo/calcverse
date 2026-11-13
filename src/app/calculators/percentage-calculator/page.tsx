import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PercentageCalculator from "@/features/calculators/percentage-calculator/PercentageCalculator";
import { content } from "@/features/calculators/percentage-calculator/content";

const tool = getTool("percentage-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PercentageCalculator />
    </ToolPage>
  );
}
