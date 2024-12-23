import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ServiceListContainer from '@/modules/services/service-list/ServiceList.Container';

import { getServices } from '@/api/services';

export default function Services({ servicesData }) {
  return (
    <ServiceListContainer servicesData={servicesData} />
  );
}

export async function getServerSideProps({ locale, query }) {
  const { search } = query;

  const servicesData = await getServices({
    name: search,
    language: locale === 'tr' ? undefined : locale, // language
  });

  return {
    props: {
      servicesData,
      ...(await serverSideTranslations(locale)),
    },
  };
}
