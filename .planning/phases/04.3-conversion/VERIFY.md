# Phase 04.3: conversion - Verify

Result: PASS
Date: 2026-10-27

Run on branch verify/04.3-conversion from main at f811d36 (wave 3, PR #52, merged), local Node, Playwright 1.64.1 with its Chromium, axe-core 4.14.0. App repo checkout at ~/dev/athandapp: origin/main 6219629; `git diff --quiet f4f2450 origin/main -- athand-project-brief.md athand-design-handoff/_ds` succeeds, so the brief and the _ds tokens are unchanged since the commit CONTEXT.md read. PLAN.md: all eight tasks in waves 1 to 3 (04.3-01 to 04.3-08) are checked.

## Automated checks

- `npm ci`: pass. Same fsevents install-scripts notice as earlier phases; no effect on the build.
- `npm run build`: pass, 7 pages.
- `npm run check`: pass, 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, prints the fonts.css exception line and "4 files match 621962959f1d5b6d22fb5df6e70e70a75e707e49".
- `npm run check:external`: pass, 8 files scanned, no third-party requests.
- `npm run check:links`: pass, 61 internal links resolve.
- `npm run check:content`: pass for privacy and 404 against 52d8d1a.
- `npm run check:layout`: pass, "7 pages, 2 themes, 5 viewports: no overflow, gutters kept" (320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and 1280 at 400%, in light and dark).
- `npm run check:a11y`: pass, "7 pages, 4 theme states, 2 widths: no violations". This is axe-core with default rules on every page in light, dark, and System with the OS light and dark, at 390 and 1280 px, plus the 17px body, 16px minimum text, 44px standalone target, reduced-motion, and one-displayed-image-per-`.screen` checks.
- Static checks, parsed straight from the phase 04 and phase 04.3 PLAN.md files and run as written under bash: S1 to S5, S7 to S13, S15, S18, S19, S6′, S14′, S20, and S26 to S32 all exit 0. S6 and S14 were not run as written; S6′ and S14′ replace them (PLAN.md, Superseded checks).
  - S1 dashes, S2 straight apostrophes, S3 "@Hand", S4 "nothing leaves" wording, S5 prices, S7 permanent URLs, S8 check:content, S9 coming-soon counts (Home 2, Features 1, Pricing 1, none elsewhere), S10 check-text on the five pages, S11 token variables only, S12 one em breakpoint and no text under 16px, S13 tokens and dependencies, S15 no religious wording, S18 no script but the JSON-LD block.
  - S6′: no out-of-scope feature word, and every subscription or sync sentence is an approved one once H-7 and F-B2 are taken out.
  - S14′: no 07-paywall original, no PNG in dist/ beyond the four icons and the OG image, no 03, 05, or 06-lock file in dist/, and all four unused pairs still in src/assets/shots/.
  - S20: phase 04.2 measure.mjs headings, stragglers, measure, and band pass.
  - S26: phase 04.3 measure.mjs hero, slot, rows, compare, features, and wrap pass (results below).
  - S27: tokens:check passes and src/styles/tokens, package.json, and package-lock.json are unchanged since 8e854d9.
  - S28: only the planned files changed in src/, scripts/, and public/ since 8e854d9.
  - S29: the Home and Features titles and descriptions and the JSON-LD are unchanged; Base.astro differs from 8e854d9 by the og:image:alt line only.
  - S30: public/og-image.png is 1200 by 630 and differs from 8e854d9's; make-og-image.mjs differs by three lines and has `text-wrap: balance;`.
  - S31: HM2, the earlier H-1 and H-2, the old row 1 line, A9r, and A4 are gone from src, scripts, and dist HTML as the check names them.
  - S32: both design folders and phase 04.2's measure.mjs are unchanged since 8e854d9, and no task commit touched this phase's measure.mjs.
- S16 and S17: the verify commands of 04-19, 04-21 (with og:image:alt OG-3, as S16′ says), 04-22, and 04-23 pass, including 04-23's three check-external fixture cases. Run under bash, as earlier phases did (04-19's `set -- $x` needs word splitting).
- S19: 04-24's verify re-runs and passes, so its fixture page without theme CSS still fails with "screen shows 2 images".

### measure.mjs results (S26)

- hero: pass at 320, 390, 840, and 1280 in light and dark. h1 H-1, line H-2, list "At a glance" with H-4 to H-7, then the slot with C1; no one-word last line in the h1 or the line. Chip rows: 4 at 320, 390, and 840; 2 at 1280.
- slot: pass at 320, 390, and 1280. The slot is 56px, and a 144 by 48px stand-in moves nothing around it.
- rows: pass at 390 and 1280 in light and dark. Shots requested: 01-home and 07-paywall-perks at 390; 01-home, 04-check-what-we-read, and 07-paywall-perks at 1280.
- compare: pass at 320, 390, 1280, and 400% in light and dark. Comparison height 2,325px at 320 and at 400%, 2,138px at 390, 663px at 1280. The ARIA snapshot reads one list of five items, each a level-3 heading, then the three column names as terms, each with its verdict and note as the definition.
- features: pass at 390 and 1280 in light and dark. Shots requested: 02-person-top and 01-home; the Light and Dark frames are each 220px with one image.
- wrap: pass on Home and Features at 320, 390, and 1280.

### Copy order and heading levels

Read as Playwright ARIA snapshots of `main` at 1280 px in light, against CONTEXT.md, Copy drafts, and the source of src/pages/index.astro and src/pages/features.astro:

- Home: region h1 H-1 with the line H-2, list "At a glance", C1, and the hero figure (A1); region h2 HM5 with three h3 moments; region h2 "What it does" with five h3 rows in order (Everything you look after with list "Record types"; Scan instead of typing with the Check what we read card and the 04 figure, A3r; The right record at the right time with the banner and list "What suggestions use"; Hidden until you need it with figures "Masked" and "Revealed"; Locked to you with list "Ways to unlock"), then "See all features"; region h2 W-1 with W-2 and five h3 rows W-4, W-6, W-8, W-10, and W-12; region h2 "What you add stays on your iPhone"; region h2 "Free to start" with A8; region h2 HM24. Every string matches its Approved draft.
- Features: region h1 "Features" with FE4, C1, navigation "On this page" (seven links: Records, Scanning, Suggestions, Hidden until you need it, App lock, Backups, Light and dark), and the 02-person-top figure (A2); seven regions, each an h2 then its intro and stage: FE5 with "Record types", FE10 with the card, FE15 with "What suggestions use", F-H1 with Masked and Revealed, FE20 with "Ways to unlock", FE25 with the backup card (F-B1, F-B2), and FE29 with figures "Light" (F-A1) and "Dark" (F-A2). Every FE paragraph is present once, FE24 under Hidden until you need it.

### Comparison with HOME-DESIGN-AMENDMENTS.md

Full-page screenshots of Home and Features at 320, 390, and 1280 in light and dark, after scrolling so lazy images load, side by side with the reference builds in design/ at the same widths. No request left the local server.

- Home: hero order, the 16ch h1, the four chips, and the slot; the five row layouts (span, split, center, flipped split, lock card) and their stages; the comparison as a three-column grid with the aria-hidden header and the atHand column filled from the breakpoint, and as stacked cards with visible column names below it; Moments, the band, Pricing, and Closing unchanged. Every difference from the reference is Approved copy that replaced the reference's pre-ANSWERS or pre-REVISE strings (H-1, H-2, H-6, W-2, W-7p, row 3's Photos and notes cells, row 5).
- Features: the page top with 02-person-top on a stage and the jump list in the copy column; seven sections with the copy beside the stage from the breakpoint and the prose below; the backup card; the Light and Dark frames, each showing its own appearance in both site themes.
- Two visual differences from the reference HTML, neither a failure:
  - Chips on a stage (the signals on Home and Features, and the unlock chips on the Features App lock stage) use the `--surface-chip` fill and border, so they sit flush with the stage, where the reference HTML draws them as white or dark cards. The build follows the amendments' written Chip spec ("on a `.stage` or the lock card: `--surface-chip`") and PLAN 04.3-03 step 5; the reference HTML has no `.stage .chip` rule. Text keeps its contrast (check:a11y). BACKLOG.md records it for Jake.
  - On the Features App lock stage at 1280, the lock circle sits above the three chips; the reference sets them in one row. The amendments name only the circle and the three chips. BACKLOG.md, same item.

## Requirement evidence

- CNV-01: PASS. src/pages/index.astro:49-58: h1 H-1, `p.lede` H-2, `<Chips label="At a glance" class="trust">` with H-4 to H-7, and `<div class="store-slot"><ComingSoon /></div>`. measure hero passes (order, copy, four non-interactive chips inside the gutter, no one-word last line, slot min-height 56px holding only C1) at 320, 390, 840, and 1280 in both themes; measure slot passes (a 48px badge stand-in moves nothing at 320, 390, and 1280). S9 counts C1 twice on Home.
- CNV-02: PASS. src/pages/index.astro:93-142: `ul.f-list` with the five rows, RecordTypes, ScanCard with the 04 `fields` frame (`frame-sm`), SuggestionBanner ("Flight to Denver, your recommended info is ready", no category), SecretPair, and the lock card with "Ways to unlock". measure rows passes in both themes at 390 and 1280: classes, h3s, copy, aria-hidden icons, no control, the banner's `--text-on-cobalt` on `--accent`, and only 01-home, 04-check-what-we-read (from the breakpoint), and 07-paywall-perks requested. S14′: 06-lock, 05, and 03 stay out of dist/ and in src/assets/shots/.
- CNV-03: PASS. src/pages/index.astro:24-30 (the five rows) and :145-170 (the section): a `ul.cmp-rows` of `li` with an h3 and a `dl` of three cells, the `.cmp-head` aria-hidden, no table. measure compare passes at 320, 390, 1280, and 400% zoom in both themes: no sideways scroll, nothing outside the 16px gutters, no text under 16px, verdicts and notes exactly as Approved, verdict words carry the meaning with aria-hidden icons, and the ARIA snapshot names each answer by its column. No cell names a product or company (read against W-3 to W-13a).
- CNV-04: PASS. src/pages/features.astro:14-30 (seven-link jump list and 02-person-top `full` in the page top) and :32-173 (seven `section.fsec`, the new #hidden section with FE24, the two `theme` frames); src/components/PhoneFrame.astro `theme` prop. measure features passes at 390 and 1280 in both themes: one image per frame, the Light frame shows the light file and the Dark frame the dark file whatever the site theme, and only 02-person-top and 01-home are requested. check:a11y's one-image-per-frame rule passes in all four theme states. The six earlier anchors stay, and check:links passes.
- CNV-05: PASS. scripts/make-og-image.mjs carries OG-1 and `text-wrap: balance` (S30, three changed lines since 8e854d9); public/og-image.png is 1200 by 630 and was regenerated (S30); SUMMARY.md records the by-eye check of three balanced lines inside 630px. 04-21's verify with OG-3 passes on all seven pages (og:image:alt), with the title, og:title, og:description, canonical, and Twitter tags as before. S29: the page title "atHand: Your Info, Ready", the meta descriptions, and the JSON-LD are unchanged (04-23's verify also passes).
- CNV-06: PASS. Every new string on Home and Features matches an Approved Copy draft (read above, and check-text on index.txt and features.txt with their `!` lines for the replaced strings). The EXECUTE PRs (#49, #50, #52) list the claims with citations. No price or currency (S5); no token or site variable (S11, S13); no dependency change (S13, S27).
- CNV-07: PASS. Every phase 04 check (S1 to S19, with S6′ and S16′ as Superseded checks names them), phase 04.2's headings, stragglers, measure, and band (S20), and the new measurements (S26: hero chip rows, slot, rows, compare at 320 and 400% with the ARIA structure, features, wrap) pass. check:layout, check:a11y, check:external, check:links, check:content, and tokens:check pass. Unused shots stay in src/assets/shots/ and out of dist/ (S14′).

No FAIL, so no Fix wave.

## Browser acceptance checklist for Jake

Run after this PR merges and the Deploy workflow on main finishes green, on https://athandapp.com. Use Safari on Mac unless a step says iPhone.

1. Open https://athandapp.com/ with the header's theme control on Light. Expected: the heading reads "Your important information, in one place, always at hand", then the line starting "Stop scrolling through photos, notes, and other apps", then four pill labels (No account; Stored on your iPhone; Face ID or passcode lock; One-time purchase, no subscription), then "Coming soon to the App Store for iPhone." with the phone frame beside or below.
2. Click each of the four pill labels. Expected: nothing happens; the pointer stays an arrow and no label takes a hover style.
3. Scroll to "What it does". Expected: five rows. Row 1 shows seven record type tiles with colored icon badges. Row 2 shows a "Check what we read" card with Member ID and Group number, and at full window width a small phone frame beside it. Row 3 shows a purple banner, "Flight to Denver, your recommended info is ready", above three labels: Time of day; Your calendar, if you allow it; Your location, if you allow it. Row 4 shows the Masked and Revealed cards. Row 5 is a card with a lock circle and Face ID, Touch ID, and Your passcode.
4. Scroll to "Why not just use photos or notes?". Expected: at full width, a grid with the columns Photos of cards, A notes app, and atHand (the atHand column on a light panel), and five rows, each answer a word such as Yes, No, Partly, or Varies followed by a sentence. No price anywhere on the page.
5. Narrow the window as far as it goes, or use iPhone. Expected: each comparison row becomes its own card with the column names shown above each answer; nothing is cut off and the page does not scroll sideways.
6. Switch the theme control to Dark. Expected: the hero pills, the row cards, the banner, and the comparison all turn dark with text that is easy to read; the banner stays purple.
7. Switch to System, then flip macOS between Light and Dark in System Settings, Appearance, while Home is open. Expected: the page and every phone frame follow the OS each time, with one image per frame.
8. Open https://athandapp.com/features.html. Expected: beside or above the "Features" heading, a phone frame showing Sam Rivera’s record; below the intro, "On this page" with seven links including "Hidden until you need it". Click that link. Expected: the page jumps to the "Hidden until you need it" section, which shows the Masked and Revealed cards and the paragraph starting "Sensitive numbers, such as passport numbers".
9. Scroll the Features page. Expected: seven sections, each with a heading, a short line, and a visual on a tinted panel (record type tiles, the scan card, the banner with three labels, the Masked and Revealed cards, the lock with three labels, the encrypted backup card, and two phone frames), followed by the existing paragraphs.
10. At the "Light and dark" section, switch the theme control between Light, Dark, and System. Expected: the frame captioned Light always shows the light home screen, and the frame captioned Dark always shows the dark one, whatever the site theme.
11. Look at the labels on the tinted panels (the three suggestion labels and, on Features, the three unlock labels). Expected: they read clearly. They sit flush with the panel, without a white card behind each one, as the written design spec says (the design's sample HTML drew them as white pills; tell me if you want that look instead).
12. Turn on VoiceOver on Mac (Command F5) and move through the hero with Control Option Right Arrow. Expected: it reads the heading, the line, then "At a glance, list, 4 items" and each label, then the coming-soon line. None is announced as a button or link.
13. With VoiceOver, move through the comparison. Expected: each row is read as a heading (for example "Finding the right detail fast, heading level 3"), then each answer with its column name first, such as "Photos of cards", "Partly", "Find the photo, then zoom in to read the number." The column header row is not read separately.
14. With VoiceOver, open the rotor (Control Option U) on Home and on Features and check Headings and Landmarks. Expected: on Home, one h1, the section h2s including "Why not just use photos or notes?", and h3s for the moments, the five rows, and the five comparison rows. On Features, the h1 "Features" and seven h2s in jump-list order. Banner, navigation, main, and footer landmarks on both.
15. Keyboard only on Home and Features: press Tab from the top. Expected: the skip link appears first and works; focus moves through the header, the theme buttons (each showing its pressed state), and the page links with a visible focus ring; no pill, card, or comparison cell takes focus. On Features, the seven jump links each take focus and work with Return.
16. Zoom Home and Features to 400% (Command Plus until 400%). Expected: no horizontal scrolling and no clipped text, including the comparison cards, the hero pills, and the record type tiles.
17. Turn on Reduce Motion (System Settings, Accessibility, Display) and reload Home. Expected: nothing animates; the page looks the same otherwise.
18. With Safari's Web Inspector open on the Network tab, reload Home and Features and scroll to the end. Expected: every request goes to athandapp.com. No request names 06-lock, 05-masked, 05-revealed, or 03-person-documents; Home requests no 02-person-top.
19. Share https://athandapp.com/ in Messages to yourself. Expected: the preview image shows the atHand icon and "Your important information, in one place, always at hand" in three balanced lines, with "A private household organizer for iPhone" below.
20. Open https://athandapp.com/privacy.html and https://athandapp.com/support.html directly. Expected: both load at those exact URLs with no redirect, and the policy text is unchanged.

## Jake's browser result

(recorded at SHIP)
