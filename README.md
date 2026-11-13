# CalcVerse

Free calculators and file tools that run entirely in the visitor's browser.
Next.js (App Router) + TypeScript + Tailwind CSS v4. No database, no uploads:
every tool computes locally on the user's device.

## Commands

```bash
npm run dev     # local development
npm test        # run all unit tests (Vitest)
npm run build   # production build
npm run lint    # ESLint
```

## Architecture

```
src/
  app/            Thin routes only. Pages compose features; they hold no logic.
    calculators/  Hub at /calculators, live pages at /calculators/<slug>,
                  a [slug] route renders coming soon pages for the rest.
    tools/        Same pattern for file tools at /tools/<slug>.
    converters/   Same pattern at /converters/<slug>.
    generators/   Same pattern at /generators/<slug>.
    api/          Route handlers (backend entry points, e.g. /api/health).
    about, privacy, contact, sitemap.ts, robots.ts
  features/       One folder per tool: the unit of work in this project.
    <group>/<tool-slug>/
      <Tool>.tsx        React component (client). Presentation and state only.
      <tool>.ts         Pure logic. Framework free, fully typed, no imports
                        from React or Next. Named constants, validated inputs.
      <tool>.test.ts    Unit tests for the logic (Vitest).
      content.ts        The page's SEO copy as data: seoTitle, howTo steps,
                        explanation paragraphs, FAQs.
  components/     Shared UI: Header, Footer, ToolPage shell, ToolCard,
                  HubPage, ToolSearch, ComingSoon, form primitives (ui.tsx),
                  and the inline SVG icon set (icons.tsx).
  lib/            Cross cutting, framework light helpers:
                  tools.ts (the registry, single source of truth),
                  theme.ts (per category colors), seo.ts (metadata builders),
                  format.ts (number parsing/formatting), dates.ts (calendar
                  math), site.ts (site constants), content.ts (content types).
  server/         Backend only code, guarded by `server-only`. Route handlers
                  in src/app/api import from here. Future rates endpoints
                  (metal prices, exchange rates) belong in this layer.
```

### Folder rules

1. Routes stay thin. A page file should only fetch the registry entry,
   build metadata, and render the ToolPage shell with the feature component
   and its content. If a page grows logic, move the logic into the feature.
2. Logic never imports React, Next or the DOM. If it cannot be unit tested
   in plain Node, it is in the wrong file.
3. Components never contain formulas. They call the feature's logic file.
4. Copy lives in content.ts, never hardcoded inside components.
5. All colors that vary by category come from src/lib/theme.ts, written as
   full class strings (Tailwind cannot see dynamically built class names).
6. No em dash character anywhere in copy. Use commas, periods or colons.

## How to add a new tool

1. **Register it.** Add an entry to `src/lib/tools.ts` with slug, name,
   group, category, one line description, keywords, icon name and
   `status: "soon"`. It immediately appears on the home page, its hub,
   search and the sitemap, with a coming soon page at its URL.
2. **Create the feature folder** at `src/features/<group>/<slug>/`.
3. **Write the logic first** in `<tool>.ts`: pure functions, named constants
   for every rate, multiplier and threshold, input validation at the
   boundary (return null or a typed error for out of range input, never
   throw on user input), edge cases handled (leap years, invalid dates,
   division by zero).
4. **Write the tests** in `<tool>.test.ts` covering the reference values,
   the edge cases and the invalid inputs. Run `npm test`.
5. **Write the component** in `<Tool>.tsx` (PascalCase). Client component,
   instant results as the user types, large tap targets, results announced
   with `aria-live` where practical.
6. **Write the copy** in `content.ts`: an SEO title, 3 to 5 how-to steps,
   a formula or method explanation in plain English, and 4 to 6 FAQs.
   Human written, original, no em dashes.
7. **Create the route** at `src/app/<group>/<slug>/page.tsx`, copying an
   existing live page and swapping the imports. Because a static route now
   exists, it takes priority over the group's `[slug]` coming soon route.
8. **Flip the status** of the registry entry to `"live"`.
9. Run `npm test` and `npm run build`; both must pass.

## Design system

- Primary: deep indigo violet (`brand` palette in globals.css).
- Accent: warm amber (Tailwind `amber`), used sparingly for highlights.
- Category colors: Finance emerald, Health rose, School sky, Everyday amber,
  Tax slate, PDF and Image tools violet, Converters cyan, Generators fuchsia.
  Defined in `src/lib/theme.ts`.
- Cards are rounded-2xl with soft shadows and a hover lift. Tool icons are
  inline SVGs (Lucide style) from `src/components/icons.tsx`.
- Fonts are the system stack only, for speed. No external images.

## Coverage

The registry covers all 59 tool families from the autocomplete coverage map
(13,617 real Google suggestions), with variant pages for high intent exact
size searches (for example compress PDF to 200KB and 100KB). Tools ship in
batches: calculators first, then file tools, converters and generators.
