import React from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import useSeo from '@/hooks/useSeo';

import ServiceListView from './ServiceList.View';
import { ServiceListProvider } from './useServiceListModule';

export default function ServiceListContainer({ servicesData }) {
  const { t } = useTranslation('common');
  const { locale, url } = useSeo();

  return (
    <ServiceListProvider
      data={{
        servicesData,
      }}
    >
      <NextSeo
        title={t('seo.department.title')}
        description={t('seo.department.description')}
        keywords={t('seo.department.keywords')}
        titleTemplate={t('seo.department.title')}
        defaultTitle={t('seo.department.title')}
        canonical={url}
        openGraph={{
          title: t('seo.department.title'),
          description: t('seo.department.description'),
          images: [
            {
              url: '/img/coming-soon.jpg',
              width: 800,
              height: 600,
              alt: 'atakent',
            },
          ],
          locale,
          url,
        }}
      />

      <ServiceListView />

    </ServiceListProvider>
  );
}
