'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { Media } from '@/features/files';
import getServicesPath from '@/utils/get-services-path';

interface ServiceCardProps {
  id: string | number;
  title: string;
  description: string;
  icon_url?: string;
  slug?: string;
}

export function ServiceCard({ id, title, description, icon_url, slug }: ServiceCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="tw-transition-all tw-duration-300">
      <div className="tw-bg-white tw-rounded-lg tw-p-8 tw-w-80 tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-group">
        <div className="tw-w-[110px] tw-h-[110px] tw-rounded-full tw-bg-[#F5FBFF] tw-flex tw-items-center tw-justify-center tw-mb-5">
          {icon_url ? (
            <Media
              src={icon_url}
              element="image"
              imageProps={{
                alt: title,
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
          <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-2">{title}</h3>
          <p className="tw-text-gray-600 tw-mb-4">{description}</p>
          <Link
            href={`${getServicesPath(locale)}/${id}/${slug}`}
            className="tw-inline-flex tw-items-center tw-text-gray-900 tw-font-semibold group-hover:tw-text-primary"
          >
            <i className="bi bi-arrow-right-circle tw-text-xl tw-mr-2" />
            {t('common.read_more')}
          </Link>
        </div>
      </div>
    </div>
  );
}
