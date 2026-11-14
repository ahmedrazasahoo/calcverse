import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import Base64Converter from "@/features/converters/base64-converter/Base64Converter";
import { content } from "@/features/converters/base64-converter/content";

const tool = getTool("base64-converter")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Base64Converter />
    </ToolPage>
  );
}
