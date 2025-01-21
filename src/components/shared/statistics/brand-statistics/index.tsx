'use server';

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { doctorsEndpoints } from '@/features/doctors';

interface BrandStatisticsProps {
  doctors: typeof doctorsEndpoints.getDoctors.response | undefined;
}

/**
 * ### SERVER COMPONENT
 */
export default async function BrandStatistics({ doctors }: BrandStatisticsProps) {
  const t = await getTranslations();

  const doctorsNumber = doctors?.total ?? 0;

  const items = [
    {
      id: 1,
      title: t('homepage.brand_statistics.statistic_1_text'),
      value: 2,
      icon: 'flaticon-cardiology',
    },
    {
      id: 2,
      title: t('homepage.brand_statistics.statistic_2_text'),
      value: 2,
      icon: 'flaticon-gloves',
    },
    {
      id: 3,
      title: t('homepage.brand_statistics.statistic_3_text'),
      value: 3,
      icon: 'flaticon-stay-home',
    },
    {
      id: 4,
      title: t('homepage.brand_statistics.statistic_4_text'),
      value: doctorsNumber,
      icon: 'flaticon-gloves',
    },
    {
      id: 5,
      title: t('homepage.brand_statistics.statistic_5_text'),
      value: 914 + doctorsNumber,
      icon: 'flaticon-gloves-pair-outlines',
    },
  ];

  return (
    <div className="brand-statistics-area">
      <div className="container">
        <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-5 tw-gap-6">
          {items.map((item) => (
            <div
              className="tw-w-full tw-py-3"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1200"
              key={item?.id}
            >
              <div className="group tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-bg-white tw-shadow-lg tw-rounded-lg tw-py-4 tw-w-full">
                <div className="group-hover:tw-bg-primary group-hover:tw-text-white tw-text-primary tw-text-4xl tw-bg-gray-100 tw-rounded-full tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300">
                  <i className={item?.icon} />
                </div>

                <h3 className="tw-text-4xl tw-font-bold tw-m-0">{item?.value}</h3>

                <p className="tw-text-primary tw-text-lg">{item?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shape-wrap">
        <div className="shape-1">
          <Image src="/img/shape/counter-shape.png" alt="shape1" width={200} height={200} />
        </div>
        <div className="shape-2">
          <Image src="/img/shape/counter-shape.png" alt="shape2" width={200} height={200} />
        </div>
      </div>
    </div>
  );
}
