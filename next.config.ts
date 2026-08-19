import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the browser from being tricked into rendering the site as a
  // different MIME type than served (e.g. executing a JSON response as JS).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Blocks the site from being embedded in a third-party <iframe> —
  // clickjacking protection for pages with a real checkout flow.
  { key: "X-Frame-Options", value: "DENY" },
  // Sends only the origin (not the full URL/query string) to other sites
  // when a link is followed off-site, and nothing on downgrade to HTTP.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables browser APIs this storefront never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
