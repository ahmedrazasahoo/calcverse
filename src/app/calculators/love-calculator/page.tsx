import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import LoveCalculator from "@/features/calculators/everyday/love-calculator/LoveCalculator";
import { content } from "@/features/calculators/everyday/love-calculator/content";

const tool = getTool("love-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <LoveCalculator />
    </ToolPage>
  );
}
