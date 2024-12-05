import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CorporateEventsContainer from '@/modules/corporate/corporate-events/CorporateEvents.Container';

export default function CorporateEvents() {
  return (
    <CorporateEventsContainer />
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
