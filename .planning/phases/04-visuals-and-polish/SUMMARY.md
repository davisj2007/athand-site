# Phase 04: visuals-and-polish - Summary

Status: In progress. Wave 1 of 4 done.

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

## Brief citations

None. Wave 1 changed no claims; header, nav, theme control, and footer strings are unchanged (CH1, CH2, HM26).

## Commits

- 6ef6275 phase 04 task 04-01: add check:layout and pin playwright and axe-core
- 201fb10 phase 04 task 04-02: add check:a11y
- 678b312 phase 04 task 04-03: site variables, breakpoint, container, type scale, and motion
- 056f933 phase 04 task 04-04: header in two rows, then one
- 961e8b2 phase 04 task 04-05: segmented theme control with icons
- e6a9bfe phase 04 task 04-06: footer
- a112fad phase 04 task 04-04: reword header comment for the apostrophe check

## Deviations

- Lockup and axe label-content-name-mismatch (04-04, Header.astro and site.css). check:a11y failed on every page: the link's name is "atHand, home", but its visible content was the inline SVG (role="img", label "at") and the text "Hand", and axe requires the visible text as a whole word in the name. The name must stay "atHand" (CLAUDE.md). Fix inside the task's files: Header.astro now inlines the mark with `aria-hidden="true" focusable="false"` (as the reference builds do; the SVG file is unchanged), and "Hand" is drawn by `.lockup-word::after { content: "Hand"; }` inside the existing aria-hidden span. The lockup looks the same; VoiceOver reads "atHand, home, link" as before. Jake may prefer a different treatment; the check was not weakened.
- Theme control height (04-05). HOME-DESIGN.md asks for a 44px control with 2px inner padding, which leaves 38px buttons (the reference builds use `calc(var(--touch-min) - 6px)`). CLAUDE.md and A11Y-04 require 44px targets, and check:a11y enforces them, so each button is 44 by at least 44 and the group is 50px tall.
- `.cta` dark hover (04-06). HOME-DESIGN.md's color table gives CTA links the same hover as nav and footer links (`--text-body` in dark). 04-03 created `.cta`; the dark hover rule was added with the footer's in 04-06.
- check-layout.mjs reads `clip` with `getPropertyValue("clip")` (fixed in the 04-03 commit) because astro check hinted that the `clip` property is deprecated.
- S2 caught a straight apostrophe in a Header.astro comment from 04-04; reworded in a follow-up 04-04 commit.

## Backlog items added

None.

## Follow-ups

- Waves 2, 3, and 4 remain (04-07 to 04-23).
- Before SHIP: whether the app repo has recorded its TestFlight VoiceOver and Dynamic Type passes (decision 21).
