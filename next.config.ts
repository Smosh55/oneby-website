import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// CSP only in production so it doesn't interfere with dev HMR / the error
// overlay. 'unsafe-inline' is required for Next's bootstrap, the JSON-LD
// scripts, and GA's init snippet (no nonce pipeline here), but external script
// origins are still restricted to self + Google Tag Manager.
if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  });
}

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    // Permanent (308) redirects for the WordPress -> Next cutover on oneby.ai.
    // Populate this from the old site's URL list (export from Google Search
    // Console "Pages" or the WordPress sitemap) so existing SEO equity carries
    // over. A few safe defaults are included; add one line per legacy URL.
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      // { source: "/old-blog-path/:slug", destination: "/blog/:slug", permanent: true },
      // { source: "/services/hvac", destination: "/industries/hvac", permanent: true },
    ];
  },
};

export default nextConfig;
