import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import MorseCodeTranslator from "@/features/converters/morse-code-translator/MorseCodeTranslator";
import { content } from "@/features/converters/morse-code-translator/content";

const tool = getTool("morse-code-translator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <MorseCodeTranslator />
    </ToolPage>
  );
}
