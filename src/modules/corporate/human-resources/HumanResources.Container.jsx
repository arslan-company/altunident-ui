import React from 'react';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import useSeo from '@/hooks/useSeo';

import GoogleTag from '@/components/SEO/GoogleTag';

import HumanResourcesView from './HumanResources.View';

export default function HumanResourcesContainer() {
  const { t } = useTranslation('common');
  const { url, locale } = useSeo();

  return (
    <>
      <GoogleTag />

      <NextSeo
        title={t('seo.cv_form.title')}
        description={t('seo.cv_form.description')}
        keywords={t('seo.cv_form.keywords')}
        titleTemplate={t('seo.cv_form.title')}
        defaultTitle={t('seo.cv_form.title')}
        canonical={url}
        openGraph={{
          title: t('seo.cv_form.title'),
          description: t('seo.cv_form.description'),
          images: [
            {
              url: '/img/corporate/human-resources.jpg',
              width: 800,
              height: 600,
              alt: 'atakent',
            },
          ],
          locale,
          url,
        }}
      />

      <HumanResourcesView />
    </>
  );
}
