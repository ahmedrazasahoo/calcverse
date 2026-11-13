import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PaceCalculator from "@/features/calculators/everyday/pace-calculator/PaceCalculator";
import { content } from "@/features/calculators/everyday/pace-calculator/content";

const tool = getTool("pace-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PaceCalculator />
    </ToolPage>
  );
}
