import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import FdCalculator from "@/features/calculators/finance/fd-calculator/FdCalculator";
import { content } from "@/features/calculators/finance/fd-calculator/content";

const tool = getTool("fd-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <FdCalculator />
    </ToolPage>
  );
}
