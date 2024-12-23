/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Button from '@/components/base/Button';

import AppointmentDialog from '@/components/templates/feedback/AppointmentDialog';

import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import HTMLContent from '@/components/Blog/HTMLContent';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useLocale from '@/hooks/useLocale';
import { useDate } from '@/hooks/useDate';

import useDoctorDetailModule from './useDoctorDetailModule';

export default function DoctorDetailView() {
  const {
    doctorData,
    doctorWorkingHoursData,
    hospitalsData,
    departmentData,
    doctorHospitalsData,
    doctorImageData,
    doctorYoutubeLinksData,
  } = useDoctorDetailModule();

  const {
    currentHospitalSlug,
    currentHospitalSlugUrl,
    defaultHospitalSlug,
  } = useHospitalRoutes();

  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  const { t } = useTranslation('common');
  const { locales, currentLanguage } = useLocale();
  const { translatedDaysOfTheWeek } = useDate();
  const { currentHospitalData } = useGlobalHospitalData();

  const currentHospital = currentHospitalData?.data;

  const doctorImage = doctorImageData.data;

  const doctor = doctorData;
  const hospitals = hospitalsData?.items || [];
  const department = departmentData;
  const doctorHospitals = doctorHospitalsData?.items || [];
  const doctorWorkingHours = doctorWorkingHoursData?.items || [];
  const doctorYoutubeLinks = doctorYoutubeLinksData.data?.items || [];

  const doctorHospitalsItems = useMemo(
    () => hospitals.filter(
      (hospital) => doctorHospitals.some(
        (doctorHospital) => doctorHospital?.hospital_id === hospital?.id,
      ),
    ),
    [hospitals, doctorHospitals],
  );

  const getTranslatedWorkingHours = () => {
    const localeData = locales.reduce(((localeObj, locale) => {
      // eslint-disable-next-line no-param-reassign
      localeObj[locale.language] = [];

      const weeks = translatedDaysOfTheWeek[locale.language];

      doctorWorkingHours.forEach((item, index) => {
        localeObj[locale.language].push({ week: weeks[index], ...item });
      });

      return localeObj;
    }), {});

    return localeData;
  };

  const translatedWorkingHours = getTranslatedWorkingHours();

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={doctor?.name}
        homePageUrl={currentHospitalSlug !== defaultHospitalSlug ? currentHospitalSlugUrl : '/'}
        homePageText={currentHospitalSlug !== defaultHospitalSlug ? currentHospital?.name : t('doctor_detail_page.page_banner.go_homepage_link_text')}
        parentPageUrl={`${currentHospitalSlugUrl}/doctors/?hospitalFilter=${currentHospitalSlug === defaultHospitalSlug || currentHospitalSlug === undefined ? 'all' : currentHospital?.id}&departmentFilter=all&size=8&page=1`}
        parentPageText={t('doctor_detail_page.page_banner.parent_page_text')}
        activePageText={doctor?.name}
        imgClass="bg-3"
      />

      <AppointmentDialog
        open={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
        hospitalIds={doctorHospitals.map((hospital) => hospital?.hospital_id)}
      />

      <div className="doctor-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="doctor-sidebar">
                <div className="doctor-img">
                  {doctorImage && (
                    <Image
                      src={doctorImage}
                      alt={doctor?.name ?? 'Atakent'}
                      width={400}
                      height={400}
                      quality={60}
                      className="doctor"
                    />
                  )}
                  <Image
                    src="/img/doctors/doctor-background.jpg"
                    alt="atakent doctor background"
                    className="background"
                    width={350}
                    height={350}
                    quality={70}
                  />
                </div>

                <div className="doctor-availability">
                  <h3>
                    <i className="bx bx-time" />
                    {t('doctor_detail_page.available_times_area.title')}
                  </h3>

                  <ul>
                    {translatedWorkingHours[currentLanguage].map((item) => (
                      <li key={item?.id}>
                        {item?.week}
                        {item?.active ? (
                          <span>
                            {item?.start_of_day}
                            {' '}
                            -
                            {' '}
                            {item?.end_of_day}
                          </span>
                        ) : (
                          <span>
                            {t('doctor_detail_page.available_times_area.not_available_text')}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      setAppointmentDialogOpen(true);
                    }}
                    cssx={{
                      marginTop: '2rem',
                    }}
                  >
                    {t('doctor_detail_page.available_times_area.make_an_appointment_button_text')}
                  </Button>
                </div>

                {/* doctorYoutubeLinks?.length !== 0 && (
                  <div className="youtube-videos">
                    <h3>
                      <i className="bx bx-video" />
                      Videolar
                    </h3>

                    <ul className="video-items">
                      {doctorYoutubeLinks?.map((item) => (
                        <li className="video-item" key={item?.id}>
                          <iframe src={item?.link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) */}

              </div>
            </div>

            <div className="col-lg-8">
              <div className="doctors-detailss">
                <div className="doctors-history">
                  <h1>{doctor?.name}</h1>
                  <span>{department?.name}</span>
                  <br />
                  <br />

                  {doctor?.languages && (
                    <div className="row borders">
                      <div className="col-lg-3 pl-0">
                        <div className="left-title">
                          <h3>{t('doctor_detail_page.about_doctor_area.languages_text')}</h3>
                        </div>
                      </div>

                      <div className="col-lg-9">
                        <div className="right-title">
                          <ul>
                            <li>
                              <i className="bx bxs-hand-right" />
                              {doctor?.languages}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {doctor?.education !== '' && (
                    <div className="row borders">
                      <div className="col-lg-3 pl-0">
                        <div className="left-title">
                          <h3>{t('doctor_detail_page.about_doctor_area.education_text')}</h3>
                        </div>
                      </div>

                      <div className="col-lg-9">
                        <div className="right-title">
                          <ul>
                            <li>
                              <i className="bx bxs-hand-right" />
                              {doctor?.education}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {doctor?.specialization_training !== '' && (
                    <div className="row borders">
                      <div className="col-lg-3 pl-0">
                        <div className="left-title">
                          <h3>{t('doctor_detail_page.about_doctor_area.specialization_training_text')}</h3>
                        </div>
                      </div>

                      <div className="col-lg-9">
                        <div className="right-title">
                          <ul>
                            <li>
                              <i className="bx bxs-hand-right" />
                              {doctor?.specialization_training}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row borders">
                    <div className="col-lg-3 pl-0">
                      <div className="left-title">
                        <h3>{t('doctor_detail_page.about_doctor_area.hospital_text')}</h3>
                      </div>
                    </div>

                    <div className="col-lg-9">
                      <div className="right-title">
                        <ul>
                          <li>
                            <i className="bx bxs-hand-right" />
                            {doctorHospitalsItems.map((hospital) => hospital?.name).join(', ')}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {doctor?.description && (
                  <div className="doctors-history">
                    <h2>{t('doctor_detail_page.publications_area.title')}</h2>
                    <br />
                    <HTMLContent content={doctor?.description} />
                  </div>
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
