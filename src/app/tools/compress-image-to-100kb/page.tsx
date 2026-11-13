import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import type { ToolContent } from "@/lib/content";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CompressImageTo100Kb from "@/features/tools/compress-image-to-100kb/CompressImageTo100Kb";
import { content } from "@/features/tools/compress-image-to-100kb/content";

const tool = getTool("compress-image-to-100kb")!;

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
      <CompressImageTo100Kb />
    </ToolPage>
  );
}
