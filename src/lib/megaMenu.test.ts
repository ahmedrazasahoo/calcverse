import { describe, expect, it } from "vitest";

import { buildMegaMenu, type MegaSection } from "@/lib/megaMenu";
import {
  CALCULATOR_CATEGORIES,
  getTool,
  liveTools,
  toolPath,
  type ToolGroup,
} from "@/lib/tools";
import { GUIDE_CATEGORIES, guidePath, guides, guidesInCategory } from "@/lib/guides";

const sections = buildMegaMenu();
const byId = new Map(sections.map((s) => [s.id, s]));

function section(id: string): MegaSection {
  const found = byId.get(id);
  if (!found) throw new Error(`missing mega menu section ${id}`);
  return found;
}

function slugFromHref(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? "";
}

/** Every tool href a section exposes, across its columns and its wide strip. */
function sectionToolHrefs(s: MegaSection): string[] {
  const fromColumns = s.columns.flatMap((c) => c.links.map((l) => l.href));
  const fromWide = (s.wideSection?.links ?? []).map((l) => l.href);
  return [...fromColumns, ...fromWide];
}

describe("mega menu structure", () => {
  it("has the five sections in nav order", () => {
    expect(sections.map((s) => s.id)).toEqual([
      "calculators",
      "tools",
      "converters",
      "generators",
      "guides",
    ]);
    expect(sections.map((s) => s.label)).toEqual([
      "Calculators",
      "File Tools",
      "Converters",
      "Generators",
      "Guides",
    ]);
  });
});

describe.each(["calculators", "tools", "converters", "generators"] as ToolGroup[])(
  "mega menu %s section",
  (group) => {
    it("lists every live tool of the group exactly once", () => {
      const hrefs = sectionToolHrefs(section(group));
      const expected = liveTools()
        .filter((tool) => tool.group === group)
        .map((tool) => toolPath(tool));
      expect(new Set(hrefs).size).toBe(hrefs.length);
      expect([...hrefs].sort()).toEqual([...expected].sort());
    });

    it("has no duplicate hrefs", () => {
      const hrefs = sectionToolHrefs(section(group));
      expect(new Set(hrefs).size).toBe(hrefs.length);
    });
  }
);

describe("mega menu calculators columns", () => {
  it("uses one column per registry calculator category, in registry order", () => {
    expect(section("calculators").columns.map((c) => c.heading)).toEqual([
      ...CALCULATOR_CATEGORIES,
    ]);
  });

  it("keeps every column's links inside that column's category", () => {
    for (const column of section("calculators").columns) {
      for (const link of column.links) {
        const tool = getTool(slugFromHref(link.href));
        expect(tool?.category).toBe(column.heading);
      }
    }
  });

  it("puts the US state sales tax pages in the wide strip, not in a column", () => {
    const s = section("calculators");
    const statePages = liveTools().filter(
      (tool) =>
        tool.slug !== "sales-tax-calculator" && tool.slug.endsWith("-sales-tax-calculator")
    );
    expect(statePages.length).toBeGreaterThan(0);
    expect(s.wideSection?.links.map((l) => l.href).sort()).toEqual(
      statePages.map((tool) => toolPath(tool)).sort()
    );
    const columnHrefs = s.columns.flatMap((c) => c.links.map((l) => l.href));
    for (const page of statePages) {
      expect(columnHrefs).not.toContain(toolPath(page));
    }
    // The hub sales tax calculator itself stays in the Tax column.
    const taxColumn = s.columns.find((c) => c.heading === "Tax");
    expect(taxColumn?.links.map((l) => l.href)).toContain("/calculators/sales-tax-calculator");
  });
});

describe("mega menu guides section", () => {
  it("lists every guide category from the registry", () => {
    const s = section("guides");
    expect(s.categories?.map((c) => c.name)).toEqual([...GUIDE_CATEGORIES]);
    expect(s.categories).toHaveLength(GUIDE_CATEGORIES.length);
  });

  it("reports post counts that match the guides registry", () => {
    const s = section("guides");
    let total = 0;
    for (const category of s.categories ?? []) {
      const expected = guidesInCategory(category.name as (typeof GUIDE_CATEGORIES)[number]).length;
      expect(category.count).toBe(expected);
      expect(category.href).toBe("/guides");
      total += category.count;
    }
    expect(total).toBe(guides.length);
  });

  it("features real guide posts", () => {
    const s = section("guides");
    expect(s.featured?.links.length).toBe(3);
    for (const link of s.featured?.links ?? []) {
      expect(guides.map((g) => guidePath(g))).toContain(link.href);
    }
  });
});
