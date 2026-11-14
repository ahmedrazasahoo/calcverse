import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TileCalculator from "@/features/calculators/everyday/tile-calculator/TileCalculator";
import { content } from "@/features/calculators/everyday/tile-calculator/content";

const tool = getTool("tile-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <TileCalculator />
    </ToolPage>
  );
}
