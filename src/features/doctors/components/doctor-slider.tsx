'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

import { DoctorCard, doctorsEndpoints } from '@/features/doctors';
import { useHospital } from '@/features/hospitals';
import { departmentsEndpoints } from '@/features/departments';
import { filenameToUrl } from '@/features/files';

import { Button } from '@/components/base/button';

interface DoctorListProps {
  readonly doctors: typeof doctorsEndpoints.getDoctors.response.items | undefined;
  readonly departments: typeof departmentsEndpoints.getDepartments.response.items | undefined;
}

export function DoctorSlider({ departments, doctors }: DoctorListProps) {
  // --- HOOKS / STATES --- //
  const t = useTranslations();
  const { hospitals } = useHospital();

  const findDepartmentName = (departmentId: number) =>
    departments?.find((department) => department?.id === departmentId)?.name;

  const findDoctorHospitals = (doctorHospitalIds: number[]) =>
    hospitals
      .filter((hospital) => doctorHospitalIds.includes(hospital?.id))
      .map((hospital) => ({ name: hospital?.name, id: hospital?.id }));

  return (
    <div className="tw-text-center tw-space-y-10">
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
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="doctor-list-slide lg:tw-mt-10"
        style={{
          paddingBottom: '1rem',
        }}
      >
        {doctors?.map((doctor) => (
          <SwiperSlide key={doctor?.id}>
            <DoctorCard
              id={doctor?.id}
              imageSrc={filenameToUrl(doctor?.image_url) || '/img/doctors/doctor-background.jpg'}
              name={doctor?.name}
              department={findDepartmentName(doctor?.department_id)}
              hospitals={findDoctorHospitals(
                doctor?.doctor_hospitals.map((item) => item.hospital_id),
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Link href="/doctors" className="tw-mt-10">
        <Button>{t('common.all_our_doctors')}</Button>
      </Link>
    </div>
  );
}
