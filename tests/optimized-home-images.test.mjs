import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = [
  "components/home/Hero.tsx",
  "components/home/projects.tsx",
];

test("home hero and project carousel use optimized Next images", async () => {
  for (const file of files) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(source, /from ["']next\/image["']/, `${file} must import next/image`);
    assert.doesNotMatch(source, /<img\b/, `${file} must not render a raw img element`);
  }
});

test("project slides without a usable image URL are rejected before rendering", async () => {
  const source = await readFile(
    new URL("../components/home/projects.tsx", import.meta.url),
    "utf8"
  );

  assert.match(source, /initialSlides\.filter\(hasUsableProjectImage\)/);
  assert.doesNotMatch(source, /imageUrl!/);
});
