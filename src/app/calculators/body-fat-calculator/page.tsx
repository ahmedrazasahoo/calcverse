import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BodyFatCalculator from "@/features/calculators/health/body-fat-calculator/BodyFatCalculator";
import { content } from "@/features/calculators/health/body-fat-calculator/content";

const tool = getTool("body-fat-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BodyFatCalculator />
    </ToolPage>
  );
}
