import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { toolPath, type Tool } from "@/lib/tools";

/** Build the Metadata object for a tool page from its registry entry and SEO title. */
export function toolMetadata(tool: Tool, title: string, description: string): Metadata {
  const url = `${SITE_URL}${toolPath(tool)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

/** Build Metadata for a simple static page such as About or Privacy. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url, siteName: SITE_NAME, type: "website" },
  };
}
