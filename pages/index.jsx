import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HomeContainer from '@/modules/home/Home.Container';

function Index() {
  return <HomeContainer />;
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Index;
