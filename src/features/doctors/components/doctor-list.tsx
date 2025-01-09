'use server';

import React from 'react';
import { getTranslations } from 'next-intl/server';

import { DoctorCard } from '@/features/doctors/components/doctor-card';
import { doctorsEndpoints } from '@/features/doctors';
import { filenameToUrl } from '@/features/files';

interface DoctorListProps {
  doctors: typeof doctorsEndpoints.getDoctors.response.items;
  /**
   * All of the departments data for the doctors
   *
   * Used to find department information for doctors
   */
  departments: { id: number; name: string }[];
  /**
   * Used to find hospital information for doctors
   */
  hospitals: { id: number; name: string }[];
}

/**
 * ### SERVER SIDE COMPONENT
 */
export async function DoctorList({ doctors, departments, hospitals }: DoctorListProps) {
  // --- HOOKS / STATES --- //
  const t = await getTranslations();

  const findDepartmentName = (departmentId: number) =>
    departments?.find((department) => department?.id === departmentId)?.name;

  const findDoctorHospitals = (doctorHospitalIds: number[]) =>
    hospitals
      .filter((hospital) => doctorHospitalIds.includes(hospital?.id))
      .map((hospital) => ({ name: hospital?.name, id: hospital?.id }));

  return (
    <div className="tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
      {doctors?.length ? (
        doctors?.map((doctor) => (
          <DoctorCard
            key={doctor?.id}
            department={findDepartmentName(doctor?.department_id)}
            id={doctor?.id}
            imageSrc={filenameToUrl(doctor?.image_url) || '/img/doctors/doctor-background.jpg'}
            name={doctor?.name}
            hospitals={findDoctorHospitals(
              doctor?.doctor_hospitals.map((item) => item.hospital_id),
            )}
          />
        ))
      ) : (
        <div className="tw-col-span-full tw-text-center tw-text-gray-500 tw-font-medium">
          {t('doctors_page.no_data')}
        </div>
      )}
    </div>
  );
}
