import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import AgeCalculator from "@/features/calculators/age-calculator/AgeCalculator";
import { content } from "@/features/calculators/age-calculator/content";

const tool = getTool("age-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <AgeCalculator />
    </ToolPage>
  );
}
