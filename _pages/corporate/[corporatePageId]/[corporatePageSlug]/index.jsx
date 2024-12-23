import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SubCorporatePageContainer from '@/modules/corporate/sub-corporate-pages/SubCorporatePage.Container';

export default function SubCorporatePage() {
  return <SubCorporatePageContainer />;
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
