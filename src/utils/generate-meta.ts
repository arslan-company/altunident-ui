import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import websiteConfig from '@/config/website.config';

import { deepMerge } from './deep-merge';

type GenerateMetaConfig = {
  /**
   * The path of the page
   *
   * @example
   *
   * return generateMeta({}, { path: '/doctors' })
   *
   * // output:
   * <meta property="og:url" content="https://domain.com/en/doctors" />
   * <meta property="canonical" content="https://domain.com/en/doctors" />
   */
  path?: string;
  /**
   * The slug of the hospital.
   * It is used to generate the __canonical url__ and the __open graph url__.
   * @example
   * return generateMeta({}, { hospitalSlug: 'hospital-slug', path: '/doctors' })
   *
   * // output:
   * <meta property="og:url" content="https://domain.com/en/hospital-slug/doctors" />
   * <meta property="canonical" content="https://domain.com/en/hospital-slug/doctors" />
   */
  hospitalSlug?: string;
};

const generateMeta = async (
  overrides: Metadata | null = null,
  { path = '', hospitalSlug = '' }: GenerateMetaConfig = {},
): Promise<Metadata> => {
  const locale = await getLocale();
  const t = await getTranslations();

  const languages = websiteConfig.locales.reduce((acc, localeValue) => {
    return {
      ...acc,
      [localeValue]: `/${localeValue}`,
    };
  }, {});

  const baseUrl = `${websiteConfig.siteUrl}/${locale}${hospitalSlug ? `/${hospitalSlug}` : ''}${path}`;

  const defaultSiteName = t('site.name');

  const defaultMeta: Metadata = {
    title: t('meta.common.title', { hospital_name: defaultSiteName }),
    description: t('meta.common.description', { hospital_name: defaultSiteName }),
    keywords: t('meta.common.keywords', { hospital_name: defaultSiteName }),
    alternates: {
      canonical: baseUrl,
      languages,
    },
    openGraph: {
      title: t('meta.common.og_title', { hospital_name: defaultSiteName }),
      description: t('meta.common.og_description', { hospital_name: defaultSiteName }),
      url: baseUrl,
      siteName: t('site.name'),
      images: [
        {
          url: '/img/og-images/og-image.png',
          width: 1200,
          height: 630,
          alt: t('meta.common.og_image_alt', { hospital_name: defaultSiteName }),
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.common.twitter_title', { hospital_name: defaultSiteName }),
      description: t('meta.common.twitter_description', { hospital_name: defaultSiteName }),
      images: ['/img/og-images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Check if overrides is null for the performance because deep merge is a heavy operation
  return overrides ? deepMerge(defaultMeta, overrides) : defaultMeta;
};

export default generateMeta;
