# GitHub Open Source Research for the Tools + Calculators Website
Compiled 13 Nov 2026. All star counts, licenses and activity verified live via the GitHub API.

## 1. The base: ONE genuine shortcut

**iib0011/omni-tools** (https://github.com/iib0011/omni-tools)
10,714 stars, MIT license, active (last push Oct 2026), React + TypeScript + Vite + Tailwind, live at omnitools.app.
About 120 tools in 12 categories, fully client side. Its PDF set already includes compress-pdf, merge-pdf, split-pdf, rotate-pdf, pdf-to-png, convert-to-pdf, protect-pdf, extract-images.
Plan: fork it as the site skeleton (routing, category hubs, search, dark mode done), then add our GOLD list calculators, exact KB variants, and the SEO content layer it lacks (how to steps, why this size, FAQs). MIT means ads and commercial use are fine.

**CorentinTh/it-tools** (https://github.com/CorentinTh/it-tools)
41,247 stars, but GPL-3.0 copyleft and developer focused only. Use for UX ideas, NOT as the base, unless we accept open sourcing our whole fork.

## 2. File tool libraries (all permissive, zero license exposure)

- pdf-lib (MIT, 8.7K stars): merge, split, rotate, remove pages, JPG to PDF. Does NOT compress meaningfully by itself.
- pdf.js by Mozilla (Apache-2.0, 54K stars): PDF to JPG rendering, text extraction for PDF to Word, page previews. Heavy, lazy load only.
- browser-image-compression (MIT, 1.7K stars): compress image to an exact KB target natively, worker support. Best fit for our exact size pages.
- compressorjs (MIT, 5.8K stars): simple image compression fallback.
- heic2any (MIT, libheif inside is LGPL): HEIC to JPG. Heavy decoder, lazy load on its page only.
- node-qrcode (MIT, 8.2K stars): QR generator including WiFi and vCard. Do NOT use qrcodejs (abandoned, buggy).
- tesseract.js (Apache-2.0, 38.8K stars): OCR for scanned PDFs in PDF to Word. Heavy, best effort accuracy.
- jszip (MIT elected): zip downloads for split PDF, PDF to JPG batches, docx assembly.
- Squoosh codecs (Apache-2.0, GoogleChromeLabs): WebP and AVIF conversion codecs.
- PDF compression decision: Route A = pdf-lib + canvas image re-encoding (free, safe, weaker on text heavy PDFs). Route C = Ghostscript WASM (strongest, but AGPL-3.0 license risk plus tens of MB download). Decide consciously before building the compress pages.

## 3. Calculator code by cluster (MIT/Apache only are copyable)

- Health: nutrifit-health/nutrifit-widgets (MIT, 49 health calculators incl. TDEE, BMR, BMI, sleep, water) + isfonzar/tdee-calculator (MIT, cleanest TDEE formulas, PHP, port to JS).
- India finance and tax: S2zxx0zxx/financeCalculator-Ind-v6.0 (MIT, 13 calculators: EMI, SIP, Tax, GST, FD, RD, PPF, NPS, plus an SEO blog playbook). Verify slabs against official sources.
- Pakistan tax: YasirAwan4831/pak-tax-calculator (MIT, React, has taxSlabs2026 and taxSlabs2027 data files). smafnan/pakistan-salary-tax-calculator has NO license: use as engineering spec only, transcribe slabs from FBR Circular and Finance Act ourselves.
- Zakat: mrabdussalam/zakat-calculator (MIT, Next.js, nisab + metal price fallback data, tests) + tawwfik/Zakat-Calculator (MIT, has real unit tests, port formulas from PHP).
- GPA: sndnyang/superbGPACalculator (MIT, 7 grading scales in one page: US 4.0, PK, IN 10 point).
- Everyday cluster: 0xvashishth/CalcHub (Apache-2.0, 60+ calculators as standalone folders: age, tip, VAT, compound interest, sleep and more). Uneven quality, audit each formula.
- UK salary: the one real gap. Only 2015 era MIT architecture exists (cabdesigns/salarybot-php, band based structure). Build fresh from current HMRC tables using that structure.
- Ovulation: sarthology/ovuli (MIT, cycle logic with tests, stale 2022, simple enough to write fresh).

## 4. License rules learned (important)

- MIT / Apache-2.0: safe to copy and monetize.
- GPL-3.0: using the code forces our site code open (it-tools, one GPA repo). Avoid as base.
- AGPL-3.0: strictest, even website use triggers source release (finanzfluss calculators, Ghostscript). Study only.
- NO license file = all rights reserved, public does NOT mean reusable (several calculator repos, including some popular ones). Formulas and tax slab facts can be re-implemented, code cannot be copied.

## 5. Recommended build route

1. Fork omni-tools (MIT) as the shell. It already gives about 120 tools and the PDF set.
2. Add our GOLD list calculators using the MIT repos above as formula sources (nutrifit for health, S2zxx for India, YasirAwan for Pakistan, mrabdussalam for zakat, CalcHub for everyday).
3. Build exact KB compressors with browser-image-compression (images) and pdf-lib + canvas (PDF, Route A first).
4. Add the SEO content layer omni-tools lacks: unique how to steps, why this size section, FAQs, related tools linking, per the plan's page template.
5. UK salary calculator built fresh from HMRC tables.
