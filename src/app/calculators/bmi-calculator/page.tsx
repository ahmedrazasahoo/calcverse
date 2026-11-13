import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BmiCalculator from "@/features/calculators/health/bmi-calculator/BmiCalculator";
import { content } from "@/features/calculators/health/bmi-calculator/content";

const tool = getTool("bmi-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BmiCalculator />
    </ToolPage>
  );
}
