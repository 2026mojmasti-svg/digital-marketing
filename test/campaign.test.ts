import assert from "node:assert/strict";
import test from "node:test";
import { INSTAGRAM_URL, MANIFESTO_SLIDES } from "../src/lib/campaign.ts";

test("the Ferrous Manifesto campaign supplies six Instagram-bound slides", () => {
  assert.equal(MANIFESTO_SLIDES.length, 6);
  assert.equal(INSTAGRAM_URL, "https://www.instagram.com/ferrous.digitalmarketing");
  assert.equal(MANIFESTO_SLIDES.every((slide) => slide.href === INSTAGRAM_URL), true);
});
