# Roadmap: athandapp.com

Status values: Not started / In progress / Done / Blocked.

Every phase traces to athand-project-brief.md in the app repo and follows the hard rules in CLAUDE.md.

## 01 policy-correction: Done

Requirements: POL-01..03.
Delivered by davisj2007/athand-site#2 (branch fix/privacy-accuracy), merged to main.
Exit: the privacy policy, support page, and home copy match the brief's Privacy section, including RevenueCat purchase verification and ML Kit's anonymous diagnostics.

## 02 foundation: Not started

Requirements: FND-01..14.

- Astro with static output. build.format is set to "file" so /privacy.html and /support.html keep their exact URLs, and the 404 page builds to /404.html.
- A GitHub Actions workflow builds the site and deploys it to GitHub Pages on every push to main. Jake switches the Pages source to GitHub Actions in the repo settings; the PLAN names exactly when, so the live site never goes blank between the merge and the switch.
- CNAME moves to public/CNAME, unchanged (athandapp.com).
- Tokens: colors.css, effects.css, spacing.css, and typography.css copied verbatim from the app repo's athand-design-handoff/_ds/athand-design-system-*/tokens/, each with a header comment naming the app repo commit it came from. fonts.css is not copied: it imports Google Fonts from a CDN, which CLAUDE.md forbids, so the self-hosted faces below replace it and the token check reports it as a documented exception.
- An npm script, tokens:check, diffs each copied token file (header removed) against the app repo and fails on any difference.
- Space Grotesk and Inter self-hosted from npm packages, limited to the weights the tokens use.
- A System, Light, or Dark theme control adapted from the design system's theme-toggle.js, applied before first paint.
- A base layout, a header with the logo lockup SVG, a footer with "Made by Jacob Davis" linking to https://jacobdavis.co, and a 404 page.
- index.html, privacy.html, support.html, and 404.html ported with their content unchanged. The root styles.css and the old root HTML files are removed once their content lives in Astro.
- check:external fails the build check if dist/ requests anything from a host other than athandapp.com.

Exit: the live site is built and deployed by GitHub Actions, looks and reads the same as before apart from the new header, footer, fonts, tokens, and theme control, and every existing URL still loads.

## 03 pages-and-copy: Not started

Requirements: PAGE-01..08.

- Home, Features, Pricing, a Privacy explainer, and an expanded Support and FAQ (still at /support.html).
- All copy is drafted in DISCUSS, approved by Jake in ANSWERS, and traceable to a cited section of athand-project-brief.md.
- Pricing says "one-time purchase" and states no amount.
- The coming-soon state stays until phase 05.

Exit: every new page is live with Approved copy only, each claim cited in the PR, and the full privacy policy still at /privacy.html.

## 04 visuals-and-polish: Not started

Requirements: VIS-01..04, SEO-01..04, A11Y-01..06.

- Design Ref screenshots from athand-design-handoff/screenshots as placeholders, replaced by simulator captures from app phase 06 when they exist.
- A CSS phone frame that swaps between light and dark with the theme.
- An Open Graph image, a favicon, and an apple-touch-icon made from the app icon.
- A sitemap, robots.txt, SoftwareApplication JSON-LD, and metadata that separates atHand from "Athan".
- An accessibility audit: axe, VoiceOver in Safari, 400% zoom, both themes, and reduced motion.

Exit: the audit passes with no open issues and Jake signs off the browser checklist.

## 05 launch-flip: Blocked (gated on App Store approval)

Requirements: LCH-01..04.

- The official App Store badge, used per Apple's marketing guidelines.
- The App Store link.
- The apple-itunes-app meta tag with app-id=6817842698.
- Removal of the coming-soon state.

Gate: do not start DISCUSS until the prompt states that Apple approved atHand and the listing is live.

Exit: every page that mentions availability points to the live listing, and no coming-soon wording remains.

## Order

01 done. Next 02, then 03, 04, and 05 once Apple approves the app.
