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

Wave 2 (EXECUTE, 2026-10-26, branch execute/04.2-wave-2 from main at 955dabf, wave 1 PR #42 merged):

- 04.2-06 (FX7): PhoneFrame's `crop` prop gains `fields` and `lock`; site.css gives `fields` an aspect ratio of 1320 / 1424 at object-position 50% 11.911% and `lock` 1320 / 1388 at 50% 87.027%, with a comment naming the rows each keeps. Home row 2 uses `crop="fields"` with alt A3r and row 5 uses `crop="lock"` with alt A9r. index.txt carries A3r and A9r, the A9r comment, and the updated alt comment.
- 04.2-07 (FX8): the Features page top shows one frame, 04-check-what-we-read with `crop="fields"` and alt A3r, on a plain shot panel; 02-person-top left the page top, and the `.shot-panel.overlap` block and its comment are deleted from site.css. features.txt's last three lines are replaced with the A3r comment and alt line.
- 04.2-08 (FX6): Home row 4 is two live figures, Masked then Revealed, in the moments-card style: the home badge (H on `--entity-home`), "Maple Street house", "Alarm code", and a value row with eight aria-hidden dots plus the visually hidden "Alarm code, hidden until you tap Reveal" (Masked) or "0000" (Revealed), and an aria-hidden Reveal or Hide label. Nothing in the pair is a link, button, or focusable. `.frame.pair` became `.pair`, the figcaption rule covers `.pair`, and the `.badge-home`, `.secret`, `.secret-row`, and `.secret-action` rules use token variables only. PhoneFrame's glob leaves out the 05 shots, which stay in src/assets/shots/; dist/ holds no 05 file and no stray PNG. index.txt gains the HM28 to HM30 lines and loses the A5 and A6 alt lines.

Live site after this wave: Home rows 2 and 5 show tight crops, row 4 shows the live Masked and Revealed cards, and the Features page top shows one larger frame. No URL moved, and every image is still WebP from athandapp.com (fewer of them).

Wave 2 check results (2026-10-26): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match 487b454; local app checkout and origin/main at 487b454, brief and _ds tokens unchanged since f4f2450), `npm run check:external` (no third-party requests), `npm run check:links` (61 internal links resolve), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:layout` (7 pages, 2 themes, 5 viewports: no overflow, gutters kept), `npm run check:a11y` (7 pages, 4 theme states, 2 widths: no violations), and each task's verify command: all pass, run after every task. At the wave's end, all seven measure.mjs checks pass (headings, stragglers, measure, band, row4, crops, features-top), check-text passes for all five phase 04 fixtures (index 71 lines, features 47, pricing 30, privacy-overview 30, support 81), and S22 and S23 pass.

Frame screenshots (04.2-06 step 5; the project's Playwright against dist/, Home, light and dark, 390 and 1280): the `fields` frame is 280 by 301 at 390 and 300 by 322 at 1280 and shows Cancel, "Check what we read", the document photo with Retake photo, and the Member ID, Group #, and Insurance phone fields; the `lock` frame is 280 by 293 and 300 by 315 and shows the lockup, "atHand is locked.", and Unlock. Neither shows a status bar or a Save button, in either theme. Row 4 screenshots at 320 and 1280 in both themes: the two cards sit side by side at 1280 and stack one per row at 320, with the captions below each.

## Brief citations

- HM16 revised, "What you add stays on your iPhone" (Home privacy band h2): brief, Privacy. Approved at ANSWERS (decision 9). It names what the user adds, not everything on the device, and makes no "nothing leaves" claim.
- HM28 to HM30 (Home row 4 cards: "Maple Street house", "Alarm code", the masked value with "Alarm code, hidden until you tap Reveal", "0000", and the Reveal and Hide labels): brief, Secure fields (masked by default with a Reveal and Hide control) and Accessibility (masked values announce as hidden). Approved at ANSWERS (decision 10). The labels are static, aria-hidden text; the site makes no claim of interaction.
- A3r (Home row 2 and the Features page top) and A9r (Home row 5): describe only what the crops show; support HM11 (brief, Document capture) and HM14 (brief, App lock). Approved (decision 15).

## Commits

- 88a5012 phase 04.2 task 04.2-01: balanced headings
- 232c70d phase 04.2 task 04.2-02: fewer stragglers
- 046658d phase 04.2 task 04.2-03: prose measure 56ch
- 112f40f phase 04.2 task 04.2-04: dark privacy band fill
- 3c43ad0 phase 04.2 task 04.2-05: Home privacy band h2 (HM16 revised)
- 2a6a651 phase 04.2 task 04.2-06: fields and lock crops on Home rows 2 and 5
- 3bf51d7 phase 04.2 task 04.2-07: Features page top, one frame
- 5caa297 phase 04.2 task 04.2-08: Home row 4 as a live pair

## Deviations

None in either wave.

## Backlog items added

None in either wave.

## Follow-ups

- All waves are checked. Next step: VERIFY phase 04.2.
