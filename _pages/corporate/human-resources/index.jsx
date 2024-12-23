import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HumanResourcesContainer from '@/modules/corporate/human-resources/HumanResources.Container';

function CvForm() {
  return (
    <HumanResourcesContainer />
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default CvForm;
