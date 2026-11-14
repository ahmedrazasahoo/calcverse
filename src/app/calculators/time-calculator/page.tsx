import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TimeCalculator from "@/features/calculators/everyday/time-calculator/TimeCalculator";
import { content } from "@/features/calculators/everyday/time-calculator/content";

const tool = getTool("time-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <TimeCalculator />
    </ToolPage>
  );
}
