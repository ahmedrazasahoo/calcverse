import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import NpsCalculator from "@/features/calculators/finance/nps-calculator/NpsCalculator";
import { content } from "@/features/calculators/finance/nps-calculator/content";

const tool = getTool("nps-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <NpsCalculator />
    </ToolPage>
  );
}
