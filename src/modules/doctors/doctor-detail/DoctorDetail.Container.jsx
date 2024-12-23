import React from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import useSeo from '@/hooks/useSeo';

import DoctorDetailView from './DoctorDetail.View';
import { DoctorDetailProvider } from './useDoctorDetailModule';
import { useFile } from '@/hooks/fetch/useFiles';
import { useDoctorYoutubeLinks } from '@/hooks/fetch/useDoctors';
import isValidFileName from '@/utils/isValidFileName';

export default function DoctorDetailContainer({
  doctorData,
  doctorWorkingHoursData,
  hospitalsData,
  departmentData,
  doctorHospitalsData,
}) {
  const { t } = useTranslation('common');
  const { locale, url } = useSeo();
  const router = useRouter();

  const { doctorId } = router.query;

  // client side fetch
  const doctorImageData = useFile({
    params: {
      fileName: doctorData?.image_url,
    },
    options: {
      enabled:
        !!doctorData?.image_url
        && isValidFileName(doctorData?.image_url, ['.png', '.jpg', '.jpeg']),
    },
  });

  const doctorYoutubeLinksData = useDoctorYoutubeLinks({
    params: {
      id: doctorId,
    },
  });

  const doctor = doctorData;

  return (
    <DoctorDetailProvider
      data={{
        doctorData,
        doctorWorkingHoursData,
        departmentData,
        hospitalsData,
        doctorHospitalsData,
        doctorImageData,
        doctorYoutubeLinksData,
      }}
    >
      <NextSeo
        title={`${doctor?.name || ''} ${t('seo.doctor_detail.title')}`}
        description={`${doctor?.name} - ${t('seo.homepage.title')} ${doctor?.name} ${t('seo.doctor_detail.description')}...`}
        keywords={`${doctor?.name}, ${doctor?.name} ${t('seo.doctor_detail.keywords1')}, ${doctor?.name} ${t('seo.doctor_detail.keywords2')}`}
        titleTemplate={`${doctor?.name || ''} ${t('seo.doctor_detail.title')}`}
        defaultTitle={`${doctor?.name || ''} ${t('seo.doctor_detail.title')}`}
        canonical={url}
        openGraph={{
          title: `${doctor?.name || ''} ${t('seo.doctor_detail.title')}`,
          description: `${doctor?.name} - ${t('seo.homepage.title')} ${doctor?.name} ${t('seo.doctor_detail.description')}...`,
          images: [
            {
              url: '/img/coming-soon.jpg',
              width: 800,
              height: 600,
              alt: 'atakent',
            },
          ],
          locale,
          url,
        }}
      />

      <DoctorDetailView />
    </DoctorDetailProvider>
  );
}
