import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TdeeCalculator from "@/features/calculators/tdee-calculator/TdeeCalculator";
import { content } from "@/features/calculators/tdee-calculator/content";

const tool = getTool("tdee-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <TdeeCalculator />
    </ToolPage>
  );
}
