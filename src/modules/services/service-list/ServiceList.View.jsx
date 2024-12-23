import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useURLSearchParams from '@/hooks/useURLSearchParams';
import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useSeo from '@/hooks/useSeo';

import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import { Search } from '@/components/DataEntry/Input';

import useServiceListModule from './useServiceListModule';

export default function ServiceListView() {
  const {
    isDefaultHospitalSlugSelected,
    currentHospitalSlugUrl,
  } = useHospitalRoutes();

  const { currentHospitalData } = useGlobalHospitalData();

  const router = useRouter();
  const { query: { search: searchParam } } = router;

  const { servicesData } = useServiceListModule();

  const { setSearchParams } = useURLSearchParams();

  const { locale, url } = useSeo();

  const { t } = useTranslation('common');

  const [searchText, setSearchText] = useState('');

  const departments = servicesData?.items || [];
  const currentHospital = currentHospitalData.data;

  const handleSearch = () => {
    setSearchParams({
      search: searchText,
    });
  };

  useEffect(() => {
    setSearchText(searchParam);
  }, []);

  return (
    <>
      <NextSeo
        title={t('services_page.page_banner.parent_page_text')}
        description={t('services_page.page_banner.parent_page_text')}
        keywords={t('services_page.page_banner.parent_page_text')}
        titleTemplate={t('services_page.page_banner.parent_page_text')}
        defaultTitle={t('services_page.page_banner.parent_page_text')}
        canonical={url}
        openGraph={{
          title: t('services_page.page_banner.parent_page_text'),
          description: t('services_page.page_banner.parent_page_text'),
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
        pageTitle={t('services_page.page_banner.parent_page_text')}
        homePageUrl={!isDefaultHospitalSlugSelected ? currentHospitalSlugUrl : '/'}
        homePageText={!isDefaultHospitalSlugSelected ? currentHospital?.name : t('services_page.page_banner.homepage_text')}
        activePageText={t('services_page.page_banner.parent_page_text')}
      />

      <div className="departments-area pb-100">
        <div className="container">
          <div className="filter-area row">
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
                {departments?.length !== 0 ? departments.map((department) => (
                  <Link href={`${currentHospitalSlugUrl}/services/${department.id}`} className="department-item" key={department.id}>
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
