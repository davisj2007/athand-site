# Phase 04.2: design-polish - Context

Status: Needs answers
Date: 2026-10-26

## Goal

Triage the findings of an automated design lint (impeccable detect) against the shipped site, and fix only what is a real issue inside the brand and the accessibility floor. Nothing in the brief's Brand section, HOME-DESIGN.md, or CLAUDE.md's hard rules changes. Jake inserted this phase on 2026-10-26, independent of the 04.1 and 05 gates.

## Requirements in scope

DSG-01.

## What the site does today

Input: handoff/impeccable-detect.txt (untracked; handoff/ is in .gitignore; sha256 cbe18ae5b0ac3ae8dd4832404ff2a0dadb66d4d5813aadc317eab170c7b35670), the output of `npx impeccable detect` that Jake ran against dist/ built from main. impeccable is not installed in this repo and is not a dependency; this session did not run it.

The file reports 24 findings over the seven built pages. They reduce to four distinct issues under two rules:

- F1, cramped-padding, `div.theme-control` (the header's System, Light, and Dark control): 7 findings, one per page. Detector text: "children flush against border+bg on top/bottom (no inset)".
- F2, cramped-padding, `section.band` (the full-bleed privacy band): 2 findings, index.html and privacy-overview.html. Detector text: "children flush against bg on all sides (no inset)".
- F3, cramped-padding, `section.closing` (Home's closing section): 1 finding, index.html. Detector text: "children flush against border-top on top (no inset)".
- F4, overused-font, document body and headings: 14 findings, two per page, "Primary font: inter" and "Primary font: space grotesk".

Every finding, by page (rule, element):

1. 404.html: cramped-padding, div.theme-control (F1)
2. 404.html: overused-font, Inter (F4)
3. 404.html: overused-font, Space Grotesk (F4)
4. features.html: cramped-padding, div.theme-control (F1)
5. features.html: overused-font, Inter (F4)
6. features.html: overused-font, Space Grotesk (F4)
7. index.html: cramped-padding, div.theme-control (F1)
8. index.html: cramped-padding, section.band (F2)
9. index.html: cramped-padding, section.closing (F3)
10. index.html: overused-font, Inter (F4)
11. index.html: overused-font, Space Grotesk (F4)
12. pricing.html: cramped-padding, div.theme-control (F1)
13. pricing.html: overused-font, Inter (F4)
14. pricing.html: overused-font, Space Grotesk (F4)
15. privacy-overview.html: cramped-padding, div.theme-control (F1)
16. privacy-overview.html: cramped-padding, section.band (F2)
17. privacy-overview.html: overused-font, Inter (F4)
18. privacy-overview.html: overused-font, Space Grotesk (F4)
19. privacy.html: cramped-padding, div.theme-control (F1)
20. privacy.html: overused-font, Inter (F4)
21. privacy.html: overused-font, Space Grotesk (F4)
22. support.html: cramped-padding, div.theme-control (F1)
23. support.html: overused-font, Inter (F4)
24. support.html: overused-font, Space Grotesk (F4)

The detector's stated threshold for cramped-padding is at least 8px, ideally 12 to 16px, between rendered text and a visible boundary.

Measurement (this session, main at 84b67ce, `npm ci` and `npm run build`, then Chromium through the project's pinned Playwright at 320, 390, and 1280 CSS px in light and dark): for each flagged container, the smallest distance from any rendered text line or icon inside it to its border box. Visually hidden `.tlabel` spans (1px, clipped) are excluded, as check:layout excludes them.

- Theme control, src/components/ThemeControl.astro:9-13, src/styles/site.css:210-258. The group is 50px tall: 1px border, 2px inner padding (site.css:216), 44px buttons (site.css:226-227, `--touch-min`). Smallest text or icon inset: 15px on every side at 320, 390, and 1280 (icons only below 52.5em; icon and label from 52.5em). Font size 16px. What sits flush is the child button's own box: its hover fill (`--surface-chip`) and pressed fill (`--text-body`) are 2px inside the group border, as HOME-DESIGN.md specifies.
- Privacy band, src/components/PrivacyBand.astro:18-28, src/styles/site.css:618-627. The padding lives on `.band-inner` (the `.container` gutter inline, `--site-section` block), not on `section.band`, so the section's first child box touches its fill. Smallest text inset: 16px left and right at 320 and 390 (the site gutter), 80px at 1280; 45px or more top and bottom at every width.
- Closing, src/pages/index.astro:144-150, src/styles/site.css:684-693. Again the padding is on the child `.closing-inner`. Smallest distance from the 1px top rule to the mark or text: 49px at 320 and 390, 97px at 1280.
- Fonts: body computes to `Inter, ui-sans-serif, system-ui, sans-serif` and headings to `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`, from `--font-ui` and `--font-display` in src/styles/tokens/typography.css:3-4 (copied from the app repo's _ds tokens; tokens:check enforces the match), self-hosted from @fontsource/inter 5.3.0 and @fontsource/space-grotesk 5.3.0 (package.json:23-24).

App repo read at origin/main 60032bf (Brief v4.12).

## Locked by the brief and CLAUDE.md

- Brief, Brand: "Visual system: cobalt accent #4C39C6, paper #F6F5F1, ink #14161C, seven muted entity colors, Space Grotesk (display) + Inter (body), flat, borders first, at most one soft shadow, no gradients."
- CLAUDE.md, Hard rules: "Tokens match the app's _ds tokens exactly." The only allowed difference is fonts.css, replaced by self-hosted faces of the same families.
- CLAUDE.md, Hard rules: 44px minimum targets; 16px minimum for any text; WCAG AA contrast in both themes.
- HOME-DESIGN.md, Header: the theme control is "a segmented group with a 1px `--border-card` border, `--surface-card` fill, radius `--radius-control`, and 2px inner padding", buttons at least `--touch-min`, "the control is 44px tall" (site.css:210-211 records the 50px outer height that follows from the border and padding).
- HOME-DESIGN.md, Privacy band: full-bleed section, "Inner container padding `--site-section`".
- HOME-DESIGN.md, Closing: "1px `--border-card` top rule. Centered flex column, gap `--space-5`, padding `--site-section`."
- VIS-10 and check:layout (scripts/check-layout.mjs:1-7, :127-129): no content element in header, main, or footer sits less than 16px from a viewport edge, at 320, 390, 768, 1280, and 1280 at 400% zoom, in light and dark; "a band's fill may touch the edges while its text may not."

## Triage

- F1, cramped-padding, div.theme-control, all seven pages (findings 1, 4, 7, 12, 15, 19, 22): Not applicable. The detector measures the child buttons' boxes against the group's border, not the text. Rendered text and icons sit 15px from the group's border on every side at every width tested, above the detector's own 12 to 16px ideal. The only thing flush is the pressed or hovered segment's fill, 2px inside the border, which is the segmented-control pattern HOME-DESIGN.md, Header specifies ("2px inner padding"). Widening that gap would be a change to the locked design contract, and it would not move the text, which already clears the threshold.
- F2, cramped-padding, section.band, index.html and privacy-overview.html (findings 8, 16): Already covered. check:layout (VIS-10, scripts/check-layout.mjs:4-7) fails any text inside the band that sits less than 16px from a viewport edge, at five viewports including 320px and 400% zoom, and explicitly lets the band's fill touch the edges while its text may not. It passed at phase 04 VERIFY. Measured insets: 16px or more inline, 45px or more block. The finding is a false positive from the padding living on `.band-inner` rather than on the section.
- F3, cramped-padding, section.closing, index.html (finding 9): Not applicable. The top border is a section divider, not a container edge, and the first content (the mark) sits 49px below it at 320 and 390 and 97px at 1280, the `--site-section` padding HOME-DESIGN.md, Closing specifies. Same false-positive shape as F2: the padding is on `.closing-inner`.
- F4, overused-font, Inter and Space Grotesk, all seven pages (findings 2, 3, 5, 6, 10, 11, 13, 14, 17, 18, 20, 21, 23, 24): Decline. Brief, Brand names "Space Grotesk (display) + Inter (body)", and CLAUDE.md requires the site's tokens to match the app's _ds tokens exactly; `--font-display` and `--font-ui` are those tokens, and tokens:check fails on any change. The site matches the app's typography by design, so a different face would break the one product voice the brief sets.

Result: Fix 0, Decline 14 (one issue, F4), Already covered 2 (F2), Not applicable 8 (F1 and F3). No change to site code is drafted.

## Implementation decisions

1. impeccable is not installed in this repo, not added to package.json, and not run by any session. Jake runs it outside the repo when he wants a reading, as he did for detect. Reason: CLAUDE.md and README rule 10 forbid dependencies the plan does not name, and the existing checks (check:layout, check:a11y with axe, tokens:check, check:external) already enforce the floor this phase cares about.
2. The detect output stays untracked in handoff/. This file lists every finding and the file's sha256, so the triage is traceable without committing a file that carries local machine paths.
3. DSG-01 is the only requirement. It is met by this triage plus any Fix items Jake adds in ANSWERS; with none, the phase has no tasks, so it needs no PLAN or EXECUTE: VERIFY records DSG-01's evidence and SHIP follows (see open question 1).

## Copy drafts

None. No visible string is new or changed.

## Open questions for Jake

1. Detect found nothing to fix: 22 of 24 findings are false positives from padding placed on an inner container, and the other 14 (the font findings) conflict with the brief's Brand section. Should phase 04.2 close now with no site change, or should you first run impeccable's critique or audit command outside the repo and bring that output to an ANSWERS session for the same triage? Recommended default: close now. ANSWERS records the choice, VERIFY records this triage as DSG-01's evidence, and SHIP follows with the browser result "not applicable", since nothing a visitor sees changes. Reason: these findings do not justify a deeper run. Every detect rule that fired is either already enforced by check:layout or blocked by a locked rule, and phase 04 already passed axe in both themes, the 320px and 400% zoom layout check, and your browser checklist on 2026-10-26. A critique pass is subjective and most likely to suggest changes the brief locks (typeface, accent color, ornament, shadows, or gradients); run it only if you have a specific visual concern you want a second reading on, and name that concern in the prompt.

## Out of scope

- Any change to the typefaces, tokens, or HOME-DESIGN.md's specified paddings.
- Installing or configuring impeccable, or adding its rules to the repo's checks.
- FEAT-01 (phase 04.1) and the launch flip (phase 05).
