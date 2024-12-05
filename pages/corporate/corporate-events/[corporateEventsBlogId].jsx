import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CorporateEventsBlogDetailContainer from '@/modules/corporate/corporate-events/corporate-events-blog-detail/CorporateEventsBlogDetail.Container';

export default function CorporateEventsBlogId() {
  return (
    <CorporateEventsBlogDetailContainer />
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
