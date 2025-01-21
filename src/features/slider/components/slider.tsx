'use client';

import Link from 'next/link';
import React from 'react';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/base/button';
import { filenameToUrl, filenameType, Media } from '@/features/files';
import { slidersEndpoints } from '@/features/slider';


/**
 * ### CLIENT COMPONENT
 */
export function Slider({
  sliders,
}: {
  sliders: typeof slidersEndpoints.getSliders.response.items;
}) {
  return (
    <div className="main-slider-2">
      <Swiper
        navigation
        speed={700}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
        }}
      >
        {sliders.map((slider) => {
          const mediaType = filenameType(slider?.background_image_url);

          if (mediaType === 'unknown') {
            return null;
          }

          return (
            <SwiperSlide key={slider?.id}>
              <div className="main-slider-item">
                <Media
                  src={filenameToUrl(slider?.background_image_url)}
                  videoProps={{ autoPlay: true, loop: true, muted: true, controls: false }}
                  imageProps={{
                    alt: slider?.title,
                    quality: 80,
                    width: 1366,
                    height: 768,
                    sizes: '100vw',
                  }}
                  className="tw-w-full tw-h-full tw-object-cover"
                  element={mediaType}
                />
                <div className="d-table slider-content">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className={`slider-text ${slider?.animation}`}>
                            <h1>{slider?.title}</h1>

                            <div className="slider-btn">
                              <Link href={slider?.button_href || '/'}>
                                <Button>{slider?.button_text}</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
