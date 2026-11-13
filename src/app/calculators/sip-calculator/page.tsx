import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SipCalculator from "@/features/calculators/finance/sip-calculator/SipCalculator";
import { content } from "@/features/calculators/finance/sip-calculator/content";

const tool = getTool("sip-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <SipCalculator />
    </ToolPage>
  );
}
