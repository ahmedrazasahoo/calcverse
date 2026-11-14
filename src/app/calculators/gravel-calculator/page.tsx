import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import GravelCalculator from "@/features/calculators/everyday/gravel-calculator/GravelCalculator";
import { content } from "@/features/calculators/everyday/gravel-calculator/content";

const tool = getTool("gravel-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <GravelCalculator />
    </ToolPage>
  );
}
