import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { hospitalApi } from '@/features/hospitals';

import generateMeta from '@/utils/generate-meta';

import ServicesPage from '../../services/page';

interface HospitalServicesPageParams {
  hospitalSlug: string;
}

export default function HospitalServicesPage(props: any) {
  return <ServicesPage {...props} />;
}
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<HospitalServicesPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { hospitalSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.services');

  const hospital = await hospitalApi.getHospitals({
    query: {
      size: 1,
      slug: hospitalSlug,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const hospitalName = currentHospital?.name;

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName }),
      description: t('description', { hospital_name: hospitalName }),
      keywords: t('keywords', { hospital_name: hospitalName }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName }),
        description: t('og_description', { hospital_name: hospitalName }),
        siteName: hospitalName,
        images: [
          {
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: t('og_image_alt', { hospital_name: hospitalName }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName }),
        description: t('twitter_description', { hospital_name: hospitalName }),
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/services',
      hospitalSlug,
    },
  );
}
