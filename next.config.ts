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
    //
    // IMPORTANT: replace/confirm these against the REAL old URL list. Get it by
    // opening https://oneby.ai/sitemap_index.xml in a browser, or exporting
    // Google Search Console -> Pages, or whitelisting your IP in Wordfence and
    // re-pulling. Each legacy URL that earned rankings/backlinks should 301 to
    // its closest new page so the equity transfers. One line per old URL.
    //
    // The entries below are PLAUSIBLE WordPress/Divi defaults, safe because the
    // new site doesn't use these paths. Verify before launch.
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact", destination: "/demo", permanent: true },
      { source: "/contact-us", destination: "/demo", permanent: true },
      { source: "/get-started", destination: "/demo", permanent: true },
      { source: "/features", destination: "/product", permanent: true },
      { source: "/services", destination: "/product", permanent: true },
      { source: "/plans", destination: "/pricing", permanent: true },
      // Industry/service patterns (confirm the real Divi slugs):
      // { source: "/services/:slug", destination: "/industries/:slug", permanent: true },
      // Old blog structure (WordPress default is often /YYYY/MM/slug):
      // { source: "/:year(\\d{4})/:month(\\d{2})/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
