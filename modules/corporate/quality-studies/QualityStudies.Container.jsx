import { NextSeo } from 'next-seo';

import GoogleTag from '@/components/SEO/GoogleTag';

import useSeo from '@/hooks/useSeo';

import QualityStudiesView from './QualityStudies.View';

export default function QualityStudiesContainer() {
  const { locale, url } = useSeo();

  return (
    <>
      <GoogleTag />

      <NextSeo
        title="Kalite Çalışmaları"
        description="Kalite Çalışmaları"
        keywords="Atakent, Atakent hakkında"
        titleTemplate="Kalite Çalışmaları"
        defaultTitle="Kalite Çalışmaları"
        canonical={url}
        openGraph={{
          title: 'Kalite Çalışmaları',
          description: 'Kalite Çalışmaları',
          images: [
            {
              url: '/img/corporate/human-resources.jpg',
              width: 800,
              height: 600,
              alt: 'Kalite Çalışmaları - Atakent',
            },
          ],
          locale,
          url,
        }}
      />

      <QualityStudiesView />
    </>
  );
}
