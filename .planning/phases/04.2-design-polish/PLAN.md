# Phase 04.2: design-polish - Plan

Status: Approved 2026-10-26

## Goal

Ship the eight Fix items in CONTEXT.md (FX1 to FX8) that close DSG-01: balanced headings, fewer one-word last lines, a 56ch prose measure, the `--accent-press` privacy band fill in dark, the revised Home privacy h2 (HM16), the `fields` and `lock` crops on Home rows 2 and 5, one frame on the Features page top, and the live Masked and Revealed pair on Home row 4. Every other triaged entry stays as triaged (decision 13). No token, typeface, or dependency changes; HOME-DESIGN.md already holds the amendments Jake authorized at ANSWERS (decisions 7 to 12) and at REVISE (decision 7, 56ch) and does not change in EXECUTE. Every phase 04 check keeps passing.

## Facts confirmed at PLAN time (2026-10-26)

- This repo: main at 63a8b7d (phase 04.2 ANSWERS PR #39 merged). CONTEXT.md status Ready; all copy Approved (HM16, HM28 to HM30, A3r, and A9r).
- App repo davisj2007/athandapp: origin/main moved to 5cfa50a (phase 07 app work). `git diff --quiet f4f2450 origin/main -- athand-project-brief.md athand-design-handoff/_ds` succeeds: the brief and the _ds tokens are unchanged since the commit CONTEXT.md read.
- `.overlap` appears only in src/pages/features.astro:21 and src/styles/site.css:821-834 (the Features page top), so 04.2-07 removes the whole block.
- `.frame.pair` is used only by Home row 4 (src/pages/index.astro:108-109), which 04.2-08 replaces.
- Token values for the dark band: `--accent-press` is #5A47D0 in both dark blocks of src/styles/tokens/colors.css (:73, :111) and #342591 in light (:25), so FX4 must apply only in dark. `--entity-home` exists (#8D663F light, #C79A6C dark).
- Crops viewed at PLAN with `sips` on the committed PNGs: `fields` (rows 172 to 1595 of 04-check-what-we-read) shows Cancel, the title, the document photo with Retake photo, and the three fields, with no status bar and no Save button; `lock` (rows 1288 to 2675 of 06-lock) shows the lockup, "atHand is locked.", and Unlock. The 05-masked screenshot shows the alarm code as eight dots with a Reveal label at the right of the value row, which 04.2-08 follows.
- Object positions: 172 / (2868 - 1424) = 11.911% and 1288 / (2868 - 1388) = 87.027%, as CONTEXT.md, FX7.
- Measurement helper: PLAN wrote .planning/phases/04.2-design-polish/measure.mjs (below). Against today's build every one of its seven checks fails, reproducing the CONTEXT.md measurements: headings (six one-word last lines at 320 and 390), stragglers (ten at 390 and 1280), measure (729px column, paragraphs averaging up to 89 characters per line), band (dark #6A57E0), row4, crops, and features-top (two frames, 200px from the breakpoint, 02-person-top requested).
- FX1 to FX4 previewed: with the four rules of 04.2-01 to 04.2-04 injected into today's build, the headings, stragglers, measure, and band checks all pass. At 58ch the `.prose` column is 622px at 1280; the highest paragraph average is 79.0 characters per line (Features), and the longest single line is 80 (Features and Support). Re-measured at REVISE (2026-10-26, main a33f5d9) with 56ch injected: the column is 601px at 1280; the highest paragraph average is 72.0 (privacy policy) and the longest single line is 77 (Support and the privacy policy). See Risks.
- Row 4 previewed: the 04.2-08 markup injected into today's Home gives this accessibility tree, which the row4 check accepts: figure "Masked" (Maple Street house, Alarm code, "Alarm code, hidden until you tap Reveal", caption) and figure "Revealed" (Maple Street house, Alarm code, "0000", caption); no Reveal or Hide label is read.
- Baseline on today's build: every existing check passes (Self-check, Baseline).
- FX1's selector list is CONTEXT.md's. It leaves out the Privacy overview's band h1 (`.band h1`) and Support's `.contact-card h2`; neither was in a finding, so they keep today's wrapping (BACKLOG.md).
- zsh expands unquoted globs, so every grep below quotes its patterns.

## Measurement helper

.planning/phases/04.2-design-polish/measure.mjs, written at PLAN, measures the acceptance criteria that need a browser. It runs dist/ in Chromium through the project's pinned Playwright (playwright 1.64.1, already a devDependency) using check-layout.mjs's server and page helpers. It is a planning artifact: it is not a site check, not added to package.json, and not changed by EXECUTE. If it is wrong, EXECUTE stops and records a blocker. Usage: `node .planning/phases/04.2-design-polish/measure.mjs <check>`. Each check exits 1 on failure:

- headings (FX1): on Home and Features at 320, 390, and 1280, no heading in `.section-title`, `.feature h3`, `.moment h3`, `.band h2`, `.prose h2`, `.prose h3`, or `.page-top h1` with three or more words wraps to a one-word last line.
- stragglers (FX2): on Home and Features at 390 and 1280, no `.lede`, `.section-line`, `.feature-copy p`, `.prose p`, `.prose li`, or `.facts li` wraps to a one-word last line (a punctuation token joins the word before it).
- measure (FX3): on Features, Pricing, Privacy overview, Support, the privacy policy, and 404 at 1280, no wrapping `.prose` paragraph or list item averages 80 or more characters per line (characters on all its lines over the line count, the CONTEXT.md metric). It also prints the column width and the longest line.
- band (FX4): `main .band` computes to rgb(76, 57, 198) (#4C39C6) in light and System with the OS light, and rgb(90, 71, 208) (#5A47D0) in dark and System with the OS dark, on Home and the Privacy overview.
- row4 (FX6): Home row 4 ("Hidden until you need it") at 390 and 1280 in light and dark has no `img`, two figures with captions, no link, button, or tabindex in the panel, and an accessibility tree that holds "Masked", "Revealed", "Alarm code, hidden until you tap Reveal", and "0000", "Maple Street house" twice, "Alarm code" three times, "Reveal" once (inside the hidden text), and no "Hide".
- crops (FX7): Home rows 2 and 5 at 390 and 1280 in light and dark carry `data-crop` fields and lock, their screens render at 1320 / 1424 and 1320 / 1388 (within 0.01), the shown image's object-position computes to "50% 11.911%" and "50% 87.027%", and the image loads.
- features-top (FX8): the Features page top at 390 and 1280 in light and dark has exactly one frame, `data-crop` fields, 280px wide at 390 and 300px at 1280, no `.overlap` element, and, after scrolling to the end, no request for any 02-person-top file.

## Expected-copy fixtures

Decision 14: the phase 04 fixtures in .planning/phases/04-visuals-and-polish/copy/ change in this plan's tasks, in the same commit as the page change, so check-text passes on main after every merge. Each task below gives the exact lines. Only index.txt and features.txt change; pricing.txt, privacy-overview.txt, and support.txt do not. Every new line is verbatim from CONTEXT.md, Copy drafts. Apart from these listed edits, EXECUTE does not edit fixtures; if one is wrong, stop and record a blocker.

## Requirement coverage

- DSG-01: 04.2-01 (FX1), 04.2-02 (FX2), 04.2-03 (FX3), 04.2-04 (FX4), 04.2-05 (FX5), 04.2-06 (FX7), 04.2-07 (FX8), 04.2-08 (FX6). The triage half of DSG-01 is complete in CONTEXT.md (Triage and Critique triage: 24 detect findings and C1 to C57); VERIFY records it as evidence. "Every phase 04 check passing" is each task's verify plus S1 to S19 below; "no token or typeface changes" is S13 and S21; "HOME-DESIGN.md changes only as promoted" is S22; "impeccable not added" is S13's dependency check.

## Files in scope

Changed by EXECUTE:

- src/styles/site.css (04.2-01, 04.2-02, 04.2-03, 04.2-04, 04.2-06, 04.2-07, 04.2-08)
- src/pages/index.astro (04.2-05, 04.2-06, 04.2-08)
- src/pages/features.astro (04.2-07)
- src/components/PhoneFrame.astro (04.2-06, 04.2-08)
- .planning/phases/04-visuals-and-polish/copy/index.txt (04.2-05, 04.2-06, 04.2-08)
- .planning/phases/04-visuals-and-polish/copy/features.txt (04.2-07)
- .planning/phases/04.2-design-polish/PLAN.md (task boxes and status), SUMMARY.md (new), and .planning/STATE.md, as every EXECUTE session

Not changed: src/styles/tokens/ and every other token file; src/assets/shots/ (the 05 PNGs stay in the repo, decision 10); src/components/PrivacyBand.astro (the facts and CTA are unchanged); src/pages/privacy-overview.astro (its h1 and lede are unchanged, FX5); every other page, component, and layout; scripts/ (no check changes); .planning/phases/04.2-design-polish/measure.mjs; .planning/phases/04-visuals-and-polish/design/HOME-DESIGN.md (amended at ANSWERS and at REVISE in 1d3efe5); package.json and package-lock.json; .github/workflows/deploy.yml; pricing.txt, privacy-overview.txt, and support.txt.

## Steps for Jake outside the repo

None. No GitHub settings change, no new dependency, and nothing to download (Playwright's Chromium is already in ~/Library/Caches/ms-playwright from phase 04).

## Wave 1

Line wrapping, the prose measure, the dark band fill, and the Home privacy h2. CSS in src/styles/site.css plus one string in index.astro.

- [x] 04.2-01: Balanced headings (FX1)
  Requirements: DSG-01
  Files: src/styles/site.css
  Copy entries: none
  Steps:
  1. At the end of src/styles/site.css, add a block with a one-line comment that headings balance their lines and paragraphs avoid a one-word last line, and that browsers without support keep the default wrapping. Add the rule `:is(.section-title, .feature h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1) { text-wrap: balance; }` on one line, exactly as written. The hero h1 keeps its own `text-wrap: balance` (site.css:456).
  2. No other property changes: no size, spacing, max-width, or token.
  Acceptance: at 320, 390, and 1280 on Home and Features, no heading of three or more words that wraps ends on a one-word line; the six measured cases (C6, C7, C43, and the three at 320) are gone; check:layout and check:a11y pass.
  Verify command: `npm run build && npm run check && grep -qF ':is(.section-title, .feature h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1) { text-wrap: balance; }' src/styles/site.css && test "$(grep -c 'text-wrap: balance' src/styles/site.css)" = 2 && node .planning/phases/04.2-design-polish/measure.mjs headings && npm run check:layout && npm run check:a11y`

- [x] 04.2-02: Fewer stragglers (FX2)
  Requirements: DSG-01
  Files: src/styles/site.css
  Copy entries: none
  Steps:
  1. In the block 04.2-01 added, below the balance rule, add `:is(.lede, .section-line, .feature-copy p, .prose p, .prose li, .facts li) { text-wrap: pretty; }` on one line, exactly as written.
  Acceptance: on Home and Features at 390 and 1280, no listed paragraph ends on a one-word line (the ten measured at PLAN, including C1 to C5, are gone); every phase 04 fixture still passes; check:layout and check:a11y pass.
  Verify command: `npm run build && npm run check && grep -qF ':is(.lede, .section-line, .feature-copy p, .prose p, .prose li, .facts li) { text-wrap: pretty; }' src/styles/site.css && test "$(grep -c 'text-wrap: pretty' src/styles/site.css)" = 1 && node .planning/phases/04.2-design-polish/measure.mjs stragglers && for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done && npm run check:content && npm run check:layout && npm run check:a11y`

- [x] 04.2-03: Prose measure 56ch (FX3)
  Requirements: DSG-01
  Files: src/styles/site.css
  Copy entries: none
  Steps:
  1. In the `.prose` rule (site.css:740-744), change `max-width: 68ch;` to `max-width: 56ch;` (decision 7). Nothing else in the rule changes.
  Acceptance: at 1280, no wrapping paragraph or list item in `.prose` on Features, Pricing, Privacy overview, Support, the privacy policy, or 404 averages 80 or more characters per line, and the longest line measure.mjs prints for each page is under 80; the policy and 404 main text are unchanged; check:layout and check:a11y pass.
  Verify command: `npm run build && npm run check && grep -qF 'max-width: 56ch;' src/styles/site.css && ! grep -qF '68ch' src/styles/site.css && node .planning/phases/04.2-design-polish/measure.mjs measure && npm run check:content && npm run check:layout && npm run check:a11y`

- [x] 04.2-04: Dark privacy band fill (FX4)
  Requirements: DSG-01
  Files: src/styles/site.css
  Copy entries: none
  Steps:
  1. Directly after the `.band { ... }` rule (site.css:618-621), add `:root[data-theme="dark"] .band { background: var(--accent-press); }` and `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .band { background: var(--accent-press); } }`, formatted like the existing dark pairs (for example site.css:537-540). Light keeps `background: var(--accent)`.
  2. Extend the Privacy band comment above `.band` to say the fill is `--accent-press` in dark (decision 8).
  3. No token file changes and no new custom property.
  Acceptance: `main .band` computes to #4C39C6 in light and System with the OS light, and #5A47D0 in dark and System with the OS dark, on Home and the Privacy overview; tokens:check passes and src/styles/tokens/ is unchanged; check:a11y passes in both themes.
  Verify command: `npm run build && npm run check && grep -qF ':root[data-theme="dark"] .band { background: var(--accent-press); }' src/styles/site.css && grep -qF ':root:not([data-theme="light"]) .band { background: var(--accent-press); }' src/styles/site.css && npm run tokens:check && git diff --quiet 63a8b7d -- src/styles/tokens && ! grep -oE '(^|[;{ ])--[a-z0-9-]+\s*:' src/styles/site.css | grep -v -- '--site-' && node .planning/phases/04.2-design-polish/measure.mjs band && npm run check:layout && npm run check:a11y`

- [x] 04.2-05: Home privacy band h2 (FX5)
  Requirements: DSG-01
  Files: src/pages/index.astro, .planning/phases/04-visuals-and-polish/copy/index.txt
  Copy entries: HM16 (revised, Approved)
  Steps:
  1. src/pages/index.astro:127: the h2 text becomes `What you add stays on your iPhone` (no period). The id, the facts, and the CTA are unchanged.
  2. index.txt: below the existing header comments, add the line `# Phase 04.2 (phase 04.2 CONTEXT.md, decisions 9 to 15): HM16 revised; HM28 to HM30 added; A3 and A9 replaced by A3r and A9r; A5 and A6 removed.` Replace the three HM16 lines (`# HM16 (no period, decision 23)`, `Your information stays on your iPhone`, `!Your information stays on your iPhone.`) with these four:
     `# HM16 (revised in phase 04.2, decision 9; no period)`
     `What you add stays on your iPhone`
     `!What you add stays on your iPhone.`
     `!Your information stays on your iPhone`
  3. The Privacy overview page is not touched; its lede still opens "Your information stays on your iPhone." (FX5).
  Acceptance: Home's band h2 reads HM16 exactly; check-text passes for Home with the updated fixture and for the other four pages unchanged; the Privacy overview still holds its lede sentence once; no "nothing leaves" wording anywhere.
  Verify command: `npm run build && npm run check && grep -qF '<h2 id="privacy-heading">What you add stays on your iPhone</h2>' src/pages/index.astro && for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done && test "$(grep -o 'Your information stays on your iPhone.' dist/privacy-overview.html | wc -l | tr -d ' ')" = 1 && ! grep -rniE 'nothing (ever )?leaves|never leaves|stays on your phone' dist --include='*.html' && npm run check:links`

Live site after this wave: every page keeps its content and URLs. Headings and paragraphs wrap better in browsers that support `text-wrap` and as before elsewhere; prose columns are narrower at wide widths; the privacy band is a darker cobalt in dark only; Home's band h2 reads "What you add stays on your iPhone". All fixtures, check:content, check:links, check:layout, and check:a11y pass at the wave's end.

## Wave 2

The two new crops, the one-frame Features page top, and the live row 4 pair. 04.2-07 uses the `fields` crop that 04.2-06 adds, so run them in order.

- [x] 04.2-06: `fields` and `lock` crops on Home rows 2 and 5 (FX7)
  Requirements: DSG-01
  Files: src/components/PhoneFrame.astro, src/styles/site.css, src/pages/index.astro, .planning/phases/04-visuals-and-polish/copy/index.txt
  Copy entries: A3r, A9r (Approved, decision 15)
  Steps:
  1. PhoneFrame.astro: the `crop` prop becomes `"full" | "suggest" | "record" | "perks" | "fields" | "lock"`.
  2. site.css, after the `record` crop lines (site.css:393-394): `.frame[data-crop="fields"] .screen { aspect-ratio: 1320 / 1424; }`, `.frame[data-crop="fields"] img { object-position: 50% 11.911%; }`, `.frame[data-crop="lock"] .screen { aspect-ratio: 1320 / 1388; }`, `.frame[data-crop="lock"] img { object-position: 50% 87.027%; }`, with a one-line comment naming the rows each keeps (fields: rows 172 to 1595 of 04-check-what-we-read, Save left out; lock: rows 1288 to 2675 of 06-lock).
  3. index.astro row 2: `crop="fields"` and alt A3r: `The “Check what we read” screen after scanning an insurance card. It shows the card photo with a Retake photo link and three fields read from it: Member ID, Group number, and Insurance phone.` Row 5: `crop="lock"` and alt A9r: `Close view of the atHand lock screen: the atHand logo, the line “atHand is locked.”, and an Unlock button.` Rows 1 and 3 and the hero are unchanged.
  4. index.txt alt lines: replace the A3 line with `alt: ` plus A3r, and the A9 line with `alt: ` plus A9r; change `# A9: Approved in REVISE, 2026-10-25 (decision 24); text unchanged.` to `# A9r: phase 04.2, decision 15.` and change the alt comment to `# Alt text. A1 hero; A2, A3r, A4, A5, A6 feature rows; A8 pricing` (A5 and A6 leave in 04.2-08).
  5. Screenshot both frames at 390 (280px) and 1280 (300px) in light and dark with the project's Playwright and record in SUMMARY.md that each shows the listed content with no status bar and no Save button.
  Acceptance: Home rows 2 and 5 render the measured crops in both themes at 390 and 1280 and the images load; the screenshots show the content CONTEXT.md, FX7 lists; check-text passes for Home with A3r and A9r; check:layout and check:a11y pass (including one displayed image per frame).
  Verify command: `npm run build && npm run check && for s in '"full" | "suggest" | "record" | "perks" | "fields" | "lock"'; do grep -qF -- "$s" src/components/PhoneFrame.astro || exit 1; done && for s in '.frame[data-crop="fields"] .screen { aspect-ratio: 1320 / 1424; }' '.frame[data-crop="fields"] img { object-position: 50% 11.911%; }' '.frame[data-crop="lock"] .screen { aspect-ratio: 1320 / 1388; }' '.frame[data-crop="lock"] img { object-position: 50% 87.027%; }'; do grep -qF -- "$s" src/styles/site.css || { echo "missing $s"; exit 1; }; done && grep -qF 'shot="04-check-what-we-read" crop="fields"' src/pages/index.astro && grep -qF 'shot="06-lock" crop="lock"' src/pages/index.astro && node .planning/phases/04.2-design-polish/measure.mjs crops && node scripts/check-text.mjs dist/index.html .planning/phases/04-visuals-and-polish/copy/index.txt && npm run check:layout && npm run check:a11y`

- [x] 04.2-07: Features page top, one frame (FX8)
  Requirements: DSG-01
  Files: src/pages/features.astro, src/styles/site.css, .planning/phases/04-visuals-and-polish/copy/features.txt
  Copy entries: A3r (Approved, decision 15)
  Steps:
  1. features.astro:21-24: the visual slot becomes `<div class="shot-panel" slot="visual">` holding one `<PhoneFrame shot="04-check-what-we-read" crop="fields" alt="…A3r…" />`. The 02-person-top frame is removed. The frame takes `--site-phone` from `.frame` (280px, 300px from the breakpoint); add no width rule.
  2. site.css: delete the Features page-top block, its comment and every `.shot-panel.overlap` rule (site.css:821-834). Nothing else uses `.overlap`.
  3. features.txt: replace the last three lines (`# Alt text: A3 and A2 (FP1)` and the two `alt:` lines) with `# Alt text: A3r (phase 04.2, FX8; 02-person-top left the page top)` and `alt: ` plus A3r.
  Acceptance: the Features page top shows one `fields` frame, 280px at 390 and 300px at 1280; Features requests no 02-person-top file in either theme; `.overlap` is gone from src; check-text passes for Features; check:layout and check:a11y pass.
  Verify command: `npm run build && npm run check && test "$(grep -c '<PhoneFrame' src/pages/features.astro)" = 1 && grep -qF 'shot="04-check-what-we-read" crop="fields"' src/pages/features.astro && ! grep -rn 'overlap\|02-person-top' src/pages/features.astro src/styles/site.css && ! grep -q '02-person-top' dist/features.html && node .planning/phases/04.2-design-polish/measure.mjs features-top && node scripts/check-text.mjs dist/features.html .planning/phases/04-visuals-and-polish/copy/features.txt && npm run check:links && npm run check:layout && npm run check:a11y`

- [ ] 04.2-08: Home row 4 as a live pair (FX6)
  Requirements: DSG-01
  Files: src/pages/index.astro, src/styles/site.css, src/components/PhoneFrame.astro, .planning/phases/04-visuals-and-polish/copy/index.txt
  Copy entries: HM28, HM29, HM30 (Approved); HM13 captions "Masked" and "Revealed" (unchanged); A5 and A6 (Removed)
  Steps:
  1. index.astro row 4 (index.astro:107-110): replace the two PhoneFrames in the shot panel with two figures, Masked first:
     `<figure class="pair"><div class="secret"><div class="record"><span class="badge badge-home" aria-hidden="true">H</span><div><p class="record-name">Maple Street house</p><p class="record-sub">Alarm code</p></div></div><div class="secret-row"><p class="record-value"><span aria-hidden="true">••••••••</span><span class="vh">Alarm code, hidden until you tap Reveal</span></p><span class="secret-action" aria-hidden="true">Reveal</span></div></div><figcaption>Masked</figcaption></figure>`
     and the same for Revealed with `<p class="record-value">0000</p>` and `<span class="secret-action" aria-hidden="true">Hide</span>`, captioned `Revealed`. Format across lines like the moments markup. Eight dots, as the 05-masked screenshot shows. No link, button, tabindex, hover style, or cursor change (decision 10).
  2. site.css: replace `.frame.pair { flex: 1 1 140px; max-width: 240px; }` with `.pair { flex: 1 1 140px; max-width: 240px; margin: 0; min-width: 0; }`. Change `.frame figcaption` to `:is(.frame, .pair) figcaption`. Add, after the Moments rules: `.badge-home { background: var(--entity-home); }` (the existing dark `.badge` rule gives `--text-on-ink`); `.secret` with `--surface-card` fill, 1px `--border-card` border, radius `--radius-card`, padding `--space-5`, and a flex column with gap `--space-4`; `.secret p { margin: 0; }`; `.secret .record { border-top: 0; padding-top: 0; }`; `.secret-row` as a wrapping flex row, `align-items: baseline`, `justify-content: space-between`, gap `--space-2` by `--space-3`, `padding-top: var(--space-4)`, and a 1px `--divider` top border; `.secret-action` at `--text-base`, weight 600, `--text-link`. The value reuses `.record-value` (`--text-lg` 500, `--tracking-label`, tabular figures). Token variables only.
  3. PhoneFrame.astro: add `"!../assets/shots/05-*.png"` to the glob, and extend its comment to say the 05 pair is not shown on any page either, so it is left out. The 05 PNGs stay in src/assets/shots/.
  4. index.txt: below the HM13 lines, add `# HM28 to HM30 (phase 04.2, row 4 live pair). Reveal and Hide are aria-hidden visual labels.` and the lines `Maple Street house`, `Alarm code`, `Alarm code, hidden until you tap Reveal`, `0000`, and `Hide`. Delete the A5 and A6 `alt:` lines and change the alt comment to `# Alt text. A1 hero; A2, A3r, A4 feature rows; A8 pricing`.
  Acceptance: no `img` in row 4; the accessibility tree reads each caption, the record name, the label, and the hidden text or "0000", and no Reveal or Hide label; nothing in the pair is focusable; dist/ holds no 05-masked or 05-revealed file; check-text passes for Home; check:layout passes at all five viewports (the pair wraps to one card per row at 320); check:a11y passes in both themes (badge, label, and value contrast; 16px minimum).
  Verify command: `npm run build && npm run check && ! grep -n '05-masked\|05-revealed' src/pages/index.astro && grep -qF '"!../assets/shots/05-*.png"' src/components/PhoneFrame.astro && test -f src/assets/shots/05-masked-light.png && test -f src/assets/shots/05-revealed-dark.png && test -z "$(find dist -name '*05-masked*' -o -name '*05-revealed*')" && ! grep -qF '.frame.pair' src/styles/site.css && grep -qF '.badge-home { background: var(--entity-home); }' src/styles/site.css && node .planning/phases/04.2-design-polish/measure.mjs row4 && node scripts/check-text.mjs dist/index.html .planning/phases/04-visuals-and-polish/copy/index.txt && test -z "$(find dist -name '*.png' ! -name favicon.png ! -name favicon-32.png ! -name apple-touch-icon.png ! -name og-image.png)" && npm run check:links && npm run check:layout && npm run check:a11y`

Live site after this wave: Home rows 2 and 5 show tight crops, row 4 shows the live Masked and Revealed cards, and the Features page top shows one larger frame. No URL moves, no new request type appears (all images are WebP from athandapp.com, and fewer of them), and every fixture, check:links, check:layout, and check:a11y pass at the wave's end.

## Static checks for VERIFY

Run from the repo root after `npm ci` and `npm run build`. S1 to S19 are phase 04's static checks (.planning/phases/04-visuals-and-polish/PLAN.md, Static checks for VERIFY), re-run as written; S10 uses the phase 04 fixtures as amended by this plan. S16, S17, and S19 re-run phase 04 task verify commands, which still apply because this phase does not touch metadata, the sitemap, or the check scripts.

- S1 to S19: as phase 04.
- S20. Every phase 04.2 measurement passes: `for c in headings stragglers measure band row4 crops features-top; do node .planning/phases/04.2-design-polish/measure.mjs $c || exit 1; done`
- S21. Tokens and typefaces unchanged since ANSWERS (the self-hosted faces load from Base.astro through @fontsource): `npm run tokens:check && git diff --quiet 63a8b7d -- src/styles/tokens src/layouts/Base.astro package.json package-lock.json`
- S22. HOME-DESIGN.md and the reference builds unchanged since the REVISE amendment (1d3efe5, the 56ch measure, decision 7): `git diff --quiet 1d3efe5 -- .planning/phases/04-visuals-and-polish/design`
- S23. Only the planned files changed in src/: `test -z "$(git diff --name-only 63a8b7d -- src | grep -vxE 'src/styles/site.css|src/pages/index.astro|src/pages/features.astro|src/components/PhoneFrame.astro')"`
- S24. The old HM16 h2 and the removed alts are gone, and the shots stay in the repo: `! grep -qF 'Your information stays on your iPhone</h2>' dist/index.html && ! grep -rqF 'and a Save to Person, Medical button' dist && ! grep -rqF 'The atHand logo sits in the center' dist && ! grep -rqF 'each with a Reveal button' dist && test -f src/assets/shots/05-masked-dark.png && test -f src/assets/shots/05-revealed-light.png`
- S25. impeccable is not in the repo: `! grep -rqi impeccable package.json package-lock.json && test ! -e .impeccable`

VERIFY also compares Home and the Features page top with HOME-DESIGN.md (as amended at ANSWERS and REVISE) at 390 and 1280 px in both themes, records the axe and layout results per page and theme, and writes Jake's browser checklist (README, VERIFY step 5), including Safari before and after `text-wrap` support (the fallback is today's wrapping) and VoiceOver on the row 4 pair.

## Risks and rollback

- FX3 margin. REVISE moved the measure from 58ch to 56ch (decision 7). At 58ch the Features peak paragraph average was 79.0 characters per line and the longest single line 80, passing the CONTEXT.md acceptance by one character in Chromium at 1280. At 56ch the peak average is 72.0 and the longest line 77, so every line runs under 80 with three characters of margin for Safari's slightly different text metrics. measure.mjs fails only on averages; it prints the longest line, which EXECUTE reads against the acceptance. HOME-DESIGN.md, Other pages was amended to "max 56ch" at REVISE (Jake authorized, commit 1d3efe5), so the contract matches the build; S22 now diffs from 1d3efe5. That commit reaches main through a merge commit, as every PR here has; a squash merge would drop the hash and S22 would need a new base. Changing the value again is a REVISE, not an EXECUTE choice.
- `text-wrap` support. `balance` needs Safari 17.5 or later and `pretty` a recent Safari; older browsers keep today's wrapping, which passed phase 04. Acceptance is measured in Chromium.
- Fixture edits in EXECUTE. Decision 14 moves the index.txt and features.txt changes into the tasks, unlike phase 04, so each page change and its fixture land in one commit and main stays green. The lines are given verbatim above.
- Measurement helper. measure.mjs was run at PLAN against today's build (every check fails, as expected) and with FX1 to FX4 injected (those four pass), and the row4 check was run against the planned markup. The crops and features-top checks have only been run against today's build. If a check proves wrong, EXECUTE stops and records a blocker rather than editing it.
- Unused 05 shots. If Astro still emits the 05 PNGs after the glob exclusion, 04.2-08's verify fails on the `find dist` step; the fix is inside PhoneFrame.astro, as phase 04 did for 03-person-documents.
- Features page top at 320. The frame's `max-width: 100%` shrinks it below 280px at 320 (the panel has about 240px), as every frame does today; check:layout covers 320.
- Rollback: revert the wave's PR on main; the Deploy workflow republishes the previous build. Wave 1 reverts to today's wrapping, the 68ch column, the `--accent` dark band, and the old HM16 with its fixture lines. Wave 2 reverts Home rows 2, 4, and 5, the Features page top, and their fixture lines together.

## Self-check

Re-run 2026-10-26 at REVISE (FX3 measure 58ch to 56ch in 04.2-03's step, verify grep, and acceptance, the Goal, Facts, and Risks; HOME-DESIGN.md, Other pages amended to 56ch with Jake's authorization, S22 rebased to 1d3efe5): pass, unchanged below. `git diff --quiet 1d3efe5 -- .planning/phases/04-visuals-and-polish/design` passes on this branch. The change touches only src/styles/site.css, already in 04.2-03's files; no requirement, wave, or file list changes. Baseline re-run for this REVISE: `npm run build` on main a33f5d9, then `measure.mjs measure --inject` with `main .prose { max-width: 56ch; }` passes on all six pages (column 601px, longest line 77).

Run 2026-10-26 at PLAN.

- All phase requirements covered: yes. DSG-01 maps to all eight tasks (FX1 to FX8, one task each) and to S20 to S25; its triage half is already in CONTEXT.md.
- Every task has acceptance and verify: yes, all eight. Every browser criterion in CONTEXT.md's Fix items maps to a measure.mjs check or a recorded screenshot (04.2-06 step 5).
- No conflict with the brief or CLAUDE.md: yes. HM16 is the Approved revision, cited to brief, Privacy, and never says "nothing leaves" (S4); row 4 strings are Approved HM28 to HM30 (brief, Secure fields and Accessibility); A3r and A9r are Approved and say atHand, not @Hand (S3); no token, typeface, or dependency change (S13, S21); no third-party request (check:external, check:a11y's request guard); 16px minimum, 44px targets (the row 4 cards have none), contrast in both themes, and 400% zoom (check:a11y, check:layout); /privacy.html and /support.html untouched (S7).
- Files in scope complete: yes. Six site and fixture files plus the planning files; everything else is named as not changed, including the token files, HOME-DESIGN.md, PrivacyBand.astro, privacy-overview.astro, measure.mjs, and the 05 PNGs.
- Every wave leaves the live site whole: yes. Each task changes a page and its fixture together; wave 1 is CSS plus one string; wave 2 replaces images with crops, one frame, and live HTML, and removes no URL. Each wave ends with check-text, check:links, check:layout, and check:a11y.
- Waves are at most six tasks: yes (5 and 3).
- Baseline: today's build (63a8b7d, after `npm ci` and `npm run build`) passes npm run check, tokens:check (4 files match dba97b2), check:external, check:content, check:links (61 links), check-text on all five phase 04 fixtures, check:layout (7 pages, 2 themes, 5 viewports), and check:a11y (7 pages, 4 theme states, 2 widths).

## Fix wave
