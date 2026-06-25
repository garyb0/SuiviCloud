import fs from "node:fs";
import path from "node:path";

const root = "dist";
const files = [];
const missing = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(file);
  }
}

function targetFor(href) {
  if (!href || href.startsWith("//") || href.startsWith("/assets")) return null;
  const clean = href.split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
  if (!clean) return path.join(root, "index.html");
  return href.endsWith("/") ? path.join(root, clean, "index.html") : path.join(root, clean);
}

walk(root);

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/href="(\/[^"]+)"/g)) {
    const target = targetFor(match[1]);
    if (target && !fs.existsSync(target)) {
      missing.push(`${file} -> ${match[1]}`);
    }
  }
}

if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log(`Checked ${files.length} HTML files.`);
