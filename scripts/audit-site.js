const origin = process.env.SITE_ORIGIN || "https://suivicloud.xyz";
const sitemapUrl = `${origin}/sitemap.xml`;

function textBetween(html, regex) {
  return html.match(regex)?.[1]?.trim() || "";
}

function allMatches(html, regex) {
  return [...html.matchAll(regex)].map((match) => match[1]);
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function get(url, method = "GET") {
  const response = await fetch(url, { method, redirect: "manual" });
  const body = method === "GET" ? await response.text() : "";
  return { response, body };
}

function auditHtml(pageUrl, html) {
  const title = textBetween(html, /<title>([\s\S]*?)<\/title>/i);
  const description = textBetween(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textBetween(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1s = allMatches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map(stripTags);
  const hreflangs = allMatches(html, /<link\s+rel="alternate"\s+hreflang="([^"]*)"/gi);
  const ogImage = textBetween(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const forms = allMatches(html, /<form\b[^>]*>/gi);
  const issues = [];

  if (!title) issues.push("missing title");
  if (title.length > 70) issues.push(`long title (${title.length})`);
  if (!description) issues.push("missing meta description");
  if (description.length > 170) issues.push(`long meta description (${description.length})`);
  if (h1s.length !== 1) issues.push(`expected 1 h1, found ${h1s.length}`);
  if (!canonical) issues.push("missing canonical");
  if (canonical && canonical !== pageUrl) issues.push(`canonical mismatch: ${canonical}`);
  if (!hreflangs.includes("x-default")) issues.push("missing x-default hreflang");
  if (hreflangs.length < 3) issues.push(`low hreflang count (${hreflangs.length})`);
  if (!ogImage) issues.push("missing og:image");
  if (forms.length && !html.includes("data-contact-form")) issues.push("form without contact script hook");
  if (/\[[^\]]*(Prénom|Nom|First|Last)[^\]]*\]/i.test(html)) issues.push("placeholder name still visible");

  return {
    url: pageUrl,
    title,
    titleLength: title.length,
    descriptionLength: description.length,
    h1: h1s[0] || "",
    hreflangCount: hreflangs.length,
    hasContactForm: forms.length > 0,
    issues
  };
}

async function main() {
  const sitemap = await get(sitemapUrl);
  if (!sitemap.response.ok) {
    throw new Error(`Sitemap failed: ${sitemap.response.status}`);
  }

  const urls = allMatches(sitemap.body, /<loc>([^<]+)<\/loc>/g);
  const results = [];

  for (const pageUrl of urls) {
    const { response, body } = await get(pageUrl);
    const item = {
      url: pageUrl,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
      cache: response.headers.get("cf-cache-status") || response.headers.get("cache-control") || ""
    };

    if (!response.ok) {
      item.issues = [`http ${response.status}`];
    } else {
      Object.assign(item, auditHtml(pageUrl, body));
    }
    results.push(item);
  }

  const issueRows = results.filter((item) => item.issues?.length);
  console.log(JSON.stringify({ checked: results.length, issues: issueRows, pages: results }, null, 2));

  if (issueRows.some((item) => item.issues.some((issue) => issue.startsWith("http ")))) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
