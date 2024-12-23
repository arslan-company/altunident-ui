import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import QualityStudiesContainer from '@/modules/corporate/quality-studies/QualityStudies.Container';

export default function QualityStudies() {
  return (
    <QualityStudiesContainer />
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
