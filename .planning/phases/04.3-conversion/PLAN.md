# Phase 04.3: conversion - Plan

Status: Approved 2026-10-26

## Goal

Build the amended Home and Features pages and the new Open Graph image from HOME-DESIGN-AMENDMENTS.md with the Approved copy in CONTEXT.md only: the hero with the new h1 and line, four trust chips, and a 56px store slot around C1 (CNV-01); five live feature rows with the only Home screenshots being 01-home, the 04 `fields` crop from the breakpoint, and the perks crop (CNV-02); the "Why not just use photos or notes?" comparison as a list (CNV-03); the visual Features page with seven sections, a seven-link jump list in the page top, and two fixed-theme frames (CNV-04); and the regenerated Open Graph image and og:image:alt (CNV-05). No price, token, site variable, or dependency is added (CNV-06), and every phase 04 and 04.2 check keeps passing, amended only where this phase's approved design replaces what a check asserts (CNV-07, see Superseded checks).

## Facts confirmed at PLAN time (2026-10-26)

- This repo: main at 8e854d9 (phase 04.3 ANSWERS PR #47 merged). CONTEXT.md status Ready; every Copy draft Approved; decisions 1 to 15.
- App repo davisj2007/athandapp: origin/main 487b454. `git diff --quiet f4f2450 origin/main -- athand-project-brief.md athand-design-handoff/_ds` succeeds: the brief and the _ds tokens are unchanged since the commit CONTEXT.md read. ICON_REF 60032bf exists locally (`git -C ../athandapp cat-file -e 60032bf`), so `npm run og:image` can run.
- Baseline on main 8e854d9, after `npm ci` and `npm run build`: npm run check, tokens:check, check:external, check:content, check:links (61 links), check-text on all five phase 04 fixtures (index 71 lines, features 47), check:layout (7 pages, 2 themes, 5 viewports), check:a11y (7 pages, 4 theme states, 2 widths), and all seven phase 04.2 measure.mjs checks pass.
- Every token the reference CSS uses exists in src/styles/tokens/ (`--space-1` to `--space-12`, `--radius-card-sm`, `--radius-chip`, `--leading-tight`, `--tracking-label`, `--text-on-cobalt`, all seven `--entity-*`, `--badge-size`, `--touch-min`). The reference's only custom property, `--cmp-cols`, is not a token and is inlined (S13).
- `.shot-panel` is still used by Home's Pricing (src/pages/index.astro:168) and src/pages/pricing.astro:11, so it stays. `.feature`, `.features`, and `.feature-copy` are used only by Home's feature rows (index.astro:74-151), which 04.3-03 replaces.
- The old headline HM2 is in src/pages/index.astro:33, src/layouts/Base.astro:49, and scripts/make-og-image.mjs:71, and nowhere else in src or scripts. After 04.3-05 it remains only in index.txt's `!` line.
- PhoneFrame's glob already leaves out 03-person-documents and the 05 pair (src/components/PhoneFrame.astro:25-29). Its comment and phase 04.2's risk note record that a matched shot no page converts ships as a full PNG. 02-person-top leaves Home in 04.3-03, so the same task moves it to the Features page top; otherwise wave 1 would ship 02-person-top as PNGs and fail S14.
- The reference builds' copy predates ANSWERS: chip 3 reads "Locked with Face ID", W-2 opens "Most people", row 2 Photos reads "Mixed in with your other photos…", row 3 uses "Phone lock", row 5 is "Works without searching", and the seventh jump link reads "Hidden fields". Copy comes only from CONTEXT.md, Copy drafts; the fixtures below carry `!` lines for each of these.
- The reference's Vehicles tile uses the `car` outline without its two wheel dots; the amendments' list of 18 new icons has no car, so Vehicles uses the existing `car` icon (src/components/Icon.astro:16).
- Phase 04's S2 greps src/pages and src/components for a straight apostrophe between letters, comments included, so comments in the new components avoid contractions or use ’.
- zsh expands unquoted globs and `=`-words, so every grep below quotes its patterns.

## Measurement helper

.planning/phases/04.3-conversion/measure.mjs, written at PLAN, measures the acceptance criteria that need a browser. It runs dist/ in Chromium through the pinned Playwright (1.64.1) with check-layout.mjs's server and page helpers, like phase 04.2's helper. It is a planning artifact: not a site check, not added to package.json, and not changed by EXECUTE. If it is wrong, EXECUTE stops and records a blocker. Usage: `node .planning/phases/04.3-conversion/measure.mjs <check>`; each check exits 1 on failure.

- hero (CNV-01): Home at 320, 390, 840, and 1280 in light and dark. `.hero-copy` children are h1, `p.lede`, `ul.chips`, `div.store-slot` in that order; the h1 is H-1; the list is named "At a glance" and holds four `li.chip` reading H-4 to H-7 in order, each with no link, button, or tabindex, no pointer cursor, an aria-hidden icon, and its right edge inside the 16px gutter. Chips 1 to 3 set on one line at every width and chip 4 on one line except two at 320 (CONTEXT.md, Measured). The slot's min-height computes to 56px, its height is at least 56px, and it holds only `p.coming-soon` with C1. Prints the chip row count.
- slot (CNV-01, CNV-07): Home at 320, 390, and 1280. Records the top and height of the slot, the h1, the chips, the hero shot, and the section after the hero; replaces the slot's content with a 144 by 48px box (the badge at `--space-12`); every value must be unchanged.
- rows (CNV-02): Home at 390 and 1280 in light and dark. `ul.f-list` holds five rows with the HM10 to HM14 h3s and the classes f-span, f-split, f-center, f-split flip, f-lock; only row 2 has images (the light and dark 04 pair); no control anywhere in the rows. Record types list (R1-2, R1-3, each tile with an aria-hidden icon badge); the Check what we read card (R2-1 to R2-4); the 04 frame `data-crop="fields"` in row 2, 200px wide from the breakpoint and not rendered below it; the banner reads R3-1 plus R3-2 with "recommended" in `strong`, and computes to `--text-on-cobalt` on `--accent`; the signal chips (R3-3, R3-4); the Masked and Revealed pair on a `.stage`; the aria-hidden lock circle and the unlock chips (R5-1, R5-2); every icon aria-hidden. After scrolling to the end, no shot other than 01-home, 04-check-what-we-read, and 07-paywall-perks is requested.
- compare (CNV-03): Home at 320, 390, 1280, and 1280 at 400% zoom (320 by 200 at device scale 4), in light and dark. The section `aria-labelledby="compare-title"` sits between the Features section and the privacy band, with W-1 and W-2; `.cmp-head` is aria-hidden, hidden below the breakpoint and a grid from it, naming W-3; `ul.cmp-rows` holds five rows, each one h3 (W-4, W-6, W-8, W-10, W-12) and a `dl` of three cells whose `dt` is the column name (shown below the breakpoint, visually hidden from it), whose verdict and note match CONTEXT.md exactly, and whose third cell is `.us`. Every icon is aria-hidden. No sideways scroll, no box inside `.section-head` or `.cmp` outside the 16px gutters, and no text below 16px. Playwright's ARIA snapshot of the rows reads a list with five level-3 headings, each column name as a term five times, and fifteen definitions. Prints the comparison height.
- features (CNV-04): Features at 390 and 1280 in light and dark. The page top shows one `full` 02-person-top frame on a `.stage` with alt A2; the jump list "On this page" is in the page-top copy (not the prose) with seven links, FP3 plus F-J1, each to its h2; seven `section.fsec` sections in order, each `aria-labelledby` its h2's id, with FE5, FE10, FE15, F-H1, FE20, FE25, and FE29, one intro (F-I1 to F-I7), and one stage; FE24 is in the Hidden section's prose and in no other; each stage holds its planned visual (record types, the scan card, banner and signals, the Masked and Revealed pair, the lock circle and unlock chips, the backup card with F-B1 and F-B2, and the Light and Dark frames); the two frames are `suggest` crops, each `.screen` holds one image, the first shows 01-home-light and the second 01-home-dark whatever the site theme, with F-A1 and F-A2 and the F-C1 captions. After scrolling, only 02-person-top and 01-home shots are requested.
- wrap (CNV-07): Home and Features at 320, 390, and 1280. No heading in `.hero h1`, `.section-title`, `.f-copy h3`, `.moment h3`, `.band h2`, `.fsec h2`, `.cmp-q`, `.prose h2`, `.prose h3`, or `.page-top h1` with three or more words wraps to a one-word last line; at 390 and 1280, no `.lede`, `.section-line`, `.f-copy p`, `.fsec-intro`, `.prose p`, `.prose li`, or `.facts li` does. This carries phase 04.2's headings and stragglers checks (FX1, FX2) onto the renamed and new elements.

Run at PLAN: against today's build, hero, slot, rows, compare, and features fail (no chips, slot, rows list, comparison, or sections) and wrap passes. With `--ref` (the reference builds, served from the repo root, system fonts), slot passes; hero, rows, compare, and features fail only on the pre-ANSWERS copy listed in Facts, the reference's one-image frames on Home, and font-dependent wrapping of chips with system fonts (chip 3 on two lines at 840, chip 4 on three at 320; CONTEXT.md measured one and two lines with the production fonts). The compare check's ARIA snapshot structure passes on the reference.

## Superseded checks (CNV-07)

CNV-07 asks every phase 04 and 04.2 check to keep passing. Four of them assert exactly what the Approved amendments change, so this plan replaces each with its phase 04.3 equivalent instead of keeping the old assertion. Jake approves these with the plan.

- Phase 04.2 measure.mjs row4 (the pair inside a `.feature` row's `.shot-panel`), crops (Home rows 2 and 5 with the `fields` and `lock` crops at 300px), and features-top (one 04 `fields` frame on the Features page top, no 02-person-top request): replaced by this phase's rows and features checks. The pair, the row 2 `fields` crop values, and the crop CSS stay as they are. headings, stragglers, measure, and band keep running as written (S20); headings and stragglers lose the selectors this phase renames, which the wrap check covers.
- Phase 04 S6 (subscription and sync sentences): the Approved chip H-7 "One-time purchase, no subscription" and fact F-B2 "A one-time copy, not sync" have no period, so S6's sentence match would join them to the next sentence. S6′ removes exactly those two strings from the main text first and is otherwise unchanged.
- Phase 04 S16 (04-21's verify): it hard-codes og:image:alt M2. S16′ runs 04-21's verify with M2 replaced by OG-3.

## Expected-copy fixtures

As phase 04.2 decision 14 and phase 04.3 decision 9: the phase 04 fixtures .planning/phases/04-visuals-and-polish/copy/index.txt and features.txt change in the task that changes each page, in the same commit, so check-text passes on main after every merge. Each task below gives the exact lines; every new line is verbatim from CONTEXT.md, Copy drafts (or an approved site string it names). pricing.txt, privacy-overview.txt, and support.txt do not change. Apart from these listed edits, EXECUTE does not edit fixtures; if one is wrong, stop and record a blocker. Verdict words (Yes, No, Partly, Varies) and the one-word captions are too short for a substring check to prove anything; measure.mjs compare and features check them in place.

## CSS port rules

Tasks that port CSS from the reference builds follow these rules, so the result passes phase 04's S11 to S13:

- `@container site (min-width: 840px)` becomes `@media (min-width: 52.5em)`; rules from the breakpoint go in one such block per section, after its base rules, as site.css does today.
- `font-size: 16px` becomes `font-size: 1rem`, as `.record-sub` does. Every other value is a token variable or a unitless or literal value the reference uses (for example `2px` gaps, `1.35` line heights, `17rem`, `28rem`); no hex, rgb, or font names.
- No custom property: the reference's `.cmp { --cmp-cols: … }` is inlined as `minmax(0, 1.15fr) minmax(0, 3fr)` in both rules that use it.
- Lists in the new parts (`.chips`, `.entities`, `.f-list`, `.cmp-rows`, `.fact-list`) get `list-style: none; margin: 0; padding: 0;` and their `li` `margin: 0`, since site.css:291-293 gives lists padding and items a margin. `.field-list` and `.cmp-cells` get `margin: 0` with `dd { margin: 0; }`. Paragraphs inside the new parts get `margin: 0` (site.css:291).
- Rules the reference restates from production (`.badge`, `.badge-home`, `.pair`, `.secret*`, `.glyph`, the hero grid, Moments, the band, Pricing, Closing, `.page-top*`, `.jump`) are not copied; production's versions stand.
- One declaration per line, a short comment above each block naming its HOME-DESIGN-AMENDMENTS.md section, as site.css is written today.

## Requirement coverage

- CNV-01: 04.3-02 (hero, chips, store slot); measure hero and slot (S26).
- CNV-02: 04.3-01 (icons), 04.3-03 (rows, the shared row components, the 06-lock exclusion, and the Features page-top shot that leaves Home); measure rows.
- CNV-03: 04.3-04; measure compare (320, 400% zoom, structure without color, the ARIA reading order).
- CNV-04: 04.3-03 (02-person-top on the Features page top), 04.3-06 (PhoneFrame `theme`), 04.3-07 (the Features page); measure features.
- CNV-05: 04.3-05; S16′, S29, S30, S31.
- CNV-06: every copy task names its Copy drafts entries and places them verbatim; each EXECUTE PR lists every placed claim with its citation (PR description for copy, below); no price (S5), no token or site variable (S11, S13, S27), no dependency (S13, S27).
- CNV-07: each task's verify; S1 to S19 with S6′ and S16′; S20; S26; wrap; the slot and compare measurements; unused shots stay in src/assets/shots/ and out of dist/ (S14′).

## Files in scope

Changed by EXECUTE:

- src/components/Icon.astro (04.3-01)
- src/components/Chips.astro, new (04.3-02)
- src/components/RecordTypes.astro, new (04.3-03)
- src/components/ScanCard.astro, new (04.3-03)
- src/components/SuggestionBanner.astro, new (04.3-03)
- src/components/SecretPair.astro, new (04.3-03)
- src/components/PhoneFrame.astro (04.3-03, 04.3-06)
- src/styles/site.css (04.3-02, 04.3-03, 04.3-04, 04.3-07)
- src/pages/index.astro (04.3-02, 04.3-03, 04.3-04)
- src/pages/features.astro (04.3-03, 04.3-07)
- src/layouts/Base.astro (04.3-05, the og:image:alt line only)
- scripts/make-og-image.mjs (04.3-05, the h1 rule and text only)
- public/og-image.png (04.3-05, regenerated)
- .planning/phases/04-visuals-and-polish/copy/index.txt (04.3-02, 04.3-03, 04.3-04)
- .planning/phases/04-visuals-and-polish/copy/features.txt (04.3-03, 04.3-07)
- .planning/phases/04.3-conversion/PLAN.md (task boxes and status), SUMMARY.md (new), and .planning/STATE.md, as every EXECUTE session

Not changed: src/styles/tokens/ and every token file; src/assets/shots/ (every PNG stays, decision 14); src/components/ComingSoon.astro, JumpList.astro, PageTop.astro, PrivacyBand.astro, Header.astro, Footer.astro, ThemeControl.astro; every other page; the title, meta descriptions, og:title, og:description, and the JSON-LD in index.astro; scripts/ other than make-og-image.mjs; package.json and package-lock.json; .github/workflows/deploy.yml; .planning/phases/04.3-conversion/measure.mjs and design/; .planning/phases/04-visuals-and-polish/design/ (HOME-DESIGN.md is not edited, CONTEXT.md Out of scope); .planning/phases/04.2-design-polish/measure.mjs; pricing.txt, privacy-overview.txt, and support.txt.

## Steps for Jake outside the repo

None. No GitHub settings change and no new dependency. Playwright's Chromium is already in ~/Library/Caches/ms-playwright, and 04.3-05 reads the app repo at ../athandapp (read only), as phase 04's 04-20 did.

## PR description for copy

Each EXECUTE PR that places copy lists, under "Claims and citations", every Copy draft ID it places with its exact string and the citation CONTEXT.md gives for it (for example "H-5 'Stored on your iPhone': brief, Privacy; brief, Onboarding"), plus any unchanged approved string it moves (A2, FE24, HM28 to HM30). Wave 1 lists H-1 to H-7, R1-1 to R5-2, W-1 to W-13a, OG-1, and OG-3; wave 2 lists F-J1, F-H1, F-I1 to F-I7, F-B1, F-B2, F-C1, F-A1, and F-A2, and the R and HM strings reused on Features.

## Wave 1

Home, and the Open Graph image that matches its hero. 04.3-02 to 04.3-04 use the icons from 04.3-01, and 04.3-04 follows 04.3-03 in index.astro and the fixture, so run them in order.

- [x] 04.3-01: Eighteen new icons
  Requirements: CNV-02, CNV-04
  Files: src/components/Icon.astro
  Copy entries: none
  Steps:
  1. Add these entries to the `icons` map after "eye-slash", one per line in the existing style (quoted keys where the name has a hyphen), with the bodies exactly as written (taken from the reference builds, closing tags made self-closing):
     - person: `<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>`
     - paw: `<circle cx="6.5" cy="10.5" r="1.8"/><circle cx="10" cy="6.5" r="1.8"/><circle cx="14" cy="6.5" r="1.8"/><circle cx="17.5" cy="10.5" r="1.8"/><path d="M12 12c-3 0-5.5 3.2-5.5 5.5 0 1.6 1.3 2.5 2.8 2.5 1 0 1.7-.5 2.7-.5s1.7.5 2.7.5c1.5 0 2.8-.9 2.8-2.5C17.5 15.2 15 12 12 12z"/>`
     - house: `<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>`
     - bank: `<path d="M3 9l9-5 9 5"/><path d="M5.5 9.5v7M10 9.5v7M14 9.5v7M18.5 9.5v7M3.5 20h17"/>`
     - contact-card: `<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16.5c.7-1.6 1.9-2.3 3.2-2.3s2.5.7 3.2 2.3M14.5 10h4M14.5 13.5h3"/>`
     - tag: `<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.1 6.1a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8" cy="8" r="1.5"/>`
     - check: `<path d="M5 12.5l4.5 4.5L19 7.5"/>`
     - check-circle: `<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>`
     - minus-circle: `<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>`
     - lock: `<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><path d="M12 14.5v2"/>`
     - face-id: `<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M9 9.5v1M15 9.5v1M12 9.5V13h-1M9.5 16c1.5 1.2 3.5 1.2 5 0"/>`
     - fingerprint: `<path d="M8.5 19.5c1.2-2.2 1.5-4.5 1.5-7a2 2 0 0 1 4 0c0 1.5-.1 3-.4 4.4M12 12.5c0 3.3-.7 6-2 8M16.3 18.5c.4-1.3.7-2.8.7-4.5v-1.5a5 5 0 0 0-9.5-2.2M5.5 16c.6-1.2 1-2.3 1-3.5 0-1 .2-2 .6-2.8M19 11.5c.1.6.1 1.2.1 1.8"/>`
     - keypad: `<circle cx="6.5" cy="6" r="1.3"/><circle cx="12" cy="6" r="1.3"/><circle cx="17.5" cy="6" r="1.3"/><circle cx="6.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="17.5" cy="12" r="1.3"/><circle cx="12" cy="18" r="1.3"/>`
     - clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`
     - calendar: `<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>`
     - pin: `<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>`
     - chevron: `<path d="M9 6l6 6-6 6"/>`
     - archive: `<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9M10 13h4"/>`
  2. Extend the header comment to say the phase 04.3 icons come from the reference builds in .planning/phases/04.3-conversion/design/. No other change; existing entries stay byte for byte.
  Acceptance: the map holds the 11 existing and 18 new names (29), no existing entry is removed or changed, and each new body matches the list above; nothing renders differently (no page uses them yet).
  Verify command: `npm run build && npm run check && for n in person paw house bank contact-card tag check check-circle minus-circle lock face-id fingerprint keypad clock calendar pin chevron archive; do grep -qE "^  \"?$n\"?: '" src/components/Icon.astro || { echo "missing $n"; exit 1; }; done && test "$(grep -cE "^  \"?[a-z-]+\"?: '" src/components/Icon.astro)" = 29 && grep -qF 'M12 7v5l3 2' src/components/Icon.astro && grep -qF 'M9 6l6 6-6 6' src/components/Icon.astro && test -z "$(git diff -U0 8e854d9 -- src/components/Icon.astro | grep -E "^-  \"?[a-z-]+\"?: '")" && npm run check:layout && npm run check:a11y`

- [x] 04.3-02: Hero with trust chips and the store slot
  Requirements: CNV-01, CNV-06, CNV-07
  Files: src/components/Chips.astro (new), src/styles/site.css, src/pages/index.astro, .planning/phases/04-visuals-and-polish/copy/index.txt
  Copy entries: H-1, H-2, H-3, H-4, H-5, H-6, H-7 (Approved); C1 (unchanged)
  Steps:
  1. src/components/Chips.astro: a header comment (non-interactive labels, each `li` with an aria-hidden icon; the list name is read, not shown). Props `label: string`, `items: { icon: string; text: string }[]`, `class?: string`. Renders `<ul class:list={["chips", className]} aria-label={label}>` with one `<li class="chip"><Icon name={i.icon} size={20} />{i.text}</li>` per item. No link, button, or tabindex.
  2. src/pages/index.astro hero (:32-36): h1 text H-1 `Your household’s IDs and insurance, ready on your iPhone`; lede H-2 `Keep IDs, insurance, vehicle, pet, and home details for everyone you look after in one app, organized by record instead of scattered through photos and notes.`; then `<Chips label="At a glance" class="trust" items={[…]} />` with person-slash "No account", phone "Stored on your iPhone", face-id "Face ID or passcode lock", check-circle "One-time purchase, no subscription" (decision 3); then `<div class="store-slot"><ComingSoon /></div>` (decision 7). Import Chips. The hero shot, its alt A1, the title, description, and JSON-LD are unchanged.
  3. src/styles/site.css: in `.hero h1` change `max-width: 12ch;` to `max-width: 16ch;`. After the hero block, add a "Chip" block from home-reference-light.html:150-154 (`.chips`, `.chip`, `.chip svg`, with the list resets and `cursor` left unset) and a "Store slot" rule: `.store-slot` with `display: flex`, `align-items: center`, `min-height: calc(var(--space-12) + var(--space-2))`, and `.store-slot > * { margin: 0; }`, with a comment that phase 05 swaps the line for the badge at `--space-12` inside the slot. The chip fill on a stage or the lock card (`--surface-chip`) is added in 04.3-03.
  4. index.txt: below the "# Phase 04.2" header line add `# Phase 04.3 (phase 04.3 CONTEXT.md, Copy drafts, Approved 2026-10-26): H-1 and H-2 replace HM2 and HM3; chips H-4 to H-7; rows R1-1 to R5-2; comparison W-1 to W-13a; A2, A4, and A9r leave Home.` Replace the four lines `# HM2`, `Your info, ready when you need it`, `# HM3`, and the HM3 sentence with:
     `# H-1 (replaces HM2; no period)`
     `Your household’s IDs and insurance, ready on your iPhone`
     `!Your household’s IDs and insurance, ready on your iPhone.`
     `!Your info, ready when you need it`
     `# H-2 (replaces HM3)`
     `Keep IDs, insurance, vehicle, pet, and home details for everyone you look after in one app, organized by record instead of scattered through photos and notes.`
     `!The details you look up all the time, for you and everyone you look after, in one place on your iPhone.`
     `# H-4 to H-7, the trust chips (H-3, "At a glance", names the list and is not main text)`
     `No account`
     `Stored on your iPhone`
     `Face ID or passcode lock`
     `One-time purchase, no subscription`
     `!Locked with Face ID`
  Acceptance: the hero reads H-1, H-2, four chips, then C1 in a 56px slot; chips 1 to 3 on one line at 320, 390, 840, and 1280 and chip 4 on at most two lines at 320; a 48px badge stand-in moves nothing; check-text passes for Home; check:layout and check:a11y pass (chip contrast, 16px text).
  Verify command: `npm run build && npm run check && grep -qF '<h1 id="hero-title">Your household’s IDs and insurance, ready on your iPhone</h1>' src/pages/index.astro && grep -qF 'max-width: 16ch;' src/styles/site.css && ! grep -qF 'max-width: 12ch;' src/styles/site.css && grep -qF 'min-height: calc(var(--space-12) + var(--space-2));' src/styles/site.css && grep -qF '<div class="store-slot"><ComingSoon /></div>' src/pages/index.astro && node .planning/phases/04.3-conversion/measure.mjs hero && node .planning/phases/04.3-conversion/measure.mjs slot && for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done && test "$(grep -o 'Coming soon to the App Store for iPhone.' dist/index.html | wc -l | tr -d ' ')" = 2 && npm run check:links && npm run check:layout && npm run check:a11y`

- [ ] 04.3-03: Live feature rows, and 02-person-top on the Features page top
  Requirements: CNV-02, CNV-04, CNV-06, CNV-07
  Files: src/components/RecordTypes.astro (new), src/components/ScanCard.astro (new), src/components/SuggestionBanner.astro (new), src/components/SecretPair.astro (new), src/components/PhoneFrame.astro, src/styles/site.css, src/pages/index.astro, src/pages/features.astro, .planning/phases/04-visuals-and-polish/copy/index.txt, .planning/phases/04-visuals-and-polish/copy/features.txt
  Copy entries: R1-1, R1-2, R1-3, R2-1, R2-2, R2-3, R2-4, R3-1, R3-2, R3-3, R3-4, R5-1, R5-2 (Approved); HM10 to HM14, HM15, HM28 to HM30, A3r (unchanged); A2 (moved to Features); A4, A9r, and the old row 1 line (Removed)
  Steps:
  1. Shared components, each with a one-line header comment and no props unless named (Home and Features render the same markup, so the copy lives in one place):
     - RecordTypes.astro: `<ul class="entities" aria-label="Record types">` with seven `<li><span class="badge …" aria-hidden="true"><Icon name=… size={22} /></span>Label</li>` from a frontmatter array: People person (plain `badge`, `--entity-person`), Vehicles car `badge-vehicle`, Pets paw `badge-pet`, Homes house `badge-home`, Financial accounts bank `badge-financial`, Contacts contact-card `badge-contact`, Custom records tag `badge-custom` (R1-3).
     - ScanCard.astro: `<div class="mock">` holding `<div><p class="mock-title">Check what we read</p><p class="mock-sub">Change anything that’s wrong before you save.</p></div>`, `<p class="mock-label">What we read</p>`, and `<dl class="field-list"><div><dt>Member ID</dt><dd>XYZ000000000</dd></div><div><dt>Group number</dt><dd>00000</dd></div></dl>` (R2-1 to R2-4).
     - SuggestionBanner.astro: `<div class="banner"><p><span class="vh">Example suggestion banner: </span>Flight to Denver, your <strong>recommended</strong> info is ready</p><Icon name="chevron" /></div>` on one line, so the text reads exactly R3-1 plus R3-2, then `<Chips label="What suggestions use" class="signals" items={[clock "Time of day", calendar "Your calendar, if you allow it", pin "Your location, if you allow it"]} />` (R3-3, R3-4).
     - SecretPair.astro: the two `figure.pair` elements moved verbatim from index.astro:108-139 (HM28 to HM30, captions Masked and Revealed), with the phase 04.2 comment that Reveal and Hide are static labels.
  2. src/pages/index.astro, the Features section (:71-154): keep the section, its h2 "What it does" with `section-title features-title`, and the "See all features" CTA. Replace `ul.features` with `<ul class="f-list">` of five rows, in order:
     - `<li class="f-span">`: `<div class="f-copy"><h3>Everything you look after</h3><p>` R1-1 `A record for each person, vehicle, pet, home, financial account, and contact, plus custom records with your own labels.` `</p></div>` then `<RecordTypes />`.
     - `<li class="f-split">`: `.f-copy` with HM11 (h3 and line unchanged), then `<div class="stage"><ScanCard /><PhoneFrame shot="04-check-what-we-read" crop="fields" class="frame-sm" alt="…A3r unchanged…" /></div>`.
     - `<li class="f-center">`: `.f-copy` with HM12, then `<div class="stage"><SuggestionBanner /></div>`.
     - `<li class="f-split flip">`: `.f-copy` with HM13, then `<div class="stage"><SecretPair /></div>`.
     - `<li class="f-lock">`: `<span class="lock-glyph" aria-hidden="true"><Icon name="lock" size={40} /></span>`, `.f-copy` with HM14, then `<Chips label="Ways to unlock" items={[face-id "Face ID", fingerprint "Touch ID", keypad "Your passcode"]} />` (R5-1, R5-2).
     The 02-person-top, 01-home `suggest`, and 06-lock frames leave Home (A2, A4, A9r). No link, button, or tabindex inside the rows. Import the new components and Chips.
  3. src/pages/features.astro page top (:21-23): the visual becomes `<div class="stage" slot="visual"><PhoneFrame shot="02-person-top" crop="full" alt="…A2 unchanged…" /></div>` (amendments, Features page; it supersedes phase 04.2 decision 12 here). Nothing else on Features changes in this task.
  4. src/components/PhoneFrame.astro: add `"!../assets/shots/06-lock-*.png"` to the glob and extend its comment to say 06-lock is not shown on any page either (decision 14). The PNGs stay in src/assets/shots/.
  5. src/styles/site.css:
     - Delete the Features block's `.features`, `.feature`, `.feature-copy`, `.feature-copy > *`, and `.feature h3` rules and the `.feature` rules in its media block (site.css:590-648, keeping `.features-title`, `.shot-panel`, `.pair`, and `.more`); change the shared selector `.feature-copy p,` to `.f-copy p,` so it still styles `.section-line`; rewrite the block comment for the new rows.
     - Port, by the CSS port rules: Stage (home-reference-light.html:156-157), Mock card (:159-163), the five new badge fills (:170-174; `.badge-home` exists), and Feature rows (:199-252, without `.pair`, `.secret*`, and `.page .more`). Add `.stage .chip, .f-lock .chip { background: var(--surface-chip); border-color: var(--surface-chip); }` (amendments, Chip), `.badge svg { flex: none; }`, `.banner p { margin: 0; }`, and `.f-copy > * { margin: 0; }`. Place `.frame-sm` after `.frame` so its 200px width wins, and `display: block` for it inside the breakpoint block.
     - In the text-wrap block at the end, change `.feature h3` to `.f-copy h3` and `.feature-copy p` to `.f-copy p`, so the lines read exactly `:is(.section-title, .f-copy h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1) { text-wrap: balance; }` and `:is(.lede, .section-line, .f-copy p, .prose p, .prose li, .facts li) { text-wrap: pretty; }`.
  6. index.txt: replace the three HM10 lines (`# HM10`, `Everything you look after`, `People, vehicles, pets, homes, and more, in one place.`) with:
     `# HM10 h3 (unchanged) and R1-1 (replaces the row 1 line)`
     `Everything you look after`
     `A record for each person, vehicle, pet, home, financial account, and contact, plus custom records with your own labels.`
     `!People, vehicles, pets, homes, and more, in one place.`
     `# R1-3, the record types (R1-2, "Record types", names the list and is not main text)`
     `People`, `Vehicles`, `Pets`, `Homes`, `Financial accounts`, `Contacts`, `Custom records` (one per line).
     After the two HM11 lines add `# R2-1 to R2-4, the Check what we read card (sample data)` and the lines `Check what we read`, `Change anything that’s wrong before you save.`, `What we read`, `Member ID`, `Group number`, `00000`. After the two HM12 lines add `# R3-2 after the visually hidden R3-1, and R3-4 (R3-3, "What suggestions use", names the list)` and the lines `Example suggestion banner: Flight to Denver, your recommended info is ready`, `Time of day`, `Your calendar, if you allow it`, `Your location, if you allow it`. After the two HM14 lines add `# R5-2 (R5-1, "Ways to unlock", names the list)` and `Face ID`, `Touch ID`, `Your passcode`. In the alt block, delete the A2 and A4 `alt:` lines, the `# A9r: phase 04.2, decision 15.` line, and the A9r `alt:` line, and change the alt comment to `# Alt text. A1 hero; A3r feature row 2 (shown from the breakpoint); A8 pricing. A2 moved to Features; A4 and A9r left Home (phase 04.3).`
  7. features.txt: replace the last two lines (`# Alt text: A3r (phase 04.2, FX8; 02-person-top left the page top)` and the A3r `alt:` line) with `# Alt text: A2 (phase 04.3: 02-person-top on the page top; A3r left the page)` and `alt: ` plus A2.
  Acceptance: Home's rows render as measure.mjs rows describes in both themes at 390 and 1280; the only shots Home requests are 01-home, 04-check-what-we-read, and 07-paywall-perks; the Features page top shows 02-person-top in a stage; dist/ holds no 06-lock, 05, or 03 file and no PNG beyond the four icons and the OG image, while every PNG stays in src/assets/shots/; check-text passes for every page; the phase 04.2 measure checks headings, stragglers, measure, and band still pass, and wrap passes; check:layout and check:a11y pass (badge icon contrast, the banner, one image per frame, 16px minimum).
  Verify command: `npm run build && npm run check && ! grep -qE 'class="feature|class="features"' src/pages/index.astro && ! grep -qE '^\.feature(-copy)?\b|^  \.feature\b' src/styles/site.css && ! grep -nE '02-person-top|06-lock|crop="suggest"' src/pages/index.astro && grep -qF 'shot="02-person-top" crop="full"' src/pages/features.astro && ! grep -qF '04-check-what-we-read' src/pages/features.astro && grep -qF '"!../assets/shots/06-lock-*.png"' src/components/PhoneFrame.astro && test -f src/assets/shots/06-lock-light.png && test -f src/assets/shots/06-lock-dark.png && test -z "$(find dist -name '*06-lock*' -o -name '*05-masked*' -o -name '*05-revealed*' -o -name '*03-person-documents*')" && test -z "$(find dist -name '*.png' ! -name favicon.png ! -name favicon-32.png ! -name apple-touch-icon.png ! -name og-image.png)" && grep -qF ':is(.section-title, .f-copy h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1) { text-wrap: balance; }' src/styles/site.css && grep -qF ':is(.lede, .section-line, .f-copy p, .prose p, .prose li, .facts li) { text-wrap: pretty; }' src/styles/site.css && ! grep -oE '(^|[;{ ])--[a-z0-9-]+\s*:' src/styles/site.css | grep -v -- '--site-' && node .planning/phases/04.3-conversion/measure.mjs rows && node .planning/phases/04.3-conversion/measure.mjs wrap && for c in headings stragglers measure band; do node .planning/phases/04.2-design-polish/measure.mjs $c || exit 1; done && for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done && npm run check:links && npm run check:layout && npm run check:a11y`

- [ ] 04.3-04: The comparison
  Requirements: CNV-03, CNV-06, CNV-07
  Files: src/pages/index.astro, src/styles/site.css, .planning/phases/04-visuals-and-polish/copy/index.txt
  Copy entries: W-1, W-2, W-3, W-4, W-5p, W-5n, W-5a, W-6, W-7p, W-7n, W-7a, W-8, W-9p, W-9n, W-9a, W-10, W-11p, W-11n, W-11a, W-12, W-13p, W-13n, W-13a (Approved; decisions 5, 6, 12, and 13)
  Steps:
  1. src/pages/index.astro frontmatter: a `compare` array of five rows, each `{ q, cells: [[verdict, note], [verdict, note], [verdict, note]] }`, with the verdicts and notes exactly as CONTEXT.md, Copy drafts, rows 1 to 5, and a map from verdict to icon: Yes check-circle, No minus-circle, Partly and Varies system (amendments, New icons). A one-line comment that every answer is a word plus a sentence and the icon is decoration.
  2. Between the Features section and `<PrivacyBand>`, add `<section class="section" aria-labelledby="compare-title"><div class="container">` with `<div class="section-head"><h2 class="section-title" id="compare-title">Why not just use photos or notes?</h2><p class="section-line">Many people keep these details as photos of cards or in a notes app. Here’s how the three compare.</p></div>` and `<div class="cmp">` holding `<div class="cmp-head" aria-hidden="true"><span></span><div class="cmp-head-cols"><span>Photos of cards</span><span>A notes app</span><span class="us">atHand</span></div></div>` and `<ul class="cmp-rows">`. Each row: `<li class="cmp-row"><h3 class="cmp-q">{q}</h3><dl class="cmp-cells">` with three `<div class="cmp-cell">` (the third `cmp-cell us`), each `<dt>{column}</dt><dd><span class="verdict"><Icon name=… size={20} />{verdict}</span><span class="note">{note}</span></dd>` (decision 6; amendments, Why not just…).
  3. src/styles/site.css: a "Comparison" block ported from home-reference-light.html:130 (`.section-head`, with `.section-head > * { margin: 0; }`) and :254-286 by the CSS port rules: `--cmp-cols` inlined; from the breakpoint, `.cmp-cell dt` takes the declarations of `.vh` (site.css:94-105). In the text-wrap block, the balance line becomes exactly `:is(.section-title, .f-copy h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1, .cmp-q) { text-wrap: balance; }`.
  4. index.txt: after the HM15 lines (`See all features`, `href: /features.html`) and before `# HM16`, add:
     `# W-1 to W-13a, the comparison (phase 04.3, decisions 12 and 13). The W-3 column names are each cell's dt; measure.mjs compare checks the verdict words.`
     `Why not just use photos or notes?`
     `Many people keep these details as photos of cards or in a notes app. Here’s how the three compare.`
     `Photos of cards`
     `A notes app`
     `Finding the right detail fast`
     `Find the photo, then zoom in to read the number.`
     `Search finds it if you typed it in.`
     `Each detail has its own labeled field.`
     `Records for the whole household in one place`
     `Photos can share an album, but they are not organized by record.`
     `Up to you to set up, and not organized by record.`
     `A record for each person, vehicle, pet, and home.`
     `Locked behind Face ID`
     `Only if you move them to a locked album.`
     `Some apps can lock individual notes.`
     `Face ID, Touch ID, or your passcode.`
     `No account to create`
     `Taking a photo needs no account.`
     `Depends on the app.`
     `No account and no sign-in.`
     `Suggests a record when it can help`
     `You look it up yourself.`
     `From the time of day and, if you allow them, your calendar and location.`
     `# Reference-build strings that ANSWERS replaced (decisions 12 and 13; correction b)`
     `!Most people keep these details`
     `!Mixed in with your other photos`
     `!Phone lock`
     `!Relies on your phone’s lock.`
     `!Works without searching`
     `!You search or scroll each time.`
     `!lists your records on the home screen`
  Acceptance: measure.mjs compare passes at 320, 390, 1280, and 400% zoom in both themes (structure, exact cells, gutters, no sideways scroll, 16px minimum, the ARIA reading order); the section sits between Features and the privacy band; check-text passes for Home; wrap passes; check:layout and check:a11y pass (the `dl` structure, the aria-hidden head, contrast of the atHand column in both themes).
  Verify command: `npm run build && npm run check && grep -qF 'aria-labelledby="compare-title"' src/pages/index.astro && grep -qF '<div class="cmp-head" aria-hidden="true">' src/pages/index.astro && ! grep -q 'cmp-cols\|<table' src/pages/index.astro src/styles/site.css && ! grep -oE '(^|[;{ ])--[a-z0-9-]+\s*:' src/styles/site.css | grep -v -- '--site-' && ! grep -n '@media' src/styles/site.css | grep -vE '\(min-width: 52\.5em\)|prefers-color-scheme: dark' && grep -qF ':is(.section-title, .f-copy h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1, .cmp-q) { text-wrap: balance; }' src/styles/site.css && node .planning/phases/04.3-conversion/measure.mjs compare && node .planning/phases/04.3-conversion/measure.mjs wrap && node scripts/check-text.mjs dist/index.html .planning/phases/04-visuals-and-polish/copy/index.txt && npm run check:links && npm run check:layout && npm run check:a11y`

- [ ] 04.3-05: Open Graph image and og:image:alt
  Requirements: CNV-05, CNV-06
  Files: scripts/make-og-image.mjs, public/og-image.png, src/layouts/Base.astro
  Copy entries: OG-1, OG-3 (Approved); OG-2 (unchanged)
  Steps:
  1. scripts/make-og-image.mjs: the h1 text (:71) becomes `Your household’s IDs and insurance, ready on your iPhone`; add `text-wrap: balance;` as the last declaration of the `h1` rule (:58-63; Jake approved, CONTEXT.md, Locked). Nothing else changes; ICON_REF stays 60032bf (decision 10).
  2. Run `npm run og:image` to rewrite public/og-image.png.
  3. Open the new PNG and og-image-reference.png and record in SUMMARY.md that the h1 sets in three lines ("Your household’s / IDs and insurance, / ready on your iPhone"), OG-2 sits below it, and the copy block sits inside the 630px height with the icon and lockup as before.
  4. src/layouts/Base.astro:49: the content becomes `The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.”` (OG-3). No other line in Base.astro changes.
  Acceptance: the image is 1200 by 630, differs from main's, and matches the reference layout by eye; every page's og:image:alt is OG-3; the title, descriptions, og:title, og:description, and JSON-LD are unchanged; HM2 is gone from src, scripts, and dist HTML; check:external passes.
  Verify command: `npm run og:image && test "$(sips -g pixelWidth -g pixelHeight public/og-image.png | awk '/pixel/{print $2}' | tr '\n' ' ')" = "1200 630 " && ! git diff --quiet 8e854d9 -- public/og-image.png && grep -qF '<h1>Your household’s IDs and insurance, ready on your iPhone</h1>' scripts/make-og-image.mjs && test "$(sed -n '/^  h1 {/,/^  }/p' scripts/make-og-image.mjs | grep -c 'text-wrap: balance;')" = 1 && test "$(git diff -U0 8e854d9 -- scripts/make-og-image.mjs | grep -cE '^[-+][^-+]')" = 3 && test "$(git diff -U0 8e854d9 -- src/layouts/Base.astro | grep -cE '^[-+][^-+]')" = 2 && npm run build && node -e 'const fs=require("fs");const want="The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.”";for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){const m=fs.readFileSync("dist/"+f,"utf8").match(/<meta property="og:image:alt" content="([^"]*)"/);const got=m&&m[1].replace(/&#39;/g,"\x27").replace(/&quot;/g,"\"").replace(/&amp;/g,"&");if(got!==want){console.error(f+": "+got);process.exitCode=1}}' && ! grep -rqF 'Your info, ready when you need it' src scripts && ! grep -rqF 'Your info, ready when you need it' dist --include='*.html' && npm run check:external`

Live site after this wave: Home shows the new hero with chips and the slot, the five live rows, and the comparison; Features keeps its text and jump list and shows 02-person-top in a stage at its top; every page's social preview uses the new image and alt. No URL moves; requests stay on athandapp.com (the same WebP shots, fewer of them); every fixture, check:links, check:layout, and check:a11y pass at the wave's end.

## Wave 2

The Features page. 04.3-07 uses the `theme` prop 04.3-06 adds, so run them in order.

- [ ] 04.3-06: PhoneFrame `theme` prop
  Requirements: CNV-04
  Files: src/components/PhoneFrame.astro
  Copy entries: none
  Steps:
  1. Add `theme?: "light" | "dark";` to Props and to the destructuring. When `theme` is set, load only that file and render one `<Image>` with the same alt, widths, sizes, loading, width, and height and no `shot-light` or `shot-dark` class, so the theme swap rules (site.css:414-420) never hide it and only that file loads; without `theme`, the two images render exactly as today (decision 8). Put no `data-theme` attribute on the figure (site.css:28-29 would give it a color scheme).
  2. Extend the header comment: a frame with `theme` shows that appearance whatever the site theme.
  Acceptance: no page uses the prop yet, so every page's HTML for frames is unchanged; astro check passes with the new prop type.
  Verify command: `npm run build && npm run check && grep -qF 'theme?: "light" | "dark";' src/components/PhoneFrame.astro && test "$(grep -o 'class="shot-light"' dist/index.html | wc -l | tr -d ' ')" = 3 && test "$(grep -o 'class="shot-dark"' dist/index.html | wc -l | tr -d ' ')" = 3 && npm run check:a11y`

- [ ] 04.3-07: The visual Features page
  Requirements: CNV-04, CNV-06, CNV-07
  Files: src/pages/features.astro, src/styles/site.css, .planning/phases/04-visuals-and-polish/copy/features.txt
  Copy entries: F-J1, F-H1, F-I1 to F-I7, F-B1, F-B2, F-C1, F-A1, F-A2 (Approved); R1-2, R1-3, R2-1 to R2-4, R3-1 to R3-4, R5-1, R5-2 (Approved, as Home); FE3 to FE30 except FE24's place, FP3, A2, HM28 to HM30 (unchanged); FE24 (moved); A3r (left in 04.3-03)
  Steps:
  1. Jump list: `jump` gains `{ href: "#hidden", text: "Hidden until you need it" }` between Suggestions and App lock (F-J1). Move `<JumpList label="On this page" links={jump} />` into the PageTop default slot after `<ComingSoon />`. The page top keeps FE3, FE4, C1, and the 02-person-top stage from 04.3-03.
  2. Replace the single `.container .prose` with seven sections in this order, each `<section class="fsec" aria-labelledby="{id}"><div class="container"><div class="fsec-top"><div class="fsec-copy"><h2 id="{id}">{h2}</h2><p class="fsec-intro">{intro}</p></div>{stage}</div><div class="prose">{paragraphs}</div></div></section>`:
     - records: FE5, F-I1 `Everything you look after, each in its own record.`, stage `<div class="stage"><RecordTypes /></div>`, FE6 to FE9.
     - scanning: FE10, F-I2 `Point your camera at a document, then check what atHand read.`, stage `<div class="stage"><ScanCard /></div>`, FE11 to FE14.
     - suggestions: FE15, F-I3 `atHand can suggest a record before you go looking for it.`, stage `<div class="stage stage-stack"><SuggestionBanner /></div>`, FE16 to FE19 (FE18's link unchanged).
     - hidden (new, F-H1 `Hidden until you need it`): F-I4 `Sensitive numbers stay masked until you tap Reveal.`, stage `<div class="stage"><SecretPair /></div>`, and FE24 moved here unchanged.
     - app-lock: FE20, F-I5 `Face ID, Touch ID, or your passcode. No password to remember.`, stage `<div class="stage"><span class="lock-glyph" aria-hidden="true"><Icon name="lock" size={40} /></span><Chips label="Ways to unlock" items={[face-id "Face ID", fingerprint "Touch ID", keypad "Your passcode"]} /></div>`, FE21 to FE23.
     - backups: FE25, F-I6 `An encrypted copy of your records, saved where you choose.`, stage `<div class="stage"><div class="mock"><div class="record"><span class="glyph" aria-hidden="true"><Icon name="archive" /></span><div><p class="record-name">Encrypted backup</p><p class="record-sub">Protected by a passphrase you choose</p></div></div><ul class="fact-list">` with three `<li><Icon name="check" size={20} />…</li>`: `Your records and photos`, `Saved wherever you like`, `A one-time copy, not sync` `</ul></div></div>` (F-B1, F-B2), FE26 to FE28.
     - light-and-dark: FE29, F-I7 `Light or dark, your choice.`, stage `<div class="stage theme-pair">` with `<PhoneFrame shot="01-home" crop="suggest" theme="light" caption="Light" alt="Close view of the atHand home screen in Light appearance, with the Flight to Denver banner and the Suggested for you list." />` and `<PhoneFrame shot="01-home" crop="suggest" theme="dark" caption="Dark" alt="The same view in Dark appearance." />` (F-A1, F-A2, F-C1), FE30.
     Every paragraph keeps its text and order; only FE24 moves. Import Chips, Icon, RecordTypes, ScanCard, SuggestionBanner, and SecretPair.
  3. src/styles/site.css: a "Features page sections" block from features-reference-light.html's `/* ---------- Features page ---------- */` block (`.fsec`, `.fsec-top`, `.fsec-copy`, `.fsec h2`, `.fsec-intro`, `.fact-list`, `.theme-pair`, and their breakpoint rules) by the CSS port rules, plus `.fsec-copy > * { margin: 0; }`, `.fsec .prose { padding-bottom: 0; }`, `.fsec .prose > :last-child { margin-bottom: 0; }`, `.stage-stack { flex-direction: column; }`, `.stage .lock-glyph { background: var(--surface-card); }`, `.mock .record { border-top: 0; padding-top: 0; }`, `.mock .glyph { color: var(--text-link); }`, `.fact-list svg { flex: none; color: var(--text-link); }`, and `.theme-pair .frame { width: 220px; }`. In the text-wrap block, the two lines become exactly `:is(.section-title, .f-copy h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1, .cmp-q, .fsec h2) { text-wrap: balance; }` and `:is(.lede, .section-line, .f-copy p, .fsec-intro, .prose p, .prose li, .facts li) { text-wrap: pretty; }`.
  4. features.txt: below the second header line add `# Phase 04.3 (phase 04.3 CONTEXT.md, Copy drafts, Approved 2026-10-26): the jump list moves into the page top with F-J1; seven sections, each with an intro (F-I1 to F-I7) and one visual; FE24 moves to the new Hidden until you need it section (F-H1).` After the `href: #suggestions` line add `# F-J1 (phase 04.3), between Suggestions and App lock; also the F-H1 h2`, `Hidden until you need it`, `href: #hidden`, and `!Hidden fields`. Before the alt block add `# F-I1 to F-I7, the section intros` and the seven intros, one per line, as step 2 gives them; then `# Section visuals: R1-3; R2-1 to R2-4; R3-1 with R3-2, and R3-4; HM28 to HM30 with the HM13 captions; R5-2; F-B1 and F-B2; F-C1` and these lines, one per line: `People`, `Vehicles`, `Pets`, `Homes`, `Financial accounts`, `Contacts`, `Custom records`, `Check what we read`, `Change anything that’s wrong before you save.`, `What we read`, `Member ID`, `XYZ000000000`, `Group number`, `00000`, `Example suggestion banner: Flight to Denver, your recommended info is ready`, `Time of day`, `Your calendar, if you allow it`, `Your location, if you allow it`, `Masked`, `Revealed`, `Maple Street house`, `Alarm code`, `Alarm code, hidden until you tap Reveal`, `0000`, `Hide`, `Face ID`, `Touch ID`, `Your passcode`, `Encrypted backup`, `Protected by a passphrase you choose`, `Your records and photos`, `Saved wherever you like`, `A one-time copy, not sync`, `Light`, `Dark`. Replace the alt block from 04.3-03 with `# Alt text: A2 page top; F-A1 and F-A2 the Light and dark frames (phase 04.3)`, `alt: ` plus A2, `alt: ` plus F-A1, and `alt: ` plus F-A2.
  Acceptance: measure.mjs features passes at 390 and 1280 in both themes; the Light frame shows the light file and the Dark frame the dark file in every site theme, each frame showing one image; Features requests only 02-person-top and 01-home shots; every FE paragraph is present once, FE24 under Hidden until you need it; check-text passes for Features and the other pages; wrap and phase 04.2's measure check pass; check:links, check:layout, and check:a11y pass (the h1 then seven h2 outline, 16px minimum, one image per frame in light, dark, and System with the OS light and dark).
  Verify command: `npm run build && npm run check && test "$(grep -c '<section class="fsec"' src/pages/features.astro)" = 7 && grep -qF '{ href: "#hidden", text: "Hidden until you need it" }' src/pages/features.astro && test "$(grep -c 'theme="light"\|theme="dark"' src/pages/features.astro)" = 2 && test "$(grep -o 'Sensitive numbers, such as passport numbers' dist/features.html | wc -l | tr -d ' ')" = 1 && grep -qF ':is(.section-title, .f-copy h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1, .cmp-q, .fsec h2) { text-wrap: balance; }' src/styles/site.css && grep -qF ':is(.lede, .section-line, .f-copy p, .fsec-intro, .prose p, .prose li, .facts li) { text-wrap: pretty; }' src/styles/site.css && ! grep -oE '(^|[;{ ])--[a-z0-9-]+\s*:' src/styles/site.css | grep -v -- '--site-' && node .planning/phases/04.3-conversion/measure.mjs features && node .planning/phases/04.3-conversion/measure.mjs wrap && node .planning/phases/04.2-design-polish/measure.mjs measure && for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done && test -z "$(find dist -name '*.png' ! -name favicon.png ! -name favicon-32.png ! -name apple-touch-icon.png ! -name og-image.png)" && npm run check:links && npm run check:layout && npm run check:a11y`

Live site after this wave: Features shows the jump list in its page top, seven sections each with a visual beside its h2, the new Hidden until you need it section, and the fixed Light and Dark frames; every paragraph keeps its text. /features.html keeps its URL and its six existing anchors (#records, #scanning, #suggestions, #app-lock, #backups, #light-and-dark) and gains #hidden, so no inbound link breaks. Every fixture, check:links, check:layout, and check:a11y pass at the wave's end.

## Static checks for VERIFY

Run from the repo root after `npm ci` and `npm run build`. S1 to S19 are phase 04's static checks (.planning/phases/04-visuals-and-polish/PLAN.md, Static checks for VERIFY), re-run as written except S6, S14, and S16, which this plan replaces (Superseded checks); S10 uses the phase 04 fixtures as amended by this plan.

- S1 to S5, S7 to S13, S15, and S17 to S19: as phase 04.
- S6′. As phase 04's S6, with the two Approved fragments removed from the main text before the sentence match: `! grep -rniw -e android -e ipad -e icloud -e carplay -e bluetooth -e ai -e 'apple health' -e 'artificial intelligence' -e 'car connectivity' dist --include='*.html' && node -e 'const fs=require("fs");const ok=["There is no subscription.","There is no subscription, no ads, and no account.","A backup is a one-time copy, not sync.","No subscription, no ads, no account."];const cut=["One-time purchase, no subscription","A one-time copy, not sync"];for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){let m=fs.readFileSync("dist/"+f,"utf8").match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<[^>]*>/g,"").replace(/\s+/g," ");for(const c of cut)m=m.split(c).join(" ");for(const s of m.match(/[^.?]*\b(subscriptions?|sync)\b[^.]*\./gi)||[])if(!ok.includes(s.trim())){console.error(f+": "+s.trim());process.exitCode=1}}'`
- S14′. As phase 04's S14, plus the 05 pair and 06-lock left out of dist/ and every unused pair kept in src/assets/shots/ (decision 14): `test ! -e src/assets/shots/07-paywall-light.png && test ! -e src/assets/shots/07-paywall-dark.png && ! grep -rnE '07-paywall-(light|dark)' src && test -z "$(find dist -name '*.png' ! -name favicon.png ! -name favicon-32.png ! -name apple-touch-icon.png ! -name og-image.png)" && test -z "$(find dist -name '*03-person-documents*' -o -name '*05-masked*' -o -name '*05-revealed*' -o -name '*06-lock*')" && for f in 03-person-documents 05-masked 05-revealed 06-lock; do test -f src/assets/shots/$f-light.png && test -f src/assets/shots/$f-dark.png || exit 1; done`
- S16′. Re-run the verify commands of phase 04 tasks 04-19 and 04-23 as written, and 04-21's with its `"og:image:alt"` value changed from M2 to OG-3, `The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.”`.
- S20. Phase 04.2's measurements that still apply: `for c in headings stragglers measure band; do node .planning/phases/04.2-design-polish/measure.mjs $c || exit 1; done`
- S26. Every phase 04.3 measurement: `for c in hero slot rows compare features wrap; do node .planning/phases/04.3-conversion/measure.mjs $c || exit 1; done`
- S27. Tokens, typefaces, and dependencies unchanged since ANSWERS: `npm run tokens:check && git diff --quiet 8e854d9 -- src/styles/tokens package.json package-lock.json`
- S28. Only the planned files changed in src/, scripts/, and public/: `test -z "$(git diff --name-only 8e854d9 -- src scripts public | grep -vxE 'src/styles/site.css|src/pages/index.astro|src/pages/features.astro|src/components/(Icon|PhoneFrame|Chips|RecordTypes|ScanCard|SuggestionBanner|SecretPair)\.astro|src/layouts/Base.astro|scripts/make-og-image.mjs|public/og-image.png')"`
- S29. The title, meta descriptions, and structured data are unchanged (og:title and og:description come from the same props in Base.astro): `grep -qF '<Base title="atHand: Your Info, Ready" description="atHand keeps your household’s reference information on your iPhone and suggests the right record when it can help.">' src/pages/index.astro && grep -qF '<Base title="Features | atHand" description="What atHand does on iPhone: records for your household, document scanning, suggestions, app lock, and encrypted backups.">' src/pages/features.astro && diff <(git show 8e854d9:src/pages/index.astro | sed -n '/^const ld = {/,/^};/p') <(sed -n '/^const ld = {/,/^};/p' src/pages/index.astro) && test "$(git diff -U0 8e854d9 -- src/layouts/Base.astro | grep -cE '^[-+][^-+]')" = 2` (the process substitution works in zsh and bash)
- S30. The Open Graph image is regenerated with the planned script change: `test "$(sips -g pixelWidth -g pixelHeight public/og-image.png | awk '/pixel/{print $2}' | tr '\n' ' ')" = "1200 630 " && ! git diff --quiet 8e854d9 -- public/og-image.png && test "$(git diff -U0 8e854d9 -- scripts/make-og-image.mjs | grep -cE '^[-+][^-+]')" = 3 && grep -qF 'text-wrap: balance;' scripts/make-og-image.mjs`
- S31. HM2 and the removed strings are gone: `! grep -rqF 'Your info, ready when you need it' src scripts && ! grep -rqF 'Your info, ready when you need it' dist --include='*.html' && ! grep -rqF 'People, vehicles, pets, homes, and more, in one place.' dist --include='*.html' && ! grep -rqF 'Close view of the atHand lock screen' dist --include='*.html' && ! grep -qF 'a Suggested for you list shows Flight to Denver tomorrow' dist/index.html`
- S32. The design contracts are unchanged: `git diff --quiet 8e854d9 -- .planning/phases/04-visuals-and-polish/design .planning/phases/04.3-conversion/design .planning/phases/04.3-conversion/measure.mjs .planning/phases/04.2-design-polish/measure.mjs`

VERIFY also reads Home and Features against the Copy drafts in order and heading level (the fixtures prove presence, not structure), compares both pages with HOME-DESIGN-AMENDMENTS.md at 320, 390, and 1280 px in both themes, records the axe and layout results per page and theme, and writes Jake's browser checklist (README, VERIFY step 5), including VoiceOver on the comparison (each row a heading, each answer named by its column), the chips read as one list, the Light and Dark frames under each site theme, and 400% zoom on the comparison.

## Risks and rollback

- Superseded checks. CNV-07 says every phase 04 and 04.2 check keeps passing; phase 04.2's row4, crops, and features-top, and phase 04's S6 and S16 as written, assert what the Approved amendments change. This plan replaces them (Superseded checks) rather than weakening any; Jake approves that with the plan. If Jake prefers, CNV-07's wording can be amended at REVISE to name them.
- Chip wrapping is font-dependent. CONTEXT.md measured H-6 on one line and H-7 on two at 320 with the production fonts; with system fonts the reference wraps more (measured at PLAN). The hero check runs on dist/ with the self-hosted faces. If a chip wraps beyond the measured lines, EXECUTE stops and records a blocker; copy does not change in EXECUTE.
- New strings and the wrap check. text-wrap balance and pretty cover the new headings and lines; if a new string still ends on a one-word line in Chromium at 390 or 1280, EXECUTE stops (no copy edit, no check change) and the fix goes to REVISE.
- Measurement helper. measure.mjs ran against today's build (hero, slot, rows, compare, and features fail; wrap passes) and against the reference builds (structure passes; failures only on pre-ANSWERS copy, the one-image frames, and system-font chip wrapping). It has not run against the planned markup, which does not exist yet. If a check proves wrong, EXECUTE stops and records a blocker rather than editing it.
- Unused shots. 02-person-top moves to Features in the same task it leaves Home, and 06-lock joins the glob exclusions, so no shot ships as a PNG; 04.3-03's verify fails on the `find dist` step otherwise, and the fix is inside PhoneFrame.astro.
- Vehicles icon. Vehicles reuses the existing `car` icon with its two wheel dots, where the reference tile omits them; the amendments add no car icon. A visual detail only.
- Fixed-theme frames load at 220px with the existing `sizes`, which names 280 and 300px, so the browser may pick the 720w file. It is one file per frame and was already the case for 300px frames.
- The store slot. Phase 05 swaps C1 for the badge; the slot check proves a 48px box moves nothing at 320, 390, and 1280. The badge's own artwork and link come in phase 05 (LCH-01, LCH-02).
- The Open Graph image needs ../athandapp at 60032bf (present). A web session clones the app repo beside this one first (README, Where things live).
- Rollback: revert the wave's PR on main; the Deploy workflow republishes the previous build. Wave 1 reverts Home, the Features page-top shot, the OG image, og:image:alt, and their fixture lines together. Wave 2 reverts the Features page to its wave 1 state and its fixture lines.

## Self-check

Run 2026-10-26 at PLAN.

- All phase requirements covered: yes. CNV-01 to CNV-07 each map to tasks and static checks (Requirement coverage); CNV-07's superseded checks are named and replaced, not dropped.
- Every task has acceptance and verify: yes, all seven. Each browser criterion in HOME-DESIGN-AMENDMENTS.md, Acceptance, and in CNV-01 to CNV-04 maps to a measure.mjs check, a check:layout or check:a11y run, or a recorded comparison by eye (04.3-05 step 3).
- No conflict with the brief or CLAUDE.md: yes. Copy is placed verbatim from Approved drafts, each cited to a brief section or approved site string; no "nothing leaves your phone" wording (S4); the banner never names a category (R3-2, brief, Contextual suggestions); no price (S5); atHand in prose, @Hand only in the lockup (S3); no third-party request (check:external; check:layout and check:a11y abort off-server requests); no token, site variable, typeface, or dependency change (S11, S13, S27); 16px minimum, 44px targets (the jump links keep theirs; chips are not targets), WCAG AA in both themes, no color-only meaning (verdict words), 400% zoom (check:layout, measure compare), reduced motion (check:a11y); /privacy.html and /support.html untouched (S7, S28).
- Files in scope complete: yes. Seven existing files changed, five new components, two fixtures, and the planning files; everything else is named as not changed, including the design folders, both measure.mjs helpers, the token files, and the unused PNGs.
- Every wave leaves the live site whole: yes. Wave 1 changes Home and moves its displaced shot to the Features page top in the same task, and regenerates the OG image with its alt; wave 2 rebuilds Features with every existing anchor kept. Each task updates its fixture in the same commit, and each wave ends with check-text, check:links, check:layout, and check:a11y.
- Waves are at most six tasks: yes (5 and 2).
- Baseline: today's build (8e854d9) passes every existing check (Facts).

## Fix wave

(added by VERIFY if needed)
