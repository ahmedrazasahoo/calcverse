import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import HraCalculator from "@/features/calculators/tax/hra-calculator/HraCalculator";
import { content } from "@/features/calculators/tax/hra-calculator/content";

const tool = getTool("hra-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <HraCalculator />
    </ToolPage>
  );
}
