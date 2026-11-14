import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import LongDivisionCalculator from "@/features/calculators/school/long-division-calculator/LongDivisionCalculator";
import { content } from "@/features/calculators/school/long-division-calculator/content";

const tool = getTool("long-division-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <LongDivisionCalculator />
    </ToolPage>
  );
}
