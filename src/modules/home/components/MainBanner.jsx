import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

import useGlobalHospitalData from '@/hooks/useGlobalHospitalData';
import useLocale from '@/hooks/useLocale';
import { useSliders } from '@/hooks/fetch/useSliders';
import { useFile } from '@/hooks/fetch/useFiles';

export default function MainBanner() {
  const { t } = useTranslation('common');
  const { currentLanguageQuery } = useLocale();
  const { currentHospitalData } = useGlobalHospitalData();

  const currentHospital = currentHospitalData.data;

  const bannersData = useSliders({
    params: {
      hospitalId: currentHospital?.id, // optional
      language: currentLanguageQuery,
    },
  });

  const banners = bannersData.data?.items || [];

  return (
    <div className="main-slider-2">
      <Swiper
        navigation
        speed={700}
        modules={[
          Navigation,
          Autoplay,
        ]}
        autoplay={{
          delay: 5000,
        }}
      >
        {t('')}
        {banners.map((banner) => (
          <SwiperSlide key={banner?.id}>
            <BannerItem banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function BannerItem({ banner }) {
  const { data: element } = useFile({
    params: {
      fileName: banner?.background_image_url,
    },
  });

  return (
    <div
      className="main-slider-item"
    >
      {banner?.element === 'video' && element && (
        <video autoPlay loop muted className="video" src={element} poster="/img/mainbanner-poster-atakent.webp" />
      )}
      {banner?.element === 'img' && element && (
        <Image
          src={element}
          width={900}
          height={500}
          quality={50}
          alt="banner"
        />
      )}
      <div className="d-table slider-content">
        <div className="d-table-cell">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={`slider-text ${banner?.animation}`}>
                  <h1>{banner?.title}</h1>

                  <div className="slider-btn">
                    <Link href={banner?.button_href || '/'} className="default-btn">
                      {banner?.button_text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
