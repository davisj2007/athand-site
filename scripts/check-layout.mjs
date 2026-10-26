// Loads every page of a built site in Chromium (Playwright), in light and dark,
// at 320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and 1280 at 400% zoom
// (320 by 200 CSS px at device scale 4). Fails if the page scrolls sideways,
// if any rendered box crosses a viewport edge, or if any content element in
// header, main, or footer sits less than 16px from either edge. Full-bleed
// backgrounds are not content, so a band's fill may touch the edges while its
// text may not. Any request to a host other than the local server fails.
// Usage: node scripts/check-layout.mjs [dir]   (default: dist)
// Needs Playwright's Chromium once: npx playwright install chromium
import { createServer } from "node:http";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

export function htmlPages(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isFile() && extname(entry.name) === ".html") {
      out.push(relative(dir, join(entry.parentPath, entry.name)).split(sep).join("/"));
    }
  }
  return out.sort();
}

export function pageUrl(origin, page) {
  return page === "index.html" ? `${origin}/` : `${origin}/${page}`;
}

// Serves dir on 127.0.0.1 at a random port. / maps to index.html; anything
// missing returns 404.html with status 404.
export function startServer(dir) {
  const send = (res, file, status) => {
    res.writeHead(status, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  };
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = resolve(dir, "." + path);
    if (file.startsWith(dir + sep) && existsSync(file) && statSync(file).isFile()) return send(res, file, 200);
    const missing = join(dir, "404.html");
    if (existsSync(missing)) return send(res, missing, 404);
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  });
  return new Promise((ok) => {
    server.listen(0, "127.0.0.1", () => ok({ server, origin: `http://127.0.0.1:${server.address().port}` }));
  });
}

// A context with the theme stored before load and every off-server request
// aborted and recorded in blocked.
export async function themedContext(browser, origin, theme, options, blocked) {
  const context = await browser.newContext({ ...options, colorScheme: theme });
  await context.addInitScript((t) => {
    try {
      localStorage.setItem("athand-theme", t);
    } catch (e) {}
  }, theme);
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith(origin + "/")) return route.continue();
    blocked.push(url);
    return route.abort();
  });
  return context;
}

export async function openPage(context, url) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

const VIEWPORTS = [
  { label: "320x640", viewport: { width: 320, height: 640 } },
  { label: "390x844", viewport: { width: 390, height: 844 } },
  { label: "768x1024", viewport: { width: 768, height: 1024 } },
  { label: "1280x800", viewport: { width: 1280, height: 800 } },
  { label: "1280@400%", viewport: { width: 320, height: 200 }, deviceScaleFactor: 4 },
];

// Runs in the page. Returns [reason, element, left, right] for each failure.
function measure() {
  const out = [];
  const root = document.documentElement;
  const vw = root.clientWidth;
  const name = (el) => {
    const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).filter(Boolean).join(".") : "";
    return el.tagName.toLowerCase() + (cls ? "." + cls : "");
  };
  if (root.scrollWidth > vw) out.push(["page scrolls sideways", "html", 0, root.scrollWidth]);
  const clipped = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      if ((cs.getPropertyValue("clip") !== "auto" || cs.clipPath !== "none") && r.width <= 1 && r.height <= 1) return true;
    }
    return false;
  };
  const content = (el) =>
    ["IMG", "SVG", "BUTTON", "INPUT"].includes(el.tagName.toUpperCase()) ||
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim() !== "");
  for (const el of document.body.querySelectorAll("*")) {
    if (el.closest("svg") && el.tagName.toLowerCase() !== "svg") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (getComputedStyle(el).display === "none") continue;
    if (el.matches(".skip:not(:focus)")) continue;
    if (clipped(el)) continue;
    const left = Math.round(r.left * 10) / 10;
    const right = Math.round(r.right * 10) / 10;
    if (r.left < -0.5 || r.right > vw + 0.5) {
      out.push(["box crosses the viewport edge", name(el), left, right]);
    } else if (el.closest("header, main, footer") && content(el) && (r.left < 15.5 || r.right > vw - 15.5)) {
      out.push(["content inside the 16px gutter", name(el), left, right]);
    }
  }
  return out;
}

async function main() {
  const dir = resolve(process.argv[2] || "dist");
  const fail = (message) => {
    console.error(`check:layout: ${message}`);
    process.exit(1);
  };
  if (!existsSync(dir) || !statSync(dir).isDirectory()) fail(`${dir} not found`);
  const pages = htmlPages(dir);
  if (pages.length === 0) fail(`no .html files in ${dir}`);

  const { server, origin } = await startServer(dir);
  const browser = await chromium.launch();
  const failures = [];
  try {
    for (const theme of ["light", "dark"]) {
      for (const v of VIEWPORTS) {
        const blocked = [];
        const context = await themedContext(browser, origin, theme, { viewport: v.viewport, deviceScaleFactor: v.deviceScaleFactor || 1 }, blocked);
        for (const p of pages) {
          const page = await openPage(context, pageUrl(origin, p));
          for (const [reason, el, left, right] of await page.evaluate(measure)) {
            failures.push(`${p} ${theme} ${v.label}: ${reason} ${el} ${left}-${right}`);
          }
          for (const url of blocked.splice(0)) failures.push(`${p} ${theme} ${v.label}: request to another host ${url}`);
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
    for (const f of failures) console.error(`check:layout: ${f}`);
    process.exit(1);
  }
  console.log(`check:layout: ${pages.length} pages, 2 themes, 5 viewports: no overflow, gutters kept`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
