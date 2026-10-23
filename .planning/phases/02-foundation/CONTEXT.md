# Phase 02: foundation - Context

Status: Needs answers
Date: 2026-10-23

## Goal

Move athandapp.com from hand-written root HTML served by GitHub Pages from the repository root to an Astro static build deployed by GitHub Actions, using the app's locked design tokens, self-hosted Space Grotesk and Inter, a System, Light, and Dark theme control, and a shared layout with the logo lockup header and a "Made by Jacob Davis" footer. The main content of every existing page stays word for word, every existing URL keeps loading, and the live site stays whole after every merge.

## Requirements in scope

FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07, FND-08, FND-09, FND-10, FND-11, FND-12, FND-13, FND-14.

## What the site does today

This repo at b1ca4f7 (main):

- Plain static HTML at the root, no build, no package.json. README.md:3 says Pages serves the repository root.
- CNAME:1 is `athandapp.com`.
- Four pages, each a full HTML document with its own copy of the head, header, and footer:
  - index.html:1-61. Title "atHand: Your Info, Ready" (index.html:6). Main at index.html:18-47.
  - privacy.html:1-104. Main at privacy.html:18-90. Outbound links to Apple, RevenueCat, and Google policies at privacy.html:73-75.
  - support.html:1-78. Main at support.html:18-64.
  - 404.html:1-39. Main at 404.html:19-25; links home only (404.html:23). Has `<meta name="robots" content="noindex">` (404.html:9).
- Shared structure repeated in each page: `lang="en"`, viewport, `meta color-scheme "light dark"`, skip link "Skip to main content" to #main (index.html:12), header with a text wordmark `at<span>Hand</span>` and `aria-label="atHand, home"` (index.html:15), footer nav labeled "Footer" with Privacy, Support, and support@athandapp.com (index.html:50-56), and the sentence "atHand is made by Jacob Davis, an individual developer in New York, United States." (index.html:57).
- styles.css:1-140. Hand-picked colors that approximate the tokens (styles.css:1-17), system font stack (styles.css:27), body 17px (styles.css:28), the wordmark is two-tone, "at" in ink and "Hand" in accent (styles.css:65-72), and the theme follows the OS only; there is no theme control.
- Gaps against CLAUDE.md in today's CSS: the footer and `.meta` text are 15px (styles.css:101, 124), below the 16px minimum.
- No third-party requests today. All outbound links are plain `<a href>`.

App repo davisj2007/athandapp at c928b40f1e721e7200383dc4f5ff2d1f87167283 (read only), design system folder `athand-design-handoff/_ds/athand-design-system-23fcf9a9-cdd0-4b1b-a220-dcc704e0a8da/`:

- tokens/colors.css:1-124. Light values in `:root`, dark values in `[data-theme="dark"]` and in `@media (prefers-color-scheme:dark) :root:not([data-theme="light"])`. Dark `--text-link` is #A99BF5; dark `--accent` is #6A57E0.
- tokens/effects.css:1-21. Besides tokens, it carries global rules: `a{color:var(--text-link);text-decoration:none}`, `a:hover{...text-decoration:underline}` (effects.css:19-20), and a reduced-motion rule that disables all animation and transition (effects.css:21).
- tokens/typography.css:1-21. Display font Space Grotesk, UI font Inter, `--text-base:17px`, and a global `body{}` rule (typography.css:21).
- tokens/spacing.css:1-22. `--touch-min:44px`.
- tokens/fonts.css:1-3. `@import` from fonts.googleapis.com with Space Grotesk 500, 600, 700 and Inter 400, 500, 600, 700, 800. Not copied (CLAUDE.md).
- theme-toggle.js:1-104. Key `athand-theme` in localStorage; `system` removes `[data-theme]`, `light` or `dark` sets it; buttons carry `data-theme-set` and get `aria-pressed`; listens for OS changes while on System.
- assets/logo-lockup-mark.svg:1-8. Short-tail "@" mark, `stroke="currentColor"`, `role="img" aria-label="at"`, viewBox 215 30 350 280.
- readme.md:30 and athand-design-handoff/README.md:128-131: the mark is single color (cobalt, ink, or white), never two-tone, and pairs with "Hand" in Space Grotesk 700 with a gap of about 6% of the cap height.
- components/Wordmark.tsx (app): the lockup uses one color for mark and text, `colors.textLink` (cobalt in light, #A99BF5 in dark), gap `fontSize * 0.06`, tracking `-0.03em`.

Measured contrast with the token values:

- Text on page: faint #6C6C64 on #F6F5F1 is 4.85:1; dark faint #8C8E96 on #0E0F13 is 5.86:1. Link #4C39C6 on paper is 7.11:1; dark link #A99BF5 on #0E0F13 is 7.93:1.
- Link against surrounding body text: 2.33:1 in light, 2.02:1 in dark. Below 3:1, so links in text need an underline to avoid color-only meaning.
- Dark `--accent` #6A57E0 on the dark page is 3.7:1 (passes the 3:1 non-text minimum, fails as text).
- `--border-card` against the page is 1.2:1 (light) and 1.38:1 (dark). Too faint to be the only boundary of a control.

Tooling found in this session: Node 22.22.0; latest published astro 7.4.2, @fontsource/inter 5.3.0, @fontsource/space-grotesk 5.3.0.

## Locked by the brief and CLAUDE.md

- Product claims must be literally true; never "nothing leaves your phone" (brief, Privacy; CLAUDE.md, Hard rules). This phase moves existing copy only.
- Zero third-party requests at runtime; every asset served from athandapp.com; outbound links allowed (CLAUDE.md).
- Copied token files match the app's _ds tokens exactly apart from a source header; fonts.css is the documented exception (CLAUDE.md; FND-04, FND-05).
- Light and dark are both required, with a System, Light, and Dark setting (brief, Brand).
- WCAG AA in both themes; 17px body; 16px minimum text; 44px targets; no color-only meaning; 400% zoom without horizontal scrolling; reduced motion honored (CLAUDE.md; brief, Accessibility floor).
- The @Hand form appears only in the logo lockup; everywhere else says atHand (CLAUDE.md; brief, Brand).
- The mark is single color, never two-tone (design system readme.md:30). Today's two-tone text wordmark goes away.
- /privacy.html and /support.html never move, rename, or redirect (CLAUDE.md).
- Copy: American English, sentence case, Oxford comma, no em dashes, no emoji, curly apostrophes (CLAUDE.md; brief, Copy rules).
- Main is live: every merge leaves the site whole (README rule 8).
- No new dependencies beyond those the PLAN names (README rule 10).

## Implementation decisions

1. Astro 7 (latest stable at PLAN time, exact version pinned in package.json and package-lock.json), `output: "static"`, `build.format: "file"`, `site: "https://athandapp.com"`, `trailingSlash: "ignore"`. Pages: src/pages/index.astro, privacy.astro, support.astro, 404.astro. Reason: FND-01; "file" format emits privacy.html and support.html at their exact URLs, and 404.astro builds to 404.html, which GitHub Pages serves for missing paths.
2. Dependencies limited to astro, @astrojs/check, typescript (required by astro check), @fontsource/space-grotesk, and @fontsource/inter. The two check scripts are plain Node (ESM, no packages). Reason: README rule 10; keeps the surface small.
3. Node 22 LTS in the workflow and an `engines` field. Reason: matches the session environment and Astro 7's supported range.
4. Workflow .github/workflows/deploy.yml named "Deploy", triggered on push to main and workflow_dispatch, using actions/checkout, actions/setup-node, actions/configure-pages, actions/upload-pages-artifact, and actions/deploy-pages, with `permissions: pages: write, id-token: write, contents: read` and a `pages` concurrency group. The build job runs `npm ci`, `npm run build`, `npm run check`, and `npm run check:external` before uploading dist/. Reason: FND-02 and FND-13; the VERIFY step refers to the "Deploy" run by name.
5. `tokens:check` does not run in the Deploy workflow. It runs in every EXECUTE, VERIFY, and FIX session and locally. Reason: the app repo is private, so CI cannot read it without a new secret, and FND-05 requires a non-zero exit when the app repo is missing.
6. Cutover order, so the live site never goes blank (README rule 8). Wave 1 adds the Astro project, the workflow, and public/CNAME while the root HTML, styles.css, and CNAME stay in place, so the branch-based deployment keeps serving the old site. The first Deploy run on main fails at the deploy job until the source changes; that is expected and harmless. Right after wave 1 merges, Jake sets Settings, Pages, Build and deployment, Source to "GitHub Actions", confirms the custom domain still reads athandapp.com, and runs Deploy from the Actions tab. A later wave removes the root HTML files, styles.css, and the root CNAME only after the Actions deployment is confirmed live. The PLAN names this step and the wave it follows. Assumption to confirm in the PLAN step: the current source is "Deploy from a branch", main, / (root), per README.md:3.
7. The custom domain for an Actions deployment is set in repository settings, not read from the CNAME file. public/CNAME still ships unchanged to satisfy FND-03 and to keep the domain recorded in the repo.
8. Token files live at src/styles/tokens/{colors,effects,spacing,typography}.css. Each begins with one header comment naming the app repo, the full source path, and the full commit hash, followed by the file byte for byte. Load order: colors, typography, spacing, effects, then fonts, then the site stylesheet. Reason: FND-04; matches the design system's styles.css order without fonts.css.
9. `scripts/tokens-check.mjs` (npm `tokens:check`): reads `ATHAND_APP_DIR` (default ../athandapp), finds the `_ds/athand-design-system-*` folder by glob so a new design system id is caught as a failure rather than silently skipped, strips the first comment block from each copied file, compares bytes, prints a unified-style diff of differing lines, prints "fonts.css: documented exception (self-hosted faces replace the Google Fonts import)", and exits 1 on any difference, a missing file, or a missing app repo. Reason: FND-05.
10. Fonts: import the @fontsource per-weight Latin CSS files for Space Grotesk 500, 600, 700 and Inter 400, 500, 600, 700, 800 (the weights fonts.css names). Astro bundles the woff2 files into dist/. Browsers download only the faces a page uses. Latin only, because the site is English and the Latin subset includes curly quotes. `font-display: swap` comes from @fontsource. Reason: FND-06; no request to Google.
11. Theme script: an inline `<script is:inline>` in `<head>` adapted from theme-toggle.js, keeping the `athand-theme` key, `data-theme-set` buttons, `aria-pressed`, the OS change listener, and the `athand:themechange` event. The control renders with the `hidden` attribute and the script removes it, so with JavaScript off there is no dead control and the page follows the OS through the tokens' media query. An inline script is first-party and makes no request. Reason: FND-07; applies before first paint.
12. Theme control markup: a group (`role="group"`, accessible name "Appearance") of three `<button type="button">` elements with visible text "System", "Light", and "Dark", each at least 44 by 44 px. Pressed state shows a solid fill (ink background with paper text, as the design system's active chip) and `aria-pressed="true"`; each button has a 3:1 boundary using `--text-faint`, not `--border-card`. Text labels, no icons, because the only sanctioned icon set loads from a CDN. Placed at the right of the header; wraps below the lockup at narrow widths and at 400% zoom.
13. Explicit themes also set the CSS `color-scheme` property (`[data-theme="light"]` to light, `[data-theme="dark"]` to dark) in the site stylesheet, and the meta tag stays `light dark`, so scrollbars and form controls match the chosen theme.
14. Header lockup: the mark SVG copied byte for byte to src/assets/logo-lockup-mark.svg, inlined through Astro's `?raw` import so `currentColor` works, followed by "Hand" in Space Grotesk 700 with -0.03em tracking and a gap of 0.06em. Mark and text share `color: var(--text-link)` (cobalt in light, #A99BF5 in dark), matching the app's Wordmark.tsx. The link keeps `aria-label="atHand, home"`, which overrides the SVG's own "at" label. Reason: FND-09; single color per the design system.
15. Site stylesheet src/styles/site.css, loaded after the tokens, replaces styles.css. It restores underlines on links in main and footer (overriding effects.css:19, since link and body text are only 2.0 to 2.3:1 apart), uses `--text-link` for links and a 3px focus outline, sets body to Inter 400 at `--text-base` (17px), headings to Space Grotesk, raises footer and `.meta` text to 16px, keeps the 68ch measure and current spacing, and adds no animation. The tokens' reduced-motion rule stays in force. Reason: CLAUDE.md accessibility rules.
16. Base layout src/layouts/Base.astro with props `title`, `description`, and optional `noindex`. It sets `lang="en"`, charset, viewport, `meta color-scheme`, title, description, the theme script, the skip link, `<header>`, `<main id="main">`, and `<footer>`. Each page passes its current title and description unchanged. 404 keeps `noindex`. Reason: FND-08.
17. Page bodies are moved, not rewritten: each page's main content is pasted from the current root HTML, markup and text intact. FND-12 is checked by a script in the PLAN that extracts the visible text of `<main>` from the pre-port file on main (b1ca4f7) and from dist/, normalizes whitespace, and requires an exact match.
18. FND-11 is met without changing the 404 main content: its main links home (404.html:23) and the shared footer links to Support. This keeps FND-12 exact for the 404 page.
19. `scripts/check-external.mjs` (npm `check:external`): walks dist/ HTML and CSS, collects `src`, `srcset`, `<link href>`, `<script src>`, CSS `url()`, and `@import`, allows relative URLs, root-relative URLs, `data:` URLs, and absolute URLs on athandapp.com, ignores `<a href>`, and exits 1 listing each offender. Reason: FND-13.
20. README.md is rewritten to cover the build, local preview, the Deploy workflow and the one-time Pages source setting, `tokens:check` with `ATHAND_APP_DIR`, and `check:external`. Reason: FND-14.
21. Root `.gitignore` adds node_modules/, dist/, and .astro/.

## Copy drafts

Existing strings that move unchanged are not drafts: the skip link "Skip to main content", the logo link name "atHand, home", the footer nav name "Footer", the footer links "Privacy", "Support", and "support@athandapp.com", every page title and description, and all main content.

New or changed strings in this phase. None is a product claim.

1. Footer / credit: "Made by Jacob Davis", linked to https://jacobdavis.co. Source: ROADMAP phase 02 and FND-10 (not a brief claim). Status: Draft.
2. Header / theme control group accessible name (not visible): "Appearance". Brief: Business model and entitlement, Free vs paid ("appearance" setting); Brand (System / Light / Dark setting). Status: Draft.
3. Header / theme control buttons: "System", "Light", "Dark". Brief: Brand ("with a System / Light / Dark setting"). Status: Draft.
4. Footer / removed: "atHand is made by Jacob Davis, an individual developer in New York, United States." See open question 1. Status: Draft (removal).

## Open questions for Jake

1. The footer today ends with "atHand is made by Jacob Davis, an individual developer in New York, United States." The roadmap adds "Made by Jacob Davis" linking to jacobdavis.co. Should the new credit replace that sentence, or should both appear? Recommended default: replace it. Reason: the two would repeat each other on every page, and the privacy policy keeps the full identification (Jacob Davis, individual developer, New York) in its "Who this applies to" section, which is where App Review looks for it.

## Out of scope

- New pages, navigation, and any new marketing copy (phase 03).
- Screenshots, phone frame, Open Graph image, favicon, apple-touch-icon, sitemap, robots.txt, and JSON-LD (phase 04).
- The full accessibility audit with axe and VoiceOver (phase 04). This phase still meets the CLAUDE.md floor for what it builds.
- App Store badge, link, and the apple-itunes-app meta tag (phase 05).
- Any change to main content wording, including the privacy policy.
