'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import getServicesPath from '@/utils/get-services-path';
import slugify from '@/utils/slugify';

import { useServices } from '../hooks/use-services';

import { ServiceCard } from './service-card';

export interface ServiceSectionProps {
    services?: Array<{
        id: number;
        title: string;
        description: string;
        icon_url: string;
        slug: string;
    }>;
}

export function ServiceSection({ services: propServices }: ServiceSectionProps) {
    const t = useTranslations();
    const locale = useLocale();
    const { services: hookServices, isLoading } = useServices({ size: 6 });

    if (isLoading || (!hookServices && !propServices)) {
        return null;
    }

    const mappedServices = propServices || hookServices?.map((service) => ({
        id: service.id,
        title: service.name,
        description: "Profesyonel ekibimizle, çürüklerden diş eti hastalıklarına kadar geniş bir yelpazede diş tedavileri sunuyoruz.",
        icon_url: "img/shape/dental-care.svg",
        slug: slugify(service.name),
    }));

    if (!mappedServices) {
        return null;
    }

    return (
        <div className="tw-rounded-lg lg:tw-rounded-none tw-pb-6 md:tw-py-[50px] tw-overflow-hidden tw-relative">
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-items-center">
                    {/* Left Content */}
                    <div className="lg:tw-col-span-3 tw-mb-8 lg:tw-mb-0 tw-pr-10" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
                        <div className="tw-flex tw-items-center tw-mb-5">
                            <span className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-primary/10 tw-flex tw-items-center tw-justify-center tw-mr-4">
                                <i className="bi bi-hospital tw-text-primary tw-text-xl" />
                            </span>
                            <h1 className="tw-text-primary tw-text-[20px] tw-font-semibold">{t('common.our_services')}</h1>
                        </div>
                        <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900 tw-tracking-tight tw-mb-6">{t('homepage.services.title')}</h2>
                        <p className="tw-mb-8">{t('homepage.services.description')}</p>
                        <Link href={getServicesPath(locale)} className="tw-inline-flex tw-items-center tw-px-6 tw-py-3 tw-bg-gray-900 tw-text-white tw-rounded-full tw-font-semibold tw-transition hover:tw-bg-primary">
                            {t('homepage.services.all_services')}
                        </Link>
                    </div>

                    {/* Right Content - Services Slider */}
                    <div className="lg:tw-col-span-9 lg:tw-pl-10">
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
                                        slidesPerView: 1,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                className="tw-pt-8 tw-pb-5"
                            >
                                {mappedServices.map((service) => (
                                    <SwiperSlide key={service.id}>
                                        <ServiceCard {...service} />
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