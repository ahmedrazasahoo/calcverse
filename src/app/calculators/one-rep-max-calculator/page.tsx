import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import OneRepMaxCalculator from "@/features/calculators/health/one-rep-max-calculator/OneRepMaxCalculator";
import { content } from "@/features/calculators/health/one-rep-max-calculator/content";

const tool = getTool("one-rep-max-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <OneRepMaxCalculator />
    </ToolPage>
  );
}
