import React from 'react';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import useSeo from '@/hooks/useSeo';

import useLocale from '@/hooks/useLocale';

import { useDepartments } from '@/hooks/fetch/useDepartments';
import { useDoctors } from '@/hooks/fetch/useDoctors';
import { useServices } from '@/hooks/fetch/useServices';

import HomeView from './Home.View';

import { HomeProvider } from './useHomeModule';

export default function HomeContainer() {
  const { url, locale } = useSeo();
  const { currentLanguageQuery } = useLocale();
  const { t } = useTranslation('common');

  const departmentsData = useDepartments({
    params: {
      language: currentLanguageQuery,
    },
  });

  const servicesResponse = useServices({
    params: {
      size: 6,
    },
  });

  const doctorsData = useDoctors({
    params: {
      size: 6,
      page: 1,
      language: currentLanguageQuery,
    },
  });

  return (
    <HomeProvider
      data={{
        departmentsData,
        doctorsData,
        servicesResponse,
      }}
    >
      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QT0E964DP7" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-QT0E964DP7');
        `}
      </Script>
      <NextSeo
        title={t('seo.homepage.title')}
        description={t('seo.homepage.description')}
        keywords={t('seo.homepage.keywords')}
        titleTemplate={t('seo.homepage.title')}
        defaultTitle={t('seo.homepage.title')}
        canonical={url}
        openGraph={{
          title: t('seo.homepage.title'),
          description: t('seo.homepage.description'),
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
      <HomeView />
    </HomeProvider>
  );
}
