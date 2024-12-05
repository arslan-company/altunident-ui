import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import HTMLContent from '@/components/Blog/HTMLContent';

import DoctorCard from '@/components/templates/cards/DoctorCard';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useSeo from '@/hooks/useSeo';
import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useLocale from '@/hooks/useLocale';

import { useDoctors } from '@/hooks/fetch/useDoctors';
import { useDepartment } from '@/hooks/fetch/useDepartments';
import { useFile } from '@/hooks/fetch/useFiles';

import isValidFileName from '@/utils/isValidFileName';

function DepartmentDetail() {
  const { isDefaultHospitalSlugSelected, currentHospitalSlugUrl } = useHospitalRoutes();
  const { currentHospitalData, hospitalsData } = useGlobalHospitalData();
  const { currentLanguageQuery } = useLocale();
  const { locale, url } = useSeo();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { departmentId } = router.query;

  const currentHospital = currentHospitalData.data;
  const hospitals = hospitalsData.data?.items || [];

  const doctorsResponse = useDoctors({
    params: {
      departmentId,
      hospitalId: currentHospital?.id,
    },
  });

  const { data: department } = useDepartment({
    params: {
      id: departmentId, // department id
      language: currentLanguageQuery, // language
    },
  });

  const doctors = doctorsResponse.data?.items || [];

  const isValidImage = isValidFileName(department?.image_url, ['.png', '.jpg', '.jpeg']);

  const { data: image } = useFile({
    params: {
      fileName: department?.image_url,
    },
    options: {
      enabled: !!department?.image_url && isValidImage,
    },
  });

  /**
   * @param {number[]} doctorHospitalIds
  */
  const findDoctorHospitals = (doctorHospitalIds) => (
    hospitals
      .filter((hospital) => doctorHospitalIds.includes(hospital?.id))
      .map((hospital) => ({ name: hospital?.name, id: hospital?.id }))
  );

  return (
    <>
      <NextSeo
        title={`${department?.name || ''} ${t('seo.department_detail.title')}`}
        description={`${department?.name} ${t('seo.department_detail.description')}`}
        keywords={`${department?.name}, ${department?.name} ${t('seo.department_detail.unit')}, ${department?.name} ${t('seo.department_detail.department')}`}
        titleTemplate={`${department?.name || ''} ${t('seo.department_detail.title')}`}
        defaultTitle={`${department?.name || ''} ${t('seo.department_detail.title')}`}
        canonical={url}
        openGraph={{
          title: `${department?.name || ''} ${t('seo.department_detail.title')}`,
          description: `${department?.name} ${t('seo.department_detail.description')}`,
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
        pageTitle={department?.name}
        homePageUrl={!isDefaultHospitalSlugSelected ? currentHospitalSlugUrl : '/'}
        homePageText={!isDefaultHospitalSlugSelected ? currentHospital?.name : t('department_detail_page.page_banner.go_homepage_link_text')}
        parentPageUrl={`${currentHospitalSlugUrl}/departments/`}
        parentPageText={t('department_detail_page.page_banner.parent_page_text')}
        activePageText={department?.name}
        imageSrc={isValidImage ? image : '/img/page-banner-bg1.jpg'}
      />

      <div className="services-details-area ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-5">
              <div className="services-details-text">
                <h1>{department?.name}</h1>
                {department?.description ? (
                  <HTMLContent content={department?.description} />
                ) : (
                  <p>{t('department_detail_page.no_content_text')}</p>
                )}
              </div>
            </div>

            {!!doctors.length && (
              <div className="col-12">
                <div className="row doctors-list-common">
                  <div className="doctor-list-head">
                    <h3 className="title">{t('department_detail_page.doctor_list_title')}</h3>
                  </div>
                  <div className="row">
                    {doctors.map((doctor) => (
                      <div key={doctor?.id} className="col-sm-12 col-md-4 col-lg-3 py-3">
                        <DoctorCard
                          cssx={{
                            width: '100%',
                          }}
                          showInformation={false}
                          data={{
                            departmentName: department?.name,
                            education: doctor.education,
                            doctorHospitals: findDoctorHospitals(
                              doctor?.doctor_hospitals.map((item) => item.hospital_id),
                            ),
                            id: doctor?.id,
                            languages: doctor?.languages,
                            image: doctor?.image_url,
                            specializationTraining: doctor?.specialization_training,
                            name: doctor?.name,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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

export default DepartmentDetail;
