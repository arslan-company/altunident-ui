import type { MetadataRoute } from 'next';

import websiteConfig from '@/config/website.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/_next/', '/static/', '/*.json$'],
      },
    ],
    sitemap: `${websiteConfig.siteUrl}/sitemap.xml`,
  };
}
