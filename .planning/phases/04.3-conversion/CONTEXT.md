# Phase 04.3: conversion - Context

Status: Needs answers
Date: 2026-10-26

## Goal

Home and Features drive downloads. A hero that names the category (a household organizer for IDs and insurance) and the edge (on your iPhone, no account, locked, one purchase); trust chips; live Moments-style feature cards in place of most feature screenshots; a fair "Why not just use photos or notes?" comparison; a visual Features page; and the Open Graph image updated to the new headline. Jake inserted this phase on 2026-10-26, before phase 05, with no gate. Phase 05 stays the launch flip (App Store badge, Smart App Banner, removing the coming-soon line).

## Requirements in scope

CNV-01 to CNV-07 (REQUIREMENTS.md, Conversion).

## What the site does today

Main at a5596bd (phase 04.2 SHIP, PR #45 merged). App repo read at origin/main 487b454 (Brief v4.13); the brief and the _ds tokens are unchanged since f4f2450.

Home, src/pages/index.astro:

- Hero (:30-41): h1 HM2 "Your info, ready when you need it" (:33), line HM3 (:34), the coming-soon line (`ComingSoon`, :35), and 01-home `crop="full"` `hero` with alt A1 (:38).
- Moments (:43-69), unchanged by this phase.
- Features (:71-154), five rows, each a `.feature` with a `.shot-panel`: row 1 02-person-top full, alt A2 (:81); row 2 04-check-what-we-read `fields`, alt A3r (:90); row 3 01-home `suggest`, alt A4 (:99); row 4 the live Masked and Revealed pair (:107-140); row 5 06-lock `lock`, alt A9r (:148). Row 1's line is "People, vehicles, pets, homes, and more, in one place." (:78).
- Privacy band (:156-159), Pricing (:161-172), Closing (:174-180), unchanged by this phase.
- Structured data (:17-26) and the title and description (:28), unchanged by this phase.

Features, src/pages/features.astro: page top with FE3, FE4, the coming-soon line, and one 04 `fields` frame (:18-24); the jump list of six links inside the prose column (:8-15, :28); six h2 sections in one `.prose` column (:30-60), with FE24 under Locked to you (:52).

Shared parts:

- src/layouts/Base.astro:49, og:image:alt "The atHand logo and the words “Your info, ready when you need it.”" on every page.
- scripts/make-og-image.mjs:58-63 (h1 rule, no `text-wrap`), :71 (h1 text HM2). public/og-image.png is committed output.
- src/components/PhoneFrame.astro:13 (crop set), :25-29 (glob that leaves out 03-person-documents and the 05 pair), :48-49 (always two images, light and dark). No `theme` prop.
- src/components/Icon.astro:10-22: system, sun, moon, phone, cross, car, plane, arrow, person-slash, scan, eye-slash.
- src/styles/site.css:391-403: the `suggest`, `record`, `fields`, `lock`, and `perks` crops. `record` is already unused on every page (since phase 04.2 FX6).
- Fixtures: .planning/phases/04-visuals-and-polish/copy/index.txt and features.txt, read by scripts/check-text.mjs.

Design input (imported this session, Jake authorized): handoff/athand-04.3-conversion.zip (untracked; handoff/ is in .gitignore; sha256 deebd763d34da660f914b83da5667a8dfc0d2f20010b758a68c21bf52be8b88c) unzipped into .planning/phases/04.3-conversion/design/, byte for byte: HOME-DESIGN-AMENDMENTS.md, COPY.md, home-reference-light.html, home-reference-dark.html, features-reference-light.html, features-reference-dark.html, og-image-reference.html, and og-image-reference.png. The zip is not committed. The reference builds' only absolute URL is the footer's outbound link to https://jacobdavis.co; they load shots from src/assets/shots/ by relative path and contain no price.

Measured this session (reference builds in Chromium through the pinned Playwright, light and dark, with the self-hosted Inter and Space Grotesk injected so widths match production):

- No horizontal scroll on either page at 320, 390, or 1280; no visible text below 16px.
- Comparison at 320: inside the 16px gutters (left 16, right 304), no element past the viewport, 2,147px tall (2,076 at 390, 663 at 1280).
- Hero chips, with the third chip set to each candidate: at 320, 390, and 840 each chip sits on its own row; at 1280 three chips share the first row and the fourth wraps. "Locked with Face ID", "Face ID lock", and "Face ID or passcode lock" all set on one line (chip 40px tall) at every width. At 320 only "One-time purchase, no subscription" wraps to two lines, whatever the third chip says.

App strings checked in the app repo at 487b454: "Check what we read", "Change anything that’s wrong before you save.", and "What we read" (components/ScanConfirm.tsx:272, :274, :331); the banner's "your recommended info is ready" (lib/contextRules.ts:35, :47); the app labels the group field "Group #" (app/scan-document.tsx:58). The banner fill is `colors.accent` in both themes (components/NudgeBanner.tsx:24).

## Locked by the brief and CLAUDE.md

- Brief, Privacy: "In-app copy may say 'Your information stays on this device'. It must not say 'nothing leaves your phone'." CLAUDE.md: never "nothing leaves your phone" or any equivalent.
- Brief, Contextual suggestions: "The banner never names a category ... The banner says only that recommended information is ready." The example keeps the app's wording, "Flight to Denver, your recommended info is ready".
- Brief, Business model and entitlement: free download, one-time purchase, no subscription. Phase 03 PAGE-03 and phase 04 VIS-09: no amount or currency anywhere on the site.
- Brief, App lock: Face ID or Touch ID with automatic device-passcode fallback; optional, on by default when the device supports it.
- Brief, Brand and Copy rules; CLAUDE.md, Copy: American English, sentence case, Oxford comma, no em dashes, no emoji, curly apostrophes; atHand in prose, @Hand only in the logo lockup.
- CLAUDE.md, Hard rules: zero third-party requests; tokens match the app's _ds tokens exactly; 17px body, 16px minimum, 44px targets, WCAG AA in both themes, no color-only meaning, 400% zoom without horizontal scroll, reduced motion honored; /privacy.html and /support.html never move.
- Jake's rules for this phase: every new string is a Copy draft citing the brief section or approved site string it comes from; each comparison cell is its own entry, neutral, naming no product or company, claiming nothing beyond what is plainly true; the hero action stays C1 and must be swappable for the App Store badge in phase 05 without a layout change; the page title and structured data do not change; no price; no new tokens or dependencies.
- Jake approved `text-wrap: balance` on the Open Graph h1 in scripts/make-og-image.mjs (DISCUSS prompt, item 3).

## Design contract: what the amendments supersede

HOME-DESIGN-AMENDMENTS.md amends phase 04's HOME-DESIGN.md (.planning/phases/04-visuals-and-polish/design/) for Home, Features, and the Open Graph image only. Exactly these parts are superseded or added; every other section of HOME-DESIGN.md stands:

1. Page order: replaced. The comparison ("Why not just…") goes between Features and the Privacy band.
2. Sections, Hero: amended. h1 max width 16ch instead of 12ch; the trust chips list after the line; the action slot (`.store-slot`, min height 56px) around the coming-soon line. Grid, gaps, line style, and the 01-home `full` hero frame unchanged.
3. Sections, Features: replaced. The five rows keep their order and h3s; the uniform `.feature` row and `.shot-panel` give way to the span, split, center, flipped split, and lock layouts, the `.stage` panel, and live cards. Shots 1, 3, and 5 leave Home; shot 2 shows only from the breakpoint; the row 4 pair is unchanged and moves onto a stage.
4. New section, Why not just…: added (list structure, below and from the breakpoint).
5. Shared parts: added (chip, stage, mock card, entity badge with an icon, 18 new icons).
6. Phone frame: amended by the Features page entry: a `theme` prop (`"light"` or `"dark"`) that renders one image and skips the theme swap.
7. Color tokens by element: rows added; no existing row changes.
8. Alt text: amended. A2 moves to the Features page top; A4 and A9r leave Home; two new alts for the Light and dark frames.
9. Other pages, Features entry: replaced. Page top with 02-person-top `full` instead of the 04 `fields` frame (which supersedes phase 04.2 decision 12 for the Features page top), the jump list moved into the page top with seven links, `section.fsec` sections with a visual beside each h2, and FE24 moved to the new "Hidden until you need it" section. Detail text otherwise unchanged.
10. Acceptance: additions.
11. Copy: the HOME-DESIGN.md copy table entries for HM2, HM3, and the row 1 line are replaced by this file's Copy drafts.
12. Open Graph image: new; HOME-DESIGN.md had no section for it (phase 04 task 04-20 and decision 25 set it up).

Unchanged, as the amendments state: constraints, breakpoint, every `--site-*` variable, header, footer, theme control, phone frame styling, link CTAs, focus ring, motion, type scale, semantics, Moments, Privacy band, Pricing, Closing, and every page other than Home and Features.

Where COPY.md (imported) and this file's Copy drafts differ, this file wins. COPY.md stays byte for byte as the design delivered it; its Source column cites a "Redesign brief" (Jake's brief to the designer), so every draft below is re-cited to a section of athand-project-brief.md or an approved site string.

## Implementation decisions

1. Phase number and folder: 04.3 "conversion" in .planning/phases/04.3-conversion/, requirements CNV-01 to CNV-07, inserted before phase 05 with no gate. Source: Jake, DISCUSS prompt item 1.
2. The design folder is imported verbatim from the zip; the zip stays untracked in handoff/. Source: Jake, DISCUSS prompt item 2.
3. Hero chip H-6 is "Face ID or passcode lock". Jake's correction (c) prefers it if it fits the chip row without wrapping at 390px; measured with the production fonts, it sets on one line at 320, 390, 840, and 1280, and does not add a chip row at any width. It is literally true of every iPhone the app runs on with a credential enrolled; Touch ID devices are covered by FE21 on Features.
4. The suggestion banner (R3-2) uses `--accent` in both themes with `--text-on-cobalt`, as the design says (7.75:1 light, 5.18:1 dark, AA). It depicts the app's banner, which uses `colors.accent` in both themes, and sits beside the hero's 01-home screenshot of the same banner. Phase 04.2 decision 8 (`--accent-press` in dark) applies to the privacy band only.
5. The atHand column's "Yes" for "Records for the whole household in one place" (W-7a) describes what the app does; creating records beyond your own needs the one-time purchase (brief, Free vs paid). Pricing (HM22, "Your own record is free. One purchase unlocks everything else.") follows two sections later, as HM3 and the hero line already rely on. No qualifier added to the cell.
6. The comparison is a list (`ul` of rows, each an h3 and a `dl` of three cells), not a table, as the design specifies: below the breakpoint each row is a card with visible column names; from it the visual header is aria-hidden and each `dt` is visually hidden but read. VoiceOver reads each row as a heading followed by "Photos of cards, Partly, …" and so on, so every answer is named by its column at every width. Verdict words carry the meaning; icons are aria-hidden.
7. The action slot keeps the `ComingSoon` component and C1 unchanged inside `.store-slot` with a 56px minimum height, so phase 05 swaps in the 48px (`--space-12`) badge without moving anything. Measured in PLAN and VERIFY as a new check (CNV-07).
8. PhoneFrame gains a `theme` prop for the two Features Light and dark frames: one `img`, no swap class, so check:a11y's one-displayed-image-per-frame rule holds and only that file loads.
9. Fixtures: the phase 04 copy fixtures (copy/index.txt, copy/features.txt) are rewritten from the Approved drafts in the EXECUTE tasks that change each page, in the same commit, so check-text passes on main after every wave. Removed strings (HM2 in main, the old row 1 line, A2 and A4 and A9r on Home, A3r on Features) become `!` or are dropped from the `alt:` set.
10. The Open Graph image is regenerated with `npm run og:image` (scripts/make-og-image.mjs, Playwright already pinned) after the h1 text and `text-wrap: balance` change; the committed PNG is checked by eye against og-image-reference.png. ICON_REF stays 60032bf.
11. No new token, site variable, or dependency. The 18 new icons are path data in Icon.astro, taken from the reference builds.

## Copy drafts

IDs follow the design's COPY.md, so the two can be compared; comparison cells get a suffix: p (Photos of cards), n (A notes app), a (atHand). Jake's corrections a to d are applied. Unchanged strings (HM5 to HM8, HM9, HM10 h3, HM11 to HM15, HM16 to HM25, HM28 to HM30, A1, A3r on Home, A8, C1, FE3 to FE30, FP3's six labels) keep their approval and are not repeated. All drafts below: Status Draft.

### Home: hero

H-1. Hero h1: "Your household’s IDs and insurance, ready on your iPhone". Replaces HM2. Brief: Concept ("personal reference information ... doctor’s office, traffic stop, airport"); Information architecture (Person: driver’s license, passport, insurance); Privacy (stored on the device). No period, as HM2. Status: Draft.

H-2. Hero line: "Keep IDs, insurance, vehicle, pet, and home details for everyone you look after in one app, organized by record instead of scattered through photos and notes." Replaces HM3. Brief: Information architecture (Person, Vehicle, Pet, Home; "Entities are nested records"); "everyone you look after" from HM3 (approved). "Scattered through photos and notes" describes the alternatives the comparison names, without a claim about how many people do it. Status: Draft.

H-3. Chip list name (aria-label, not shown): "At a glance". Names the list for screen readers. Status: Draft.

H-4. Chip: "No account". Brief: Concept (product values, "no account"); HM17. Status: Draft.

H-5. Chip: "Stored on your iPhone". Brief: Privacy ("Personal information never leaves the device, except inside a backup file the user explicitly exports and shares"); Onboarding ("Stored on device"). Status: Draft.

H-6. Chip: "Face ID or passcode lock". Jake’s correction (c); decision 3. Brief: App lock (Face ID or Touch ID with device-passcode fallback; optional, on by default). Status: Draft.

H-7. Chip: "One-time purchase, no subscription". Brief: Business model and entitlement; HM22. No amount. Status: Draft.

C1 in the action slot, unchanged (decision 7).

### Home: feature rows

R1-1. Row 1 line (h3 HM10 "Everything you look after" unchanged): "A record for each person, vehicle, pet, home, financial account, and contact, plus custom records with your own labels." Replaces "People, vehicles, pets, homes, and more, in one place." Brief: Information architecture (Person, Vehicle, Pet, Home, Financial, Contact, Custom "with user-defined labels"); FE6. Status: Draft.

R1-2. Record types list name (aria-label): "Record types". Status: Draft.

R1-3. Record type labels: "People", "Vehicles", "Pets", "Homes", "Financial accounts", "Contacts", "Custom records". Brief: Information architecture; Home ("one group per entity type"); FE6. Sentence case on the site (design decision 3). Status: Draft.

R2-1. Row 2 card title: "Check what we read". The app's screen title (ScanConfirm.tsx:272); brief, Document capture ("Shared confirmation screen, 'Check what we read'"). Status: Draft.

R2-2. Row 2 card line: "Change anything that’s wrong before you save." The app’s screen line (ScanConfirm.tsx:274); brief, Document capture ("require confirmation before saving"). Status: Draft.

R2-3. Row 2 card label: "What we read". The app’s group label (ScanConfirm.tsx:331). Status: Draft.

R2-4. Row 2 fields (sample data): "Member ID" with "XYZ000000000"; "Group number" with "00000". Brief: Information architecture (insurance: member ID, group #). "Group number" spelled out on purpose (design decision 2), matching A3r; the member ID matches HM6. Status: Draft.

A3r stays on row 2's 04 frame (from the breakpoint only). Approved, unchanged.

R3-1. Banner prefix (visually hidden, read first): "Example suggestion banner: ". Status: Draft.

R3-2. Banner: "Flight to Denver, your recommended info is ready", with "recommended" in bold. The app’s wording (lib/contextRules.ts); the same banner A1 describes. Brief: Contextual suggestions (the banner never names a category and says only that recommended information is ready). Status: Draft.

R3-3. Signals list name (aria-label): "What suggestions use". Status: Draft.

R3-4. Signal chips: "Time of day", "Your calendar, if you allow it", "Your location, if you allow it". Brief: Contextual suggestions (time of day; calendar "if permitted"; location when allowed); HM12. The same three signals HM12 names. Status: Draft.

R5-1. Unlock list name (aria-label): "Ways to unlock". Status: Draft.

R5-2. Unlock chips: "Face ID", "Touch ID", "Your passcode". Brief: App lock; HM14; FE21. Status: Draft.

Removed from Home: the old row 1 line; A2 (moves to Features); A4 (row 3 is live HTML); A9r (row 5 is a live card). Status: Removed.

### Home: comparison

W-1. h2: "Why not just use photos or notes?" Frames the section; claims nothing. Status: Draft.

W-2. Line: "Many people keep these details as photos of cards or in a notes app. Here’s how the three compare." Jake’s correction (b). Status: Draft.

W-3. Column names: "Photos of cards", "A notes app", "atHand". Generic methods, no product or company; sentence case (design decision 3). Status: Draft.

Row 1.

W-4. Row label: "Finding the right detail fast". Status: Draft.

W-5p. Photos of cards: "Partly" / "Find the photo, then zoom in to read the number." Neutral description of reading a number from a photo. Status: Draft.

W-5n. A notes app: "Partly" / "Search finds it if you typed it in." Status: Draft.

W-5a. atHand: "Yes" / "Each detail has its own labeled field." Brief: Information architecture (fields per entity; "Store each field once"); FE7. Status: Draft.

Row 2.

W-6. Row label: "Records for the whole household in one place". Status: Draft.

W-7p. Photos of cards: "No" / "Mixed in with your other photos, not organized by record." See question 1. Status: Draft.

W-7n. A notes app: "Partly" / "Up to you to set up, and not organized by record." Status: Draft.

W-7a. atHand: "Yes" / "A record for each person, vehicle, pet, and home." Brief: Information architecture; decision 5. Status: Draft.

Row 3.

W-8. Row label: "Locked behind Face ID". Status: Draft.

W-9p. Photos of cards: "Partly" / "Only if you move them to a locked album." Jake’s correction (a): the iPhone’s Photos app can lock its Hidden album. Status: Draft.

W-9n. A notes app: "Varies" / "Some apps can lock individual notes." Jake’s correction (a). Status: Draft.

W-9a. atHand: "Yes" / "Face ID, Touch ID, or your passcode." Brief: App lock (on by default when a credential is enrolled); HM14. Status: Draft.

Row 4.

W-10. Row label: "No account to create". Status: Draft.

W-11p. Photos of cards: "Yes" / "Taking a photo needs no account." Status: Draft.

W-11n. A notes app: "Varies" / "Depends on the app." Status: Draft.

W-11a. atHand: "Yes" / "No account and no sign-in." Brief: Concept ("no account"); HM17. Status: Draft.

Row 5. See question 2.

W-12. Row label: "Works without searching". Status: Draft.

W-13p. Photos of cards: "No" / "You search or scroll each time." Status: Draft.

W-13n. A notes app: "No" / "You search or scroll each time." Status: Draft.

W-13a. atHand: "Yes" / "Suggests a record when it can help, and lists your records on the home screen." Brief: Contextual suggestions; Home (entity groups as rows); FE16. Status: Draft.

### Features

F-J1. Jump list link to #hidden, between Suggestions and App lock: "Hidden until you need it". Jake’s correction (d), matching its h2 (F-H1). The six FP3 labels are unchanged and move into the page top. Status: Draft.

A2 on the Features page top (02-person-top, `full`), moved from Home, text unchanged. Approved (phase 04). A3r leaves the Features page.

F-I1. Records intro: "Everything you look after, each in its own record." Brief: Information architecture; FE6. Status: Draft.

R1-2 and R1-3 on the Records stage, as Home.

F-I2. Scanning intro: "Point your camera at a document, then check what atHand read." Brief: Document capture ("read once, populate a draft, require confirmation before saving"); FE11, FE13. Status: Draft.

R2-1 to R2-4 on the Scanning stage, as Home (card only, no screenshot).

F-I3. Suggestions intro: "atHand can suggest a record before you go looking for it." Brief: Concept ("suggests relevant stored info ... instead of requiring manual search"); FE16. Status: Draft.

R3-1 to R3-4 on the Suggestions stage, as Home.

F-H1. New h2, id "hidden": "Hidden until you need it". HM13 h3 (approved). Status: Draft.

F-I4. Hidden intro: "Sensitive numbers stay masked until you tap Reveal." HM13 line (approved); brief, Secure fields. Status: Draft.

HM28 to HM30 (the Masked and Revealed pair) on the Hidden stage, unchanged. FE24 moves here from Locked to you, unchanged.

F-I5. App lock intro: "Face ID, Touch ID, or your passcode. No password to remember." HM14 line (approved); brief, App lock. Status: Draft.

R5-1 and R5-2 on the App lock stage, as Home.

F-I6. Backups intro: "An encrypted copy of your records, saved where you choose." Brief: Backup and restore; FE26. Status: Draft.

F-B1. Backups card title and line: "Encrypted backup" / "Protected by a passphrase you choose". Brief: Backup and restore ("encrypted with a user passphrase"); FE26. Status: Draft.

F-B2. Backups card facts: "Your records and photos", "Saved wherever you like", "A one-time copy, not sync". Brief: Backup and restore ("all entity tables plus photo bytes"; "shared through the iOS share sheet"; "One-time encrypted copy, not sync"); FE26, FE27. Status: Draft.

F-I7. Light and dark intro: "Light or dark, your choice." Brief: Brand (System / Light / Dark setting); FE30. Status: Draft.

F-C1. Frame captions: "Light", "Dark". Status: Draft.

F-A1. Light frame alt (01-home, `suggest`, `theme="light"`): "Close view of the atHand home screen in Light appearance, with the Flight to Denver banner and the Suggested for you list." Checked against the `suggest` crop and A4. Status: Draft.

F-A2. Dark frame alt (01-home, `suggest`, `theme="dark"`): "The same view in Dark appearance." Read right after F-A1. Status: Draft.

### Metadata and Open Graph image

OG-1. Open Graph image h1 (public/og-image.png): "Your household’s IDs and insurance, ready on your iPhone". As H-1; with `text-wrap: balance` (Jake approved) it sets in three lines inside the 630px height (design measurement: top 143, bottom 487). Status: Draft.

OG-2. Open Graph image line: "A private household organizer for iPhone". Unchanged.

OG-3. og:image:alt, Base.astro, every page: "The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.”" Replaces the HM2 quote. Status: Draft.

Unchanged: the title "atHand: Your Info, Ready", every meta description, og:title, og:description, and the SoftwareApplication structured data (LD-1).

Copy awaits approval: every Draft above.

## Open questions for Jake

1. Comparison, row 2, Photos of cards (W-7p): "Mixed in with your other photos" is not always true, since card photos can sit in their own album. Recommended default: "No" / "Photos can share an album, but they are not organized by record." Reason: the verdict stays fair (the row asks for records, and photos are not records), and the sentence stays true for someone who already uses an album.
2. Comparison, row 5 ("Works without searching", W-12 and W-13): a notes app can pin a note to the top, photos can be marked as favorites, and atHand's own home screen list is also something you scroll, so "You search or scroll each time" is not plainly true and the atHand "Yes" leans on suggestions that appear only when something matches. Recommended default: replace the row with "Suggests a record when it can help": Photos of cards "No" / "You look it up yourself."; A notes app "No" / "You look it up yourself."; atHand "Yes" / "From the time of day and, if you allow them, your calendar and location." (HM12, FE16). Reason: it compares the one thing only atHand does, with a claim that is plainly true for both alternatives. Alternative: drop the row and keep four.
3. Screenshots that become unused: after this phase no page shows 06-lock (light and dark). 03-person-documents and the 05 pair are already unused, and 02-person-top, 01-home, 04-check-what-we-read, and 07-paywall-perks stay in use. Recommended default: keep all four unused pairs in src/assets/shots/, add 06-lock to PhoneFrame's glob exclusions beside 03 and the 05 pair so it does not ship, and keep the `lock` and `record` crop rules (a few lines, measured values documented in HOME-DESIGN.md) so a later phase can bring either back. Reason: your rule for this phase (keep in the repo, exclude from the build), and it matches how phase 04.2 left the 05 pair.
4. Price at launch: whether the site should state the price once the app is live. This is recorded for phase 05 (BACKLOG.md), not decided in this phase, which keeps no amount anywhere. Recommended default for phase 05: still no amount on the site; say "one-time purchase" and let the App Store listing show the price. Reason: the brief says the app shows the store's localized price and never a hardcoded amount; a US-dollar figure on the site would be wrong in other storefronts and would go stale if the price tier changes.

## Out of scope

- The App Store badge, link, Smart App Banner, and removing the coming-soon line (phase 05, LCH-01 to LCH-04). The action slot only reserves the space.
- Stating a price (question 4; phase 05).
- Pricing, Privacy overview, Support, the privacy policy, and 404, apart from og:image:alt in the shared layout.
- FEAT-01 (phase 04.1).
- Any change to tokens, typefaces, the page title, meta descriptions, or structured data.
- Editing HOME-DESIGN.md itself: the supersessions are recorded above and in REQUIREMENTS.md; the phase 04 contract stays as approved.
