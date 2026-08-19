/**
 * Builds a LoremFlickr URL: real, keyword-matched stock photography with a
 * deterministic URL (no opaque photo ID to look up) — `lock` pins a
 * specific pseudo-random result for a given keyword set so the same slot
 * always renders the same photo.
 */
export function stockPhotoUrl(query: string, seed: number, width = 1200, height = 1500) {
  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(query)}?lock=${seed}`;
}
