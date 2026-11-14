import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import MacroCalculator from "@/features/calculators/health/macro-calculator/MacroCalculator";
import { content } from "@/features/calculators/health/macro-calculator/content";

const tool = getTool("macro-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <MacroCalculator />
    </ToolPage>
  );
}
