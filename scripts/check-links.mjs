// Fails if any internal <a href> in a built site points to a file that does
// not exist. Outbound, mailto, protocol-relative, and fragment-only links are
// skipped.
// Usage: node scripts/check-links.mjs [dir]   (default: dist)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const dir = resolve(process.argv[2] || "dist");

function fail(message) {
  console.error(`check:links: ${message}`);
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

const pages = walk(dir).filter((f) => extname(f) === ".html");
if (pages.length === 0) fail(`no .html files in ${dir}`);

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#([0-9]+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function target(page, href) {
  const u = href.trim();
  if (u === "" || u.startsWith("#") || u.startsWith("//")) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return null;
  let path = u.replace(/[?#].*$/, "");
  if (path === "") return null;
  let p = path.startsWith("/") ? join(dir, path) : join(dirname(page), path);
  if (path.endsWith("/")) p = join(p, "index.html");
  return p;
}

let count = 0;
const broken = [];
for (const page of pages) {
  const html = readFileSync(page, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
    const h = m[0].match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (!h) continue;
    const href = decode(h[1] ?? h[2] ?? h[3]);
    const t = target(page, href);
    if (t === null) continue;
    count++;
    if (!existsSync(t) || !statSync(t).isFile()) broken.push(`${relative(dir, page)}: ${href}`);
  }
}

for (const b of broken) console.error(b);
if (broken.length) process.exit(1);
console.log(`check:links: ${count} internal links resolve`);
