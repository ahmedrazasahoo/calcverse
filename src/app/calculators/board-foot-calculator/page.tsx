import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BoardFootCalculator from "@/features/calculators/everyday/board-foot-calculator/BoardFootCalculator";
import { content } from "@/features/calculators/everyday/board-foot-calculator/content";

const tool = getTool("board-foot-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BoardFootCalculator />
    </ToolPage>
  );
}
