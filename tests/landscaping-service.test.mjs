import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the landscaping service landing page is complete and discoverable", async () => {
  const [page, servicePaths, sitemap, servicesHub] = await Promise.all([
    read("app/(services)/services/landscaping/page.tsx"),
    read("lib/service-path.ts"),
    read("app/sitemap.ts"),
    read("components/services/ServicesHub.tsx"),
  ]);

  assert.match(page, /title:\s*["']Bay Area Landscaping/);
  assert.match(page, /path:\s*["']\/services\/landscaping["']/);
  assert.match(page, /serviceType:\s*["']Landscape design and construction["']/);
  assert.match(page, /Landscape Design & Build/);
  assert.match(page, /Hardscaping/);
  assert.match(page, /Outdoor Living/);
  assert.match(page, /href=["']\/contact["']/);
  assert.match(page, /Book a free consultation/);

  assert.match(servicePaths, /["']landscaping["']/);
  assert.match(servicePaths, /["']Landscaping["']:\s*["']landscaping["']/);
  assert.match(sitemap, /\/services\/landscaping/);
  assert.match(servicesHub, /slug:\s*["']landscaping["']/);
});

test("root metadata does not force service pages to canonicalize to the homepage", async () => {
  const layout = await read("app/layout.tsx");

  assert.doesNotMatch(layout, /alternates:\s*\{\s*canonical:\s*["']\/["']/s);
});

test("paid service pages declare self-referencing canonicals", async () => {
  const pages = [
    ["app/(services)/services/adu/page.tsx", "/services/adu"],
    ["app/(services)/services/kitchen-remodeling/page.tsx", "/services/kitchen-remodeling"],
    ["app/(services)/services/landscaping/page.tsx", "/services/landscaping"],
  ];

  for (const [file, canonical] of pages) {
    const page = await read(file);
    assert.match(
      page,
      new RegExp(`alternates:\\s*\\{\\s*canonical:\\s*["']${canonical}["']\\s*\\}`),
      `${file} should declare ${canonical} as its canonical URL`,
    );
  }
});
