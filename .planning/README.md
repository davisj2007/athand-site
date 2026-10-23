# atHand site delivery loop

This folder keeps Claude Code on track across sessions for athandapp.com, the static marketing, privacy, and support site for the atHand iPhone app. It uses the same loop as the app repo: files are the memory, one step per session, explicit gates, and verification before shipping.

## Where things live

- This repo: davisj2007/athand-site. GitHub main is the source of truth. Every push to main deploys to athandapp.com once phase 02 lands.
- The app repo: davisj2007/athandapp. Read it, never edit it. Local sessions find it at ~/dev/athandapp. Web sessions add it to the session and clone it beside this repo (../athandapp).
- Product authority: athand-project-brief.md in the app repo. Cite it by section name, for example "brief, Privacy".
- Design contract: athand-design-handoff/ in the app repo, including the locked tokens in athand-design-handoff/_ds/athand-design-system-*/tokens/.

## Rules for every session

1. Files are memory. Start by reading CLAUDE.md, .planning/STATE.md, and the files named for your step. Assume nothing from earlier chats.
2. One step per session. Do exactly the step named in the prompt, then stop.
3. The brief is authority. Requirements trace to athand-project-brief.md. Every product claim on the site cites a brief section in its PR. Code traces to requirements in .planning/REQUIREMENTS.md.
4. Scope fence. During EXECUTE and FIX, change only files listed in the phase PLAN.md. Anything else you notice goes into .planning/BACKLOG.md.
5. Gates. No PLAN until CONTEXT.md is Ready. No EXECUTE until the prompt says Jake approves the plan. No SHIP until VERIFY.md is PASS and the prompt gives Jake's browser result (or says not applicable).
6. Atomic commits. One commit per task: "phase NN task NN-TT: short summary".
7. Branches. Claude Code on the web assigns each session its own branch. Use it. At the end of every session that changed files, push and open a PR to main titled "Phase NN STEP: short summary", then stop. Jake merges it before starting the next session, so main always holds the latest state. Never merge. Local sessions: start with git checkout main && git pull, then create a branch named <step>/<phase>-<short-summary> (for example execute/02-foundation). End by pushing that branch and opening a PR to main with gh pr create. Never commit directly to main. Web and local sessions must not work on the same step at the same time.
8. Main is live. Merging to main publishes the site. Every PR must leave athandapp.com whole: every existing page builds, /privacy.html and /support.html keep their exact URLs, and no link breaks. If a wave cannot meet that, split it.
9. Stop and ask Jake (record it under Blockers in STATE.md) when: the brief conflicts with the plan or the site copy; the plan cannot work as written; a dependency not named in the plan is needed; a change would alter a permanent URL; a change would add any third-party request at runtime; copy would make a product claim the brief does not support.
10. Never: edit athand-project-brief.md or anything else in the app repo; mark a task done without running its verify command; weaken or skip a check to make it pass; add analytics, CDN assets, embeds, trackers, or forms that send data; add dependencies not named in the plan; merge a PR.
11. Always end a session by updating STATE.md, committing, and pushing.

## Phase folder

.planning/phases/NN-slug/ contains CONTEXT.md, PLAN.md, VERIFY.md, and SUMMARY.md. Templates are in .planning/templates/. NN and slug come from ROADMAP.md. Inserted phases use a decimal number, for example 02.1.

## Checks

Until phase 02 adds package.json there is no build. From then on, every EXECUTE, VERIFY, and FIX session runs:

- `npm ci`
- `npm run build` (Astro static build into dist/)
- `npm run check` (astro check)
- `npm run tokens:check` (fails if any copied token file differs from the app repo's _ds tokens)
- `npm run check:external` (fails if dist/ makes any runtime request to a host other than athandapp.com)
- Every static check listed in the phase PLAN.md.

## Steps

### STATUS

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

Read STATE.md and ROADMAP.md. Report the current phase and step, what is done, what is next (the exact prompt from PROMPTS.md), and what is waiting on Jake. Change nothing. No commit.

### DISCUSS

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. Work on this session's assigned branch, based on current main.
2. Read the brief sections and REQUIREMENTS.md entries for this phase, then read the site files those requirements touch and the app repo files they depend on (tokens, theme toggle, logo, screenshots, icon).
3. Write CONTEXT.md from the template: goal, requirements in scope, what the site does today (file:line), decisions already locked by the brief or CLAUDE.md, and implementation decisions you can make safely.
4. If the phase adds or changes copy, draft every string in the Copy drafts section of CONTEXT.md. Each claim cites the brief section that makes it true. Mark any string the brief does not support as a question instead of drafting around it.
5. List open questions only where the brief and CLAUDE.md do not decide. Each question gets a recommended default and the reason. Write questions in plain language.
6. Status: Ready if there are no open questions and no copy awaits approval, otherwise Needs answers.
7. Update STATE.md, commit "phase NN: discuss", push, open a PR.
8. Reply with the open questions, numbered, exactly as written in CONTEXT.md, and say whether copy awaits approval.

### ANSWERS

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. Record Jake's answers from the prompt under Implementation decisions in CONTEXT.md. Remove the answered questions.
2. Apply Jake's copy edits to Copy drafts. Mark each approved string Approved. Copy is approved only when the prompt says so; never infer approval.
3. Set status Ready if nothing is open and all copy is Approved.
4. Update STATE.md, commit "phase NN: answers", push, open a PR. Reply with the status.

### PLAN

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. Require CONTEXT.md status Ready. If not, stop and say so.
2. Write PLAN.md from the template with status Draft.
3. Tasks: each has an ID (NN-TT), requirement IDs, exact files, steps, acceptance criteria, and a verify command. Group tasks into waves. A wave must be small enough to finish in one session (at most 6 tasks) and must leave the live site whole when merged (rule 8).
4. Copy goes into pages exactly as Approved in CONTEXT.md. A task that places copy names the Copy drafts entries it uses.
5. List static checks for VERIFY (for example grep patterns over src/ and dist/ that must return nothing).
6. Self-check before saving: every requirement ID for this phase is covered; every task has acceptance and verify; no task contradicts the brief or CLAUDE.md; files in scope are complete; every wave leaves the site whole. Record the self-check result in PLAN.md.
7. Update STATE.md, commit "phase NN: plan", push, open a PR.
8. Reply with a short summary: waves, task count, files in scope, risks, and any step Jake must take in GitHub settings.

### REVISE

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. Apply the plan changes listed in the prompt to the phase PLAN.md. Keep status Draft.
2. Re-run the PLAN self-check and record the result.
3. Update STATE.md, commit "phase NN: revise plan", push, open a PR.
4. Reply with what changed.

### EXECUTE

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. The prompt states Jake approves the plan. Set PLAN.md status Approved with today's date.
2. Run only the next wave whose tasks are not all checked.
3. For each task: implement; run its verify command plus the Checks above that exist so far; fix failures within the task's files; check the task's box in PLAN.md; commit.
4. Deviations: a bug inside the task's files is fixed and noted in SUMMARY.md. Anything outside scope goes to BACKLOG.md. Anything blocking stops the session and goes under Blockers in STATE.md.
5. Update SUMMARY.md and STATE.md, push, open a PR.
6. Reply with: tasks completed, check results, deviations, waves remaining, and any GitHub settings step Jake must take right after merging.

### VERIFY

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. Require all waves checked. If not, stop and say so.
2. Run the Checks above and every static check listed in PLAN.md. Where possible, load the built pages in the pre-installed Chromium (Playwright) and run axe-core against each page in light and dark; record the results. This supplements Jake's checklist and never replaces it.
3. For each requirement in scope, record evidence (file:line, command output, or check result) and PASS or FAIL. Work backward from the requirement, not from the task list.
4. For each FAIL, add a task to a "Fix wave" at the end of PLAN.md.
5. If the phase changes anything a visitor can see or do, write a browser acceptance checklist for Jake in VERIFY.md: numbered steps in plain language, each with the expected result. Cover, where relevant: Safari on Mac and on iPhone; System, Light, and Dark theme settings, including flipping the OS appearance while on System; VoiceOver in Safari (headings, landmarks, link names, theme control state); keyboard only (Tab order, visible focus, skip link); 400% browser zoom with no horizontal scrolling or clipped text; Reduce Motion on; the browser's network panel showing requests only to athandapp.com; /privacy.html and /support.html loading at their exact URLs. No tables.
6. Set result PASS or GAPS. Update STATE.md, commit "phase NN: verify", push, open a PR.
7. Reply with: result, failures, and the browser checklist.
8. Tell Jake to merge this PR, wait for the "Deploy" workflow run on main to finish green in the Actions tab, then run the browser checklist on https://athandapp.com.

### FIX

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

Run the Fix wave exactly like EXECUTE, then re-run the VERIFY checks and update VERIFY.md. Reply like VERIFY.

### SHIP

If STATE.md shows a previous step whose PR is not yet merged, stop and tell Jake.

1. Require VERIFY.md result PASS.
2. Read Jake's browser result from the prompt. If FAIL, turn each note into a Fix wave task, update STATE.md, push, open a PR, and stop.
3. If PASS or not applicable: record the result in VERIFY.md, finalize SUMMARY.md, mark the phase Done in ROADMAP.md and its requirements Done in REQUIREMENTS.md, set STATE.md to the next phase with next step DISCUSS, commit "phase NN: ship", push.
4. Open a PR to main, titled per rule 7 ("Phase NN SHIP: short summary"), with SUMMARY.md as the description. Do not merge.
5. Reply with the PR link.
