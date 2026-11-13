import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import type { ToolContent } from "@/lib/content";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CompressPdfTo200Kb from "@/features/tools/compress-pdf-to-200kb/CompressPdfTo200Kb";
import { content } from "@/features/tools/compress-pdf-to-200kb/content";

const tool = getTool("compress-pdf-to-200kb")!;

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
      <CompressPdfTo200Kb />
    </ToolPage>
  );
}
