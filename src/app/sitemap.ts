import { MetadataRoute } from 'next';

import websiteConfig from '@/config/website.config';
import { departmentsApi } from '@/features/departments';
import { hospitalApi } from '@/features/hospitals';
import { servicesApi } from '@/features/services';
import slugify from '@/utils/slugify';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

const withLocale = (
  path: string,
  options: { priority?: number; changeFrequency?: ChangeFrequency } = {},
) => {
  const { priority = 0.5, changeFrequency = 'daily' } = options;

  return websiteConfig.locales.map((locale) => ({
    url: `${websiteConfig.siteUrl}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [hospitals, services] = await Promise.all([
    hospitalApi.getHospitals({
      query: {
        size: 100,
      },
    }),
    servicesApi.getServices({
      query: {
        size: 100,
      },
    }),
  ]);

  const hospitalItems = hospitals?.items || [];
  const serviceItems = services?.items || [];

  const servicesUrls = websiteConfig.locales.flatMap((locale) => {
    const servicesPath = locale === 'tr' ? '/hizmetlerimiz' : '/services';
    return [
      {
        url: `${websiteConfig.siteUrl}/${locale}${servicesPath}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as ChangeFrequency,
        priority: 0.8,
      },
      ...serviceItems.map((service) => ({
        url: `${websiteConfig.siteUrl}/${locale}${servicesPath}/${service.id}/${slugify(service.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: 0.6,
      })),
    ];
  });

  const hospitalUrls = hospitalItems.flatMap((hospital) => {
    const basePath = `/${hospital.slug}`;
    return [
      ...withLocale(basePath, { priority: 0.9 }),
      ...websiteConfig.locales.flatMap((locale) => {
        const servicesPath = locale === 'tr' ? '/hizmetlerimiz' : '/services';
        return [
          {
            url: `${websiteConfig.siteUrl}/${locale}${basePath}${servicesPath}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 0.7,
          },
          ...serviceItems.map((service) => ({
            url: `${websiteConfig.siteUrl}/${locale}${basePath}${servicesPath}/${service.id}/${slugify(service.name)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as ChangeFrequency,
            priority: 0.5,
          })),
        ];
      }),
    ];
  });

  return [
    ...withLocale('/', { priority: 1.0 }),
    ...servicesUrls,
    ...hospitalUrls,
  ];
}
