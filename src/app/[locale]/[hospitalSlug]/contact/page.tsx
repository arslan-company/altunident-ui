import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';
import HTMLContent from '@/components/shared/html-content';

import { filenameToUrl } from '@/features/files';
import { hospitalApi, HospitalBanner, HospitalContactInformation } from '@/features/hospitals';
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
          <HospitalContactInformation
            iframe={hospital?.contact_google_maps_iframe || ''}
            imageSrc={filenameToUrl(hospital?.image_url) || ''}
            name={hospital?.name}
            address={hospital?.contact_address}
            email={hospital?.contact_email}
            phone={hospital?.contact_phone}
          />

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
