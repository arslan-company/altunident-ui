import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import { HumanResourcesForm } from '@/features/email-service';

import generateMeta from '@/utils/generate-meta';

export default async function HumanResourcesPage() {
  // --- UTILS --- //
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title="İnsan Kaynakları - İş Başvurusu Formu"
        items={[{ label: t('site.name'), href: '/' }, { label: 'İnsan Kaynakları' }]}
      />
      <main className="tw-min-h-screen">
        <div className="container tw-mx-auto">
          <HumanResourcesForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.human_resources');
  const tSite = await getTranslations('site');

  const hospitalName = tSite('name');

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName }),
      description: t('description', { hospital_name: hospitalName }),
      keywords: t('keywords', { hospital_name: hospitalName }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName }),
        description: t('og_description', { hospital_name: hospitalName }),
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
      path: '/corporate/news',
    },
  );
}
