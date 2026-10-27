// Renders public/og-image.png, the 1200 by 630 Open Graph image, in Chromium
// (Playwright) at authoring time. The page uses the site's own token CSS and
// self-hosted @fontsource faces by file:// URL, the app icon from the app repo
// as a data: URL, and the lockup mark SVG inline. Light theme, flat ground, no
// gradient or shadow. Any request that is not file: or data: is aborted and
// fails the run. The output is committed; nothing here runs in the build.
// Usage: node scripts/make-og-image.mjs
// Reads the app repo from ATHAND_APP_DIR (default ../athandapp) at ICON_REF.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ICON_REF = "60032bf3848847b642443a59178ee40e385c9850";
const root = resolve(import.meta.dirname, "..");
const appDir = resolve(root, process.env.ATHAND_APP_DIR || "../athandapp");
const out = join(root, "public", "og-image.png");

const icon = execFileSync("git", ["-C", appDir, "show", `${ICON_REF}:assets/icon.png`]);
const mark = readFileSync(join(root, "src/assets/logo-lockup-mark.svg"), "utf8")
  .replace('role="img" aria-label="at"', 'aria-hidden="true"');
const css = [
  "src/styles/tokens/colors.css",
  "src/styles/tokens/typography.css",
  "node_modules/@fontsource/space-grotesk/latin-700.css",
  "node_modules/@fontsource/inter/latin-500.css",
].map((f) => `<link rel="stylesheet" href="${pathToFileURL(join(root, f)).href}">`).join("\n");

const html = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
${css}
<style>
  html, body { margin: 0; width: 1200px; height: 630px; }
  body {
    display: flex;
    align-items: center;
    gap: 72px;
    padding: 0 96px;
    box-sizing: border-box;
    background: var(--surface-page);
    color: var(--text-body);
  }
  .icon { width: 280px; height: 280px; border-radius: 62px; flex: none; }
  .copy { display: flex; flex-direction: column; gap: 28px; }
  .lockup {
    display: inline-flex;
    align-items: center;
    gap: 0.06em;
    font: 700 64px/1 var(--font-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-link);
  }
  .lockup svg { height: 1em; width: auto; }
  h1 {
    margin: 0;
    font: 700 56px/1.1 var(--font-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-body);
    text-wrap: balance;
  }
  p { margin: 0; font: 500 30px/1.3 var(--font-ui); color: var(--text-muted); }
</style>
</head>
<body>
<img class="icon" alt="" src="data:image/png;base64,${icon.toString("base64")}">
<div class="copy">
  <div class="lockup">${mark}<span>Hand</span></div>
  <h1>Your important information, in one place, always at hand</h1>
  <p>A private household organizer for iPhone</p>
</div>
</body>
</html>
`;

const tmp = mkdtempSync(join(tmpdir(), "og-image-"));
const page = join(tmp, "og.html");
writeFileSync(page, html);

const blocked = [];
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: "light" });
  const tab = await context.newPage();
  await tab.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith("file:") || url.startsWith("data:")) return route.continue();
    blocked.push(url);
    return route.abort();
  });
  await tab.goto(pathToFileURL(page).href, { waitUntil: "load" });
  await tab.evaluate(() => document.fonts.ready);
  if (blocked.length === 0) await tab.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
} finally {
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
}

if (blocked.length) {
  for (const url of blocked) console.error(`og:image: blocked request ${url}`);
  process.exit(1);
}
console.log(`og:image: wrote ${out} (1200 by 630, icon from ${ICON_REF.slice(0, 7)})`);
