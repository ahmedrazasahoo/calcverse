import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BinaryConverter from "@/features/converters/binary-converter/BinaryConverter";
import { content } from "@/features/converters/binary-converter/content";

const tool = getTool("binary-converter")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BinaryConverter />
    </ToolPage>
  );
}
