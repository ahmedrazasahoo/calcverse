import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import WaterIntakeCalculator from "@/features/calculators/health/water-intake-calculator/WaterIntakeCalculator";
import { content } from "@/features/calculators/health/water-intake-calculator/content";

const tool = getTool("water-intake-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <WaterIntakeCalculator />
    </ToolPage>
  );
}
