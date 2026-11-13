import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import AgeDifferenceCalculator from "@/features/calculators/age-difference-calculator/AgeDifferenceCalculator";
import { content } from "@/features/calculators/age-difference-calculator/content";

const tool = getTool("age-difference-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <AgeDifferenceCalculator />
    </ToolPage>
  );
}
