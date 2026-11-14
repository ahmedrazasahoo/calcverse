import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import MulchCalculator from "@/features/calculators/everyday/mulch-calculator/MulchCalculator";
import { content } from "@/features/calculators/everyday/mulch-calculator/content";

const tool = getTool("mulch-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <MulchCalculator />
    </ToolPage>
  );
}
