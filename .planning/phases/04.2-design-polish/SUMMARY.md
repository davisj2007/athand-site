# Phase 04.2: design-polish - Summary

## What changed

PLAN.md set to Approved (2026-10-26) at the start of EXECUTE wave 1; Jake approved it in the EXECUTE prompt.

Wave 1 (EXECUTE, 2026-10-26, branch execute/04.2-wave-1 from main at 3e8cbae, REVISE PR #41 merged):

- 04.2-01 (FX1): a new block at the end of src/styles/site.css, with a comment, sets `text-wrap: balance` on `.section-title`, `.feature h3`, `.moment h3`, `.band h2`, `.prose h2`, `.prose h3`, and `.page-top h1`. The hero h1 keeps its own rule. No other property changed.
- 04.2-02 (FX2): the same block sets `text-wrap: pretty` on `.lede`, `.section-line`, `.feature-copy p`, `.prose p`, `.prose li`, and `.facts li`.
- 04.2-03 (FX3): `.prose` max-width 68ch to 56ch (decision 7). measure.mjs at 1280: column 601px on all six pages; highest paragraph averages Features 70.0, Pricing 69.0, Privacy overview 70.0, Support 70.5, privacy policy 72.0, 404 36.0; longest lines 75, 75, 75, 77, 77, and 54, all under 80.
- 04.2-04 (FX4): the privacy band fill is `--accent-press` in dark (explicit Dark and System with the OS dark), `--accent` in light; the band comment names decision 8. No token file or custom property changed. `main .band` computes to rgb(76, 57, 198) in light and rgb(90, 71, 208) in dark on Home and the Privacy overview.
- 04.2-05 (FX5): Home's band h2 reads "What you add stays on your iPhone" (HM16 revised, decision 9). index.txt gains the phase 04.2 header line, and its HM16 lines are replaced with the four lines PLAN gives. The Privacy overview is untouched and still holds "Your information stays on your iPhone." once.

Live site after this wave: every page keeps its content and URLs. Headings and paragraphs wrap better in browsers that support `text-wrap`; prose columns are narrower at wide widths; the privacy band is a darker cobalt in dark only; Home's band h2 reads "What you add stays on your iPhone".

Wave 1 check results (2026-10-26): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match; local app checkout and origin/main at 487b454, brief and _ds tokens unchanged since f4f2450), `npm run check:external` (no third-party requests), `npm run check:links` (61 internal links resolve), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:layout` (7 pages, 2 themes, 5 viewports: no overflow, gutters kept), `npm run check:a11y` (7 pages, 4 theme states, 2 widths: no violations), check-text for all five phase 04 fixtures (index 68 lines, features 48, pricing 30, privacy-overview 30, support 81), measure.mjs headings, stragglers, measure, and band, and each task's verify command: all pass, run after every task.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-26, Home in dark): the privacy band fills rgb(90, 71, 208), and the h2 "What you add stays on your iPhone" wraps as two balanced lines ("What you add stays / on your iPhone") above the three facts and the CTA.

## Brief citations

- HM16 revised, "What you add stays on your iPhone" (Home privacy band h2): brief, Privacy. Approved at ANSWERS (decision 9). It names what the user adds, not everything on the device, and makes no "nothing leaves" claim.

## Commits

- 88a5012 phase 04.2 task 04.2-01: balanced headings
- 232c70d phase 04.2 task 04.2-02: fewer stragglers
- 046658d phase 04.2 task 04.2-03: prose measure 56ch
- 112f40f phase 04.2 task 04.2-04: dark privacy band fill
- 3c43ad0 phase 04.2 task 04.2-05: Home privacy band h2 (HM16 revised)

## Deviations

None.

## Backlog items added

None.

## Follow-ups

- Wave 2 (04.2-06 to 04.2-08): the `fields` and `lock` crops, the one-frame Features page top, and the row 4 live pair.
