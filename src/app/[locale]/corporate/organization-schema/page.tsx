import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import { Media } from '@/features/files';

import generateMeta from '@/utils/generate-meta';

export default async function OrganizationSchemaPage() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title="Organizasyon Şeması"
        items={[{ label: t('site.name'), href: '/' }, { label: 'Organizasyon Şeması' }]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4 tw-space-y-6">
          <div className="tw-space-y-4">
            <h2>Yalova Atakent Hastanesi Organizasyonu:</h2>
            <Media
              src="/img/organization-schema/yalova-atakent-organizasyon.png"
              imageProps={{
                width: 1965,
                height: 2040,
                quality: 60,
                alt: 'Yalova Atakent Hastanesi Organizasyonu',
                sizes: '100vw',
              }}
            />
          </div>
          <div className="tw-space-y-4">
            <h2>Kocaeli Atakent Cihan Hastanesi Organizasyonu:</h2>
            <Media
              src="/img/organization-schema/kocaeli-cihan-organizasyon.jpg"
              imageProps={{
                width: 3397,
                height: 2316,
                quality: 60,
                alt: 'Kocaeli Atakent Cihan Hastanesi Organizasyonu',
                sizes: '100vw',
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const tSite = await getTranslations('site');

  const hospitalName = tSite('name');

  return await generateMeta(
    {
      title: `Organizasyon Şeması | ${hospitalName}`,
      description: `Organizasyon Şeması | ${hospitalName}`,
      keywords: `Organizasyon Şeması | ${hospitalName}`,
      openGraph: {
        title: `Organizasyon Şeması | ${hospitalName}`,
        description: `Organizasyon Şeması | ${hospitalName}`,
        images: [
          {
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: `Organizasyon Şeması | ${hospitalName}`,
          },
        ],
      },
      twitter: {
        title: `Organizasyon Şeması | ${hospitalName}`,
        description: `Organizasyon Şeması | ${hospitalName}`,
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/corporate/organization-schema',
    },
  );
}
