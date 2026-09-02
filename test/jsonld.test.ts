import assert from "node:assert/strict";
import test from "node:test";
import { organizationJsonLd, websiteJsonLd } from "../src/lib/jsonld.ts";

test("WebSite schema does not advertise search until site search exists", () => {
  const schema = websiteJsonLd();

  assert.equal("potentialAction" in schema, false);
});

test("Organization schema lists only public social profiles", () => {
  assert.deepEqual(organizationJsonLd().sameAs, ["https://instagram.com/ferrous.studio"]);
});
