'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/base/button';

import { cn } from '@/lib/cn';

import { HospitalBanner } from './hospital-banner';

interface HospitalCardProps {
  name: string;
  imageSrc: string | null;
  slug: string;
  hideFooter?: boolean;
  appointmentLink?: string;
  className?: string;
}

export function HospitalCard({
  name,
  imageSrc,
  slug,
  hideFooter = false,
  appointmentLink,
  className,
}: HospitalCardProps) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        'tw-group tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-xl hover:tw-shadow-xl tw-transition-all tw-duration-300 tw-w-full tw-h-full tw-object-cover tw-transform group-hover:tw-scale-110',
        className,
      )}
    >
      <Link
        className="tw-flex tw-justify-center tw-items-center tw-w-full"
        href={`/hospitals/${slug}`}
      >
        <HospitalBanner imageSrc={imageSrc} name={name} className="tw-w-full" />
      </Link>

      {!hideFooter && (
        <div className="tw-p-4 tw-space-y-3">
          <Link
            className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-2.5 tw-bg-gray-50 tw-rounded-lg hover:tw-bg-primary/10 tw-transition-colors group/btn"
            href={`/${slug}`}
          >
            <span className="tw-font-medium tw-text-gray-700 group-hover/btn:tw-text-primary">
              Web Sayfası
            </span>
            <ChevronRight className="tw-w-5 tw-h-5 tw-text-gray-400" />
          </Link>
          <Link
            className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-2.5 tw-bg-gray-50 tw-rounded-lg hover:tw-bg-primary/10 tw-transition-colors group/btn"
            href={`/${slug}/departments/`}
          >
            <span className="tw-font-medium tw-text-gray-700 group-hover/btn:tw-text-primary">
              {t('homepage.hospitals.departments_button_text')}
            </span>
            <ChevronRight className="tw-w-5 tw-h-5 tw-text-gray-400" />
          </Link>

          <Link
            className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-2.5 tw-bg-gray-50 tw-rounded-lg hover:tw-bg-primary/10 tw-transition-colors group/btn"
            href={`/${slug}/doctors/`}
          >
            <span className="tw-font-medium tw-text-gray-700 group-hover/btn:tw-text-primary">
              {t('homepage.hospitals.physician_staff_button_text')}
            </span>
            <ChevronRight className="tw-w-5 tw-h-5 tw-text-gray-400" />
          </Link>

          {!!appointmentLink && (
            <Link href={appointmentLink} target="_blank" className="tw-w-full">
              <Button variant="softPrimary" size="sm" fullWidth rounded="lg">
                Randevu Al
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
