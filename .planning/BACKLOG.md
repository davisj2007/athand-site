# Backlog

Items noticed outside the current phase's scope. Not planned unless Jake moves them into REQUIREMENTS.md.

Format: date | found in phase | description | file:line | suggested target (phase number or later)

## Items

2026-10-23 | 02 DISCUSS | The design system readme lists text-faint as #8A8A82 (light) and #6E7079 (dark), and athand-design-handoff/README.md repeats those values, but tokens/colors.css (the source of truth) has #6C6C64 and #8C8E96. Documentation drift in the app repo; the site uses the token values. Jake to correct in the app repo. | athandapp: athand-design-handoff/_ds/athand-design-system-23fcf9a9-cdd0-4b1b-a220-dcc704e0a8da/readme.md (dark mode table) | app repo, not this site
2026-10-23 | 02 EXECUTE wave 1 | PLAN.md static check 13 (`grep -rn` for em dashes over src and README.md must return nothing) will fail at VERIFY: the token files copied byte for byte from the app repo carry em dashes in their CSS comments (colors.css:6, 41, 47, 48; effects.css:3, 13), and FND-04 forbids editing them. The check needs to exclude src/styles/tokens/ (a REVISE before VERIFY), or Jake removes the em dashes in the app repo's token comments. | .planning/phases/02-foundation/PLAN.md (Static checks for VERIFY, item 13); src/styles/tokens/colors.css:6 | phase 02 REVISE before VERIFY
