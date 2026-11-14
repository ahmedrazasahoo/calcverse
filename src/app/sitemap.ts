import type { MetadataRoute } from "next";
import { guidePath, guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";
import { GROUP_PATHS, toolPath, tools, type ToolGroup } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/about", "/privacy", "/contact", "/terms", "/disclaimer"];
  const hubs = (Object.keys(GROUP_PATHS) as ToolGroup[]).map((g) => GROUP_PATHS[g]);

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.5,
    })),
    ...hubs.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...tools.map((tool) => ({
      url: `${SITE_URL}${toolPath(tool)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: tool.status === "live" ? 0.9 : 0.4,
    })),
    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...guides.map((post) => ({
      url: `${SITE_URL}${guidePath(post)}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
