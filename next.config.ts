import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The sitemap (design spec) uses trailing-slash URLs throughout
  // (/trade/, /products/doors/, etc). Without this, next/link strips
  // trailing slashes from rendered hrefs, breaking every component test
  // that asserts a trailing-slash href and diverging from the canonical
  // URL structure the site is built around.
  trailingSlash: true,
};

export default nextConfig;
