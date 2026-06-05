/**
 * Second pass over .crawl/<locale>/<slug>.html: extracts the ordered text
 * structure (headings, paragraphs, list items, buttons/links, images, form
 * fields) of each page's main content into .crawl/extracted/<locale>/<slug>.json
 * for review before authoring src/content files.
 *
 * Run: npx tsx scripts/extract-text.ts
 */
import { load, type CheerioAPI } from "cheerio";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface Node {
  kind: "h1" | "h2" | "h3" | "h4" | "p" | "li" | "link" | "img" | "field";
  text: string;
  href?: string;
  src?: string;
}

function clean(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function extract($: CheerioAPI): { title: string; description: string; nodes: Node[] } {
  const title = clean($("title").text());
  const description = $('meta[name="description"]').attr("content") ?? "";

  // Main content: Elementor page wrapper; fall back to <main>/<body>.
  let root = $('[data-elementor-type="wp-page"]').first();
  if (!root.length) root = $("main").first();
  if (!root.length) root = $("body");

  const nodes: Node[] = [];
  const seen = new Set<string>();

  root
    .find("h1, h2, h3, h4, p, li, a.elementor-button, input, textarea, img")
    .each((_, el) => {
      const $el = $(el);
      const tag = el.tagName.toLowerCase();

      if (tag === "img") {
        const src = $el.attr("src") ?? "";
        if (!src || src.startsWith("data:")) return;
        const key = `img:${src}`;
        if (seen.has(key)) return;
        seen.add(key);
        nodes.push({ kind: "img", text: clean($el.attr("alt") ?? ""), src });
        return;
      }

      if (tag === "input" || tag === "textarea") {
        const type = $el.attr("type") ?? tag;
        if (type === "hidden") return;
        const label = $el.attr("placeholder") ?? $el.attr("name") ?? "";
        nodes.push({ kind: "field", text: `[${type}] ${clean(label)}` });
        return;
      }

      // Skip elements that only wrap other captured elements
      const text = clean($el.clone().children("ul,ol,div").remove().end().text());
      if (!text) return;
      const key = `${tag}:${text}`;
      if (seen.has(key)) return;
      seen.add(key);

      if (tag === "a") {
        nodes.push({ kind: "link", text, href: $el.attr("href") ?? "" });
      } else {
        nodes.push({ kind: tag as Node["kind"], text });
      }
    });

  return { title, description, nodes };
}

async function main() {
  for (const locale of ["en", "az", "ru"]) {
    const dir = path.join(".crawl", locale);
    const outDir = path.join(".crawl", "extracted", locale);
    await mkdir(outDir, { recursive: true });
    for (const file of (await readdir(dir)).filter((f) => f.endsWith(".html"))) {
      const html = await readFile(path.join(dir, file), "utf8");
      const $ = load(html);
      const data = extract($);
      const out = path.join(outDir, file.replace(/\.html$/, ".json"));
      await writeFile(out, JSON.stringify(data, null, 2));
      console.log(`${locale}/${file}: ${data.nodes.length} nodes`);
    }
  }
}

main();
