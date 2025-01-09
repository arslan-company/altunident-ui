import { MetadataRoute } from 'next';

import { hospitalApi } from '@/features/hospitals';
import { departmentsApi } from '@/features/departments';

import websiteConfig from '@/config/website.config';

import slugify from '@/utils/slugify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- REQUESTS --- //
  const hospitalsResponse = await hospitalApi.getHospitals({
    query: {
      size: 100,
    },
  });

  const departmentsResponse = await departmentsApi.getDepartments({
    query: {
      size: 100,
    },
  });

  const hospitals = hospitalsResponse?.items || [];
  const departments = departmentsResponse?.items || [];

  // --- UTILS --- //
  const withRoot = (url: string) => `${websiteConfig.siteUrl}${url}`;

  const withLocale = (
    url: string,
    override?: Partial<MetadataRoute.Sitemap[number]>,
  ): MetadataRoute.Sitemap => {
    return websiteConfig.locales.map((locale) => ({
      url: withRoot(`/${locale}${url}`),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      ...override,
    }));
  };

  // --- PAGES --- //
  const staticPages: MetadataRoute.Sitemap = [
    ...withLocale('', { priority: 1 }),
    ...withLocale('/blog', { priority: 0.8, changeFrequency: 'weekly' }),
    ...withLocale('/contact', { priority: 0.8, changeFrequency: 'weekly' }),
    ...withLocale('/cookie-policy-page', { priority: 0.8, changeFrequency: 'monthly' }),
    ...withLocale('/departments', { priority: 0.8 }),
    ...withLocale('/doctors', { priority: 0.8 }),
    ...withLocale('/hospitals', { priority: 0.8 }),
    ...withLocale('/kvkk-aydinlatma-metni', { priority: 0.8, changeFrequency: 'monthly' }),
    ...withLocale('/services', { priority: 0.8 }),
  ];

  const hospitalHomePages = hospitals.map((hospital) => [
    ...withLocale(`/${hospital?.slug}/contact`, { priority: 0.7, changeFrequency: 'weekly' }),
    ...withLocale(`/${hospital?.slug}/departments`, { priority: 0.7 }),
    ...withLocale(`/${hospital?.slug}/doctors`, { priority: 0.7 }),
    ...withLocale(`/${hospital?.slug}/services`, { priority: 0.7 }),
  ]);

  const hospitalsPages = hospitals.map((hospital) =>
    withLocale(`/hospitals/${hospital?.slug}`, { priority: 0.7, changeFrequency: 'weekly' }),
  );

  const departmentsPages = departments.map((department) =>
    withLocale(`/departments/${department?.id}/${slugify(department?.name)}`, {
      priority: 0.7,
    }),
  );

  return [
    ...staticPages,
    ...hospitalHomePages.flat(),
    ...hospitalsPages.flat(),
    ...departmentsPages.flat(),
  ];
}
