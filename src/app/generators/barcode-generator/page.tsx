import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BarcodeGenerator from "@/features/generators/barcode-generator/BarcodeGenerator";
import { content } from "@/features/generators/barcode-generator/content";

const tool = getTool("barcode-generator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BarcodeGenerator />
    </ToolPage>
  );
}
