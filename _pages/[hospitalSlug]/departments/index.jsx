import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getDepartments } from '../../../api/deparments';
import { getHospitals } from '../../../api/hospitals';
import DepartmentListContainer from '@/modules/departments/department-list/DepartmentList.Container';

function Departments({ departmentsData, hospitalsData }) {
  return (
    <DepartmentListContainer
      departmentsData={departmentsData}
      hospitalsData={hospitalsData}
    />
  );
}

export async function getServerSideProps({ locale, query }) {
  const {
    hospitalFilter,
    search,
  } = query;

  const [departmentsData, hospitalsData] = await Promise.all([
    getDepartments(
      hospitalFilter === 'all' ? undefined : hospitalFilter, // hospital id
      search === '' ? undefined : search, // search text
      undefined, // size
      locale === 'tr' ? undefined : locale, // language
    ),
    getHospitals(
      undefined, // search text
      undefined, // size
      locale === 'tr' ? undefined : locale,
    ),
  ]);

  return {
    props: {
      departmentsData,
      hospitalsData,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Departments;
