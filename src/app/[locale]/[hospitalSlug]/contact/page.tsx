import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';
import HTMLContent from '@/components/shared/html-content';

import { filenameToUrl } from '@/features/files';
import { hospitalApi, HospitalBanner } from '@/features/hospitals';
import { ContactForm } from '@/features/email-service';

import generateMeta from '@/utils/generate-meta';

import generalInfo from '@/constants/general-info';

interface ContactPageParams {
  hospitalSlug: string;
}

const fetchData = async ({ hospitalSlug }: ContactPageParams) => {
  try {
    const locale = await getLocale();

    const hospitals = await hospitalApi.getHospitals({
      query: {
        slug: hospitalSlug,
        language: locale === 'tr' ? undefined : locale,
      },
    });

    if (!hospitals || !Array.isArray(hospitals?.items) || hospitals?.items.length === 0) {
      return null;
    }

    const hospital = hospitals?.items[0];

    return { hospital };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/contact/page.tsx: ', error);
    return null;
  }
};

export default async function ContactPage({
  params: paramsPromise,
}: {
  params: Promise<ContactPageParams>;
}) {
  const params = await paramsPromise;

  // --- SERVER DATA --- //
  const data = await fetchData(params);

  if (!data) {
    return notFound();
  }

  const { hospital } = data;

  // --- UTILS --- //
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={t('common.contact')}
        items={[
          { label: hospital?.name || '', href: `/${hospital?.slug}` },
          { label: t('common.contact') },
        ]}
      />
      <main className="tw-min-h-screen tw-py-16">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-10 tw-mb-8">
            <div className="lg:tw-col-span-2">
              <div className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-shadow-lg tw-rounded-xl tw-overflow-hidden">
                <HTMLContent
                  className="iframe !tw-h-[500px]"
                  content={hospital?.contact_google_maps_iframe || ''}
                />
              </div>
            </div>

            <div className="tw-space-y-8">
              <div className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-lg">
                <HospitalBanner
                  imageSrc={filenameToUrl(hospital?.image_url)}
                  className="tw-rounded-lg tw-overflow-hidden"
                />

                <div className="tw-mt-6 tw-space-y-6">
                  <div>
                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">{hospital?.name}</h1>
                  </div>

                  <div className="tw-flex tw-items-start tw-space-x-3">
                    <div className="tw-mt-1">
                      <svg
                        className="tw-w-5 tw-h-5 tw-text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="tw-text-gray-600">{hospital?.contact_address}</p>
                  </div>

                  <div className="tw-flex tw-items-start tw-space-x-3">
                    <div className="tw-mt-1">
                      <svg
                        className="tw-w-5 tw-h-5 tw-text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="tw-text-sm tw-text-gray-500 tw-mb-0">{t('common.email')}</p>
                      <p className="tw-text-gray-800 tw-font-medium">{hospital?.contact_email}</p>
                    </div>
                  </div>

                  <div className="tw-flex tw-items-start tw-space-x-3">
                    <div className="tw-mt-1">
                      <svg
                        className="tw-w-5 tw-h-5 tw-text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="tw-text-sm tw-text-gray-500 tw-mb-0">{t('common.phone')}</p>
                      <p className="tw-text-gray-800 tw-font-medium">{generalInfo.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<ContactPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { hospitalSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.contact');

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
      path: '/contact',
      hospitalSlug,
    },
  );
}
