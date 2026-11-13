import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import type { ToolContent } from "@/lib/content";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SplitPdf from "@/features/tools/split-pdf/SplitPdf";
import { content } from "@/features/tools/split-pdf/content";

const tool = getTool("split-pdf")!;

const toolContent: ToolContent = {
  seoTitle: content.title,
  howTo: content.howTo,
  explanationTitle: content.explanationTitle,
  explanation: content.explanation,
  faqs: content.faqs,
};

export const metadata: Metadata = toolMetadata(tool, content.title, content.metaDescription);

export default function Page() {
  return (
    <ToolPage tool={tool} content={toolContent}>
      <SplitPdf />
    </ToolPage>
  );
}
