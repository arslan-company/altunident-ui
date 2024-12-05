import React from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import useSeo from '@/hooks/useSeo';

import { DepartmentListProvider } from './useDepartmentListModule';
import DepartmentListView from './DepartmentList.View';

export default function DepartmentListContainer({ departmentsData, hospitalsData }) {
  const { t } = useTranslation('common');
  const { locale, url } = useSeo();

  return (
    <DepartmentListProvider
      data={{
        departmentsData,
        hospitalsData,
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

      <DepartmentListView />

    </DepartmentListProvider>
  );
}
