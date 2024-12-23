import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Box from '@/components/base/Box';

import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import { Search } from '@/components/DataEntry/Input';

import DoctorCard from '@/components/templates/cards/DoctorCard';

import { usePagination } from '@/hooks/usePagination';
import useURLSearchParams from '@/hooks/useURLSearchParams';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';

import useDoctorsListModule from './useDoctorsListModule';

export default function DoctorsListView() {
  const {
    defaultHospitalSlug,
    currentHospitalSlugUrl,
    currentHospitalSlug,
  } = useHospitalRoutes();
  const { setSearchParams } = useURLSearchParams();
  const { Pagination } = usePagination();
  const { departmentsData, doctorsData, hospitalsData } = useDoctorsListModule();

  // translation
  const { t } = useTranslation('common');

  // routing
  const router = useRouter();
  const {
    query: {
      hospitalFilter,
      departmentFilter,
      page,
    },
  } = router;

  const [search, setSearch] = useState('');

  const doctors = doctorsData?.items || [];
  const hospitals = hospitalsData?.items || [];
  const departments = departmentsData?.items || [];

  const currentHospitalData = hospitals.find(
    (item) => item.slug === currentHospitalSlug,
  ) || null;

  // used for department filter
  const handleDepartmentFilter = (event) => {
    const { value } = event.target;

    setSearchParams({
      page: 1,
      departmentFilter: value,
    });
  };

  // used for hospital filter
  const handleHospitalFilter = (event) => {
    const { value } = event.target;

    setSearchParams({
      page: 1,
      hospitalFilter: value,
    });
  };

  const handleSearchText = () => {
    setSearchParams({
      page: 1,
      searchText: search,
    });
  };

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
    <>
      <Navbar transparent={false} />

      <PageBanner
        pageTitle={t('doctors_page.page_banner.all_our_doctors_text')}
        homePageUrl={currentHospitalSlug !== defaultHospitalSlug ? currentHospitalSlugUrl : '/'}
        homePageText={currentHospitalSlug !== defaultHospitalSlug ? currentHospitalData?.name : t('doctors_page.page_banner.go_homepage_link_text')}
        activePageText={t('doctors_page.page_banner.our_doctors_text')}
      />

      <div className="doctors-area pb-100">
        <div className="container">
          <div id="filter-area" className="row filter-area">
            {currentHospitalSlug === defaultHospitalSlug && (
              <div className="col-lg-3 col-sm-12">
                <select className="select-box filter-item" defaultValue={hospitalFilter} value={hospitalFilter} onChange={handleHospitalFilter}>
                  <option className="select-box-option" value="all">{t('doctors_page.filter_area.filter_by_hospital_option_text')}</option>
                  {hospitals?.map((hospitalItem) => (
                    <option className="select-box-option" value={hospitalItem.id} key={hospitalItem.id}>{hospitalItem.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="col-lg-3 col-sm-12">
              <select className="select-box filter-item" defaultValue={departmentFilter} value={departmentFilter} onChange={handleDepartmentFilter}>
                <option className="select-box-option" value="all">{t('doctors_page.filter_area.filter_by_department_option_text')}</option>
                {departments?.map((department) => (
                  <option className="select-box-option" value={department.id} key={department.id}>{department.name}</option>
                ))}
              </select>
            </div>

            <div className="search-filter col-lg-3 col-sm-12">
              <Search className="filter-item" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('doctors_page.filter_area.search_input_placeholder_text')} />
              <button type="button" onClick={handleSearchText}>{t('doctors_page.filter_area.search_input_placeholder_text')}</button>
            </div>
          </div>

          <div className="row row-gap-5">
            {doctors?.length !== 0 ? doctors?.map((doctor) => (
              <Box className="col-lg-3 col-md-6 col-6" key={doctor?.id}>
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
              </Box>
            )) : (
              <span className="text-center text-gray fw-bold fs-6">
                {t('doctors_page.no_data')}
              </span>
            )}

            <Pagination
              page={page}
              pages={doctorsData?.pages}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
