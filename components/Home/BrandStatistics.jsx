import React from 'react';
import { useTranslation } from 'next-i18next';
import { useDoctors } from '@/hooks/fetch/useDoctors';

function BrandStatistics() {
  const doctorsData = useDoctors({});
  const { t } = useTranslation('common');

  const doctorsNumber = doctorsData.data?.total ?? 0;

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
    <div className="brand-statistics-area pt-100 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          {items.map((item) => (
            <div
              className="col-lg-2 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1200"
              key={item?.id}
            >
              <div className="brand-statistics-card">
                <i className={item?.icon} />

                <h2>{item?.value}</h2>

                <p>{item?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shape-wrap">
        <div className="shape-1">
          <img src="/img/shape/counter-shape.png" alt="shape1" />
        </div>
        <div className="shape-2">
          <img src="/img/shape/counter-shape.png" alt="shape2" />
        </div>
      </div>
    </div>
  );
}

export default BrandStatistics;
