import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import AverageCalculator from "@/features/calculators/school/average-calculator/AverageCalculator";
import { content } from "@/features/calculators/school/average-calculator/content";

const tool = getTool("average-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <AverageCalculator />
    </ToolPage>
  );
}
