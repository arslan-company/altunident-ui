import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/components/shared/breadcrumb';
import Footer from '@/components/shared/footer';
import HTMLContent from '@/components/shared/html-content';
import Navbar from '@/components/shared/navbar';
import { filenameToUrl } from '@/features/files';
import { servicesApi } from '@/features/services';
import generateMeta from '@/utils/generate-meta';
import getServicesPath from '@/utils/get-services-path';

type ServiceDetailParams = {
  serviceId: string;
  serviceSlug: string;
};

const fetchData = async (params: ServiceDetailParams) => {
  const { serviceId } = params;

  try {
    const locale = await getLocale();

    const [service] = await Promise.all([
      servicesApi.getService({
        params: {
          id: serviceId,
        },
        query: {
          language: locale === 'tr' ? undefined : locale,
        },
      }),
    ]);

    return { service };
  } catch (error) {
    console.error(
      'Error from src/app/[locale]/[hospitalSlug]/services/[serviceId]/[serviceSlug]/page.tsx page: ',
      error,
    );
    return {
      service: undefined,
    };
  }
};

export default async function ServiceDetailPage({
  params: promiseParams,
}: {
  params: Promise<ServiceDetailParams>;
}) {
  const params = await promiseParams;

  // --- SERVER DATA --- //
  const { service } = await fetchData(params);
  const serviceImage = filenameToUrl(service?.image_url);

  // --- UTILS --- //
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <>
      <Navbar />
      <Breadcrumb
        title={service?.name || ''}
        items={[
          { label: t('site.name'), href: '/' },
          { label: t('common.our_services'), href: getServicesPath(locale) },
          { label: service?.name || '' },
        ]}
        backgroundImage={serviceImage || undefined}
      />
      <main className="container tw-min-h-screen tw-py-12 tw-mx-auto tw-px-4">
        <div>
          <h1 className="tw-mb-8">{service?.name}</h1>
          <HTMLContent content={service?.description || ''} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<ServiceDetailParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { serviceId, serviceSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.service_detail');

  const service = await servicesApi.getService({
    params: {
      id: serviceId,
    },
    query: {
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const tSite = await getTranslations('site');

  const hospitalName = tSite('name');
  const serviceName = service?.name;
  const serviceImage = filenameToUrl(service?.image_url) || '/img/og-images/og-image.png';

  return await generateMeta(
    {
      title: t('title', { hospital_name: hospitalName, service_name: serviceName }),
      description: t('description', {
        hospital_name: hospitalName,
        service_name: serviceName,
      }),
      keywords: t('keywords', {
        hospital_name: hospitalName,
        service_name: serviceName,
      }),
      openGraph: {
        title: t('og_title', { hospital_name: hospitalName, service_name: serviceName }),
        description: t('og_description', {
          hospital_name: hospitalName,
          service_name: serviceName,
        }),
        images: [
          {
            url: serviceImage,
            width: 1200,
            height: 630,
            alt: t('og_image_alt', {
              hospital_name: hospitalName,
              service_name: serviceName,
            }),
          },
        ],
      },
      twitter: {
        title: t('twitter_title', { hospital_name: hospitalName, service_name: serviceName }),
        description: t('twitter_description', {
          hospital_name: hospitalName,
          service_name: serviceName,
        }),
        images: [serviceImage],
      },
    },
    {
      path: `${getServicesPath(locale)}/${serviceId}/${serviceSlug}`,
    },
  );
}
