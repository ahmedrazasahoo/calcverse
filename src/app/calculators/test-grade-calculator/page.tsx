import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TestGradeCalculator from "@/features/calculators/school/test-grade-calculator/TestGradeCalculator";
import { content } from "@/features/calculators/school/test-grade-calculator/content";

const tool = getTool("test-grade-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <TestGradeCalculator />
    </ToolPage>
  );
}
