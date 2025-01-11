'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Media } from '@/features/files';
import { cn } from '@/lib/cn';

interface ServiceSectionProps {
    services: Array<{
        id: string | number;
        title: string;
        description: string;
        icon_url?: string;
        slug: string;
    }>;
}

export function ServiceSection({ services }: ServiceSectionProps) {
    const t = useTranslations();

    return (
        <div className="tw-rounded-lg lg:tw-rounded-none tw-pb-6 md:tw-py-[50px] tw-overflow-hidden tw-relative">
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-items-center">
                    {/* Left Content */}
                    <div className="lg:tw-col-span-4 tw-mb-8 lg:tw-mb-0">
                        <div className="tw-flex tw-items-center tw-mb-5">
                            <span className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-primary/10 tw-flex tw-items-center tw-justify-center tw-mr-4">
                                <i className="bi bi-hospital tw-text-primary tw-text-xl" />
                            </span>
                            <h1 className="tw-text-primary tw-text-[20px] tw-font-semibold">{t('common.our_services')}</h1>
                        </div>
                        <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900 tw-tracking-tight tw-mb-6">{t('homepage.services.title')}</h2>
                        <p className="tw-mb-8">{t('homepage.services.description')}</p>
                        <Link href="/services" className="tw-inline-flex tw-items-center tw-px-6 tw-py-3 tw-bg-gray-900 tw-text-white tw-rounded-full tw-font-semibold tw-transition hover:tw-bg-primary">
                            {t('homepage.services.all_services')}
                        </Link>
                    </div>

                    {/* Right Content - Services Slider */}
                    <div className="lg:tw-col-span-8 lg:tw-pl-5">
                        <div className="tw--mr-6 lg:tw--mr-0" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                className="tw-pt-8 tw-pb-5"
                            >
                                {services.map((service) => (
                                    <SwiperSlide key={service.id}>
                                        <div className="tw-transition-all tw-duration-300">
                                            <div className="tw-bg-white tw-rounded-lg tw-p-6 tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-group">
                                                <div className="tw-w-[110px] tw-h-[110px] tw-rounded-full tw-bg-[#F5FBFF] tw-flex tw-items-center tw-justify-center tw-mb-5">
                                                    {service.icon_url ? (
                                                        <Media
                                                            src={service.icon_url}
                                                            element="image"
                                                            imageProps={{
                                                                alt: service.title,
                                                                width: 50,
                                                                height: 50,
                                                            }}
                                                            className="tw-w-[50px] tw-h-[50px] tw-object-contain"
                                                        />
                                                    ) : (
                                                        <i className="bi bi-hospital-fill tw-text-4xl tw-text-primary" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-2">{service.title}</h3>
                                                    <p className="tw-text-gray-600 tw-mb-4">{service.description}</p>
                                                    <Link
                                                        href={`/services/${service.slug}`}
                                                        className="tw-inline-flex tw-items-center tw-text-gray-900 tw-font-semibold group-hover:tw-text-primary"
                                                    >
                                                        <i className="bi bi-arrow-right-circle tw-text-xl tw-mr-2" />
                                                        {t('common.read_more')}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 