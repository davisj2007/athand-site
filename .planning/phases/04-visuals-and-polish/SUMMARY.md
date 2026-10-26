# Phase 04: visuals-and-polish - Summary

Status: In progress. Waves 1 and 2 of 4 done.

## What changed

PLAN.md set to Approved (2026-10-25) at the start of EXECUTE wave 1; Jake approved it in the EXECUTE prompt.

Wave 1 (EXECUTE, 2026-10-25, branch execute/04-wave-1 from main at a55dcd4):

- 04-01: playwright 1.64.1 and axe-core 4.14.0 added as exact devDependencies (dependencies unchanged). scripts/check-layout.mjs serves dist/ on 127.0.0.1 and loads every page in Chromium, light and dark, at 320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and 1280 at 400%; it fails on sideways scroll, any box crossing a viewport edge, content inside the 16px gutter, and any request to another host. It exports its server and page helpers for check-a11y.mjs. `npm run check:layout`; README.md documents it and the one-time `npx playwright install chromium`.
- 04-02: scripts/check-a11y.mjs runs axe-core (default rules) on every page with reduced motion, light and dark, at 390 and 1280 wide, plus the 16px minimum, the 17px body, 44 by 44 standalone targets, and no surviving transition or animation. `npm run check:a11y`; README.md documents it.
- 04-03: site.css gains the `--site-*` variables and the single 52.5em breakpoint from HOME-DESIGN.md, `.container`, the interim `.wrap` (68ch plus the gutter), the token type scale (h1 `--text-2xl`, h2 `--text-xl`, h3 `--text-lg`, `.lede` `--text-lg`), `.vh`, `.cta`, the motion rules, and a 3px focus ring on a, button, and [tabindex]. Every fixed rem or px size, spacing, and radius now comes from a token; the 480px media query is gone.
- 04-04: the header is a grid: "logo theme" over "nav nav" below the breakpoint (nav row with a `--divider` rule, links spread and wrapping), one row "logo nav theme" from it. Nav links are 17px 600, hover to `--accent-hover` (light) or `--text-body` (dark) with a 2px underline; the current page keeps weight 700 and a 3px underline. Lockup at `--text-xl`.
- 04-05: src/components/Icon.astro (system, sun, and moon, path data from the reference builds; unknown names throw at build time). ThemeControl.astro renders each button as an icon plus a `.tlabel` span, visually hidden below the breakpoint and shown from it. The control is one segmented group with a `--border-card` border and `--surface-card` fill; the pressed button is filled `--text-body`. Base.astro is unchanged.
- 04-06: the footer uses `.container` in a wrapping flex row; text `--text-muted`, links 17px, underlined, 44px tall. Footer and `.cta` links hover to `--text-body` in dark.

Live site after this wave: every page has the new header (two rows on a phone, one row from 840px), the segmented theme control, and the new footer. Page content is unchanged and stays in its 68ch column.

Wave 1 check results (2026-10-25): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match; local app checkout at c8e21f3, origin/main still 60032bf), `npm run check:external` (no third-party requests), `npm run check:links` (62 internal links resolve), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:layout` (7 pages, 2 themes, 5 viewports: no overflow, gutters kept), `npm run check:a11y` (7 pages, 2 themes, 2 widths: no violations), check-text for index, features, pricing, privacy-overview, and support against the phase 03 fixtures, each task's verify command, and static checks S1 to S4, S7, S8, S11, S12, and S13: all pass.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-25, /features.html): at 1280 the header is one row with the lockup, the four nav links (Features current, 3px underline), and the control with labels shown; at 390 and 320 it is two rows with the icon-only control beside the lockup and the nav below a divider (at 320 Support wraps to a second nav line, as specified). Pressing Dark sets `data-theme="dark"` and aria-pressed on Dark only. On System, flipping the emulated OS appearance switches the page between light (rgb 246, 245, 241) and dark (rgb 14, 15, 19) with no `data-theme` attribute. The footer shows the four links underlined in `--text-muted` text in both themes.

Wave 2 (EXECUTE, 2026-10-25, branch execute/04-wave-2 from main at 97f202f, wave 1 merged):

- 04-07: src/assets/shots/07-paywall-perks-light.png and -dark.png, cropped with `sips -c 1208 1320 --cropOffset 172 0` (rows 172 to 1379); both are 1320 by 1208 and byte-identical to a fresh crop of the originals at 4821a36. Viewed both: each shows "Not now", the lockup, "Unlock everything atHand knows", and the four perks inside their card, ending below the card and above the price card, with no price or currency. The 07-paywall originals are deleted.
- 04-08: src/components/PhoneFrame.astro renders a figure with the light and dark images from astro:assets (WebP at 360w and 720w, explicit width and height, the hero or standard `sizes`, eager for the hero and lazy otherwise) and an optional figcaption. site.css holds the frame, the four crops by `data-crop`, the hero-only shadow, and the theme swap, which mirrors colors.css. scripts/check-text.mjs gains the `alt:` line type; README.md documents it, PhoneFrame, and the shots folder.
- 04-09: Home hero (h1, the new line, the coming-soon line, the 01-home hero frame) and the three moment cards. ComingSoon.astro now shows a phone icon before the unchanged sentence, so Features and Pricing pick it up and still pass their fixtures. Icon.astro gains phone, cross, car, plane, and arrow.
- 04-10: feature rows one to four (02-person-top, 04-check-what-we-read, the 01-home suggest crop, and the captioned 05-masked and 05-revealed pair), with even rows showing the shot first from the breakpoint by CSS order only, then the "See all features" CTA.
- 04-11: src/components/PrivacyBand.astro (full bleed, the three facts with icons, a default slot for the heading, and an "after" slot), used on Home with the CTA to /privacy-overview.html; the pricing section with the 07-paywall-perks frame; the closing with the aria-hidden mark, C1 as the h2, and HM25. Icon.astro gains person-slash, scan, and eye-slash. The last of the old Home content (the bullet list, the "Privacy in short" panel with its network disclosures, and the old pricing lines) is gone.
- 04-12: feature row five, "Locked to you", with the 06-lock pair and A9. Home passes copy/index.txt (67 lines, all eight alt texts).

Live site after this wave: Home is the new showcase (hero, moments, five feature rows, privacy band, pricing, closing) with real screenshots that follow the theme. Features and Pricing show the coming-soon line with its new icon and otherwise read as before. Every internal link resolves; no PNG is served.

Wave 2 check results (2026-10-25): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match; local app checkout at c8e21f3), `npm run check:external` (no third-party requests), `npm run check:links` (61 internal links resolve; Home lost the duplicate policy link), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:layout` (7 pages, 2 themes, 5 viewports: no overflow, gutters kept), `npm run check:a11y` (7 pages, 2 themes, 2 widths: no violations), check-text for Home against copy/index.txt and for Features, Pricing, Privacy overview, and Support against their phase 03 fixtures, each task's verify command, and static checks S1 to S9, S11 to S14, and S19: all pass. dist/ holds no PNG and no 03-person-documents file.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-25, Home): at 1280 in light, the hero shows the h1, line, coming-soon line, and the shadowed hero frame on the right; the moments sit three across; feature rows alternate sides; the band, pricing (paywall perks image, ending above the price card), and closing follow. On System, flipping the emulated OS appearance swaps all eight frames to their dark images (one visible image per frame) with no `data-theme`; pressing Light while the OS is dark shows the light images, and pressing Dark while the OS is light shows the dark images. At 768 the Masked and Revealed frames sit side by side at 240px; at 320 they stack. At 320 the band fills the width while its heading and facts start 16px from each edge, and the page does not scroll sideways. At 390 in dark the header, hero, and moment cards read as designed.

## Brief citations

Wave 2 claims on Home, each from Approved copy in CONTEXT.md (Brief v4.12 at 60032bf):

- HM2 "Your info, ready when you need it": brief, Concept.
- HM3 hero line: brief, Concept; Information architecture (self and household; people, vehicles, pets, homes).
- C1 (hero line and closing h2): Approved in phase 03 (coming-soon state).
- HM5 "For the moments you need it": brief, Concept.
- HM6 doctor’s office, insurance member ID: brief, Concept; Information architecture (Person, Medical). Values are fictional samples.
- HM7 traffic stop, driver’s license: brief, Concept; Information architecture (Person, Documents).
- HM8 airport, passport, masked with hidden text: brief, Concept; Information architecture; Secure fields; Accessibility floor.
- HM10 "People, vehicles, pets, homes, and more, in one place.": brief, Information architecture.
- HM11 scanning and "You check every field before it is saved.": brief, Document capture.
- HM12 suggestions from time of day, calendar, and location (permission-gated): brief, Contextual suggestions; no car connectivity (phase 03 decision 18).
- HM13 masked until Reveal: brief, Secure fields.
- HM14 "Face ID, Touch ID, or your passcode. No password to remember.": brief, App lock.
- HM16 "Your information stays on your iPhone": brief, Privacy (allowed wording); Business model and entitlement (paywall perk).
- HM17 "No account and no sign-in.": brief, Concept.
- HM18 "Scanning runs on your iPhone.": brief, Document capture; Privacy.
- HM19 "The developer added no advertising or tracking tools.": brief, Privacy.
- HM21 and HM22 free to start, one purchase, no subscription, no ads, no account: brief, Business model and entitlement.
- HM25 "Free to download. Your own record is free.": brief, Business model and entitlement.
- A1 to A6, A8, and A9 describe what each screenshot shows; A8 quotes the paywall perks (brief, Business model and entitlement) and A9 supports HM14 (brief, App lock).

Wave 1 changed no claims; header, nav, theme control, and footer strings are unchanged (CH1, CH2, HM26).

## Commits

- 6ef6275 phase 04 task 04-01: add check:layout and pin playwright and axe-core
- 201fb10 phase 04 task 04-02: add check:a11y
- 678b312 phase 04 task 04-03: site variables, breakpoint, container, type scale, and motion
- 056f933 phase 04 task 04-04: header in two rows, then one
- 961e8b2 phase 04 task 04-05: segmented theme control with icons
- e6a9bfe phase 04 task 04-06: footer
- a112fad phase 04 task 04-04: reword header comment for the apostrophe check
- 2337528 phase 04 task 04-07: pre-cropped paywall image
- 122fd93 phase 04 task 04-08: PhoneFrame component and alt fixture lines
- 5f5f8fa phase 04 task 04-08: keep the unused 03-person-documents pair out of the build
- 9817c72 phase 04 task 04-09: Home hero and moments
- 676ffc2 phase 04 task 04-10: Home feature rows one to four
- 49c00cf phase 04 task 04-11: privacy band, pricing, and closing on Home
- f3cac5d phase 04 task 04-12: Home feature row five and the full Home checks
- eaf7187 phase 04 task 04-08: theme pair rule outranks the screen image rule

## Deviations

- Lockup and axe label-content-name-mismatch (04-04, Header.astro and site.css). check:a11y failed on every page: the link's name is "atHand, home", but its visible content was the inline SVG (role="img", label "at") and the text "Hand", and axe requires the visible text as a whole word in the name. The name must stay "atHand" (CLAUDE.md). Fix inside the task's files: Header.astro now inlines the mark with `aria-hidden="true" focusable="false"` (as the reference builds do; the SVG file is unchanged), and "Hand" is drawn by `.lockup-word::after { content: "Hand"; }` inside the existing aria-hidden span. The lockup looks the same; VoiceOver reads "atHand, home, link" as before. Jake may prefer a different treatment; the check was not weakened.
- Theme control height (04-05). HOME-DESIGN.md asks for a 44px control with 2px inner padding, which leaves 38px buttons (the reference builds use `calc(var(--touch-min) - 6px)`). CLAUDE.md and A11Y-04 require 44px targets, and check:a11y enforces them, so each button is 44 by at least 44 and the group is 50px tall.
- `.cta` dark hover (04-06). HOME-DESIGN.md's color table gives CTA links the same hover as nav and footer links (`--text-body` in dark). 04-03 created `.cta`; the dark hover rule was added with the footer's in 04-06.
- check-layout.mjs reads `clip` with `getPropertyValue("clip")` (fixed in the 04-03 commit) because astro check hinted that the `clip` property is deprecated.
- S2 caught a straight apostrophe in a Header.astro comment from 04-04; reworded in a follow-up 04-04 commit.
- Unused screenshots shipped as PNGs (04-08, PhoneFrame.astro). The non-eager `import.meta.glob` still makes Vite emit every PNG it matches, and Astro deletes an original only after converting it, so 03-person-documents (shown on no page) would have shipped as two full PNGs, failing 04-12 and S14. The glob now excludes `03-person-documents-*.png`, with a comment; PhoneFrame throws at build time if a page asks for it. Every other shot is used on Home, so dist/ holds no PNG. A page that later shows 03-person-documents removes the exclusion.
- Both theme images rendered (04-08, site.css). `.screen img { display: block }` outranked `.shot-dark { display: none }`, so in light both images were displayed; the dark one was clipped out of view, but it was downloaded and in the accessibility tree, so each alt would be read twice. Found in the browser check; the swap rules now use `.screen img.shot-dark` and `.screen img.shot-light`, and the browser check confirms one visible image per frame in every theme state. No check caught it (see Backlog items added).
- Captions sit below the phone (04-08). PLAN puts the bezel styles on `figure.frame`, which would draw a figcaption inside the phone. PhoneFrame keeps `<figure class="frame" data-crop>` (it sets the width) and draws the bezel on an inner `.phone` div, so "Masked" and "Revealed" sit below each phone as in the reference build. The hero shadow is on `.frame[data-hero] .phone`.
- Moment record rows show "Sam Rivera" as the name at 700 and the label (for example "Insurance member ID") as the 16px subtitle, as PLAN 04-09 and HM6 to HM8 specify; the reference build has the two reversed.
- The perks frame uses `object-position: 50% 50%`, not HOME-DESIGN.md's 10.36%, as PLAN 04-08 specifies, because the derived file is already the perks region.

## Backlog items added

- 2026-10-25: check:layout and check:a11y do not notice when both theme images in a frame are displayed (wave 2 deviation above). Suggested for VERIFY: assert one displayed `img` per `.screen` in every theme state.

## Follow-ups

- Waves 3 and 4 remain (04-13 to 04-23).
- Before SHIP: whether the app repo has recorded its TestFlight VoiceOver and Dynamic Type passes (decision 21).
