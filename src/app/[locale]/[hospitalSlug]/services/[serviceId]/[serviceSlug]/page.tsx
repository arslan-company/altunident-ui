import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import ServiceDetailPage from '@/app/[locale]/services/[serviceId]/[serviceSlug]/page';
import { filenameToUrl } from '@/features/files';
import { hospitalApi } from '@/features/hospitals';
import { servicesApi } from '@/features/services';
import generateMeta from '@/utils/generate-meta';

interface HospitalServiceDetailPageParams {
  hospitalSlug: string;
  serviceId: string;
  serviceSlug: string;
}

export default function HospitalServiceDetailPage(props: any) {
  return <ServiceDetailPage {...props} />;
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<HospitalServiceDetailPageParams>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { hospitalSlug, serviceId, serviceSlug } = params;

  const locale = await getLocale();
  const t = await getTranslations('meta.service_detail');

  const service = await servicesApi.getService({
    params: {
      id: serviceId,
    },
  });

  const hospital = await hospitalApi.getHospitals({
    query: {
      size: 1,
      slug: hospitalSlug,
      language: locale === 'tr' ? undefined : locale,
    },
  });

  const currentHospital = hospital?.items[0];
  const serviceName = service?.name;
  const hospitalName = currentHospital?.name;
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
        siteName: hospitalName,
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
      path: `/services/${serviceId}/${serviceSlug}`,
      hospitalSlug,
    },
  );
}
