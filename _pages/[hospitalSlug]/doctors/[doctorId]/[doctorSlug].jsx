import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DoctorDetailContainer from '@/modules/doctors/doctor-detail/DoctorDetail.Container';

import { getDoctor, getDoctorHospitals, getDoctorWorkingHours } from '@/api/doctors';
import { getDepartment } from '@/api/deparments';
import { getHospitals } from '@/api/hospitals';

function DoctorDetails({
  doctorData,
  doctorWorkingHoursData,
  doctorHospitalsData,
  departmentData,
  hospitalsData,
}) {
  return (
    <DoctorDetailContainer
      doctorData={doctorData}
      doctorWorkingHoursData={doctorWorkingHoursData}
      doctorHospitalsData={doctorHospitalsData}
      departmentData={departmentData}
      hospitalsData={hospitalsData}
    />
  );
}

export async function getServerSideProps(context) {
  const { locale, query: { doctorId } } = context;

  const language = locale === 'tr' ? undefined : locale;

  let promiseData = {};

  try {
    if (doctorId) {
      const [
        doctorData,
        doctorWorkingHoursData,
        doctorHospitalsData,
        hospitalsData,
      ] = await Promise.all([
        getDoctor(
          doctorId,
          language,
        ),
        getDoctorWorkingHours(
          doctorId,
          undefined, // page
          undefined, // size
          language,
        ),
        getDoctorHospitals(doctorId),
        getHospitals(
          undefined, // search text
          undefined, // size
          language, // language
        ),
      ]);

      const departmentData = doctorData?.department_id ? await getDepartment(
        doctorData?.department_id, // department id
        language, // language
      ) : {};

      promiseData = {
        doctorData,
        doctorWorkingHoursData,
        doctorHospitalsData,
        hospitalsData,
        departmentData,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      ...promiseData,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default DoctorDetails;
