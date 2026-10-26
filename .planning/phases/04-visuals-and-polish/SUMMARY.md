# Phase 04: visuals-and-polish - Summary

Status: In progress. Waves 1, 2, and 3 done; wave 4 done except 04-23, which is blocked (see Blockers).

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

Wave 3 (EXECUTE, 2026-10-26, branch execute/04-wave-3 from main at d4dda1c, wave 2 merged):

- 04-13: src/components/PageTop.astro (a labelled section with the h1 `#page-title`, a default slot for the lede and anything after it, and a "visual" slot beside the copy from the breakpoint, below it otherwise) and src/components/JumpList.astro (a labelled nav of 44px, wrapping, underlined in-page links). site.css gains the page-top grid (h1 `--text-2xl` at every width), the band h1, `.prose` (68ch, line height 1.6, h2 `--text-xl` with `--space-12` above, h3 `--text-lg`), `.page-text`, `.jump`, `.fact-row`, `.contact-card`, and `.shot-panel.overlap`.
- 04-14: Features page top (h1, lede, coming-soon line) with 04-check-what-we-read in front of 02-person-top from the breakpoint (02 is `display: none` below it), then the "On this page" jump list and the six sections unchanged, each h2 with its id.
- 04-15: Pricing page top with the 07-paywall-perks frame, the three-item fact row, then the existing sections unchanged. No amount anywhere.
- 04-16: Privacy overview uses PrivacyBand as its page top, with the h1 and lede in the band and the three facts below them, no CTA; every disclosure follows in full, ending with the link to /privacy.html.
- 04-17: Support page top with the S4 lede and the contact card ("Email support" and the mailto link at `--text-lg`, 44px), then the jump list to the seven FAQ groups and the existing text unchanged, each group h2 with its id. The page still builds to /support.html.
- 04-18: /privacy.html and /404.html sit in `.container` > `.prose.page-text`; their main text is unchanged. `.wrap` is gone from src/.

Live site after this wave: Features, Pricing, Privacy overview, and Support have their page tops with their existing text below in the prose column; /privacy.html and /404.html read as before under the new chrome. /support.html and /privacy.html keep their URLs.

Wave 3 check results (2026-10-26): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match; local app checkout at c8e21f3, origin/main still 60032bf), `npm run check:external` (no third-party requests), `npm run check:links` (61 internal links resolve), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:layout` (7 pages, 2 themes, 5 viewports: no overflow, gutters kept), `npm run check:a11y` (7 pages, 2 themes, 2 widths: no violations), check-text for all five pages against the phase 04 fixtures (S10: index 67, features 48, pricing 30, privacy-overview 30, and support 81 lines match), each task's verify command, static checks S1 to S14 and S19, and a script check that every `href="#..."` in dist/ has a matching id: all pass.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-26): at 1280 in light, the Features panel shows 02-person-top at left with 04-check-what-we-read 40px lower, in front, overlapping it by 32px, beside the copy; the Pricing paywall frame sits beside its copy and the three fact cards run one row below; the Support contact card sits beside its lede. At 390 in dark, Features shows only the 04 frame below the copy (one visible image), Support shows the card below the lede and the jump list wrapping to three lines, and Pricing stacks the fact cards. At 320 in light, the privacy overview band fills the width with the h1 and lede 16px from each edge. On Support, following the Purchases jump link puts the h2 at the top of the view and the next Tab focuses "See Pricing", the first link in that section, so keyboard focus continues from the section.

Wave 4 (EXECUTE, 2026-10-26, branch execute/04-wave-4 from main at 2410273, wave 3 merged):

- 04-19: public/favicon.png (48 by 48), public/favicon-32.png (32 by 32), and public/apple-touch-icon.png (180 by 180, no alpha), all from the app repo's assets/icon.png at 60032bf3848847b642443a59178ee40e385c9850 (`git -C ~/dev/athandapp show 60032bf:assets/icon.png`; origin/main confirmed at that commit). Commands: `sips -z 48 48` and `sips -z 32 32` for the favicons; `sips -z 180 180`, then `sips -s format jpeg -s formatOptions best`, then `sips -s format png` for the apple-touch-icon. Intermediates were made in the session scratchpad and deleted. Base.astro links all three on every page.
- 04-20: scripts/make-og-image.mjs and `npm run og:image` render public/og-image.png (1200 by 630) in Playwright's Chromium from the token CSS, the @fontsource Space Grotesk 700 and Inter 500 faces (file:// URLs), the app icon at 60032bf (data: URL), and the inline lockup mark. Light theme, flat `--surface-page` ground, no gradient or shadow. Every request that is not file: or data: is aborted and fails the run; the run made none. Viewed the PNG: the icon at left; at right the lockup, "Your info, ready when you need it" on two lines, and "A private household organizer for iPhone", all legible, nothing clipped, no other words. README.md documents how and when to regenerate it.
- 04-21: Base.astro adds canonical and og:url (the page's permanent URL; none on 404, which keeps noindex), og:type, og:site_name, og:title, og:description, og:image with width, height, and alt (M2), and twitter:card on every page.
- 04-22: src/pages/sitemap.xml.ts builds /sitemap.xml with the six indexable pages in order (no 404, no lastmod); public/robots.txt allows all and names the sitemap. README.md lists both under Layout.
- 04-23: not done. Blocked; see Blockers.

Live site after this wave: every page has a favicon, an apple-touch-icon, and Open Graph and Twitter tags, and every page but 404 has a canonical link; /sitemap.xml and /robots.txt exist. Nothing a visitor reads changes. Home has no JSON-LD yet.

Wave 4 check results (2026-10-26): `npm ci`, `npm run build` (7 pages and sitemap.xml), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match; local app checkout at c8e21f3, origin/main still 60032bf), `npm run check:external` (no third-party requests), `npm run check:links` (61 internal links resolve), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:layout` (7 pages, 2 themes, 5 viewports: no overflow, gutters kept), `npm run check:a11y` (7 pages, 2 themes, 2 widths: no violations), check-text for all five pages against the phase 04 fixtures (S10), the verify commands of 04-19 to 04-22, and static checks S1 to S7, S9 to S15, S17, and S18: all pass. S16 covers 04-19 and 04-21; its 04-23 part waits for that task.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-26): on Home the head links /favicon.png, /favicon-32.png, and /apple-touch-icon.png, and the canonical is https://athandapp.com/; the four icon and image files, /robots.txt, and /sitemap.xml each return 200 with an image, text, or XML type; the Open Graph and Twitter tags read as M1 and M2. /og-image.png displays as described above. The pane's screenshots do not show the tab strip, so the favicon in the tab itself was not seen; it is on Jake's VERIFY checklist.

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

Wave 3 places no new claims. The page tops reuse Approved strings already on each page (FE3, FE4, P3, P4, V3, V4, S3, S4, and C1) and on Home (HM17 to HM19 in the privacy overview band; A2, A3, and A8 alt text, cited above). New strings and their sources:

- PP2 "Free to download" / "Your own record is free" / "One purchase unlocks everything else": brief, Business model and entitlement (free download; Free vs paid; one-time purchase unlocks full use).
- FP2, FP3, SU1, SU3, and SU4 (jump list names and links, "Email support"): navigation labels, not claims. SU2 repeats the S4 address.

Wave 4 metadata strings, each from Approved copy in CONTEXT.md:

- M1 og:title and og:description: each page’s approved title and description, unchanged (phase 03 citations stand).
- M2 og:image:alt: describes the image; not a claim.
- M6 Open Graph image text: the lockup (the @Hand form, allowed as the logo), "Your info, ready when you need it" (brief, Concept; Brand), and "A private household organizer for iPhone" (brief, Concept; Privacy; Current milestone, iPhone only).

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
- aa91ee7 phase 04 task 04-13: PageTop and JumpList components, prose column, and page-top styles
- bd70fe0 phase 04 task 04-14: Features page top and jump list
- 21077f3 phase 04 task 04-15: Pricing page top and fact row
- 69724b7 phase 04 task 04-16: Privacy overview band as page top
- 73638db phase 04 task 04-17: Support contact card and jump list
- e6351a0 phase 04 task 04-18: privacy policy and 404 in the prose column, .wrap removed
- a5427cd phase 04 task 04-13: reword JumpList comment for the apostrophe check
- c443ea2 phase 04 task 04-19: favicon and apple-touch-icon
- 261d826 phase 04 task 04-20: Open Graph image
- cabe0bf phase 04 task 04-21: canonical, Open Graph, and Twitter tags
- 6e515f5 phase 04 task 04-22: sitemap and robots.txt

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
- S2 caught a straight apostrophe in a JumpList.astro comment from 04-13; reworded in a follow-up 04-13 commit.
- Features overlap frames are 200px wide from the breakpoint (not the 300px `--site-phone`), so two overlapping frames and the copy column both fit at 840px. Below the breakpoint the one visible frame keeps `--site-phone`.
- Privacy policy and 404 wrapper: PLAN gives `.page-text` the vertical padding `.wrap` had; `.prose` carries the bottom padding for every page and `.page-text` adds the top, so the result matches `.wrap`.
- The fact row items are text only, without the moment cards' icon circle, since PP2 names no icons.
- The perks frame uses `object-position: 50% 50%`, not HOME-DESIGN.md's 10.36%, as PLAN 04-08 specifies, because the derived file is already the perks region.
- 04-19's verify command uses `set -- $x` to split each pair, which zsh (this Mac's shell) does not word-split; it was run under bash as written and passed.
- 04-20 writes the in-memory HTML to a temporary file in the OS temp directory and loads it by file:// URL, because Chromium blocks file:// stylesheets and fonts from a page set with `setContent` (about:blank). The file is deleted after the screenshot; nothing is added to the repo but the PNG.
- 04-20 loads only the two faces the image uses (Space Grotesk 700 and Inter 500), not all nine.

## Blockers

- 04-23 (JSON-LD on Home) cannot pass as planned. The block must carry `"@context": "https://schema.org"` (decision 16), and scripts/check-external.mjs reports every absolute URL inside an inline `<script>` as a third-party request, so `npm run check:external` fails ("dist/index.html: inline <script>: https://schema.org"). The Deploy workflow runs check:external, so merging 04-23 as written would stop the site from publishing. The JSON-LD is data the browser never fetches, so this is a false positive, but the fix is in scripts/check-external.mjs, which PLAN.md lists as not changed. Jake chose to stop (2026-10-26). 04-23's edits were reverted; nothing of it is committed. Suggested REVISE: add scripts/check-external.mjs to 04-23's files, skip the body of `<script type="application/ld+json">` blocks while still checking every other inline script and any `src`, and add verify cases proving a JSON-LD block with https://schema.org passes and an inline script with a third-party URL still fails.

## Backlog items added

- 2026-10-25: check:layout and check:a11y do not notice when both theme images in a frame are displayed (wave 2 deviation above). Suggested for VERIFY: assert one displayed `img` per `.screen` in every theme state.

## Follow-ups

- 04-23 remains, after a REVISE resolves the check:external blocker.
- Before SHIP: whether the app repo has recorded its TestFlight VoiceOver and Dynamic Type passes (decision 21).
