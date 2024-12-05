import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';
import useLocale from '@/hooks/useLocale';
import { useGeneralSearch } from '@/hooks/fetch/useGeneralSearch';
import slugify from '@/utils/slugify';

export default function GeneralSearch() {
  const { t } = useTranslation('common');
  const { currentLanguageQuery } = useLocale();
  const { currentHospitalSlugUrl } = useHospitalRoutes();
  // result section state
  const [showResults, setShowResults] = useState(false);
  // search text state
  const [searchText, setSearchText] = useState('');

  const generalSearchResponse = useGeneralSearch({
    params: {
      name: searchText,
      language: currentLanguageQuery,
    },
    options: {
      enabled: false,
    },
  });

  const hospitals = generalSearchResponse.data?.hospitals || [];
  const departments = generalSearchResponse.data?.departments || [];
  const doctors = generalSearchResponse.data?.doctors || [];

  const handleSearchInput = (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (text !== '') {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchText !== '') {
        setShowResults(true);

        generalSearchResponse.refetch();
      } else {
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(timerId);
  }, [searchText]);

  return (
    <div className="search-wrapper">
      <div className="search">
        <i className="bx bx-search search-icon" />

        <input
          type="text"
          className="form-control"
          id="Search"
          placeholder={t('homepage.search_form.general_search_placeholder_text')}
          value={searchText}
          onChange={handleSearchInput}
          onBlur={() => setShowResults(false)}
        />
      </div>

      <div className={`search-results ${showResults && 'show'}`}>
        <div className="row">
          <div className="col-12">
            <div className="search-results-title">
              {t('homepage.search_form.search_results-area.title')}
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 py-3">
            <div className="result-section">
              <div className="result-section-title">
                {t('homepage.search_form.search_results-area.hospitals_title')}
              </div>
              <div className="results">
                {hospitals?.length ? hospitals?.map((hospital) => (
                  <Link href={`/${hospital?.slug}`} key={hospital?.id} className="result">{hospital?.name}</Link>
                )) : <span className="data-not-found-text">{t('homepage.search_form.search_results-area.data-not-found-text')}</span>}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 py-3">
            <div className="result-section">
              <div className="result-section-title">
                {t('homepage.search_form.search_results-area.doctors_title')}
              </div>
              <div className="results">
                {doctors?.length !== 0 ? doctors?.map((doctor) => (
                  <Link href={`${currentHospitalSlugUrl}/doctors/${doctor?.id}/${slugify(doctor?.name)}`} key={doctor?.id} className="result">{doctor?.name}</Link>
                )) : <span className="data-not-found-text">{t('homepage.search_form.search_results-area.data-not-found-text')}</span>}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 py-3">
            <div className="result-section">
              <div className="result-section-title">
                {t('homepage.search_form.search_results-area.departments_title')}
              </div>
              <div className="results">
                {departments?.length !== 0 ? departments?.map((department) => (
                  <Link href={`${currentHospitalSlugUrl}/departments/detail/${department?.id}/`} key={department?.id} className="result">{department?.name}</Link>
                )) : <span className="data-not-found-text">{t('homepage.search_form.search_results-area.data-not-found-text')}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
