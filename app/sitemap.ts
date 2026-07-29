import type { MetadataRoute } from 'next';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tamarplasticsltd.co.uk';

  // Static core pages (Note the trailing slash to match next.config.ts trailingSlash: true)
  const coreRoutes = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/products/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/book-a-survey/`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact/`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/projects/`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/privacy-policy/`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/cookie-policy/`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Dynamic product pages
  const productRoutes = PRODUCT_CATEGORIES.map((category) => ({
    url: `${baseUrl}/products/${category.slug}/`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  }));

  return [...coreRoutes, ...productRoutes];
}
