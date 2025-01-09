import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import { Button } from '@/components/base/button';

import { filenameToUrl } from '@/features/files';
import { hospitalApi, HospitalBanner } from '@/features/hospitals';
import { ContactForm } from '@/features/email-service';

import generateMeta from '@/utils/generate-meta';

const fetchData = async () => {
  try {
    const locale = await getLocale();

    const [hospitals] = await Promise.all([
      hospitalApi.getHospitals({
        query: {
          size: 100,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { hospitals };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/contact/page.tsx: ', error);
    return {
      hospitals: undefined,
    };
  }
};

export default async function ContactPage() {
  // --- SERVER DATA --- //
  const { hospitals: hospitalsData } = await fetchData();

  // --- UTILS --- //
  const t = await getTranslations();

  // --- DATA --- //
  const hospitals = hospitalsData?.items || [];

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={t('common.contact')}
        items={[{ label: t('site.name'), href: '/' }, { label: t('common.contact') }]}
      />
      <main className="tw-min-h-screen tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-grid tw-gap-4 tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital?.id}
                className="tw-w-full tw-px-4 tw-py-3 tw-shadow-md tw-rounded-lg tw-flex tw-flex-col tw-justify-between"
              >
                <Link href={`/${hospital?.slug}`} className="tw-block tw-w-full">
                  <HospitalBanner
                    imageSrc={filenameToUrl(hospital?.image_url) || ''}
                    name={hospital?.name}
                    className="tw-rounded-md"
                  />
                </Link>
                <div className="tw-my-5">
                  <div className="tw-mb-3">
                    <p className="tw-text-sm tw-text-gray-500 tw-m-0 tw-font-semibold">
                      {t('common.address').toUpperCase()}
                    </p>
                    <p className="tw-font-bold">{hospital?.contact_address}</p>
                  </div>
                  <div>
                    <p className="tw-text-sm tw-text-gray-500 tw-m-0 tw-font-semibold">
                      {t('common.email').toUpperCase()}
                    </p>
                    <p className="tw-font-bold">{hospital?.contact_email}</p>
                  </div>
                </div>
                <Link href={`/${hospital?.slug}/contact`} className="tw-block tw-w-full">
                  <Button size="sm" fullWidth>
                    {t('common.location')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.contact');
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
      path: '/contact',
    },
  );
}
