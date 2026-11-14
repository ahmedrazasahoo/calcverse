import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import RatioCalculator from "@/features/calculators/school/ratio-calculator/RatioCalculator";
import { content } from "@/features/calculators/school/ratio-calculator/content";

const tool = getTool("ratio-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <RatioCalculator />
    </ToolPage>
  );
}
