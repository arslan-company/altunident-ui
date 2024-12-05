import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getDoctors } from '@/api/doctors';
import { getHospitals } from '@/api/hospitals';
import { getDepartments } from '@/api/deparments';

import DoctorsListContainer from '@/modules/doctors/doctors-list/DoctorsList.Container';

function Doctors({
  doctorsData,
  hospitalsData,
  departmentsData,
}) {
  return (
    <DoctorsListContainer
      doctorsData={doctorsData}
      departmentsData={departmentsData}
      hospitalsData={hospitalsData}
    />
  );
}

export async function getServerSideProps({ locale, query }) {
  const {
    hospitalFilter,
    departmentFilter,
    searchText,
    size,
    page,
  } = query;

  const fetchDoctorsData = () => (
    getDoctors(
      hospitalFilter === 'all' ? undefined : hospitalFilter, // hospital id
      departmentFilter === 'all' ? undefined : departmentFilter, // department id
      searchText === '' ? undefined : searchText, // search text
      size || 8, // size
      page || 1, // page
    )
  );

  const fetchDepartmentsData = () => (
    getDepartments(
      undefined, // hospital ids
      undefined, // search text
      undefined, // size
      locale, // language
    )
  );

  const fetchHospitalsData = () => (
    getHospitals(
      undefined, // search text
      undefined, // size
      locale, // language
    )
  );

  const [doctorsData, hospitalsData, departmentsData] = await Promise.all([
    fetchDoctorsData(),
    fetchHospitalsData(),
    fetchDepartmentsData(),
  ]);

  return {
    props: {
      doctorsData,
      hospitalsData,
      departmentsData,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Doctors;
