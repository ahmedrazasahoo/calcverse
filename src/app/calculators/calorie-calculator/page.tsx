import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CalorieCalculator from "@/features/calculators/health/calorie-calculator/CalorieCalculator";
import { content } from "@/features/calculators/health/calorie-calculator/content";

const tool = getTool("calorie-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <CalorieCalculator />
    </ToolPage>
  );
}
