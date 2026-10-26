// Loads every page of a built site in Chromium (Playwright) with reduced
// motion, in light and dark, at 390 by 844 and 1280 by 800, and runs axe-core
// with its default rules. Also fails on text below 16px, a body size other
// than 17px, a standalone link or button smaller than 44 by 44 (links inside
// sentences are exempt), and any transition or animation that survives
// reduced motion. In every theme state, each phone frame's .screen must show
// exactly one image (frames the layout hides whole are skipped). Theme states: light (stored light, OS light), dark
// (stored dark, OS dark), and System (stored system) with the OS light, then
// dark; the System states run only the one-image check. Any request to a host
// other than the local server fails.
// Usage: node scripts/check-a11y.mjs [dir]   (default: dist)
// Needs Playwright's Chromium once: npx playwright install chromium
import { existsSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { chromium } from "playwright";
import { htmlPages, openPage, pageUrl, startServer, themedContext } from "./check-layout.mjs";

const axePath = createRequire(import.meta.url).resolve("axe-core/axe.min.js");

const WIDTHS = [
  { width: 390, height: 844 },
  { width: 1280, height: 800 },
];

// Runs in the page. Returns [check, target] for each failure.
function measure() {
  const out = [];
  const name = (el) => {
    const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).filter(Boolean).join(".") : "";
    return el.tagName.toLowerCase() + (cls ? "." + cls : "");
  };
  const zero = (v) => v.split(",").every((d) => parseFloat(d) === 0);
  const bodySize = getComputedStyle(document.body).fontSize;
  if (bodySize !== "17px") out.push(["body font-size " + bodySize, "body"]);
  for (const el of document.body.querySelectorAll("*")) {
    if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(el.tagName)) continue;
    const cs = getComputedStyle(el);
    const shown = el.getClientRects().length > 0;
    if (shown && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim() !== "")) {
      if (parseFloat(cs.fontSize) < 16) out.push(["font-size " + cs.fontSize, name(el)]);
    }
    if (shown && el.matches("a, button")) {
      const parent = el.parentElement;
      const outside = parent.textContent.replace(el.textContent, "").trim();
      const r = el.getBoundingClientRect();
      if (outside === "" && r.width > 1 && r.height > 1 && (r.width < 44 || r.height < 44)) {
        out.push([`target ${Math.round(r.width)}x${Math.round(r.height)}`, name(el)]);
      }
    }
    if (!zero(cs.transitionDuration)) out.push(["transition-duration " + cs.transitionDuration, name(el)]);
    if (cs.animationName !== "none" && !zero(cs.animationDuration)) out.push(["animation-duration " + cs.animationDuration, name(el)]);
  }
  return out;
}

// Runs in the page. Returns [check, target] for each rendered .screen that
// does not show exactly one image. A frame the layout hides whole (the second
// Features overlap frame below the breakpoint) is not rendered and is skipped.
function screens() {
  const out = [];
  document.querySelectorAll(".screen").forEach((screen, i) => {
    if (screen.getClientRects().length === 0) return;
    const shown = [...screen.querySelectorAll("img")].filter((img) => {
      const r = img.getBoundingClientRect();
      return getComputedStyle(img).display !== "none" && r.width > 0 && r.height > 0;
    }).length;
    if (shown !== 1) {
      const crop = screen.closest(".frame")?.getAttribute("data-crop");
      out.push([`screen shows ${shown} images`, `.screen ${i + 1}` + (crop ? ` (data-crop ${crop})` : "")]);
    }
  });
  return out;
}

const STATES = [
  { label: "light", stored: "light", os: "light", full: true },
  { label: "dark", stored: "dark", os: "dark", full: true },
  { label: "system, OS light", stored: "system", os: "light", full: false },
  { label: "system, OS dark", stored: "system", os: "dark", full: false },
];

// Like themedContext, but the stored preference and the OS appearance are set
// separately.
async function stateContext(browser, origin, state, options, blocked) {
  if (state.stored === state.os) return themedContext(browser, origin, state.os, options, blocked);
  const context = await browser.newContext({ ...options, colorScheme: state.os });
  await context.addInitScript((t) => {
    try {
      localStorage.setItem("athand-theme", t);
    } catch (e) {}
  }, state.stored);
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith(origin + "/")) return route.continue();
    blocked.push(url);
    return route.abort();
  });
  return context;
}

async function main() {
  const dir = resolve(process.argv[2] || "dist");
  const fail = (message) => {
    console.error(`check:a11y: ${message}`);
    process.exit(1);
  };
  if (!existsSync(dir) || !statSync(dir).isDirectory()) fail(`${dir} not found`);
  const pages = htmlPages(dir);
  if (pages.length === 0) fail(`no .html files in ${dir}`);

  const { server, origin } = await startServer(dir);
  const browser = await chromium.launch();
  const failures = [];
  try {
    for (const state of STATES) {
      for (const viewport of WIDTHS) {
        const blocked = [];
        const context = await stateContext(browser, origin, state, { viewport, reducedMotion: "reduce" }, blocked);
        for (const p of pages) {
          const at = `${p} ${state.label} ${viewport.width}`;
          const page = await openPage(context, pageUrl(origin, p));
          if (state.full) {
            await page.addScriptTag({ path: axePath });
            const results = await page.evaluate(() => window.axe.run(document));
            for (const v of results.violations) {
              for (const node of v.nodes) failures.push(`${at}: ${v.id} ${node.target.join(" ")}`);
            }
            for (const [check, target] of await page.evaluate(measure)) failures.push(`${at}: ${check} ${target}`);
          }
          for (const [check, target] of await page.evaluate(screens)) failures.push(`${at}: ${check} ${target}`);
          for (const url of blocked.splice(0)) failures.push(`${at}: request to another host ${url}`);
          await page.close();
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    for (const f of failures) console.error(`check:a11y: ${f}`);
    process.exit(1);
  }
  console.log(`check:a11y: ${pages.length} pages, ${STATES.length} theme states, 2 widths: no violations`);
}

await main();
