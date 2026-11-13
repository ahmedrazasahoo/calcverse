import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BmrCalculator from "@/features/calculators/health/bmr-calculator/BmrCalculator";
import { content } from "@/features/calculators/health/bmr-calculator/content";

const tool = getTool("bmr-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BmrCalculator />
    </ToolPage>
  );
}
