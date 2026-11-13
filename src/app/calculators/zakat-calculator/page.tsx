import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import ZakatCalculator from "@/features/calculators/tax/zakat-calculator/ZakatCalculator";
import { content } from "@/features/calculators/tax/zakat-calculator/content";

const tool = getTool("zakat-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <ZakatCalculator />
    </ToolPage>
  );
}
