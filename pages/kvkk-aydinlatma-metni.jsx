import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import KVKKContainer from '@/modules/kvkk/KVKK.Container';

export default function KVKK2() {
  return <KVKKContainer />;
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
