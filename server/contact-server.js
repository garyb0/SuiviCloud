import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const port = Number(process.env.CONTACT_PORT || process.env.PORT || 4010);
const dataDir = process.env.CONTACT_DATA_DIR || path.join(os.tmpdir(), "suivicloud-contact-submissions");
const maxBodyBytes = 32 * 1024;
const windowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const buckets = new Map();

const fieldLabels = {
  name: "name",
  email: "email",
  language: "language",
  need: "need",
  message: "message",
  consent: "consent"
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

function rateKey(req) {
  return crypto.createHash("sha256").update(clientIp(req)).digest("hex").slice(0, 24);
}

function isRateLimited(req) {
  const key = rateKey(req);
  const now = Date.now();
  const bucket = buckets.get(key) || { resetAt: now + windowMs, count: 0 };

  if (bucket.resetAt <= now) {
    bucket.resetAt = now + windowMs;
    bucket.count = 0;
  }

  bucket.count += 1;
  buckets.set(key, bucket);
  return bucket.count > maxRequestsPerWindow;
}

function cleanupBuckets() {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

setInterval(cleanupBuckets, windowMs).unref();

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBodyBytes) {
        reject(Object.assign(new Error("Payload too large"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { status: 400 }));
      }
    });

    req.on("error", reject);
  });
}

function clean(value, max = 1000) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, max);
}

function validate(payload) {
  const errors = {};
  const normalized = {
    name: clean(payload.name, 120),
    company: clean(payload.company, 160),
    email: clean(payload.email, 180).toLowerCase(),
    phone: clean(payload.phone, 80),
    language: clean(payload.language, 40),
    need: clean(payload.need, 120),
    website: clean(payload.website, 300),
    timeline: clean(payload.timeline, 120),
    budget: clean(payload.budget, 120),
    message: clean(payload.message, 5000),
    lang: clean(payload.lang, 8) === "en" ? "en" : "fr",
    page: clean(payload.page, 180),
    consent: payload.consent === true || payload.consent === "on" || payload.consent === "true"
  };

  for (const field of Object.keys(fieldLabels)) {
    if (field === "consent") continue;
    if (!normalized[field]) errors[field] = "Required.";
  }

  if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    errors.email = "Invalid email.";
  }

  if (normalized.website) {
    try {
      const parsed = new URL(/^https?:\/\//i.test(normalized.website) ? normalized.website : `https://${normalized.website}`);
      if (!["http:", "https:"].includes(parsed.protocol)) errors.website = "Invalid URL.";
      else normalized.website = parsed.href;
    } catch {
      errors.website = "Invalid URL.";
    }
  }

  if (normalized.message && normalized.message.length < 20) {
    errors.message = "Message is too short.";
  }

  if (!normalized.consent) {
    errors.consent = "Consent is required.";
  }

  return { errors, normalized };
}

async function storeSubmission(req, payload) {
  await fs.mkdir(dataDir, { recursive: true, mode: 0o750 });
  const id = `${new Date().toISOString().replace(/[-:.TZ]/g, "")}-${crypto.randomUUID()}`;
  const record = {
    id,
    createdAt: new Date().toISOString(),
    source: "suivicloud.xyz",
    ipHash: rateKey(req),
    userAgent: clean(req.headers["user-agent"], 220),
    payload
  };
  const file = path.join(dataDir, `${id}.json`);
  await fs.writeFile(file, `${JSON.stringify(record, null, 2)}\n`, { mode: 0o640 });
  await fs.appendFile(path.join(dataDir, "submissions.ndjson"), `${JSON.stringify(record)}\n`, { mode: 0o640 });
  return id;
}

async function handleContact(req, res) {
  if (isRateLimited(req)) {
    sendJson(res, 429, { ok: false, message: "Too many requests." });
    return;
  }

  const payload = await readBody(req);

  if (clean(payload.company_website, 300)) {
    sendJson(res, 200, { ok: true });
    return;
  }

  const { errors, normalized } = validate(payload);
  if (Object.keys(errors).length) {
    sendJson(res, 422, { ok: false, message: "Validation failed.", errors });
    return;
  }

  const id = await storeSubmission(req, normalized);
  sendJson(res, 200, { ok: true, id });
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url || "/", "http://localhost");

    if (req.method === "GET" && reqUrl.pathname === "/healthz") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && reqUrl.pathname === "/api/contact") {
      await handleContact(req, res);
      return;
    }

    if (req.method === "OPTIONS" && reqUrl.pathname === "/api/contact") {
      res.writeHead(204, {
        "Allow": "POST, OPTIONS",
        "Cache-Control": "no-store"
      });
      res.end();
      return;
    }

    sendJson(res, 404, { ok: false, message: "Not found." });
  } catch (error) {
    const status = Number(error.status) || 500;
    sendJson(res, status, { ok: false, message: status === 500 ? "Server error." : error.message });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`SuiviCloud contact server listening on 127.0.0.1:${port}`);
});
