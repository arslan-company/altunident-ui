import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useTheme } from '@tiger-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

import DoctorCard from '@/components/templates/cards/DoctorCard';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';

/**
 * @typedef {import('@/types/doctors').Doctors} Doctors
 * @typedef {import('@/types/departments').Departments} Departments
*/

/**
 * @param {{
 * doctorsData: import('@/types/react-query').QueryResult<Doctors>;
 * departmentsData: import('@/types/react-query').QueryResult<Departments>;
 * }} props
*/
function DoctorList({ departmentsData, doctorsData }) {
  const { t } = useTranslation('common');
  const { hospitalsData, currentHospitalData } = useGlobalHospitalData();
  const { breakpoints } = useTheme();
  const {
    currentHospitalSlugUrl,
    isDefaultHospitalSlugSelected,
  } = useHospitalRoutes();

  const departments = departmentsData.data?.items || [];
  const hospitals = hospitalsData.data?.items || [];
  const doctors = doctorsData.data?.items || [];

  const currentHospitals = currentHospitalData.data;

  const findDepartmentName = (departmentId) => (
    departments.find(
      (department) => department?.id === departmentId,
    )?.name
  );

  /**
   * @param {number[]} doctorHospitalIds
  */
  const findDoctorHospitals = (doctorHospitalIds) => (
    hospitals
      .filter((hospital) => doctorHospitalIds.includes(hospital?.id))
      .map((hospital) => ({ name: hospital?.name, id: hospital?.id }))
  );

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
            [breakpoints.values.xs]: {
              slidesPerView: 1,
            },
            [breakpoints.values.sm]: {
              slidesPerView: 2,
            },
            [breakpoints.values.lg]: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, Autoplay]}
          className="doctor-list-slide"
          style={{
            paddingBottom: '1rem',
          }}
        >
          {doctors?.map((doctor) => (
            <SwiperSlide key={doctor?.id}>
              <DoctorCard
                cssx={{
                  width: '100%',
                }}
                data={{
                  departmentName: findDepartmentName(doctor.department_id),
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
            </SwiperSlide>
          ))}
        </Swiper>

        <Link
          href={{
            pathname: `${currentHospitalSlugUrl}/doctors`,
            query: {
              hospitalFilter: isDefaultHospitalSlugSelected ? 'all' : currentHospitals?.id,
              departmentFilter: 'all',
              size: '8',
              page: '1',
            },
          }}
          className="default-btn mt-5"
        >
          {t('homepage.doctor_list.all_doctors')}
        </Link>
      </div>
    </div>
  );
}

export default DoctorList;
