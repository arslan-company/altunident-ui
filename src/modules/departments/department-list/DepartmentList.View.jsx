import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import useURLSearchParams from '@/hooks/useURLSearchParams';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useSeo from '@/hooks/useSeo';

import Navbar from '../../../components/_App/Navbar';
import PageBanner from '../../../components/Common/PageBanner';
import Footer from '../../../components/_App/Footer';
import { Search } from '../../../components/DataEntry/Input';

import useDepartmentListModule from './useDepartmentListModule';

export default function DepartmentListView() {
  const {
    defaultHospitalSlug,
    currentHospitalSlug,
    currentHospitalSlugUrl,
    isDefaultHospitalSlugSelected,
  } = useHospitalRoutes();

  const router = useRouter();
  const { query: { hospitalFilter: hospitalFilterParam, search: searchParam } } = router;

  const { departmentsData, hospitalsData } = useDepartmentListModule();

  const { setSearchParams } = useURLSearchParams();

  const { locale, url } = useSeo();

  const { t } = useTranslation('common');

  const [searchText, setSearchText] = useState('');
  const [hospitalFilter, setHospitalFilter] = useState('all');

  const [hospital, setHospital] = useState({});

  const hospitals = hospitalsData?.items || [];
  const departments = departmentsData?.items || [];

  // used for hospital filter
  const handleHospitalFilter = (event) => {
    const { value } = event.target;

    setSearchParams({
      hospitalFilter: value,
    });
    setHospitalFilter(value);
  };

  const handleSearch = () => {
    setSearchParams({
      search: searchText,
    });
  };

  useEffect(() => {
    if (!isDefaultHospitalSlugSelected) {
      const hospitalData = hospitals.find((item) => item?.slug === currentHospitalSlug);
      setHospital(hospitalData);
    }
  }, [hospitals]);

  useEffect(() => {
    setHospitalFilter(hospitalFilterParam);
    setSearchText(searchParam);
  }, []);

  return (
    <>
      <NextSeo
        title={t('seo.department.title')}
        description={t('seo.department.description')}
        keywords={t('seo.department.keywords')}
        titleTemplate={t('seo.department.title')}
        defaultTitle={t('seo.department.title')}
        canonical={url}
        openGraph={{
          title: t('seo.department.title'),
          description: t('seo.department.description'),
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

      <Navbar transparent={false} />

      <PageBanner
        pageTitle={t('departments_page.page_banner.all_our_departments_text')}
        homePageUrl={currentHospitalSlug !== defaultHospitalSlug ? currentHospitalSlugUrl : '/'}
        homePageText={currentHospitalSlug !== defaultHospitalSlug ? hospital?.name : t('departments_page.page_banner.go_homepage_link_text')}
        activePageText={t('departments_page.page_banner.our_departments_text')}
      />

      <div className="departments-area pb-100">
        <div className="container">
          <div className="filter-area row">
            {currentHospitalSlug === defaultHospitalSlug && (
              <div className="col-lg-3 col-md-5 col-sm-12">
                <select className="select-box filter-item" value={hospitalFilter} onChange={handleHospitalFilter}>
                  <option className="select-box-option" value="all">{t('departments_page.filter_area.filter_by_hospital_option_text')}</option>
                  {hospitals?.map((hospitalItem) => (
                    <option className="select-box-option" value={hospitalItem.id} key={hospitalItem.id}>{hospitalItem.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="search-filter col-lg-3 col-md-5 col-sm-12">
              <Search className="filter-item" placeholder={t('departments_page.filter_area.search_input_placeholder_text')} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <button
                type="button"
                onClick={handleSearch}
              >
                {t('doctors_page.filter_area.search_input_placeholder_text')}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="departments-list">
                {departments?.length ? departments.map((department) => (
                  <Link href={`${currentHospitalSlugUrl}/departments/detail/${department.id}`} className="department-item" key={department.id}>
                    <i className="flaticon-heart me-2" />
                    {department.name}
                  </Link>
                )) : (<span className="text-center text-gray fw-bold fs-6">Kayıtlı veri bulunmamaktadır.</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
