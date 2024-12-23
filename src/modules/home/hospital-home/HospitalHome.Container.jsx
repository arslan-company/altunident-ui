import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import GoogleTag from '@/components/SEO/GoogleTag';

import { useServices } from '@/hooks/fetch/useServices';
import { useDepartments } from '@/hooks/fetch/useDepartments';
import { useDoctors } from '@/hooks/fetch/useDoctors';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useLocale from '@/hooks/useLocale';

import HospitalHomeView from './HospitalHome.View';

import { HospitalHomeProvider } from './useHospitalHomeModule';

export default function HospitalHomeContainer() {
  const { t } = useTranslation('common');
  const { currentLanguageQuery } = useLocale();
  const { currentHospitalData } = useGlobalHospitalData();

  const currentHospital = currentHospitalData?.data;

  const departmentsData = useDepartments({
    params: {
      language: currentLanguageQuery,
    },
  });

  const doctorsData = useDoctors({
    params: {
      hospitalId: currentHospital?.id,
      size: 6,
      page: 1,
      language: currentLanguageQuery,
    },
    options: {
      enabled: !!currentHospital?.id,
    },
  });

  const servicesResponse = useServices({
    params: {
      size: 6,
    },
  });

  return (
    <HospitalHomeProvider
      data={{
        departmentsData,
        doctorsData,
        servicesResponse,
      }}
    >
      <GoogleTag />

      <NextSeo
        title={currentHospital?.name}
        description={t('seo.homepage.description')}
      />

      <HospitalHomeView />
    </HospitalHomeProvider>
  );
}
