/**
 * One-time content crawl of cybercraft.az.
 *
 * For every known EN page it fetches the page, reads the WPML hreflang
 * alternates to discover the az/ru localized URLs, then fetches those too.
 * Raw HTML is saved under .crawl/<locale>/<en-slug>.html and the discovered
 * slug mapping is written to .crawl/slug-registry.json.
 *
 * Run: npx tsx scripts/crawl-content.ts
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const BASE = "https://cybercraft.az";

/** EN slugs ("" = homepage). Excludes WP utility pages (testing, soon). */
const EN_SLUGS = [
  "",
  "vendors",
  "partners",
  "product-solutions",
  "contact-us",
  "advanced-cybersecurity-services",
  "cloud-solutions",
  "collaboration-tools-unified-communications",
  "cyber-security-solutions",
  "it-sales-solutions-by-cybercraft",
  "it-support-help-desk-services",
  "it-hardware-and-software",
  "innovation-emerging-tech",
  "it-consulting-digital-transformation",
  "it-equipment-smart-solutions",
  "it-infrastructure-design-deployment",
  "managed-it-services",
  "network-solutions-optimization",
  "smart-cctv-solutions-for-modern-security",
  "virtualization-server-consolidation",
  "strategic-it-consulting",
];

interface PageEntry {
  enSlug: string;
  url: { en: string; az?: string; ru?: string };
  slug: { en: string; az?: string; ru?: string };
  status: { en?: number; az?: number; ru?: number };
}

async function get(url: string): Promise<{ status: number; html: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });
  return { status: res.status, html: res.ok ? await res.text() : "" };
}

function hreflangs(html: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re =
    /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) out[m[1]] = m[2];
  return out;
}

/** Extract the path slug from a localized URL like https://cybercraft.az/az/bulud-h%C9%99ll%C9%99ri/ */
function slugFromUrl(url: string, locale: "az" | "ru"): string {
  const u = new URL(url);
  const p = decodeURIComponent(u.pathname)
    .replace(new RegExp(`^/${locale}/?`), "")
    .replace(/\/$/, "");
  return p;
}

async function save(locale: string, enSlug: string, html: string) {
  const dir = path.join(".crawl", locale);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${enSlug || "home"}.html`), html);
}

async function main() {
  const registry: PageEntry[] = [];

  for (const enSlug of EN_SLUGS) {
    const enUrl = `${BASE}/${enSlug ? enSlug + "/" : ""}`;
    const entry: PageEntry = {
      enSlug,
      url: { en: enUrl },
      slug: { en: enSlug },
      status: {},
    };
    process.stdout.write(`EN  ${enUrl} ... `);
    const en = await get(enUrl);
    entry.status.en = en.status;
    console.log(en.status);
    if (en.html) {
      await save("en", enSlug, en.html);
      const alts = hreflangs(en.html);
      for (const loc of ["az", "ru"] as const) {
        const altUrl = alts[loc];
        if (!altUrl) continue;
        entry.url[loc] = altUrl;
        entry.slug[loc] = slugFromUrl(altUrl, loc);
        process.stdout.write(`${loc.toUpperCase()}  ${altUrl} ... `);
        const alt = await get(altUrl);
        entry.status[loc] = alt.status;
        console.log(alt.status);
        if (alt.html) await save(loc, enSlug, alt.html);
        await new Promise((r) => setTimeout(r, 400));
      }
    }
    registry.push(entry);
    await new Promise((r) => setTimeout(r, 400));
  }

  await writeFile(
    path.join(".crawl", "slug-registry.json"),
    JSON.stringify(registry, null, 2),
  );
  console.log("\nRegistry written to .crawl/slug-registry.json");
  const failures = registry.filter(
    (e) => e.status.en !== 200 || (e.url.az && e.status.az !== 200) || (e.url.ru && e.status.ru !== 200),
  );
  if (failures.length) {
    console.log("\nPages needing attention:");
    for (const f of failures) console.log(` - ${f.enSlug || "home"}: ${JSON.stringify(f.status)}`);
  }
}

main();
