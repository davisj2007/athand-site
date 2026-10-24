# Backlog

Items noticed outside the current phase's scope. Not planned unless Jake moves them into REQUIREMENTS.md.

Format: date | found in phase | description | file:line | suggested target (phase number or later)

## Items

2026-10-23 | 02 DISCUSS | The design system readme lists text-faint as #8A8A82 (light) and #6E7079 (dark), and athand-design-handoff/README.md repeats those values, but tokens/colors.css (the source of truth) has #6C6C64 and #8C8E96. Documentation drift in the app repo; the site uses the token values. Jake to correct in the app repo. | athandapp: athand-design-handoff/_ds/athand-design-system-23fcf9a9-cdd0-4b1b-a220-dcc704e0a8da/readme.md (dark mode table) | app repo, not this site
2026-10-24 | 02 EXECUTE | Two task verify commands in the phase 02 PLAN.md cannot pass as written: 02-07 calls `execSync(cmd, "utf8")`, which returns a Buffer on Node 26, and 02-08's `/uses:\s*(?!actions\/)/` matches every valid `uses: actions/...` line. EXECUTE ran corrected equivalents (SUMMARY.md, Deviations). Fix the text if either command is reused, and use options objects and `(?!\s|...)` lookaheads in future plans. | .planning/phases/02-foundation/PLAN.md:196, :208 | REVISE or later plans
2026-10-24 | 03 DISCUSS | The app's Settings describes Device only suggestions as "Time and location signals stay on your phone." Since Brief v4.10, location coordinates go to Apple's geocoding service when location is allowed, so the string is not literally true under the brief's Privacy section. Jake to correct in the app repo. The site does not repeat this wording. | athandapp: app/settings.tsx:40 at 60032bf | app repo, not this site
