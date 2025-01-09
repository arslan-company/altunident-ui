import React from 'react';
import { getTranslations } from 'next-intl/server';

import HTMLContent from '@/components/shared/html-content';

import { HospitalBanner } from '@/features/hospitals';

interface HospitalContactInformationProps {
  iframe: string;
  imageSrc: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export async function HospitalContactInformation({
  iframe,
  imageSrc,
  name,
  address,
  email,
  phone,
}: HospitalContactInformationProps) {
  const t = await getTranslations();

  return (
    <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-10 tw-mb-8">
      <div className="lg:tw-col-span-2">
        <div className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-shadow-lg tw-rounded-xl tw-overflow-hidden">
          <HTMLContent className="iframe !tw-h-[500px]" content={iframe || ''} />
        </div>
      </div>

      <div className="tw-space-y-8">
        <div className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-lg">
          <HospitalBanner imageSrc={imageSrc} className="tw-rounded-lg tw-overflow-hidden" />

          <div className="tw-mt-6 tw-space-y-6">
            <div>
              <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">{name}</h1>
            </div>

            <div className="tw-flex tw-items-start tw-space-x-3">
              <div className="tw-mt-1">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="tw-text-sm tw-text-gray-500 tw-mb-0">{t('common.address')}</p>
                <p className="tw-text-gray-800 tw-font-medium">{address}</p>
              </div>
            </div>

            <div className="tw-flex tw-items-start tw-space-x-3">
              <div className="tw-mt-1">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="tw-text-sm tw-text-gray-500 tw-mb-0">{t('common.email')}</p>
                <p className="tw-text-gray-800 tw-font-medium">{email}</p>
              </div>
            </div>

            <div className="tw-flex tw-items-start tw-space-x-3">
              <div className="tw-mt-1">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="tw-text-sm tw-text-gray-500 tw-mb-0">{t('common.phone')}</p>
                <p className="tw-text-gray-800 tw-font-medium">{phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
