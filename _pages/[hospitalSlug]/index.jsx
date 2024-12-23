import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HospitalHomeContainer from '@/modules/home/hospital-home/HospitalHome.Container';

export default function Index() {
  return <HospitalHomeContainer />;
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
