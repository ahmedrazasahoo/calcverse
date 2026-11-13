import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import type { ToolContent } from "@/lib/content";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CompressPdfTo50Kb from "@/features/tools/compress-pdf-to-50kb/CompressPdfTo50Kb";
import { content } from "@/features/tools/compress-pdf-to-50kb/content";

const tool = getTool("compress-pdf-to-50kb")!;

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
      <CompressPdfTo50Kb />
    </ToolPage>
  );
}
