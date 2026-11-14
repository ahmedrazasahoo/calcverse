import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PercentageIncreaseCalculator from "@/features/calculators/everyday/percentage-increase-calculator/PercentageIncreaseCalculator";
import { content } from "@/features/calculators/everyday/percentage-increase-calculator/content";

const tool = getTool("percentage-increase-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PercentageIncreaseCalculator />
    </ToolPage>
  );
}
