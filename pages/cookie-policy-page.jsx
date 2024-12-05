import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CookiePolicyContainer from '@/modules/cookie-policy/CookiePolicy.Container';

export default function CookiePolicy() {
  return (
    <CookiePolicyContainer />
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
