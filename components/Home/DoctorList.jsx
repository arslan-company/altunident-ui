import React, { useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

import DoctorCard from '../Common/DoctorCard';

import { GlobalContext } from '../../context';

import { useDoctors } from '../../hooks/useDoctors';
import { useHospitals } from '../../hooks/useHospitals';

function DoctorList() {
  const { hospitalSlugUrl, defaultPathname } = useContext(GlobalContext);
  const router = useRouter();
  const { hospitalSlug } = router.query;

  const { t, i18n } = useTranslation('common');

  const { data: hospitals } = useHospitals({
    language: i18n.language,
  });

  const hospitalFilter = hospitals?.items?.find(
    (hospitalData) => hospitalData.slug === hospitalSlug,
  )?.id;

  const { data: doctors } = useDoctors({
    hospitalId: hospitalSlug ? hospitalFilter : undefined,
    size: 6,
    page: 1,
  }, {
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="doctor-list pt-100 pb-70">
      <div className="container text-center">
        <div className="section-title">
          <h2>{t('homepage.doctor_list.title')}</h2>
          <p>{t('homepage.doctor_list.description')}</p>
        </div>

        <Swiper
          spaceBetween={30}
          navigation
          autoplay={{
            delay: 6500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, Autoplay]}
          className="doctor-list-slide"
        >
          {doctors?.items?.map((doctor) => (
            <SwiperSlide className="doctor-card-wrapper" key={doctor?.id}>
              <DoctorCard
                doctor={doctor}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Link
          href={`${hospitalSlugUrl}/doctors/?hospitalFilter=${hospitalSlug === defaultPathname || hospitalSlug === undefined ? 'all' : hospitalFilter}&departmentFilter=all&size=8&page=1`}
          className="default-btn mt-5"
        >
          {t('homepage.doctor_list.all_doctors')}
        </Link>
      </div>
    </div>
  );
}

export default DoctorList;
