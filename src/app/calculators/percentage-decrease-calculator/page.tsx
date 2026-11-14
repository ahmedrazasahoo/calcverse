import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PercentageDecreaseCalculator from "@/features/calculators/everyday/percentage-decrease-calculator/PercentageDecreaseCalculator";
import { content } from "@/features/calculators/everyday/percentage-decrease-calculator/content";

const tool = getTool("percentage-decrease-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PercentageDecreaseCalculator />
    </ToolPage>
  );
}
