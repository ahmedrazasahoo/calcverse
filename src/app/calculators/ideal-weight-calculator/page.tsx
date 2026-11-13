import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import IdealWeightCalculator from "@/features/calculators/health/ideal-weight-calculator/IdealWeightCalculator";
import { content } from "@/features/calculators/health/ideal-weight-calculator/content";

const tool = getTool("ideal-weight-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <IdealWeightCalculator />
    </ToolPage>
  );
}
