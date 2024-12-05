import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import HTMLContent from '@/components/Blog/HTMLContent';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useSeo from '@/hooks/useSeo';
import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useLocale from '@/hooks/useLocale';

import { useFile } from '@/hooks/fetch/useFiles';
import { useService } from '@/hooks/fetch/useServices';

import isValidFileName from '@/utils/isValidFileName';

export default function ServiceDetail() {
  const { isDefaultHospitalSlugSelected, currentHospitalSlugUrl } = useHospitalRoutes();
  const { currentHospitalData } = useGlobalHospitalData();
  const { currentLanguageQuery } = useLocale();
  const { locale, url } = useSeo();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { serviceId } = router.query;

  const currentHospital = currentHospitalData.data;

  const { data: service } = useService({
    params: {
      serviceId,
      language: currentLanguageQuery, // language
    },
  });

  const isValidImage = isValidFileName(service?.image_url, ['.png', '.jpg', '.jpeg']);

  const { data: image } = useFile({
    params: {
      fileName: service?.image_url,
    },
    options: {
      enabled: !!service?.image_url && isValidImage,
    },
  });

  return (
    <>
      <NextSeo
        title={service?.name}
        description={service?.name}
        keywords={service?.name}
        titleTemplate={service?.name}
        defaultTitle={service?.name}
        canonical={url}
        openGraph={{
          title: service?.name,
          description: service?.name,
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

      <Navbar />

      <PageBanner
        pageTitle={service?.name}
        homePageUrl={!isDefaultHospitalSlugSelected ? currentHospitalSlugUrl : '/'}
        homePageText={!isDefaultHospitalSlugSelected ? currentHospital?.name : t('services_page.page_banner.homepage_text')}
        parentPageUrl={`${currentHospitalSlugUrl}/services/`}
        parentPageText={t('services_page.page_banner.parent_page_text')}
        activePageText={service?.name}
        imageSrc={isValidImage ? image : '/img/page-banner-bg1.jpg'}
      />

      <div className="services-details-area ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-5">
              <div className="services-details-text">
                {service?.description ? (
                  <HTMLContent content={service?.description} />
                ) : (
                  <p>{t('services_page.no_content_text')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
