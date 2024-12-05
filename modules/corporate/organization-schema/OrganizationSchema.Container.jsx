import { NextSeo } from 'next-seo';

import GoogleTag from '@/components/SEO/GoogleTag';

import useSeo from '@/hooks/useSeo';
import OrganizationSchemaView from './OrganizationSchema.View';

export default function OrganizationSchemaContainer() {
  const { locale, url } = useSeo();

  return (
    <>
      <GoogleTag />

      <NextSeo
        title="Organizasyon Şeması"
        description="Organizasyon Şeması"
        keywords="Atakent, Atakent hakkında"
        titleTemplate="Organizasyon Şeması"
        defaultTitle="Organizasyon Şeması"
        canonical={url}
        openGraph={{
          title: 'Organizasyon Şeması',
          description: 'Organizasyon Şeması',
          images: [
            {
              url: '/img/corporate/human-resources.jpg',
              width: 800,
              height: 600,
              alt: 'Organizasyon Şeması - Atakent',
            },
          ],
          locale,
          url,
        }}
      />

      <OrganizationSchemaView />
    </>
  );
}
