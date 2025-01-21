'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useCallback, useRef, useState } from 'react';

import { useHospital } from '@/features/hospitals';
import getServicesPath from '@/utils/get-services-path';
import slugify from '@/utils/slugify';

import { useServices } from '../hooks/use-services';
import { ServiceResponse } from '../types';

export function ServicesDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { services, isLoading } = useServices();
    const t = useTranslations();
    const { withBasePath } = useHospital();
    const params = useParams();
    const locale = useLocale();

    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    }, []);

    if (!services?.length) {
        return null;
    }

    return (
        <div
            className="tw-relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={withBasePath(getServicesPath(locale))}
                className={`tw-inline-flex tw-items-center tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-600 hover:tw-text-primary hover:tw-bg-gray-50 tw-rounded-md tw-transition-colors ${params?.serviceId ? 'tw-text-primary' : ''}`}
            >
                {t('common.our_services')}
                <i className="bx bx-chevron-down tw-ml-1" />
            </Link>

            <div
                className={`tw-absolute tw-left-0 tw-z-50 tw-mt-1 tw-w-72 tw-rounded-md tw-bg-white tw-shadow-lg tw-transition-all tw-duration-200 tw-ease-out ${isOpen
                    ? 'tw-transform tw-scale-100 tw-opacity-100'
                    : 'tw-transform tw-scale-95 tw-opacity-0 tw-pointer-events-none'
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="tw-py-1">
                    {isLoading ? (
                        <div className="tw-px-4 tw-py-2 tw-text-sm tw-text-gray-500">
                            {t('common.loading')}
                        </div>
                    ) : services && services.length > 0 ? (
                        services.map((service: ServiceResponse) => (
                            <Link
                                key={service.id}
                                href={withBasePath(`${getServicesPath(locale)}/${service.id}/${slugify(service.name)}`)}
                                className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-50 hover:tw-text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {service.name}
                            </Link>
                        ))
                    ) : (
                        <div className="tw-px-4 tw-py-2 tw-text-sm tw-text-gray-500">
                            {t('common.data_not_found')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 