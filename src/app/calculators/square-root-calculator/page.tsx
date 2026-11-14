import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SquareRootCalculator from "@/features/calculators/school/square-root-calculator/SquareRootCalculator";
import { content } from "@/features/calculators/school/square-root-calculator/content";

const tool = getTool("square-root-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <SquareRootCalculator />
    </ToolPage>
  );
}
