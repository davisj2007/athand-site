# Phase 04.3: conversion - Summary

## What changed

PLAN.md set to Approved (2026-10-26) at the start of EXECUTE wave 1; Jake approved it in the EXECUTE prompt, including the Superseded checks.

Wave 1 (EXECUTE, 2026-10-26, branch execute/04.3-wave-1 from main at aaa6f33, PLAN PR #48 merged):

- 04.3-01: 18 new icons in src/components/Icon.astro (person, paw, house, bank, contact-card, tag, check, check-circle, minus-circle, lock, face-id, fingerprint, keypad, clock, calendar, pin, chevron, archive), bodies exactly as PLAN lists them; the 11 existing entries are unchanged (29 in all).
- 04.3-02: the hero reads H-1, H-2, the four trust chips (H-4 to H-7, list named H-3 "At a glance"), then C1 inside `.store-slot` (56px min-height). New src/components/Chips.astro. `.hero h1` max-width 16ch; Chip and Store slot blocks in site.css. index.txt gains the phase 04.3 header and the H-1, H-2, and chip lines.
- 04.3-03: Home's Features section is `ul.f-list` with five live rows: the span card with R1-1 and the record types; the split row with the Check what we read card and the 04 `fields` crop (200px, from the breakpoint only, alt A3r); the centered banner and signal chips; the Masked and Revealed pair on a stage; the lock card with the lock circle and unlock chips. New shared components RecordTypes, ScanCard, SuggestionBanner, and SecretPair. The Features page top shows 02-person-top (`full`, alt A2) on a `.stage`. PhoneFrame's glob leaves out 06-lock; every PNG stays in src/assets/shots/. site.css: the old `.feature*` rules removed; Stage, Mock card, entity badge fills, and Feature rows ported; the text-wrap block names `.f-copy h3` and `.f-copy p`. Fixtures updated for both pages.
- 04.3-04: the "Why not just use photos or notes?" comparison between the Features section and the privacy band: a `ul` of five rows, each an h3 and a `dl` of three cells (W-1 to W-13a), with an aria-hidden visual header from the breakpoint and visually hidden `dt` labels there. Comparison block in site.css with `--cmp-cols` inlined; `.cmp-q` added to the balance line. index.txt gains the W lines and seven `!` lines for the replaced reference strings.
- 04.3-05: scripts/make-og-image.mjs sets OG-1 with `text-wrap: balance`; public/og-image.png regenerated (1200 by 630, icon from 60032bf). Compared by eye with og-image-reference.png: the h1 sets in three lines ("Your household’s / IDs and insurance, / ready on your iPhone"), OG-2 sits below it, and the copy block sits inside the 630px height with the icon and lockup as before. og:image:alt on every page is OG-3.

Live site after this wave: Home shows the new hero with chips and the slot, the five live rows, and the comparison; Features keeps its text and jump list and shows 02-person-top in a stage at its top; every page's social preview uses the new image and alt. No URL moved; requests stay on athandapp.com (Home now requests only the 01-home, 04-check-what-we-read, and 07-paywall-perks WebP files).

Wave 1 check results (2026-10-26): `npm ci`, `npm run build`, `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match; app repo origin/main 6219629, brief and _ds tokens unchanged since f4f2450), `npm run check:external`, `npm run check:content`, `npm run check:links` (61 internal links), check-text on all five fixtures (index 127 lines, features 47, pricing 30, privacy-overview 30, support 81), measure.mjs hero, slot, rows, compare, and wrap, phase 04.2 measure.mjs headings, stragglers, measure, and band, `npm run check:layout` (7 pages, 2 themes, 5 viewports), and `npm run check:a11y` (7 pages, 4 theme states, 2 widths): all pass, with each task's verify command run after its task. At the wave's end, S2, S14′ (the dist and src parts), S27, S28, S29, and S31 also pass. measure.mjs features is wave 2's and still fails by design.

Measured: chips 1 to 3 set on one line at 320, 390, 840, and 1280, chip 4 on two lines at 320 and one elsewhere (four chip rows up to 840, two at 1280); the slot is 56px at 320, 390, and 1280 and a 144 by 48px stand-in moves nothing; the comparison is 2,325px tall at 320, 2,138 at 390, and 663 at 1280; its ARIA snapshot reads a list of five level-3 headings, each with three terms and definitions.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-26): Home at 1280 in light and 390 in dark. The hero h1 sets in three lines with the chips and the coming-soon line below; the record types tiles, the Check what we read card beside the 04 crop (1280 only), the banner and signals, the pair, the lock card, and the comparison (grid with the atHand column at 1280, cards with visible column names at 390) all render as HOME-DESIGN-AMENDMENTS.md describes.

Wave 2 (EXECUTE, 2026-10-26, branch execute/04.3-wave-2 from main at 88e12c7, wave 1 PR #49 merged):

- 04.3-06: PhoneFrame.astro gains `theme?: "light" | "dark"`. With `theme`, it loads only that file and renders one image with no `shot-light` or `shot-dark` class, so the theme swap never hides it; without it, the pair renders as before. No page used the prop in this task: the built dist/ was byte-identical to the build before the change.
- 04.3-07: the Features page. The jump list (with F-J1 "Hidden until you need it" between Suggestions and App lock) moves into the page top after C1. The single prose column becomes seven `section.fsec` sections (records, scanning, suggestions, hidden, app-lock, backups, light-and-dark), each with its h2, an intro (F-I1 to F-I7), one stage, and its paragraphs unchanged; FE24 moves to the new Hidden until you need it section. Stages: RecordTypes, ScanCard, SuggestionBanner (stacked), SecretPair, the lock circle with the Ways to unlock chips, the Encrypted backup card with three facts (F-B1, F-B2), and the fixed Light and Dark 01-home `suggest` frames (F-A1, F-A2, F-C1). site.css gains the Features page sections block, and the text-wrap lines name `.fsec h2` and `.fsec-intro`. features.txt gains the lines PLAN gives (94 lines).

Live site after this wave: Features shows the jump list in its page top, seven sections each with a visual beside its h2, and the fixed Light and Dark frames; every paragraph keeps its text, and the six existing anchors stay, plus #hidden. Features requests only the 02-person-top and 01-home WebP files.

Wave 2 check results (2026-10-26): `npm ci`, `npm run build`, `npm run check` (0 errors), `npm run tokens:check` (4 files match; app repo origin/main 6219629, brief and _ds tokens unchanged since f4f2450), `npm run check:external`, `npm run check:content`, `npm run check:links` (61 internal links), check-text on all five fixtures (index 127 lines, features 94, pricing 30, privacy-overview 30, support 81), measure.mjs hero, slot, rows, compare, features, and wrap (S26), phase 04.2 measure.mjs headings, stragglers, measure, and band (S20), `npm run check:layout` (7 pages, 2 themes, 5 viewports), and `npm run check:a11y` (7 pages, 4 theme states, 2 widths): all pass, with each task's verify command run after its task. At the wave's end, S2, S6′, S14′ (the dist part), S27, and S28 also pass.

Measured: both fixed-theme frames are 220px wide at 390 and 1280 in both themes, and the Light frame shows 01-home-light and the Dark frame 01-home-dark under the light and the dark site theme.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-26): Features at 1280 in light and 390 in dark. The page top shows the jump list under the coming-soon line beside the 02-person-top stage; each section sets its h2 and intro beside its stage at 1280 and above it at 390; the Light and Dark frames show their own appearance in both site themes.

Wave 3 (EXECUTE, 2026-10-26, branch execute/04.3-wave-3 from main at 165d8ab, REVISE PR #51 merged). PLAN.md set to Approved 2026-10-26; Jake approved the revised plan, including the Superseded checks, in the EXECUTE prompt.

- 04.3-08: Home's h1 reads H-1 "Your important information, in one place, always at hand" and its line H-2 "Stop scrolling through photos, notes, and other apps for IDs, insurance cards, and the details your household needs."; nothing else in index.astro changed. scripts/make-og-image.mjs sets OG-1; public/og-image.png regenerated (1200 by 630, icon from 60032bf). Base.astro's og:image:alt is OG-3 on every page. index.txt gains the REVISE header line, the new H-1 and H-2, and the earlier H-1 and H-2 as `!` lines (129 lines).

Open Graph image by eye (step 3): the h1 sets in three balanced lines ("Your important / information, in one / place, always at hand") with no one-word line, OG-2 sits below it, and the copy block sits inside the 630px height with the icon and lockup as before, matching the REVISE measurement.

Live site after this wave: Home's hero reads the new h1 and line above the unchanged chips and store slot; every page's social preview shows the regenerated image and the new og:image:alt. No URL moved; requests stay on athandapp.com.

Wave 3 check results (2026-10-26): 04.3-08's verify command passes in full. Also `npm ci`, `npm run tokens:check` (4 files match; app repo origin/main 6219629, brief and _ds tokens unchanged since f4f2450), `npm run check:content`, `npm run check:links` (61 internal links), check-text on all five fixtures (index 129 lines, features 94, pricing 30, privacy-overview 30, support 81), measure.mjs hero, slot, rows, compare, features, and wrap (S26), phase 04.2 measure.mjs headings, stragglers, measure, and band (S20), `npm run check:external`, `npm run check:layout` (7 pages, 2 themes, 5 viewports), and `npm run check:a11y` (7 pages, 4 theme states, 2 widths): all pass. At the wave's end, S2, S6′, S14′ (the dist part), S27, S28, S29, S30, S31, and S32 also pass.

Measured (measure.mjs hero): the h1 sets "Your important / information, / in one place, / always at hand" at 320, "Your important / information, in one / place, always at hand" at 390 and 1280, and in six lines at 840 (the BACKLOG item from REVISE); the line sets in five, four, four, and three lines at 320, 390, 840, and 1280. No one-word last line at any width.

Browser check (built-in browser, the running `astro preview` at localhost:4321, 2026-10-26): Home at 800 in dark. The h1 and line read H-1 and H-2 above the four chips, as measured.

## Brief citations

Claims placed in wave 1, with the citation CONTEXT.md gives for each:

- H-1 "Your household’s IDs and insurance, ready on your iPhone": brief, Concept; Information architecture; Privacy.
- H-2 "Keep IDs, insurance, vehicle, pet, and home details for everyone you look after in one app, organized by record instead of scattered through photos and notes.": brief, Information architecture; HM3 (approved).
- H-3 "At a glance": list name, no claim.
- H-4 "No account": brief, Concept; HM17.
- H-5 "Stored on your iPhone": brief, Privacy; brief, Onboarding.
- H-6 "Face ID or passcode lock": brief, App lock; decision 3.
- H-7 "One-time purchase, no subscription": brief, Business model and entitlement; HM22.
- R1-1 "A record for each person, vehicle, pet, home, financial account, and contact, plus custom records with your own labels.": brief, Information architecture; FE6.
- R1-2 "Record types": list name, no claim.
- R1-3 "People", "Vehicles", "Pets", "Homes", "Financial accounts", "Contacts", "Custom records": brief, Information architecture; Home; FE6.
- R2-1 "Check what we read": brief, Document capture; the app's screen title.
- R2-2 "Change anything that’s wrong before you save.": brief, Document capture; the app's screen line.
- R2-3 "What we read": the app's group label.
- R2-4 "Member ID" with "XYZ000000000", "Group number" with "00000": brief, Information architecture (sample data).
- R3-1 "Example suggestion banner: ": visually hidden prefix, no claim.
- R3-2 "Flight to Denver, your recommended info is ready": brief, Contextual suggestions; the app's wording.
- R3-3 "What suggestions use": list name, no claim.
- R3-4 "Time of day", "Your calendar, if you allow it", "Your location, if you allow it": brief, Contextual suggestions; HM12.
- R5-1 "Ways to unlock": list name, no claim.
- R5-2 "Face ID", "Touch ID", "Your passcode": brief, App lock; HM14; FE21.
- W-1 "Why not just use photos or notes?" and W-2 "Many people keep these details as photos of cards or in a notes app. Here’s how the three compare.": framing, no product claim; Jake's correction (b).
- W-3 column names "Photos of cards", "A notes app", "atHand": generic methods, no claim.
- W-4, W-6, W-8, W-10, W-12 row labels: "Finding the right detail fast", "Records for the whole household in one place", "Locked behind Face ID", "No account to create", "Suggests a record when it can help" (decision 13).
- W-5p, W-5n, W-7p, W-7n, W-9p, W-9n, W-11p, W-11n, W-13p, W-13n: descriptions of the alternatives, approved with Jake's corrections (a) and decision 12.
- W-5a "Yes" / "Each detail has its own labeled field.": brief, Information architecture; FE7.
- W-7a "Yes" / "A record for each person, vehicle, pet, and home.": brief, Information architecture; decision 5.
- W-9a "Yes" / "Face ID, Touch ID, or your passcode.": brief, App lock; HM14.
- W-11a "Yes" / "No account and no sign-in.": brief, Concept; HM17.
- W-13a "Yes" / "From the time of day and, if you allow them, your calendar and location.": brief, Contextual suggestions; HM12; FE16.
- OG-1 "Your household’s IDs and insurance, ready on your iPhone": as H-1.
- OG-3 "The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.”": as H-1.

(Wave 3 replaces H-1, H-2, OG-1, and OG-3 above; see Claims placed in wave 3.)

Unchanged approved strings moved: A2 (Home row 1 to the Features page top), HM28 to HM30 (into SecretPair.astro, text unchanged).

Claims placed in wave 2, with the citation CONTEXT.md gives for each:

- F-J1 "Hidden until you need it": Jake’s correction (d), matching its h2 (F-H1); the six FP3 labels unchanged.
- F-H1 "Hidden until you need it": HM13 h3 (approved).
- F-I1 "Everything you look after, each in its own record.": brief, Information architecture; FE6.
- F-I2 "Point your camera at a document, then check what atHand read.": brief, Document capture; FE11, FE13.
- F-I3 "atHand can suggest a record before you go looking for it.": brief, Concept; FE16.
- F-I4 "Sensitive numbers stay masked until you tap Reveal.": HM13 line (approved); brief, Secure fields.
- F-I5 "Face ID, Touch ID, or your passcode. No password to remember.": HM14 line (approved); brief, App lock.
- F-I6 "An encrypted copy of your records, saved where you choose.": brief, Backup and restore; FE26.
- F-B1 "Encrypted backup" / "Protected by a passphrase you choose": brief, Backup and restore; FE26.
- F-B2 "Your records and photos", "Saved wherever you like", "A one-time copy, not sync": brief, Backup and restore; FE26, FE27.
- F-I7 "Light or dark, your choice.": brief, Brand (System / Light / Dark setting); FE30.
- F-C1 "Light", "Dark": captions, no claim.
- F-A1 "Close view of the atHand home screen in Light appearance, with the Flight to Denver banner and the Suggested for you list." and F-A2 "The same view in Dark appearance.": alt text, checked against the `suggest` crop and A4.
- Reused as on Home: R1-2, R1-3, R2-1 to R2-4, R3-1 to R3-4, R5-1, R5-2, and HM28 to HM30 (citations as wave 1).

Claims placed in wave 3, with the citation CONTEXT.md gives for each (decision 16):

- H-1 "Your important information, in one place, always at hand": brief, Concept; Brand.
- H-2 "Stop scrolling through photos, notes, and other apps for IDs, insurance cards, and the details your household needs.": brief, Concept; Information architecture.
- OG-1 "Your important information, in one place, always at hand": as H-1.
- OG-3 "The atHand logo and the words “Your important information, in one place, always at hand.”": as H-1.

Unchanged approved strings moved in wave 2: FE24 (from Locked to you to Hidden until you need it), FP3 (the jump list, into the page top).

## Commits

- bd40e39 phase 04.3 task 04.3-01: eighteen new icons
- bb952ed phase 04.3: measure.mjs hero counts chip text lines only
- 999d75b phase 04.3 task 04.3-02: hero with trust chips and the store slot
- d1397e1 phase 04.3 task 04.3-03: live feature rows, and 02-person-top on the Features page top
- 480a0e4 phase 04.3 task 04.3-04: the comparison
- 70c2ad7 phase 04.3 task 04.3-05: Open Graph image and og:image:alt
- c0fb0df phase 04.3 task 04.3-06: PhoneFrame theme prop
- 0df5b6f phase 04.3 task 04.3-07: the visual Features page
- bff97ab phase 04.3 task 04.3-08: replaced hero copy, Open Graph headline, and og:image:alt

## Deviations

- measure.mjs hero (Jake authorized in the EXECUTE session). The check counted each chip's icon rect as a line of text: a one-line chip read as two when the icon's top rounded differently from the text's (909.50 and 909.45 at 840), and chip 4 at 320 read as three because the centered icon sits between its two lines. Every chip measured 40px tall (one line) except chip 4 at 320 (62px, two lines), which matches CONTEXT.md. The check now counts the text nodes' rects only (commit bb952ed). This is also the cause of the "system-font wrapping" PLAN recorded on the reference builds. S32 (design contracts unchanged since 8e854d9) now differs by this one change to .planning/phases/04.3-conversion/measure.mjs; VERIFY should read S32 with that exception.
- `.f-lock .f-copy p { text-wrap: balance; }` in site.css (Jake approved in the EXECUTE session). At 390, HM14 ("Face ID, Touch ID, or your passcode. No password to remember.") ended on the single word "remember." under `text-wrap: pretty`, so measure.mjs wrap failed. With this one rule the line balances across three lines and wrap passes at 320, 390, and 1280. No copy or check changed.

## Backlog items added

None.

## Follow-ups

- Wave 2 has no deviations and adds no BACKLOG items.
- Wave 3 has no deviations and adds no BACKLOG items (the h1 at 840 was recorded at REVISE).
- VERIFY (2026-10-27): result PASS, CNV-01 to CNV-07 PASS, no Fix wave. One BACKLOG item (chips on a stage take the `--surface-chip` fill the amendments specify, where the reference HTML draws `--surface-card` pills). Merged as 2f282ab (PR #53) and deployed.
- SHIP (2026-10-27): VERIFY.md result PASS; Jake's browser checklist on https://athandapp.com: PASS, including VoiceOver on the comparison, the comparison at phone width, the new social preview in Messages, and the Features page sections and jump links; no notes. CNV-01 to CNV-07 are Done in REQUIREMENTS.md and phase 04.3 is Done in ROADMAP.md.
- Next: phase 04.1 DISCUSS once the app repo records its TestFlight VoiceOver and Dynamic Type passes (not yet recorded; athandapp origin/main 6219629, phase 07 VERIFY done, SHIP not run); phase 05 DISCUSS once Apple approves atHand.
