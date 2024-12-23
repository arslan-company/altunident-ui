import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import OrganizationSchemaContainer from '@/modules/corporate/organization-schema/OrganizationSchema.Container';

export default function OrganizationSchema() {
  return (
    <OrganizationSchemaContainer />
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
