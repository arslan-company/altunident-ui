import React from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import useSeo from '@/hooks/useSeo';

import DoctorsListView from './DoctorsList.View';
import { DoctorsListProvider } from './useDoctorsListModule';

export default function DoctorsListContainer({ departmentsData, doctorsData, hospitalsData }) {
  const { t } = useTranslation('common');
  const { locale, url } = useSeo();

  return (
    <DoctorsListProvider
      data={{
        departmentsData,
        doctorsData,
        hospitalsData,
      }}
    >
      <NextSeo
        title={t('seo.doctors.title')}
        description={t('seo.doctors.description')}
        keywords={t('seo.doctors.keywords')}
        titleTemplate={t('seo.doctors.title')}
        defaultTitle={t('seo.doctors.title')}
        canonical={url}
        openGraph={{
          title: t('seo.doctors.title'),
          description: t('seo.doctors.description'),
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

      <DoctorsListView />
    </DoctorsListProvider>
  );
}
