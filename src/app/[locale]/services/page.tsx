import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import slugify from '@/utils/slugify';
import generateMeta from '@/utils/generate-meta';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import Breadcrumb from '@/components/shared/breadcrumb';

import { ServiceCard, servicesApi } from '@/features/services';

import FilterOptions from './components/filter-options';

type ServicesPageSearchParams = {
  search: string;
};

type ServicesPageParams = {
  hospitalSlug?: string;
};

const fetchData = async (searchParams: ServicesPageSearchParams) => {
  const { search } = searchParams;

  try {
    const locale = await getLocale();

    const [services] = await Promise.all([
      servicesApi.getServices({
        query: {
          name: search,
          size: 100,
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { services };
  } catch (error) {
    console.error('Error from src/app/[locale]/[hospitalSlug]/departments/page.tsx: ', error);
    return {
      services: undefined,
    };
  }
};

export default async function ServicesPage({
  searchParams: promiseSearchParams,
  params: promiseParams,
}: {
  searchParams: Promise<ServicesPageSearchParams>;
  params: Promise<ServicesPageParams>;
}) {
  const searchParams = await promiseSearchParams;
  const params = await promiseParams;

  const { hospitalSlug } = params;

  // --- SERVER DATA --- //
  const { services: servicesData } = await fetchData(searchParams);

  // --- UTILS --- //
  const t = await getTranslations();

  // --- DATA --- //
  const services = servicesData?.items || [];

  // Group departments by letters
  const groupedServices = services.reduce((acc: { [key: string]: any[] }, service) => {
    const firstLetter = service.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(service);
    return acc;
  }, {});

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupedServices).sort();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={t('services_page.page_banner.parent_page_text')}
        items={[
          { label: t('site.name'), href: '/' },
          { label: t('services_page.page_banner.parent_page_text') },
        ]}
      />
      <main className="tw-min-h-screen tw-bg-gray-50 tw-py-12">
        <div className="container tw-mx-auto tw-px-4">
          <div className="tw-mb-8">
            <FilterOptions />
          </div>

          <div className="tw-space-y-12">
            {sortedGroups.map((letter) => (
              <div key={letter} className="tw-space-y-4">
                <h2 className="tw-text-2xl tw-font-bold tw-text-primary">{letter}</h2>
                <div className="tw-h-[1px] tw-w-full tw-bg-gray-200" />
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3">
                  {groupedServices[letter].map((service: any) => (
                    <Link
                      href={`${hospitalSlug ? `/${hospitalSlug}` : ''}/services/${service?.id}/${slugify(service?.name)}`}
                      key={service?.id}
                    >
                      <ServiceCard title={service?.name} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.services');
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
      path: '/services',
    },
  );
}
