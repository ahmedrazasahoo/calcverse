import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import RomanNumeralConverter from "@/features/converters/roman-numeral-converter/RomanNumeralConverter";
import { content } from "@/features/converters/roman-numeral-converter/content";

const tool = getTool("roman-numeral-converter")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <RomanNumeralConverter />
    </ToolPage>
  );
}
