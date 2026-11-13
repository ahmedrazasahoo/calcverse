import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import LoanCalculator from "@/features/calculators/finance/loan-calculator/LoanCalculator";
import { content } from "@/features/calculators/finance/loan-calculator/content";

const tool = getTool("loan-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <LoanCalculator />
    </ToolPage>
  );
}
