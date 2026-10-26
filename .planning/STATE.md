# State

Current phase: 04 (visuals-and-polish)
Current step: EXECUTE wave 4 done except 04-23, which is blocked (04-19 to 04-22 complete). PLAN.md status Approved (2026-10-25).
Phase 01 is Done. Phase 02 is Done (shipped 2026-10-24). Phase 03 is Done (shipped 2026-10-25; VERIFY PASS, Jake's browser result PASS).

## Next action

1. Jake reviews and merges the "Phase 04 EXECUTE: wave 4, icons, Open Graph, sitemap, and robots" PR (branch execute/04-wave-4). Merging publishes the favicons, the apple-touch-icon, the Open Graph image and tags, canonical links, /sitemap.xml, and /robots.txt.
2. Then REVISE phase 04 to unblock 04-23 (see Blockers), with the REVISE prompt from PROMPTS.md listing the change.
3. Then EXECUTE to finish 04-23, then VERIFY.

## Waiting on Jake

- Review and merge the wave 4 EXECUTE PR (branch execute/04-wave-4), including the deviations in SUMMARY.md.
- Decide the 04-23 REVISE (Blockers).
- Before SHIP: whether the app repo has recorded its TestFlight VoiceOver and Dynamic Type passes (decision 21).
- App repo, outside this site: the car-connectivity brief-versus-code item and the Settings location string in BACKLOG.md; the TestFlight VoiceOver and Dynamic Type passes that gate FEAT-01 (decision 21: REVISE adds it if recorded before SHIP, otherwise phase 04.1).

## Blockers

- 04-23 (SoftwareApplication JSON-LD on Home): the block must carry `"@context": "https://schema.org"` (decision 16), and scripts/check-external.mjs flags every absolute URL in an inline `<script>`, so `npm run check:external` fails, and the Deploy workflow runs that check. check-external.mjs is outside PLAN.md's files. Jake chose to stop on 2026-10-26; 04-23 is not committed. Suggested REVISE: add scripts/check-external.mjs to 04-23's files; skip the body of `<script type="application/ld+json">` blocks, keep checking every other inline script; add verify cases that a JSON-LD block with https://schema.org passes and an inline script with a third-party URL still fails. Details in SUMMARY.md, Blockers.

## Last session

EXECUTE phase 04 wave 4 (2026-10-26), local session on branch execute/04-wave-4 from main (2410273, wave 3 merged). Completed 04-19 to 04-22: favicons and the flattened apple-touch-icon from the app icon at 60032bf; scripts/make-og-image.mjs and public/og-image.png (Playwright, file: and data: requests only); canonical, Open Graph, and Twitter tags in Base.astro (404 without canonical); /sitemap.xml and /robots.txt. 04-23 blocked by check:external (see Blockers); its edits were reverted. All wave checks pass on the committed tree, including check:layout, check:a11y, and S1 to S7, S9 to S15, S17, and S18; browser check recorded in SUMMARY.md. No new BACKLOG items. App repo origin/main still 60032bf.

Before that: EXECUTE phase 04 wave 3 (2026-10-26), local session on branch execute/04-wave-3 from main (d4dda1c, wave 2 merged). Completed 04-13 to 04-18: PageTop.astro and JumpList.astro with the page-top, prose, jump list, fact row, contact card, and overlap styles; the Features, Pricing, Privacy overview, and Support page tops with their existing text unchanged below; the privacy policy and 404 in the prose column; `.wrap` removed. All wave 3 checks pass, including check-text for all five pages against the phase 04 fixtures, check:layout, and check:a11y on all seven pages in both themes; browser check recorded in SUMMARY.md. No new BACKLOG items. App repo origin/main still 60032bf.

Before that: EXECUTE phase 04 wave 2 (2026-10-25), local session on branch execute/04-wave-2 from main (97f202f, wave 1 merged). Completed 04-07 to 04-12: the pre-cropped paywall perks images (originals deleted), PhoneFrame.astro and the `alt:` fixture lines in check-text, and the new Home (hero, moments, five feature rows, PrivacyBand.astro, pricing, closing). Two bugs found and fixed inside 04-08's files: unused shots shipping as PNGs, and both theme images displaying in light. All wave 2 checks pass, including check-text for Home against copy/index.txt, check:layout, and check:a11y on all seven pages in both themes; browser check recorded in SUMMARY.md. One BACKLOG item (a check for one displayed image per frame). App repo origin/main still 60032bf.

Before that: EXECUTE phase 04 wave 1 (2026-10-25), local session on branch execute/04-wave-1 from main (a55dcd4, REVISE merged). Set PLAN.md Approved. Completed 04-01 to 04-06: check:layout and check:a11y (playwright 1.64.1 and axe-core 4.14.0 pinned; Chromium downloaded to ~/Library/Caches/ms-playwright), site variables and the 52.5em breakpoint, the two-row then one-row header, the segmented theme control with icons, and the footer. All wave 1 checks pass, including check:layout and check:a11y on all seven pages in both themes; browser check recorded in SUMMARY.md. Deviations in SUMMARY.md. App repo origin/main still 60032bf.

Before that: REVISE phase 04 (2026-10-25), local session on branch revise/04-visuals-and-polish from main (f1216a9, phase 04 PLAN merged). Jake approved A9 as drafted: marked Approved in CONTEXT.md and in copy/index.txt (text unchanged); removed the A9 gate from Steps for Jake, task 04-12, the wave 2 intro, and Risks. Recorded Jake's approval of Playwright for rendering public/og-image.png (04-20) as decision 25 and removed the confirmation request from Risks. Re-ran the PLAN self-check: unchanged, pass.

Before that: PLAN phase 04 (2026-10-25), local session on branch plan/04-visuals-and-polish from main (4821a36, phase 04 ANSWERS merged). Wrote PLAN.md (Draft): wave 1 chrome and the check:layout and check:a11y scripts (playwright 1.64.1 and axe-core 4.14.0 pinned as devDependencies), wave 2 PhoneFrame and Home, wave 3 page tops and the prose column, wave 4 metadata; FEAT-01 outside the waves (decision 21). Wrote the phase 04 copy fixtures in .planning/phases/04-visuals-and-polish/copy/ (index new; the other four extend phase 03's, with `alt:` lines for check-text) and checked every line against CONTEXT.md. Confirmed the paywall crop (sips rows 172 to 1379, reproducible, ends above the price card) and the apple-touch-icon flattening (the app icon's alpha dips to 252). App repo origin/main still 60032bf. Self-check passed.

Before that: ANSWERS phase 04 (2026-10-25), local session on branch answers/04-visuals-and-polish from main (46dac75, phase 04 DISCUSS merged). Verified Jake's new 06-lock pair in handoff/screenshots/ (both 1320 by 2868, 9:41 status bar, sample content only: lockup, "atHand is locked.", Unlock) and copied it to src/assets/shots/; drafted A9. Recorded answers as decisions 19 (06-lock uses crop="full", no placeholder; A7 withdrawn), 21 (FEAT-01 out of the waves), 22 (pinned playwright and axe-core devDependencies for checks only), and an addition to decision 9 (delete the 07-paywall originals once the perks files exist). Applied copy edits (decision 23: HM16 and HM21 without periods; HM24 keeps C1 with its period) and marked all other drafts Approved. Updated the lock screen sentence in REQUIREMENTS.md (VIS-01) and ROADMAP.md to match answer 1.

Before that: DISCUSS phase 04 (2026-10-25), local session on branch discuss/04-visuals-and-polish from main (f68edc1, phase 03 SHIP merged). Imported the Claude Design bundle from handoff/athand-home-design/ (Jake authorized): HOME-DESIGN.md and the two reference builds into .planning/phases/04-visuals-and-polish/design/, and 14 screenshots (1320 by 2868) into src/assets/shots/; 06-lock was not copied (1179 by 2556); added `handoff/` to .gitignore. Rewrote phase 04 in ROADMAP.md and REQUIREMENTS.md as the visual showcase (VIS-01 to VIS-11 plus the carried SEO, A11Y, and FEAT-01 items); phase 05 unchanged. Wrote CONTEXT.md with Jake's four answers as decisions 1 to 4, the reference-defect checks (decision 6), a pre-cropped paywall image because 07-paywall shows the price (decision 9), copy drafts for Home, alt text, the other pages' new strings, and metadata, and five expected waves. App repo read at 60032bf (Brief v4.12).
