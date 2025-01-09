import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import { Media } from '@/features/files';

import generateMeta from '@/utils/generate-meta';

export default async function QualityStudiesPage() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title="Kalite Çalışmaları"
        items={[{ label: t('site.name'), href: '/' }, { label: 'Kalite Çalışmaları' }]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4 tw-space-y-6">
          <div className="tw-space-y-4">
            <h2>Kalite Yönetim Yapısı:</h2>
            <Media
              src="/img/quality-studies/kalite-organizasyonu.png"
              imageProps={{
                width: 1339,
                height: 753,
                quality: 60,
                alt: 'Kalite Yönetim Yapısı',
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
      title: `Kalite Yönetim Yapısı | ${hospitalName}`,
      description: `Kalite Yönetim Yapısı | ${hospitalName}`,
      keywords: `Kalite Yönetim Yapısı | ${hospitalName}`,
      openGraph: {
        title: `Kalite Yönetim Yapısı | ${hospitalName}`,
        description: `Kalite Yönetim Yapısı | ${hospitalName}`,
        images: [
          {
            url: '/img/og-images/og-image.png',
            width: 1200,
            height: 630,
            alt: `Kalite Yönetim Yapısı | ${hospitalName}`,
          },
        ],
      },
      twitter: {
        title: `Kalite Yönetim Yapısı | ${hospitalName}`,
        description: `Kalite Yönetim Yapısı | ${hospitalName}`,
        images: ['/img/og-images/og-image.png'],
      },
    },
    {
      path: '/corporate/quality-studies',
    },
  );
}
