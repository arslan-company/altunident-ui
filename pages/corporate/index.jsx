import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CorporateContainer from '@/modules/corporate/Corporate.Container';

function Corporate() {
  return <CorporateContainer />;
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Corporate;
