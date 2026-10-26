# Phase 04: visuals-and-polish - Context

Status: Ready
Date: 2026-10-25

## Goal

Turn athandapp.com into a visual showcase of the app, as defined by design/HOME-DESIGN.md (the design contract, approved direction from Jake on 2026-10-25): real App Store screenshots in a theme-aware phone frame, a rebuilt Home (hero, moments, features, privacy band, pricing, closing), a new header and footer, and a "page top" on every other page. The phase also carries the polish items it always held: an Open Graph image, a favicon and apple-touch-icon from the app icon, a sitemap, robots.txt, SoftwareApplication JSON-LD, metadata that separates atHand from "Athan", the full accessibility audit, and FEAT-01. Every new string is drafted here and approved by Jake in ANSWERS. The coming-soon state stays, no price appears anywhere, and /privacy.html and /support.html keep their URLs.

## Requirements in scope

VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, VIS-06, VIS-07, VIS-08, VIS-09, VIS-10, VIS-11, SEO-01, SEO-02, SEO-03, SEO-04, A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, FEAT-01.

## What the site does today

This repo at f68edc1 (main, phase 03 shipped), plus the design bundle imported in this session:

- Design bundle, imported from handoff/athand-home-design/ (Jake, this session): .planning/phases/04-visuals-and-polish/design/HOME-DESIGN.md, home-reference-light.html, and home-reference-dark.html; src/assets/shots/, 14 PNGs (01-home, 02-person-top, 03-person-documents, 04-check-what-we-read, 05-masked, 05-revealed, 07-paywall; light and dark), each 1320 by 2868 and byte-identical to handoff/screenshots/ on Jake's local branch handoff/app-store-screenshots (f30a31e). The reference HTML loads nothing from another host and has no scripts. handoff/ is now in .gitignore.
- 06-lock: at DISCUSS, handoff/screenshots/ held the 1179 by 2556 capture, so it was not copied. In ANSWERS (2026-10-25) Jake captured a new pair; both files are 1320 by 2868 with a 9:41 status bar and show only the lockup, "atHand is locked.", and an Unlock button (checked this session). They are now src/assets/shots/06-lock-light.png (sha1 71542ab) and 06-lock-dark.png (sha1 cdde473), byte-identical to handoff/screenshots/ (decision 19).
- 07-paywall: both PNGs show the price card ("$7.99", "One time. Yours to keep.") below the perks. HOME-DESIGN.md hides it with a CSS crop only, which still serves a file containing the price (decision 9).
- Layout, src/layouts/Base.astro:18-130: title, description, and noindex props (:18-24); current-path logic (:25); the theme script, which sets or removes [data-theme] on html and shows the hidden control (:36-122); skip link, Header, main#main, Footer (:125-128). No Open Graph, Twitter, canonical, icon, or JSON-LD tags.
- Header, src/components/Header.astro:17-29: lockup link with aria-label "atHand, home" (:19), nav "Main" with Features, Pricing, Privacy, Support and aria-current (:20-26), ThemeControl (:27).
- Theme control, src/components/ThemeControl.astro:1-5: group "Appearance", three text buttons System, Light, Dark with aria-pressed, shipped hidden.
- Footer, src/components/Footer.astro:1-12: nav "Footer" with Privacy policy, Support, and the support address (:3-9), then "Made by Jacob Davis" (:10).
- Coming soon, src/components/ComingSoon.astro:1, used on Home, Features, and Pricing.
- Home, src/pages/index.astro:5-44: the phase 03 text page (H3 to H21): lede (:8), moments paragraph (:11-12), four feature bullets (:14-23), "Privacy in short" panel with the network disclosures (:25-37), pricing paragraph (:39-43).
- Features, src/pages/features.astro: h1 (:7), lede (:8), six h2 sections (:11, :17, :23, :29, :35, :40).
- Pricing, src/pages/pricing.astro:5-39: h1, lede, coming soon, four h2 sections, Support link. No amount.
- Privacy overview, src/pages/privacy-overview.astro: h1 (:6), lede (:7), five h2 sections (:9, :14, :24, :30, :34) including every network disclosure.
- Support, src/pages/support.astro: h1 (:6), lede with mailto (:7), "What to include in your message" (:9), and seven FAQ groups (:18, :38, :58, :69, :83, :91, :102).
- Privacy policy, src/pages/privacy.astro, and 404, src/pages/404.astro:4-13: text only. check-main-text.mjs (:10-12) still compares both pages' main text with the pre-port HTML.
- Styles, src/styles/site.css:1-218: 68ch .wrap with 1.25rem padding (:21-25); header flex row (:56-66); nav (:86-115); text-button theme control (:117-137); fixed rem heading sizes (:143-160) with one max-width 480px query (:215-218); .panel (:170-176); .links (:178-190); footer (:192-213). No site variables, no breakpoint in em, no image styles.
- Checks: scripts/check-text.mjs reads a fixture per page (phase 03 fixtures in .planning/phases/03-pages-and-copy/copy/); check-links.mjs, check-external.mjs, check-main-text.mjs, tokens-check.mjs. astro.config sets site "https://athandapp.com".
- Tokens: every variable HOME-DESIGN.md names exists in src/styles/tokens/ (checked this session: spacing 2 to 12, text-base to text-2xl, radius-phone, radius-card, radius-control, radius-chip, logo-floor, badge-size, entity-person, text-on-cobalt, text-on-ink, surface-chip, shadow-soft, tracking-label, dur-fast, dur-base, ease-standard, touch-min, accent-hover, white, and the rest).
- No accessibility tooling: Playwright and axe-core are not installed (phase 03 VERIFY.md:35), so axe has never run on this site (decision 22).

App repo davisj2007/athandapp at 60032bf3848847b642443a59178ee40e385c9850 (origin/main, read only):

- athand-project-brief.md is Brief v4.12, unchanged since phase 03. Sections cited below: Current milestone, Concept, Brand, Copy rules, Accessibility floor, Business model and entitlement, Information architecture, Document capture, Secure fields, App lock, Contextual suggestions, Privacy, Release requirements.
- assets/icon.png: 1024 by 1024 with an alpha channel; the source for VIS-04 and the Open Graph image.
- docs/store/metadata.md: subtitle "Private household organizer"; its notes say the subtitle names the use so results read clearly next to prayer-time apps, and that no religious terms appear (decision 14).
- .planning/STATE.md: phase 07 (release acceptance) is at EXECUTE done, VERIFY not run. The TestFlight VoiceOver and Dynamic Type passes are listed in phase 07's checklist but not recorded as done, so FEAT-01 stays gated (decision 21).
- athand-design-handoff/screenshots/: the Design Ref placeholders VIS-01 originally named. Superseded by the App Store captures above; not used.

## Locked by the brief and CLAUDE.md

- Every product claim is literally true and cites a brief section; never "nothing leaves your phone" or an equivalent (brief, Copy rules and Privacy; CLAUDE.md).
- "Your information stays on this device" is the brief's allowed form; the site says "on your iPhone" (brief, Privacy; phase 03 CONTEXT.md, Locked).
- No price or currency anywhere: the paywall shows the store's localized price, never a hardcoded amount (brief, Business model and entitlement; HOME-DESIGN.md, Constraints; phase 03).
- No religious or devotional imagery; metadata disambiguates from "Athan" (brief, Brand).
- Brand: cobalt accent, paper, ink, flat, borders first, at most one soft shadow, no gradients, circular entity badges (brief, Brand). HOME-DESIGN.md uses one shadow, on the hero frame only.
- Zero third-party requests at runtime; every asset from athandapp.com (CLAUDE.md).
- Tokens match the app's _ds tokens exactly; no new tokens in this repo (CLAUDE.md; Jake's answer 2).
- WCAG AA in both themes, 17px body, 16px minimum, 44px targets, no color-only meaning, 400% zoom without horizontal scroll, reduced motion honored (CLAUDE.md; HOME-DESIGN.md, Constraints).
- American English, sentence case, Title Case group labels, Oxford comma, no em dashes, no emoji, curly apostrophes (CLAUDE.md; brief, Copy rules).
- @Hand appears only in the logo lockup; prose, titles, metadata, and alt text say atHand (CLAUDE.md; brief, Brand).
- /privacy.html and /support.html never move (CLAUDE.md).
- The coming-soon state stays until phase 05 (PAGE-08; ROADMAP).
- No out-of-scope feature appears (brief, Current milestone, Out of scope).
- Every merge leaves the site whole (README rule 8).

## Implementation decisions

1. Home privacy band drops the network disclosures (today's H16) and the second link (H18 "Read the full privacy policy"). They stay in full on /privacy-overview.html, and the footer keeps "Privacy policy". Source: Jake's answer 1, this session.
2. The 56px desktop hero (`calc(var(--text-xl) * 2)`) and the 96px desktop section gap (`calc(var(--space-12) * 2)`) are computed values in site.css. No token is added to the app's design system or to src/styles/tokens/. Source: Jake's answer 2.
3. New copy from HOME-DESIGN.md is drafted below for approval in ANSWERS, each claim with its brief citation. Source: Jake's answer 3.
4. The redesign is folded into phase 04 under its existing name, 04-visuals-and-polish. ROADMAP.md and REQUIREMENTS.md are rewritten for it (VIS-01 to VIS-11, plus the carried SEO, A11Y, and FEAT-01 items). Phase 05 is unchanged. Source: Jake's answer 4 and this session's authorization.
5. HOME-DESIGN.md is the build contract. The reference HTML is a design reference only; where they differ, HOME-DESIGN.md wins. Production uses `@media (min-width: 52.5em)`, not the reference's container queries. Reason: HOME-DESIGN.md, Files in this folder.
6. Known reference defects are not reproduced, and the plan checks for both: (a) below 840px every section after the hero keeps the `--site-gutter` side padding, including the inner container of the full-bleed privacy band; (b) at 320px no feature row, shot panel, or two-figure masked and revealed pair overflows. The check loads the built pages at 320, 390, and 768 CSS px wide, and at a 1280px window at 400% zoom, in light and dark, and fails if the document scrolls horizontally, any element's box extends past the viewport, or any main section's content starts less than 16px from either viewport edge. Source: Jake, this session.
7. Screenshots go through astro:assets as WebP at 360w and 720w with explicit width and height, `loading="eager"` on the hero and `lazy` elsewhere, and the sizes HOME-DESIGN.md gives. The PNGs live in src/assets/shots/; only images a page imports are emitted. Reason: HOME-DESIGN.md, Phone frame; zero third-party requests.
8. Theme pairs follow HOME-DESIGN.md: two img elements per frame (.shot-light, .shot-dark) swapped under [data-theme] and under prefers-color-scheme with `:root:not([data-theme="light"])`, mirroring colors.css. Both carry the same alt; the hidden one is display none, so the accessibility tree reads one per frame.
9. The paywall is served pre-cropped. Two derived files, src/assets/shots/07-paywall-perks-light.png and -dark.png, are cut from the 07-paywall PNGs to the perks region (ending above the price card), and only these are imported. Once the two 07-paywall-perks files exist, src/assets/shots/07-paywall-light.png and 07-paywall-dark.png are deleted from the repo in the same task (Jake's answer 4), so no file containing the price remains to be imported, and no file the site serves contains a price, even with CSS off. The derived files are made with macOS `sips` (no new dependency), and PLAN records the exact crop. The `perks` crop in PhoneFrame then shows the whole derived image. Reason: brief, Business model and entitlement (no hardcoded amount); HOME-DESIGN.md, Acceptance ("No price or currency ... in any image shown"); this narrows HOME-DESIGN.md's "one file per screen" for this one screen; deleting the originals is Jake's answer 4, an addition to this decision.
10. Copy fixtures for phase 04 live in .planning/phases/04-visuals-and-polish/copy/, one per page whose main text changes (index, features, pricing, privacy-overview, support). Phase 03 fixtures stay as the record of that phase. check-main-text.mjs keeps covering privacy and 404, whose main text must not change.
11. Moment card badges ("P") and every icon are `aria-hidden="true"`; the record name and label carry the meaning, so the entity color is never the only signal. Reason: brief, Accessibility floor (entity color paired with a label); HOME-DESIGN.md, Semantics.
12. Other pages: the privacy overview's page top is the privacy band with the h1 "How atHand handles your information" (V3) in place of the band's h2, then the existing lede (V4), then the three facts; it has no CTA, since the CTA would link to itself. All existing disclosures follow unchanged, ending with V24's link to /privacy.html. Reason: HOME-DESIGN.md, Other pages; the title (V1) and h1 stay in agreement.
13. Metadata: every page gets a canonical link, og:title (the page title), og:description (the meta description), og:url, og:type "website", og:site_name "atHand", og:image (one site-wide 1200 by 630 PNG) with og:image:alt, and twitter:card "summary_large_image". 404 keeps noindex and gets no canonical. Reason: VIS-03; FND-08 pattern.
14. Athan disambiguation is done by naming the use, never by naming Athan, prayer, or any religious term, matching the App Store metadata's approach (athandapp docs/store/metadata.md, notes). Titles stay as approved; the JSON-LD description and the Open Graph image line carry "household organizer" wording (M4, M6). Reason: brief, Brand; SEO-04 permits but does not require disambiguating wording, and naming Athan would put the site into prayer-app searches.
15. Sitemap and robots: src/pages/sitemap.xml.ts builds /sitemap.xml with the six indexable pages (/, /features.html, /pricing.html, /privacy-overview.html, /privacy.html, /support.html), not 404. public/robots.txt allows all and names https://athandapp.com/sitemap.xml. No @astrojs/sitemap dependency. Reason: SEO-01, SEO-02; README rule 10.
16. JSON-LD: one SoftwareApplication block on the home page only, with name "atHand", alternateName "atHand: Your Info, Ready", operatingSystem "iOS", applicationCategory "UtilitiesApplication" (the App Store primary category is Utilities), description M5, url https://athandapp.com/, and no offers or price. Reason: SEO-03; brief, Business model and entitlement.
17. Favicon and apple-touch-icon: public/favicon.png (48 by 48), public/apple-touch-icon.png (180 by 180, opaque), and a 32 by 32 favicon, all resized from athandapp assets/icon.png at 60032bf with `sips`; SUMMARY.md records the source commit. Reason: VIS-04; no new dependency.
18. The Open Graph image is a static 1200 by 630 PNG in public/, built from the app icon and the lockup SVG on a token-colored ground with no gradient; PLAN names the tool. Its text is M6. Reason: VIS-03; brief, Brand.
19. 06-lock: the 1320 by 2868 pair is in src/assets/shots/ (see What the site does today). PLAN uses `crop="full"` for Home's fifth feature row ("Locked to you") with the light and dark images and alt A9; the row has no placeholder. The live site never shows the placeholder. PhoneFrame need not implement the `placeholder` crop for this phase. If the pair proved unusable at EXECUTE, the fallback is the fifth row with text only and no shot panel until a correct pair arrives, the swap being one task. Source: Jake's answer 1.
20. Wave order (each leaves the live site whole; detail in PLAN):
    - Wave 1, foundation and chrome: site variables, the 52.5em breakpoint, the shared container and gutter, type scale, the new header (two rows, then one), the segmented theme control with icons, the new footer, the link CTA style, and the layout check script (decision 6). Existing pages keep their content under the new chrome.
    - Wave 2, phone frame and Home: PhoneFrame.astro, the paywall crop (decision 9), and Home rebuilt in HOME-DESIGN.md order with Approved copy and alt text; the index fixture replaced.
    - Wave 3, other pages: the .prose column, page tops for Features, Pricing, Privacy overview, and Support, the Pricing fact row, the Support contact card, and both jump lists; privacy and 404 under the new chrome with main text unchanged; their fixtures.
    - Wave 4, metadata: favicon, apple-touch-icon, Open Graph image and tags, canonical links, sitemap, robots.txt, and JSON-LD.
    - FEAT-01 is not in the planned waves (decision 21).
    - VERIFY then runs the full audit (A11Y-01 to A11Y-06).
21. FEAT-01 stays out of PLAN's waves. If the app repo records its TestFlight VoiceOver and Dynamic Type passes before SHIP, a REVISE adds a small wave for the Features accessibility section, with its copy drafted and approved then. Otherwise SHIP moves FEAT-01 to a new inserted phase 04.1. Source: Jake's answer 2.
22. PLAN may add pinned devDependencies `playwright` (with its Chromium) and `axe-core`, used only by check scripts (the layout check in decision 6 and the axe run for A11Y-01). Neither is imported by any page or shipped to dist/; check:external continues to prove dist/ makes no third-party request. Source: Jake's answer 3.
23. Copy edits from Jake in ANSWERS: HM16 is "Your information stays on your iPhone" with no period; HM21 is "Free to start" with no period; HM24 keeps C1 verbatim, with its period. All other Draft copy is approved as drafted. A7 (the placeholder) is withdrawn because the placeholder no longer ships (decision 19). Source: Jake, ANSWERS.
24. A9, the 06-lock alt text, was drafted in ANSWERS after the pair arrived. Jake's answer 1 sets its approval for the next ANSWERS or REVISE, so PLAN may proceed with A9 Draft. The task that places the fifth row names A9 and cannot be checked until A9 is Approved; if Jake edits it, that task uses the edited text. Jake approved A9 as drafted in REVISE on 2026-10-25. Source: Jake's answer 1; Jake, REVISE.
25. Task 04-20 uses Playwright (the pinned dev dependency from decision 22) once at authoring time to render public/og-image.png, because `sips` cannot set type. Only the committed static PNG reaches dist/. Source: Jake, REVISE (2026-10-25).

## Copy drafts

Brief citations are to Brief v4.12 at 60032bf. "Approved (H3)" means the string was approved in phase 03 under that ID and is reused unchanged. Every Draft entry needs Jake's approval in ANSWERS. Jake approved the phase 04 drafts in ANSWERS on 2026-10-25, with the edits in decision 23, and approved A9 as drafted in REVISE on 2026-10-25. All values on the moment cards are fictional samples matching the screenshots' sample household.

### Shared

CH1. Theme control buttons (existing labels, now beside an icon): "System", "Light", "Dark"; group name "Appearance". Not claims. Status: Approved (phase 02).
CH2. Header nav and footer: unchanged (N1, N2, F1, and the footer links). Status: Approved (phase 03).
CH3. Coming-soon line: "Coming soon to the App Store for iPhone." Brief: Current milestone. Status: Approved (C1).

### Home (/index.html)

HM1. Title and meta description: unchanged (H1, H2). Status: Approved.
HM2. Hero h1: "Your info, ready when you need it". Brief: Concept. Status: Approved (H3).
HM3. Hero line: "The details you look up all the time, for you and everyone you look after, in one place on your iPhone." Replaces H4. Brief: Concept; Information architecture (self and household; people, vehicles, pets, homes). Status: Approved.
HM4. Hero and closing coming-soon line: C1. Status: Approved.
HM5. Moments h2: "For the moments you need it". Brief: Concept. Status: Approved (H5).
HM6. Moment 1: h3 "At the doctor’s office"; label "Insurance member ID"; record "Sam Rivera"; value "XYZ000000000". Brief: Concept (doctor’s office); Information architecture (Person, Medical, insurance member ID). Status: Approved.
HM7. Moment 2: h3 "At a traffic stop"; label "Driver’s license"; record "Sam Rivera"; value "D000-0000-0000". Brief: Concept (traffic stop); Information architecture (Person, Documents, driver’s license number). Status: Approved.
HM8. Moment 3: h3 "At the airport"; label "Passport"; record "Sam Rivera"; value shown as masked dots, with the hidden text "Passport number, hidden until you tap Reveal". Brief: Concept (airport); Information architecture (passport number); Secure fields (passport number masked by default, Reveal); Accessibility floor (masked values announce as hidden). Status: Approved.
HM9. Features h2: "What it does". Not a claim. Status: Approved (H7).
HM10. Feature 1: h3 "Everything you look after"; line "People, vehicles, pets, homes, and more, in one place." Brief: Information architecture (Person, Vehicle, Pet, Home, Financial, Contact, Custom). Status: Approved.
HM11. Feature 2: h3 "Scan instead of typing"; line "Licenses, passports, insurance cards, VINs, and more. You check every field before it is saved." Brief: Document capture (Tier A and Tier B; confirm before saving). Heading reuses FE10. Status: Approved (line).
HM12. Feature 3: h3 "The right record at the right time"; line "Suggestions from the time of day and, if you allow them, your calendar and location." Brief: Contextual suggestions (Device only signals; calendar and location permission-gated); phase 03 decision 18 (no car connectivity). Heading reuses FE15. Status: Approved (line).
HM13. Feature 4: h3 "Hidden until you need it"; line "Sensitive numbers stay masked until you tap Reveal."; figure captions "Masked" and "Revealed". Brief: Secure fields (masked by default with Reveal / Hide). Status: Approved.
HM14. Feature 5: h3 "Locked to you"; line "Face ID, Touch ID, or your passcode. No password to remember." Brief: App lock (Face ID / Touch ID with device-passcode fallback; no in-app password, ever). Heading reuses FE20. Status: Approved (line).
HM15. Link: "See all features" (to /features.html). Status: Approved (H12).
HM16. Privacy band h2: "Your information stays on your iPhone" (no period; Jake's edit, decision 23). Brief: Privacy (allowed wording "Your information stays on this device"; the site’s "on your iPhone" form, phase 03 Locked); Business model and entitlement (paywall perk). Status: Approved.
HM17. Privacy fact 1: "No account and no sign-in." Brief: Concept (no account). Status: Approved.
HM18. Privacy fact 2: "Scanning runs on your iPhone." Brief: Document capture (ML Kit on the device); Privacy (no scans, photos, or recognized text are sent). Same claim as approved FE12 and V8. Status: Approved.
HM19. Privacy fact 3: "The developer added no advertising or tracking tools." Brief: Privacy (no analytics, advertising, tracking, or crash-reporting SDKs). A narrower form of approved H17. Status: Approved.
HM20. Privacy band link: "How atHand handles your information" (to /privacy-overview.html). Status: Approved (H18, first link).
HM21. Pricing h2: "Free to start" (no period; Jake's edit, decision 23). Brief: Business model and entitlement. Same as H19. Status: Approved.
HM22. Pricing line: "Your own record is free. One purchase unlocks everything else. No subscription, no ads, no account." Brief: Business model and entitlement (Free vs paid; one-time purchase; paywall perk "One purchase. No subscription, no ads, no account."). Replaces H20. Status: Approved.
HM23. Link: "See pricing" (to /pricing.html). Status: Approved (H21).
HM24. Closing h2: "Coming soon to the App Store for iPhone." C1 verbatim, with its period, the one heading on the site that ends in a period (Jake, decision 23). Status: Approved (C1).
HM25. Closing line: "Free to download. Your own record is free." Brief: Business model and entitlement (free download; self record free). Status: Approved.
HM26. Footer: unchanged. Status: Approved.
HM27. Removed from Home: H4 (replaced by HM3), H6 (the moments paragraph, replaced by HM6 to HM8), H8 to H11 (replaced by HM10 to HM14), H13 "Privacy in short", H14, H15, H16 (network disclosures; decision 1), H17 (replaced by HM19), H18’s second link "Read the full privacy policy", H19 (replaced by HM21), H20 (replaced by HM22). Status: Approved (removal).

### Alt text and placeholder

A1. 01-home, hero: "The atHand home screen. A banner reads “Flight to Denver, your recommended info is ready.” Below it are a search field, three suggested records, Your People with Sam Rivera, and Your Vehicles with a 2020 Honda Civic." Checked against the screenshot this session. Status: Approved.
A2. 02-person-top: "Sam Rivera’s record in atHand. A Personal section lists full name, relationship, and date of birth, followed by Medical and Documents sections, each with Scan and Upload buttons." Checked. Status: Approved.
A3. 04-check-what-we-read: "The “Check what we read” screen after scanning an insurance card. It shows the card photo with a Retake photo link, three fields read from it (Member ID, Group number, and Insurance phone), and a Save to Person, Medical button." Checked. Status: Approved.
A4. 01-home, suggest crop: "Close view of the atHand home screen. A banner reads “Flight to Denver, your recommended info is ready,” and a Suggested for you list shows Flight to Denver tomorrow at 8:00 AM, Vet for weekend errands, and a recently viewed contact." Checked. Status: Approved.
A5. 05-masked: "A home record named Maple Street house. The alarm code and Wi-Fi password show as dots, each with a Reveal button." Status: Approved.
A6. 05-revealed: "The same home record after tapping Reveal. The alarm code shows 0000 with a Hide button, and the Wi-Fi password stays masked." Checked. Status: Approved.
A7. 06-lock placeholder: visible text "06-lock" and "Lock screen, 1320 by 2868"; aria-label "Placeholder for the atHand lock screen screenshot". Not claims. Status: Withdrawn (decision 19; the placeholder does not ship).
A8. 07-paywall, perks crop: "The atHand unlock screen, headed “Unlock everything atHand knows.” Its list reads: add your household, vehicles, pets, homes, and more; scan documents for every record, not just yours; your information stays on this device; one purchase, no subscription, no ads, no account." Checked; the derived image ends above the price (decision 9). Status: Approved.
A9. 06-lock, full, light and dark (both share it): "The atHand lock screen. The atHand logo sits in the center, and below it the line “atHand is locked.” appears above an Unlock button." Checked against both files this session; the logo shows the @Hand lockup, but the alt text says atHand (CLAUDE.md). Not a claim beyond what the screen shows; supports HM14 (brief, App lock). Status: Approved (REVISE, 2026-10-25; decision 24).

### Features (/features.html)

FP1. Page top: h1 FE3, lede FE4, and C1, unchanged; visual 04-check-what-we-read over 02-person-top with alt A3 and A2 (A2’s frame is hidden below 840px). Status: Approved strings; alt as A2, A3.
FP2. Jump list name (not visible): "On this page". Not a claim. Status: Approved.
FP3. Jump list links, in page order: "Records", "Scanning", "Suggestions", "App lock", "Backups", "Light and dark". Each links to its h2 (FE5, FE10, FE15, FE20, FE25, FE29). Not claims. Alternative: use each full h2 as the link text. Status: Approved.

### Pricing (/pricing.html)

PP1. Page top: h1 P3, lede P4, and C1, unchanged; visual 07-paywall perks crop with alt A8. Status: Approved strings; alt as A8.
PP2. Fact row, three items in moment-card style: "Free to download" / "Your own record is free" / "One purchase unlocks everything else". Brief: Business model and entitlement (free download; Free vs paid; one-time purchase unlocks full use). No amount. Status: Approved.

### Privacy overview (/privacy-overview.html)

PV1. Page top band: h1 V3, lede V4, then the three facts HM17, HM18, and HM19 (decision 12). No new strings beyond those entries. Status: Approved (placement).

### Support (/support.html)

SU1. Contact card h2: "Email support". Not a claim. Status: Approved.
SU2. Contact card link: "support@athandapp.com" (mailto), as in S4. Status: Approved (S4).
SU3. Jump list name (not visible): "On this page". Status: Approved.
SU4. Jump list links, in page order: "Backups", "Purchases", "App lock", "Scanning", "Suggestions", "Permissions and your data", "About atHand". Identical to the FAQ group headings S9, S20, S33, S40, S47, S52, and S57. Not claims. Status: Approved.

### Privacy policy and 404

No new strings. Main text unchanged (check-main-text.mjs).

### Metadata (every page)

M1. og:title and og:description: each page’s approved title and meta description, unchanged. og:site_name: "atHand". Status: Approved (reuse).
M2. og:image:alt: "The atHand logo and the words “Your info, ready when you need it.”" Not a claim. Status: Approved.
M3. JSON-LD name "atHand"; alternateName "atHand: Your Info, Ready". Brief: Brand (name; App Store listing name). Status: Approved.
M4. JSON-LD applicationCategory "UtilitiesApplication"; operatingSystem "iOS". Brief: Current milestone (iOS, iPhone only). Status: Approved.
M5. JSON-LD description: "A private household organizer for iPhone. atHand keeps the details you look up all the time, for you and everyone you look after, and suggests the right record when it can help." Brief: Concept (contextual surfacing); Information architecture; Current milestone (iPhone); Privacy ("private": personal information stays on the device). Status: Approved.
M6. Open Graph image text: the lockup (@Hand, allowed as the logo), then "Your info, ready when you need it" (H3) and "A private household organizer for iPhone". Brief: Concept; Brand; Privacy. Status: Approved.

### Accessibility section (FEAT-01)

Not drafted. The app repo has not recorded its TestFlight VoiceOver and Dynamic Type passes (athandapp .planning/STATE.md at 60032bf). See decision 21.

## Open questions for Jake

None. Questions 1 to 3 are answered in decisions 19, 21, and 22.

Copy awaiting approval: none. A9 was approved in REVISE (decision 24).

## Out of scope

- Changes to the main text of /privacy.html and /404.html.
- New tokens in the app's design system (decision 2).
- App Store badge, App Store link, the apple-itunes-app meta tag, and removing the coming-soon line (phase 05).
- 03-person-documents on any page (available for a later Features enhancement, per HOME-DESIGN.md).
- The optional small crop beside each Features h2 (HOME-DESIGN.md, "Optional later").
- Any statement of price.
