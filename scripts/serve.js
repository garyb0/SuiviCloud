import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT || 4173);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function resolveRequest(url) {
  const clean = decodeURIComponent(url.split("?")[0]);
  const safe = path.normalize(clean).replace(/^(\.\.[/\\])+/, "");
  let target = path.join(root, safe);
  if (safe.endsWith(path.sep) || clean.endsWith("/")) {
    target = path.join(target, "index.html");
  }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }
  if (!fs.existsSync(target)) {
    target = path.join(root, "404.html");
  }
  return target;
}

http
  .createServer((req, res) => {
    const file = resolveRequest(req.url || "/");
    const type = mime[path.extname(file)] || "application/octet-stream";
    res.writeHead(file.endsWith("404.html") ? 404 : 200, {
      "content-type": type,
      "cache-control": type.startsWith("image/") ? "public, max-age=604800" : "no-cache"
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => {
    console.log(`SuiviCloud local: http://localhost:${port}`);
  });
