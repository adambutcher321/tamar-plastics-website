import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The sitemap (design spec) uses trailing-slash URLs throughout
  // (/trade/, /products/doors/, etc). Without this, next/link strips
  // trailing slashes from rendered hrefs, breaking every component test
  // that asserts a trailing-slash href and diverging from the canonical
  // URL structure the site is built around.
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/carlton/', destination: '/', permanent: true },
      { source: '/landscaping/', destination: '/products/', permanent: true },
      { source: '/decking/', destination: '/products/cladding/', permanent: true },
      { source: '/fencing/', destination: '/products/', permanent: true },
      { source: '/groundworks/', destination: '/products/', permanent: true },
      { source: '/trade-counter/', destination: '/contact/', permanent: true },
      { source: '/free-survey/', destination: '/book-a-survey/', permanent: true },
      { source: '/doors.html', destination: '/products/doors/', permanent: true },
      { source: '/windows.html', destination: '/products/windows/', permanent: true },
      { source: '/roofline.html', destination: '/products/roofline/', permanent: true },
      { source: '/contact-us/', destination: '/contact/', permanent: true },
    ];
  },
};

export default nextConfig;
