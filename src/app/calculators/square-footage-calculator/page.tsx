import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SquareFootageCalculator from "@/features/calculators/everyday/square-footage-calculator/SquareFootageCalculator";
import { content } from "@/features/calculators/everyday/square-footage-calculator/content";

const tool = getTool("square-footage-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <SquareFootageCalculator />
    </ToolPage>
  );
}
