'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import slugify from '@/utils/slugify';

import { Button } from '@/components/base/button';

import { useGeneralSearchQuery } from '../hooks';

/**
 * ### CLIENT COMPONENT
 */
export function GeneralSearch() {
  // --- HOOKS --- //
  const t = useTranslations();
  const locale = useLocale();
  const { hospitalSlug } = useParams();
  const [showResults, setShowResults] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // --- QUERIES --- //
  const generalSearchResponse = useGeneralSearchQuery(
    'search',
    { query: { name: searchText, language: locale === 'tr' ? undefined : locale } },
    { enabled: false },
  );

  // --- CONSTANTS --- //
  const hospitals = generalSearchResponse.data?.hospitals || [];
  const departments = generalSearchResponse.data?.departments || [];
  const doctors = generalSearchResponse.data?.doctors || [];
  const isLoading = generalSearchResponse.isFetching;
  const totalResults =
    (hospitals?.length || 0) + (doctors?.length || 0) + (departments?.length || 0);

  // --- HANDLERS --- //
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    if (text !== '') {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchText) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      if (!isFocused) {
        setShowResults(false);
      }
    }, 200);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setShowResults(false);
  };

  // --- EFFECTS --- //
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
    <div className="tw-relative tw-w-full tw-mx-auto">
      <div className="tw-relative">
        <div className="tw-relative tw-flex tw-items-center">
          <input
            type="text"
            className="tw-w-full tw-px-12 tw-pr-10 tw-py-5 tw-text-xl tw-text-gray-700 tw-border-solid tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg focus:tw-outline-none focus:tw-border-primary focus:tw-ring-1 tw-ring-primary tw-transition-colors"
            placeholder={t('homepage.search_form.general_search_placeholder_text')}
            value={searchText}
            onChange={handleSearchInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {isLoading ? (
            <div className="tw-absolute tw-left-4 tw-w-5 tw-h-5">
              <div className="tw-animate-spin tw-rounded-full tw-h-5 tw-w-5 tw-border-b-2 tw-border-primary" />
            </div>
          ) : (
            <svg
              className="tw-absolute tw-left-4 tw-w-5 tw-h-5 tw-text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}

          {searchText && (
            <Button
              type="button"
              size="iconOnly"
              variant="secondary"
              onClick={handleClearSearch}
              className="tw-absolute tw-right-3 tw-p-1 tw-rounded-full tw-text-gray-400 hover:tw-text-gray-600 hover:tw-bg-gray-100 tw-transition-colors"
              aria-label="Aramayı temizle"
            >
              <svg
                className="tw-w-5 tw-h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          )}
        </div>

        {showResults && (
          <div className="tw-absolute tw-z-50 tw-w-full tw-max-h-96 tw-overflow-y-auto tw-mt-2 tw-bg-white tw-rounded-lg tw-shadow-xl tw-border tw-border-gray-100 tw-animate-fadeIn">
            <div className="tw-p-4">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <h3 className="tw-text-lg tw-font-semibold tw-text-gray-800">
                  {t('homepage.search_form.search_results-area.title')}
                </h3>
                {searchText && (
                  <span className="tw-text-sm tw-text-gray-500">
                    {totalResults} arama sonucu bulundu
                  </span>
                )}
              </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
                {/* Hastaneler Bölümü */}
                <div className="tw-space-y-3">
                  <div className="tw-flex tw-items-center tw-gap-4">
                    <h4 className="tw-font-medium tw-text-gray-700">
                      {t('homepage.search_form.search_results-area.hospitals_title')}
                    </h4>
                  </div>
                  <div className="tw-space-y-1">
                    {hospitals?.length ? (
                      hospitals?.map((hospital) => (
                        <Link
                          href={`/${hospital?.slug}`}
                          key={hospital?.id}
                          className="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-primary hover:tw-bg-primary/5 tw-rounded-md tw-transition-colors group"
                        >
                          <div className="tw-flex tw-items-center">
                            <span className="group-hover:tw-text-primary">{hospital?.name}</span>
                            <svg
                              className="tw-w-4 tw-h-4 tw-ml-1 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <span className="tw-block tw-text-sm tw-text-gray-500 tw-px-3 tw-py-2">
                        {t('homepage.search_form.search_results-area.data-not-found-text')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Doctors Section */}
                <div className="tw-space-y-3">
                  <h4 className="tw-font-medium tw-text-gray-700">
                    {t('homepage.search_form.search_results-area.doctors_title')}
                  </h4>
                  <div className="tw-space-y-2">
                    {doctors?.length !== 0 ? (
                      doctors?.map((doctor) => (
                        <Link
                          href={`${hospitalSlug ? `/${hospitalSlug}` : ''}/doctors/${doctor?.id}/${slugify(doctor?.name)}`}
                          key={doctor?.id}
                          className="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-primary hover:tw-bg-gray-50 tw-rounded-md tw-transition-colors"
                        >
                          {doctor?.name}
                        </Link>
                      ))
                    ) : (
                      <span className="tw-block tw-text-sm tw-text-gray-500">
                        {t('homepage.search_form.search_results-area.data-not-found-text')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Departments Section */}
                <div className="tw-space-y-3">
                  <h4 className="tw-font-medium tw-text-gray-700">
                    {t('homepage.search_form.search_results-area.departments_title')}
                  </h4>
                  <div className="tw-space-y-2">
                    {departments?.length !== 0 ? (
                      departments?.map((department) => (
                        <Link
                          href={`${hospitalSlug ? `/${hospitalSlug}` : ''}/departments/detail/${department?.id}/`}
                          key={department?.id}
                          className="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-primary hover:tw-bg-gray-50 tw-rounded-md tw-transition-colors"
                        >
                          {department?.name}
                        </Link>
                      ))
                    ) : (
                      <span className="tw-block tw-text-sm tw-text-gray-500">
                        {t('homepage.search_form.search_results-area.data-not-found-text')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
