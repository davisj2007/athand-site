# athand-site

athandapp.com: the static marketing, privacy, and support site for the atHand iPhone app.

## Authority

- athand-project-brief.md in the app repo (davisj2007/athandapp) is product authority. If the site and the brief disagree, stop and report; do not edit the brief.
- .planning/ holds the delivery loop. Every session starts by reading .planning/STATE.md and follows .planning/README.md for its step.
- Work only on the phase and step named in the prompt. Anything else you notice goes into .planning/BACKLOG.md, not into code.
- The app repo's athand-design-handoff/ holds the design contract, including the locked tokens in athand-design-handoff/_ds/athand-design-system-*/tokens/.
- GitHub main is the source of truth. Merging to main publishes the site.

## Hard rules

- Product claims: every product claim cites a brief section in its PR. Claims must be literally true. Never write "nothing leaves your phone" or any equivalent; the brief's Privacy section names what does leave the device.
- Zero third-party requests at runtime. No analytics, CDN fonts or scripts, embeds, trackers, or waitlist forms. Every asset the site loads is served from athandapp.com. Outbound links are fine.
- Tokens match the app's _ds tokens exactly. Copied token files differ from the app repo only by a header naming the source commit. The one exception is fonts.css, which loads Google Fonts from a CDN and is replaced by self-hosted faces.
- Accessibility: WCAG AA contrast in both themes; 17px body text; 16px minimum for any text; 44px minimum targets; no color-only meaning; works at 400% zoom without horizontal scrolling; honors reduced motion.
- Copy: American English, sentence case, Title Case group labels, Oxford comma, no em dashes, no emoji, curly apostrophes.
- The @Hand form appears only in the logo lockup. Prose, titles, metadata, and alt text say atHand.
- /privacy.html and /support.html are permanent URLs. Never move, rename, or redirect them.
- Never merge a PR. Never edit the app repo; read it only.
