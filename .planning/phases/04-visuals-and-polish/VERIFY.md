# Phase 04: visuals-and-polish - Verify

Result: PASS
Date: 2026-10-26

Run on branch verify/04-visuals-and-polish from main at 7555835 (wave 4 finish, PR #33, merged), local Node 26.11.1, Playwright 1.64.1 with its Chromium, axe-core 4.14.0. App repo checkout at ~/dev/athandapp: HEAD c8e21f3, origin/main 60032bf (the commit CONTEXT.md read); `git diff 60032bf origin/main -- athand-project-brief.md` is empty. PLAN.md: all 24 tasks in waves 1 to 4 are checked. The copy/ fixtures are unchanged since REVISE (79fe208), whose only fixture change was the A9 comment line in index.txt.

## Automated checks

- `npm ci`: pass. Same fsevents install-scripts notice as earlier phases; no effect on the build.
- `npm run build`: pass, 7 pages.
- `npm run check`: pass, 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, prints the fonts.css exception line and "4 files match c8e21f3818118c276f9135b817f44ca325d6ca64".
- `npm run check:external`: pass, 8 files scanned, no third-party requests.
- `npm run check:links`: pass, 61 internal links resolve.
- `npm run check:content`: pass for privacy and 404 against 52d8d1a.
- `npm run check:layout`: pass, "7 pages, 2 themes, 5 viewports: no overflow, gutters kept" (320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and 1280 at 400%, in light and dark).
- `npm run check:a11y`: pass, "7 pages, 4 theme states, 2 widths: no violations". This is axe-core with default rules on every page in light and dark at 390 and 1280 px, plus the 17px body, 16px minimum text, 44px standalone target, and reduced-motion checks, plus one displayed image per `.screen` in light, dark, and System with the OS light and dark.
- Static checks S1 to S15 and S18, each run exactly as written in PLAN.md and parsed straight from it: all exit 0 (S1 dashes, S2 straight apostrophes, S3 "@Hand", S4 "nothing leaves" wording, S5 prices in text, alt, meta, and JSON-LD, S6 out-of-scope words and the subscription and sync sentence list, S7 permanent URLs, S8 check:content, S9 coming-soon counts, S10 check-text on the five pages, S11 token variables only, S12 one em breakpoint and no text under 16px, S13 tokens and dependencies, S14 no served image can show a price, S15 no religious wording, S18 no script but the JSON-LD block). check-text counts against the phase 04 fixtures: index 67 lines, features 48, pricing 30, privacy-overview 30, support 81.
- S16 and S17: the verify commands of 04-19, 04-21, 04-22, and 04-23 re-run and pass, including 04-23's three check-external fixture cases (JSON-LD with https://schema.org passes; an inline script with https://example.com and a JSON-LD script with a third-party `src` both fail with the expected messages).
- S19: check:layout and check:a11y pass (above), and 04-24's verify re-runs and passes, so its fixture page without theme CSS still fails with "screen shows 2 images".

### Task verify commands re-run

Every task's verify command from 04-01 to 04-24 was re-run on the final tree. 21 pass as written. Three fail only because a later planned task changed what they assert, and the later check covers the same intent:

- 04-05 requires `git diff --quiet 4821a36 -- src/layouts/Base.astro`. Base.astro changed in 04-19, 04-21, and 04-23 by additions only (icon links, canonical, Open Graph and Twitter tags, and the head slot); the theme script is untouched. With the diff clause removed, the rest of 04-05's verify passes.
- 04-09 fails "svg not hidden" on the closing mark, the lockup SVG with role="img" that 04-11 step 4 deliberately wraps in `<span class="closing-mark" aria-hidden="true">`, which removes it from the accessibility tree (confirmed in the ARIA snapshot below; axe passes). With that span excluded, the rest of 04-09's verify passes.
- 04-12 requires no PNG in dist/. Wave 4 adds public/favicon.png, favicon-32.png, apple-touch-icon.png, and og-image.png on purpose; S14 is the final form of this check (no PNG but those four) and passes. Every other clause of 04-12's verify passes.

### Copy order and heading levels

Fixtures prove presence, not order or level, so each page was read as a Playwright ARIA snapshot at 1280 px (landmarks, headings with levels, figures, images, and links) against CONTEXT.md, Copy drafts:

- Home: region "Your info, ready when you need it" with h1 HM2, lede HM3, C1, and the hero figure (A1); region h2 HM5 with three list items, h3 HM6, HM7, and HM8, each with "Sam Rivera", its label, and its value (HM8's value read as "Passport number, hidden until you tap Reveal"); region h2 HM9 with five h3 rows HM10 to HM14 in order, figures A2, A3, A4, A5 with caption "Masked", A6 with caption "Revealed", and A9, then the HM15 link to /features.html; region h2 HM16 with the three facts HM17 to HM19 and the HM20 link to /privacy-overview.html; region h2 HM21 with HM22, HM23 to /pricing.html, and A8; region h2 HM24 (C1) with HM25. In order. Each figure exposes exactly one image.
- Features: region h1 "Features" with the lede, C1, and the overlap figures A3 then A2; nav "On this page"; six h2 in FP3 order. In order.
- Pricing: region h1 "Pricing" with P4, C1, and A8; the fact row (Free to download, Your own record is free, One purchase unlocks everything else); four h2 (Free, One-time purchase, Your purchase and your Apple ID, Backups never unlock). In order.
- Privacy overview: region h1 V3 inside the band with V4 and the three facts; five h2 and three h3 under "When atHand connects to the internet", as in phase 03. In order.
- Support: region h1 S3 with the S4 lede and the contact card (h2 SU1, the SU2 mailto); nav "On this page"; "What to include in your message", then the seven group h2 with every h3 question as in phase 03. In order.
- Privacy policy and 404: under the new chrome with main text unchanged (check:content); one h1, no skipped level.
- Every page: skip link, banner with "atHand, home", navigation "Main", group "Appearance" with System, Light, and Dark buttons (System pressed by default), main, contentinfo with navigation "Footer".

### Browser and design comparison

Playwright Chromium against a local server on dist/ (every request stayed on that server). Full-page screenshots of Home, Features, Pricing, Privacy overview, and Support at 390 and 1280 px in light and dark, with the pages scrolled first so lazy images load, compared with HOME-DESIGN.md:

- Home at 1280: hero copy left and the 340px hero frame right with its shadow; three moment cards in one row; five feature rows alternating text and panel, the Masked and Revealed pair side by side; the full-bleed cobalt band with the side gutter kept; pricing with the perks image ending above the price card (no price visible); the closing mark, h2, and line centered.
- Home at 390: one column; the header in two rows (lockup and icon-only theme control, then the four links); every section after the hero keeps the 16px gutter; the feature panels, the Masked and Revealed pair, and the band fit with no overflow.
- Page tops at 1280 in dark: Pricing shows the title, lede, and coming-soon line beside the perks frame, then the three-card fact row and the prose column; Support shows the contact card beside the title and the wrapping jump list; Features and Privacy overview match their page-top specs.
- Every visible `.screen` image loaded after scrolling, in every capture. The one exception reported was the second Features overlap frame at 390, which the layout hides whole below the breakpoint, as planned.
- Theme pairs: on Home at 390 on System, all eight frames show the `shot-light` image with the OS in light and switch to `shot-dark` when the emulated OS appearance flips to dark, with no reload.
- Live site: Deploy run 40328228472 on main (head 7555835) succeeded. https://athandapp.com/, /features.html, /pricing.html, /privacy-overview.html, /privacy.html, /support.html, /sitemap.xml, /robots.txt, /og-image.png, /favicon.png, and /apple-touch-icon.png return 200; an unknown path returns 404; live Home carries one JSON-LD block.

## Requirement evidence

- VIS-01: PASS. src/pages/index.astro:38, :81, :90, :99, :108, :109, :118, and :139 place the eight frames from src/assets/shots/ (1320 by 2868 pairs; the perks pair pre-cropped). src/components/PhoneFrame.astro:47-48 emits WebP at 360w and 720w with width and height; 04-09, 04-10, and 04-12 verifies confirm eager on the hero and lazy elsewhere with the planned sizes; S10 confirms every alt is Approved text (A1 to A9). 06-lock is the 1320 by 2868 pair (index.astro:118), with no placeholder.
- VIS-02: PASS. PhoneFrame.astro:44 sets `data-crop`; site.css:408-413 swaps the pair on the explicit theme and on the OS setting under System; check:a11y finds exactly one displayed image per `.screen` in all four theme states; the ARIA snapshot shows one image per figure, so the hidden image is out of the accessibility tree.
- VIS-03: PASS. public/og-image.png is 1200 by 630 (04-20); src/layouts/Base.astro:40-50 writes canonical, Open Graph, and Twitter tags; 04-21's verify passes on all seven pages (404 without canonical or og:url).
- VIS-04: PASS. public/favicon.png (48), favicon-32.png (32), and apple-touch-icon.png (180, no alpha) were generated from the app repo's assets/icon.png at 60032bf; Base.astro:37-39 links them on every page; 04-19's verify passes.
- VIS-05: PASS. src/styles/site.css:16 holds the single `@media (min-width: 52.5em)` override with the calc() hero and section values; 04-03's verify, S11, S12, and S13 pass (token variables only, one breakpoint, no font size under 16px, no custom property outside `--site-*`).
- VIS-06: PASS. site.css:129 and :202 give the two-row then one-row header; src/components/ThemeControl.astro:10-12 keeps the hidden group with aria-pressed and the icon and label buttons; 04-04, 04-05 (minus the superseded Base.astro diff clause), and 04-06 verifies pass; check:a11y finds no target under 44px.
- VIS-07: PASS. index.astro:30, :43, :71, :126, :131, and :144 give hero, moments, features (five rows in order), band, pricing, and closing; the ARIA outline above matches the Copy drafts order; 04-11's verify confirms no RevenueCat, Google, or geocoding wording and no /privacy.html link in Home main, while /privacy-overview.html still names them (04-16).
- VIS-08: PASS. features.astro:18 and :29, pricing.astro:8 and :17, privacy-overview.astro:6, and support.astro:17, :19, and :27 place the page tops, jump lists, fact row, band, and contact card; check-text passes against the phase 04 fixtures; check:content confirms /privacy.html and /404.html main text unchanged.
- VIS-09: PASS. S5 finds no price in any page's text, alt, meta, or JSON-LD; S14 confirms the paywall originals are gone and dist/ serves no PNG but the four icon and OG files; the screenshots show the perks image ending above the price card.
- VIS-10: PASS. check:layout passes at 320, 390, 768, and 1280 px and 1280 at 400% in light and dark with no horizontal scroll, nothing past the viewport, and the 16px gutter kept; the 390 screenshots show every section after the hero inside the gutter.
- VIS-11: PASS. Every page string matches an Approved entry (S10 and the outline above); fixtures are unchanged since REVISE. The wave PRs list the claims with their brief sections: PR #29 (wave 2), PR #30 (wave 3), and PRs #31 and #33 (wave 4 metadata). Wave 1 (PR #28) placed no product claims.
- SEO-01: PASS. dist/sitemap.xml lists the six pages in order (04-22 verify); dist/robots.txt references it; both return 200 live.
- SEO-02: PASS. robots.txt is `User-agent: *`, `Allow: /`, and the Sitemap line (04-22 verify).
- SEO-03: PASS. index.astro:29 emits one SoftwareApplication JSON-LD block with name atHand, operatingSystem iOS, applicationCategory UtilitiesApplication, and no offers or price; 04-23's verify parses it to exactly the planned keys; no other page has one.
- SEO-04: PASS. The JSON-LD alternateName and the titles and descriptions are unchanged Approved metadata; S15 finds no athan, adhan, prayer, or other religious wording in any HTML, XML, or TXT file in dist/.
- A11Y-01: PASS. axe-core reports no violations on all seven pages in light and dark at 390 and 1280 px (check:a11y).
- A11Y-02: PASS for everything automation can show; VoiceOver itself is checklist step 13. The ARIA snapshots give every page named landmarks (banner, Main, main, Footer, contentinfo, plus "On this page" on Features and Support), one h1, no skipped levels, named links, one image per frame with its alt, and the theme buttons in a group named "Appearance" with pressed state.
- A11Y-03: PASS. check:layout includes 1280 at 400% (320 by 200 CSS px at 4x) on every page in both themes with no horizontal scroll or overflow.
- A11Y-04: PASS. axe color-contrast passes in both themes, including the privacy band; check:a11y confirms 17px body, nothing under 16px, and 44px standalone targets; links in main and the footer are underlined and the current nav link uses weight and a 3px underline.
- A11Y-05: PASS. check:a11y runs with reduced motion and finds every transition and animation duration at 0s.
- A11Y-06: PASS for the audit, recorded here; Jake's browser result is recorded at SHIP.
- FEAT-01: not in scope for these waves (decision 21). As of this session nothing tells VERIFY whether the app repo has recorded its TestFlight VoiceOver and Dynamic Type passes; Jake answers that before SHIP, and SHIP either adds it by REVISE or moves it to phase 04.1. Not counted as a gap.

## Browser acceptance checklist for Jake

Run after this PR merges and the Deploy workflow on main finishes green, on https://athandapp.com.

1. On a Mac in Safari, open https://athandapp.com with the window wider than about 840px. The header is one row: the "@" mark with "Hand" at left, then Features, Pricing, Privacy, and Support, then a single bordered control with System, Light, and Dark, each with an icon and a word. The heading reads "Your info, ready when you need it", with a phone screenshot to its right.
2. Scroll the home page top to bottom. You see three cards (At the doctor’s office, At a traffic stop, At the airport), then "What it does" with five rows that alternate text and a phone screenshot, then a full-width purple band titled "Your information stays on your iPhone", then "Free to start" with an unlock screen that shows no price, then a centered closing line "Coming soon to the App Store for iPhone." Every screenshot shows a real app screen, never an empty frame.
3. Press Dark, then Light. Every screenshot on the page switches to its dark or light version at once, and only one version of each shows at a time. Press System at the end.
4. With System pressed, open System Settings, Appearance, and switch between Light and Dark while Home is open. The page colors and every screenshot follow the OS each time without a reload.
5. Click Features, Pricing, Privacy, and Support in turn. Features has a page heading with two overlapping screenshots and an "On this page" list of links; Pricing has its heading beside the unlock screenshot and three cards (Free to download, Your own record is free, One purchase unlocks everything else); Privacy opens with the purple band holding the page heading and three facts; Support has an "Email support" card beside its heading and an "On this page" list. The current page's header link is bold with a thick underline.
6. On Features and Support, click each link in the "On this page" list. The page jumps to that section each time.
7. Type https://athandapp.com/privacy.html and https://athandapp.com/support.html into the address bar. Each loads at that exact address with no redirect. The privacy policy reads as before, under the new header and footer. Open https://athandapp.com/does-not-exist: a "Page not found" page appears with the same header and footer.
8. Look at the browser tab: it shows the atHand icon. On iPhone, Share, Add to Home Screen: the preview shows the atHand icon on a solid background, not a blank or default square.
9. Paste https://athandapp.com into a Messages conversation to yourself (or any app that previews links). The preview shows the atHand image with "Your info, ready when you need it". You do not need to send it to anyone else.
10. Open https://athandapp.com/sitemap.xml and https://athandapp.com/robots.txt. The sitemap lists the six pages; robots.txt allows everything and names the sitemap.
11. Narrow the Safari window to its smallest width, or use an iPhone. The header becomes two rows (logo and the theme icons, then the four links), the theme control shows icons only, and nothing scrolls sideways. On Home the "Masked" and "Revealed" screenshots stack or sit side by side without overflowing, and the purple band's text keeps a margin from the screen edges.
12. Keyboard only: reload, then press Tab. "Skip to main content" appears with a visible outline; press Return and focus moves to the page content. Reload and keep pressing Tab (turn on "Press Tab to highlight each item on a webpage" in Safari, Settings, Advanced, if Tab skips links). Focus moves lockup, Features, Pricing, Privacy, Support, System, Light, Dark, then the links in the page, then the footer links, each with a visible outline, including on the white links inside the purple band.
13. VoiceOver in Safari on Mac (Command-F5) on Home: open the rotor (Control-Option-U). Landmarks lists banner, a navigation named "Main", main, a navigation named "Footer", and contentinfo. Headings lists one heading 1, then level 2 sections with the moments and feature rows at level 3. Move through the page with Control-Option-Right Arrow: each screenshot is read once, as its description (for example "The atHand home screen. A banner reads..."), never twice; the small "P" badges, icons, and the closing "@" mark are not read; the hidden passport number is read as "Passport number, hidden until you tap Reveal". The theme buttons read as toggle buttons in a group named "Appearance", with the pressed one marked selected, even when the window is narrow and only icons show. Repeat the Landmarks and Headings check on Features and Support, where an extra navigation named "On this page" appears.
14. Zoom: press Command-Plus until Safari reaches its largest zoom (aim for 400%) on Home, Features, Pricing, Privacy, and Support. No horizontal scrolling and no clipped or overlapping text; screenshots shrink to fit, and every link and button stays clickable.
15. Turn on System Settings, Accessibility, Display, Reduce motion, and reload. Switching themes changes colors instantly with no fade, and nothing on the site animates.
16. Open Develop, Show Web Inspector, Network, and reload each of the seven pages, scrolling to the bottom of Home so every screenshot loads. Every request goes to athandapp.com; nothing goes to any other host.
17. On iPhone in Safari, repeat steps 2, 3, 4 (switch the iPhone between Light and Dark in Control Center while on System), 5, and 11. Nothing scrolls sideways, and each header link and theme button is easy to tap without hitting its neighbor.

## Jake's browser result

PASS (recorded at SHIP, 2026-10-26). Jake ran every checklist step on https://athandapp.com after the VERIFY PR merged (merge be8769b, PR #34) and the Deploy workflow finished; all steps pass. A11Y-06 is complete.

FEAT-01 at SHIP: the app repo has not recorded its TestFlight VoiceOver and Dynamic Type passes (davisj2007/athandapp phase 07 VERIFY not yet run; origin/main still 60032bf), so per decision 21 FEAT-01 moved to the new phase 04.1 in ROADMAP.md and REQUIREMENTS.md, gated on those passes.
