import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import useHospitalRoutes from '@/hooks/useHospitalRoutes';

function Services({ data }) {
  const { currentHospitalSlugUrl } = useHospitalRoutes();

  const { t } = useTranslation('common');

  return (
    <div className="services-area pt-100 pb-70">
      <div className="bg">
        <Image
          src="/img/services-bg.jpg"
          alt="Atakent Services"
          quality={100}
          fill
        />
      </div>
      <div className="container text-center">
        <div className="section-title">
          <span className="top-title">{t('homepage.services.top_title')}</span>
          <h2>{t('homepage.services.title')}</h2>
          <p>{t('homepage.services.description')}</p>
        </div>

        <div className="row justify-content-center">
          {data.map((service) => (
            <Link
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1200"
              key={service?.name}
              href={`${currentHospitalSlugUrl}/services/${service?.id}`}
            >
              <div className="single-services">
                <span className="flaticon-support" />
                <h6>{service?.name}</h6>

                <div className="services-shape">
                  <Image
                    src="/img/services-card-shape.png"
                    alt="service"
                    width={230}
                    height={260}
                    quality={30}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={{
            pathname: `${currentHospitalSlugUrl}/services/`,
          }}
          className="default-btn mt-4"
        >
          {t('homepage.services.all_services')}
        </Link>
      </div>
    </div>
  );
}

export default Services;
