import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import GradeCalculator from "@/features/calculators/school/grade-calculator/GradeCalculator";
import { content } from "@/features/calculators/school/grade-calculator/content";

const tool = getTool("grade-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <GradeCalculator />
    </ToolPage>
  );
}
