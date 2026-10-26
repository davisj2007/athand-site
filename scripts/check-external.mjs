// Fails if a built site makes any runtime request to a host other than
// athandapp.com. Outbound <a href> links are allowed and not checked.
// The body of a <script type="application/ld+json"> block is data the browser
// never fetches, so it is not scanned; its src, and every other script, is.
// Usage: node scripts/check-external.mjs [dir]   (default: dist)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const dir = resolve(process.argv[2] || "dist");
const allowedHost = "athandapp.com";

function fail(message) {
  console.error(`check:external: ${message}`);
  process.exit(1);
}

if (!existsSync(dir) || !statSync(dir).isDirectory()) fail(`${dir} not found`);

function walk(d) {
  const out = [];
  for (const entry of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const scanned = walk(dir).filter((f) => [".html", ".css", ".js", ".mjs", ".svg"].includes(extname(f)));
if (!scanned.some((f) => extname(f) === ".html")) fail(`no .html files in ${dir}`);

function allowed(url) {
  const u = url.trim();
  if (u === "" || u.startsWith("#")) return true;
  if (u.startsWith("//")) return false;
  if (u.startsWith("/")) return true;
  if (/^data:/i.test(u)) return true;
  const scheme = u.match(/^([a-z][a-z0-9+.-]*):/i);
  if (!scheme) return true; // relative
  if (!/^https?$/i.test(scheme[1])) return false;
  try {
    return new URL(u).hostname.toLowerCase() === allowedHost;
  } catch {
    return false;
  }
}

function cssUrls(css) {
  const found = [];
  for (const m of css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) found.push(["url()", m[2]]);
  for (const m of css.matchAll(/@import\s+(?:url\(\s*)?(['"]?)([^'")\s;]+)\1/gi)) found.push(["@import", m[2]]);
  return found;
}

function absoluteStrings(code) {
  return [...code.matchAll(/https?:\/\/[^\s'"`<>)\\]+/gi)].map((m) => m[0]);
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[1] ?? m[2] ?? m[3]) : null;
}

function markupUrls(html) {
  const found = [];
  for (const m of html.matchAll(/<([a-z][a-z0-9:-]*)\b[^>]*>/gi)) {
    const tag = m[0];
    const name = m[1].toLowerCase();
    for (const a of ["src", "poster"]) {
      const v = attr(tag, a);
      if (v !== null) found.push([`<${name} ${a}>`, v]);
    }
    const srcset = attr(tag, "srcset");
    if (srcset !== null) {
      for (const candidate of srcset.split(",")) {
        const url = candidate.trim().split(/\s+/)[0];
        if (url) found.push([`<${name} srcset>`, url]);
      }
    }
    if (name === "object") {
      const v = attr(tag, "data");
      if (v !== null) found.push(["<object data>", v]);
    }
    if (name === "form") {
      const v = attr(tag, "action");
      if (v !== null) found.push(["<form action>", v]);
    }
    if (name === "link") {
      const v = attr(tag, "href");
      if (v !== null) found.push(["<link href>", v]);
    }
    // <base> and SVG elements that load a resource through href.
    if (["base", "image", "use", "feimage", "script"].includes(name)) {
      for (const a of ["href", "xlink:href"]) {
        const v = attr(tag, a);
        if (v !== null) found.push([`<${name} ${a}>`, v]);
      }
    }
    const style = attr(tag, "style");
    if (style !== null) for (const [ctx, url] of cssUrls(style)) found.push([`style attribute ${ctx}`, url]);
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const [ctx, url] of cssUrls(m[1])) found.push([`<style> ${ctx}`, url]);
  }
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const open = `<script${m[1]}>`;
    if (attr(open, "src") !== null) continue;
    if ((attr(open, "type") ?? "").trim().toLowerCase() === "application/ld+json") continue;
    for (const url of absoluteStrings(m[2])) found.push(["inline <script>", url]);
  }
  return found;
}

const offenders = [];
for (const file of scanned) {
  const text = readFileSync(file, "utf8");
  const ext = extname(file);
  let found;
  if (ext === ".html" || ext === ".svg") found = markupUrls(text);
  else if (ext === ".css") found = cssUrls(text);
  else found = absoluteStrings(text).map((u) => ["string", u]);
  for (const [ctx, url] of found) {
    if (!allowed(url)) offenders.push(`${relative(process.cwd(), file)}: ${ctx}: ${url}`);
  }
}

if (offenders.length) {
  for (const o of offenders) console.error(o);
  fail(`${offenders.length} third-party request(s)`);
}
console.log(`check:external: scanned ${scanned.length} files`);
console.log("check:external: no third-party requests");
