import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import VatCalculator from "@/features/calculators/tax/vat-calculator/VatCalculator";
import { content } from "@/features/calculators/tax/vat-calculator/content";

const tool = getTool("vat-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <VatCalculator />
    </ToolPage>
  );
}
