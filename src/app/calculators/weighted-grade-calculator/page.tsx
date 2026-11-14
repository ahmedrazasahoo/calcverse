import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import WeightedGradeCalculator from "@/features/calculators/school/weighted-grade-calculator/WeightedGradeCalculator";
import { content } from "@/features/calculators/school/weighted-grade-calculator/content";

const tool = getTool("weighted-grade-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <WeightedGradeCalculator />
    </ToolPage>
  );
}
